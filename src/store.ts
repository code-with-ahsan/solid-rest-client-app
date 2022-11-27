import { IRestRequest } from "./interfaces/rest.interfaces";
import { createStorageSignal } from "@solid-primitives/storage";

export const [restRequests, setRestRequests] = createStorageSignal<IRestRequest[]>(
  "requests",
  [],
  {
    deserializer: (val: string | null): IRestRequest[] => {
      if (val === null) {
        return [];
      }
      return JSON.parse(val);
    },
    serializer: (val: IRestRequest[]) => {
      return JSON.stringify(val);
    },
  }
);
