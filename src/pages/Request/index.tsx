import { Component } from "solid-js";

const RequestIndex: Component = () => {
  return (
    <div class="flex flex-col md:flex-row gap-4 justify-center items-center bg-gray-200 p-4 border border-gray-300 min-h-full rounded-lg">
      <div class="text-2xl flex gap-4 items-center">
        <ion-icon class="text-4xl" name="arrow-back-circle-outline"></ion-icon>
        <span>Select a request from the left panel</span>
      </div>
    </div>
  );
};

export default RequestIndex;
