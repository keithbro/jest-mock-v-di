import { Request, Response } from "express";
import { createPerson } from "./domain";
import { CreatePersonReqBody, CreatePersonResBody } from "./api_contract";

export const buildCreatePersonAction = (dependencies = { createPerson }) => (
  req: Request<{}, CreatePersonResBody, CreatePersonReqBody>,
  res: Response<CreatePersonResBody>
) => {
  // Validate request payload
  if (!req.body.name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  try {
    // Call inner layer, which may be non-deterministic
    const person = dependencies.createPerson({ name: req.body.name });

    // Build response payload
    const personPayload = { data: person, type: "person" } as const;

    // Respond
    res.json(personPayload);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
