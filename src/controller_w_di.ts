import { Request, Response } from "express";
import { createPerson, Person } from "./domain";

interface ReqBody {
  name: string;
}

type ResBody =
  | {
      data: Person;
      type: "person";
    }
  | {
      error: string;
    };

export const CreatePersonAction = (dependencies = { createPerson }) => (
  req: Request<{}, ResBody, ReqBody>,
  res: Response<ResBody>
) => {
  // Validate request payload
  if (!req.body.name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  // Call inner layer, which may be non-deterministic
  const person = dependencies.createPerson({ name: req.body.name });

  // Build response payload
  const personPayload = { data: person, type: "person" } as const;

  // Respond
  res.json(personPayload);
};