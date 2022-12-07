import axios, { AxiosRequestConfig } from "axios";
import { useRouteData } from "solid-app-router";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Match,
  Resource,
  Show,
  Switch,
} from "solid-js";
import { RestClientForm } from "../../components/RestClientForm";
import RestClientOutput from "../../components/RestClientOutput";
import { IRestRequest } from "../../interfaces/rest.interfaces";
import { setRestRequests } from "../../store";

const RequestById: Component = () => {
  const request: Resource<IRestRequest> = useRouteData();
  const [apiCallParams, setApiCallParams] = createSignal<AxiosRequestConfig>();
  const [response, { mutate }] = createResource(apiCallParams, () => {
    if (!apiCallParams()) {
      return null;
    }
    return axios.request(apiCallParams() as any).catch((err) => {
      console.error(err);
      if (!err.response.data) {
        err.response.data = {
          message: "Can not process request",
        };
      }
      return err.response;
    });
  });

  createEffect(() => {
    request()?.id && mutate(null);
  });

  const onFormSubmit = async (val: IRestRequest) => {
    const { body, url, method } = val.request;
    setApiCallParams({ body, url, method });
  };

  const onFormValUpdate = (formVal: IRestRequest) => {
    setRestRequests((requestsPrev) => {
      return requestsPrev!.map((reqItem) => {
        if (reqItem.id === request()!.id) {
          return {
            ...reqItem,
            request: {
              ...reqItem.request,
              ...formVal.request,
            },
            name: formVal.name || reqItem.name,
          };
        }
        return reqItem;
      });
    });
  };
  return (
    <div class="flex flex-col md:flex-row  gap-4 min-h-full bg-gray-200 p-4 border border-gray-300 rounded-lg">
      <div class="flex-1">
        <Switch>
          <Match when={request.loading}>
            <div>Loading...</div>
          </Match>
          <Match when={request()}>
            <RestClientForm
              request={request()}
              actionBtnText={"Send"}
              formSubmit={onFormSubmit}
              formUpdate={onFormValUpdate}
            />
          </Match>
          <Match when={request.error || !request()}>
            <div>Request Not found</div>
          </Match>
        </Switch>
      </div>
      <div class="flex-1">
        <Show when={!response.loading && !request.loading && response()}>
          <RestClientOutput response={response()} />
        </Show>
        <Show when={response.loading}>
          <div>Loading...</div>
        </Show>
      </div>
    </div>
  );
};

export default RequestById;
