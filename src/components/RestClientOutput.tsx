import { Component, ComponentProps, For, Show } from "solid-js";
import { IRestResponse } from "../interfaces/rest.interfaces";
import "@alenaksu/json-viewer";

interface RestClientOutputProps extends ComponentProps<any> {
  response: IRestResponse | null;
}

const RestClientOutput: Component<RestClientOutputProps> = (
  props: RestClientOutputProps
) => {
  return (
    <div>
      <div
        class="status px-4 py-2 rounded-lg mb-4"
        classList={{
          "bg-green-200 text-green-900 border border-green-900":
            props.response?.status === 200,
          "bg-red-200 text-red-900 border border-red-900":
            props.response?.status !== 200,
        }}
      >
        Code: {props.response && props.response.status}
      </div>
      <Show when={props.response?.headers}>
        <div class="rounded-lg mb-4 bg-white px-4 py-2 divide-y">
          <For each={Object.keys(props.response?.headers)}>
            {(key: string) => {
              const value = props.response?.headers[key];
              return (
                <div class="header flex py-1 justify-between">
                  <span>{key}:</span> <span>{value}</span>
                </div>
              );
            }}
          </For>
        </div>
      </Show>
      <Show when={props.response?.data}>
        <json-viewer class="p-4" data={props.response?.data}></json-viewer>
      </Show>
    </div>
  );
};

export default RestClientOutput;
