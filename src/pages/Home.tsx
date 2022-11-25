import { Link, Outlet, useLocation } from "solid-app-router";
import { Component, createSignal, For } from "solid-js";
import IconButton from "../components/IconButton";
import RequestModal from "../components/RequestModal";
import { restRequests, setRestRequests } from "../store";
import "./Home.css";

const Home: Component = () => {
  const [showModal, setShowModal] = createSignal(false);
  const location = useLocation();
  return (
    <div class="flex flex-col md:flex-row gap-4 h-full flex-1">
      <RequestModal
        show={showModal()}
        onModalHide={(id: string | null) => {
          setShowModal(!showModal());
        }}
      />
      <div class="w-full md:w-1/4 bg-gray-200 min-h-full border-gray-300 border p-4 rounded-lg">
        <div class="flex justify-between py-4">
          <h1 class="text-sm ">Rest Requests</h1>
          <IconButton
            onClick={() => setShowModal(true)}
            icon="add"
            label="Add Request"
          />
        </div>
        <div class="list">
          <For each={restRequests()} fallback={<div>Loading...</div>}>
            {(item) => (
              <Link href={`/${item.id}`} class="relative list__item">
                <div
                  class="p-2 hover:bg-gray-300 cursor-pointer pr-12 rounded-lg mb-2"
                  classList={{
                    "list__item--active": Boolean(
                      location.pathname === `/${item.id}`
                    ),
                  }}
                >
                  <div>{item.name}</div>
                  <div class="text-xs break-all">
                    {item.request.method} {item.request.url}
                  </div>
                </div>
                <ion-icon
                  onclick={(e: MouseEvent) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (restRequests()?.length) {
                      const requests = restRequests() || [];
                      setRestRequests(requests.filter((i) => i.id !== item.id));
                      // if (location.pathname === `/${item.id}`) {
                      //   navigate("/");
                      // }
                    }
                  }}
                  class="absolute text-xl hover:scale-125 transition-all ease-in-out duration-100 hover:text-red-700 text-red-600 right-2 top-0 bottom-0 m-auto"
                  name="trash"
                ></ion-icon>
              </Link>
            )}
          </For>
        </div>
      </div>
      <div class="flex-1 min-h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
