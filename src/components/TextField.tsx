import { IFormControl } from 'solid-forms';
import { Component } from 'solid-js';

export const TextField: Component<{
  control: IFormControl<string>,
  label: string,
  placeholder?: string,
  type?: string,
  rows?: number
  id: string
  class?: string,
  valueUpdated?: (val: any) => void
}> = (props) => {
  const type = props.type || 'text';
  const onInput = (e: { currentTarget: { value: string; }; }) => {
    props.control.markDirty(true);
    props.control.setValue(e.currentTarget.value);
  }

  const onBlur = () => {
    props.control.markTouched(true);
    if (props.valueUpdated) {
      props.valueUpdated(props.control.value);
    }
  }
  return (
    <>
      <label class="sr-only" for={props.id}>{props.label}</label>
      {
        type === 'textarea' ? <textarea
        value={props.control.value}
        rows={props.rows || 3}
        oninput={onInput}
        onblur={onBlur}
        placeholder={props.placeholder}
        required={props.control.isRequired}
        id={props.id}
        class={`w-full p-3 text-sm border-gray-200 rounded-lg ${props.class}`}
      /> : <input
        type="text"
        value={props.control.value}
        oninput={onInput}
        onblur={onBlur}
        placeholder={props.placeholder}
        required={props.control.isRequired}
        id={props.id}
        class={`w-full p-3 text-sm border-gray-200 rounded-lg ${props.class}`}
      />}
    </>
  );
};