import { IPerson } from "./domain";

export type CreatePersonReqBody = {
  name: string;
};

export type CreatePersonResBody =
  | {
      data: IPerson;
      type: "person";
    }
  | {
      error: string;
    };
