
import { createFormGroup, createFormControl, withControl } from "solid-forms";
import { Component, createEffect } from "solid-js";
import { IRestRequest } from "../interfaces/rest.interfaces";
import { TextField } from "./TextField";

const controlFactory = () => {
  return createFormGroup({
    name: createFormControl<string>("New Request", {
      required: true,
      validators: (val: string) => {
        return !val.length ? {isMissing: true} : null;
      }
    }),
    request: createFormGroup({
      method: createFormControl<string>("GET"),
      body: createFormControl<string>(""),
      url: createFormControl<string>(""),
    }),
  });
};

export const RestClientForm = withControl<
  {
    request?: Partial<IRestRequest>;
    formSubmit: Function;
    formUpdate?: Function;
    actionBtnText: string;
  },
  typeof controlFactory
>({
  controlFactory,
  component: (props) => {
    const controlGroup = () => props.control.controls;
    const requestControlGroup = () => controlGroup().request.controls;
    const request = () => props.request;

    createEffect((requestId) => {
      if (!request || !request()) {
        return null;
      }
      if (request()?.id === requestId) {
        return requestId;
      }
      const req = request()?.request;
      controlGroup().name.setValue(request()?.name || "");
      requestControlGroup().body.setValue(req?.body || "");
      requestControlGroup().url.setValue(req?.url || "");
      requestControlGroup().method.setValue(req?.method || "");
      return request()?.id;
    });

    const bodyValueUpdated = (value: any) => {
      try {
        if (!value) {
          requestControlGroup().body.setErrors(null);
          return;
        }
        const pretty = JSON.stringify(JSON.parse(value), undefined, 4);
        requestControlGroup().body.setValue(pretty);
        requestControlGroup().body.setErrors(null);
      } catch (e) {
        requestControlGroup().body.setErrors({
          invalidJson: true,
        });
      } finally {
        props.formUpdate?.(props.control.value);
      }
    };

    return (
      <form
        action=""
        class="space-y-4"
        classList={{
          "is-valid": props.control.isValid,
          "is-invalid": !props.control.isValid,
          "is-touched": props.control.isTouched,
          "is-untouched": !props.control.isTouched,
          "is-dirty": props.control.isDirty,
          "is-clean": !props.control.isDirty,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const params = {
            ...props.control.value,
            request: {
              ...props.control.value.request,
            },
          };
          props.formSubmit(params);
        }}
      >
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label for="name" class="mb-4 block">
              Name
            </label>
            <TextField
              placeholder="name"
              id="name"
              label="Name"
              control={controlGroup().name}
              valueUpdated={() => {
                props.formUpdate?.(props.control.value);
              }}
            />
          </div>
          <div>
            <label for="url" class="mb-4 block">
              URL
            </label>
            <TextField
              placeholder="url"
              id="url"
              label="Url"
              control={requestControlGroup().url}
              valueUpdated={() => {
                props.formUpdate?.(props.control.value);
              }}           
            />
          </div>

          <div>
            <label class="my-4 block">Method</label>
            <TextField
              id="method"
              label="Method"
              placeholder="method"
              control={requestControlGroup().method}
              valueUpdated={() => {
                props.formUpdate?.(props.control.value);
              }}
            />
          </div>
        </div>
        <div>
          <label class="my-4 block">Body</label>
          <TextField
            id="body"
            type="textarea"
            label="Body"
            placeholder="body"
            control={requestControlGroup().body}
            valueUpdated={bodyValueUpdated}
          />
        </div>

        <div class="mt-4">
          <button
            disabled={!props.control.isValid}
            type="submit"
            class="inline-flex items-center disabled:bg-gray-500 justify-center w-full px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg sm:w-auto"
          >
            <span class="font-medium"> {props.actionBtnText} </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </form>
    );
  },
});
