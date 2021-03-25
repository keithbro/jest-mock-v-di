import { getMockReq, getMockRes } from "@jest-mock/express";
import { createPersonAction } from "./controller";
import * as Domain from "./domain";

describe("controller", () => {
  describe("createPerson", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(Domain, "createPerson").mockImplementation((data) => {
        return { id: 1, name: data.name };
      });
    });

    it("responds with 400 if the colour is invalid", async () => {
      jest.spyOn(Domain, "createPerson").mockImplementationOnce(() => {
        throw new Domain.InvalidColourError();
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const req = getMockReq({
        body: { name: "Alan", favouriteColour: "rain" },
      });
      const { res } = getMockRes();

      createPersonAction(req, res);

      expect(Domain.createPerson).toHaveBeenCalledWith({
        name: "Alan",
        favouriteColour: "rain",
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid Colour" });
    });

    it("adds the type to the response payload", async () => {
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
