import { RouteDataFuncArgs } from "solid-app-router";
import { createResource } from "solid-js";
import { restRequests } from "../store";

/**
 * Data function
 * @param id - Request ID
 */
export const fetchSelectedRequest = ({ params }: RouteDataFuncArgs) => {
  const [request] = createResource(
    () => params.id,
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(restRequests()?.find((r) => r.id === params.id));
        }, 500);
      })
  );
  return request;
};
