import { getMockReq, getMockRes } from "@jest-mock/express";
import { createPersonAction } from "./controller";
import { ICreatePersonData, IPerson, createPerson } from "./domain";

jest.mock("./domain", () => ({
  createPerson: jest
    .fn<IPerson, ICreatePersonData[]>()
    .mockImplementation((data) => ({ id: 1, name: data.name })),
}));

describe("controller", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("createPerson", () => {
    it("requires a name parameter", () => {
      const req = getMockReq({ body: {} });
      const { res } = getMockRes();

      createPersonAction(req, res);

      expect(createPerson).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "name is required",
      });
    });

    it("responds with 400 if the colour is invalid", () => {
      (createPerson as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid Colour"); // Custom exception doesn't work!
      });

      const req = getMockReq({
        body: { name: "Alice", favouriteColour: "rain" },
      });
      const { res } = getMockRes();

      createPersonAction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid Colour" });
    });
  });
});
