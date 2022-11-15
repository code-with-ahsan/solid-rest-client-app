import { IRestRequest } from "./interfaces/rest.interfaces";
import { createStorageSignal } from "@solid-primitives/storage";

export const [restRequests, setRestRequests] = createStorageSignal<
  IRestRequest[]
>(
  "requests",
  [
    {
      id: "1",
      name: "Get Scores",
      description: "Getting scores from server",
      request: {
        method: "GET",
        url: "https://scorer-pro3.p.rapidapi.com/score/game123",
        headers: [
          {
            key: "X-RapidAPI-Host",
            value: "API_HOST_FROM_RAPID_API",
          },
          {
            key: "X-RapidAPI-Key",
            value: "API_KEY_FROM_RAPID_API",
          },
        ],
      },
    },
    {
      id: "2",
      name: "Add Score",
      description: "Adding scores to server",
      request: {
        method: "POST",
        url: "https://scorer-pro3.p.rapidapi.com/score",
        headers: [
          {
            key: "X-RapidAPI-Host",
            value: "API_HOST_FROM_RAPID_API",
          },
          {
            key: "X-RapidAPI-Key",
            value: "API_KEY_FROM_RAPID_API",
          },
        ],
        body: JSON.stringify({
          score: 100,
          gameId: "123",
          userId: "test123",
        }),
      },
    },
  ],
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
