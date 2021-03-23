import { getMockReq, getMockRes } from "@jest-mock/express";
import { createPersonAction } from "./controller";
import {
  ICreatePersonData,
  IPerson,
  createPerson,
  InvalidColourError,
} from "./domain";

jest.mock("./domain", () => ({
  createPerson: jest
    .fn<IPerson, ICreatePersonData[]>()
    .mockImplementation((data) => ({ id: 1, name: data.name })),
}));

describe("controller", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("createPerson", () => {
    it("responds with 400 if the colour is invalid", () => {
      (createPerson as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Invalid Colour");
      });

      const req = getMockReq({
        body: { name: "Rick", favouriteColour: "rain" },
      });
      const { res } = getMockRes();

      createPersonAction(req, res);

      expect(createPerson).toHaveBeenCalledWith({
        name: "Rick",
        favouriteColour: "rain",
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid Colour" });
    });

    it("adds the type to the response payload", () => {
      const req = getMockReq({ body: { name: "Alice" } });
      const { res } = getMockRes();

      createPersonAction(req, res);

      expect(res.json).toHaveBeenCalledWith({
        data: { id: 1, name: "Alice" },
        type: "person",
      });
    });
  });
});
