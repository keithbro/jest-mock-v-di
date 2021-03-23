import { IPerson } from "./domain";

export type CreatePersonReqBody = {
  name: string;
  favouriteColour: string;
};

export type CreatePersonResBody =
  | {
      data: IPerson;
      type: "person";
    }
  | {
      error: string;
    };
