import { Component, Match, Suspense, Switch } from "solid-js";

const RequestById: Component = () => {
  return (
    <div class="flex flex-col md:flex-row  gap-4 min-h-full bg-gray-200 p-4 border border-gray-300 rounded-lg">
      <div class="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Match when={true}>
              <div>Loading...</div>
            </Match>
            <Match when={false}>{/* rest client form */}</Match>
          </Switch>
        </Suspense>
      </div>
      <div class="flex-1">{/* response */}</div>
    </div>
  );
};

export default RequestById;
