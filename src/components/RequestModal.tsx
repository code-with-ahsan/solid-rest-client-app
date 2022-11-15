import { Component, ComponentProps, Show } from "solid-js";
import { IRestRequest } from "../interfaces/rest.interfaces";
import { setRestRequests, restRequests } from "../store";
import { RestClientForm } from "./RestClientForm";
import outsideDirective from "../directives/click-outside.directive";

interface RequestModalProps extends ComponentProps<any> {
  show: boolean;
  onModalHide: (id: string | null) => void;
  request?: IRestRequest;
}

// https://github.com/solidjs/solid/discussions/845
const clickOutside = outsideDirective;

const RequestModal: Component<RequestModalProps> = (
  props: RequestModalProps
) => {
  return (
    <Show when={props.show}>
      <div class="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.75)]">
        <div class="relative max-h-[85%] overflow-y-auto top-20 bg-gray-200 max-w-md m-auto h- block p-8 pb-8 border-t-4 border-purple-600 rounded-sm shadow-xl"
          use:clickOutside={() => {
            props.onModalHide(null);
          }}
        >
          <h5 class="text-4xl font-bold mb-4">
            {(props.request ? "Edit" : "Create") + " Request"}
          </h5>

          <RestClientForm
            formSubmit={(request: IRestRequest) => {
              const id = self.crypto?.randomUUID() || Date.now().toString();
              setRestRequests([
                ...(restRequests() || []),
                {
                  ...request,
                  id,
                },
              ]);
              props.onModalHide(id);
            }}
            actionBtnText={"Save"}
          />

          <span class="absolute bottom-9 right-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </span>
        </div>
      </div>
    </Show>
  );
};

export default RequestModal;
