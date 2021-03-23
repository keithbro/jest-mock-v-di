import { getMockReq, getMockRes } from "@jest-mock/express";
import { buildCreatePersonAction } from "./controller_w_di";
import { ICreatePersonData, IPerson, InvalidColourError } from "./domain";
import { inject } from "./test_utils";

const buildAction = inject(buildCreatePersonAction, () => ({
  createPerson: jest
    .fn<IPerson, ICreatePersonData[]>()
    .mockImplementation((data) => ({ id: 1, name: data.name })),
}));

describe("controller", () => {
  describe("createPerson", () => {
    it("responds with 400 if the colour is invalid", () => {
      const req = getMockReq({
        body: { name: "Alan", favouriteColour: "rain" },
      });
      const { res } = getMockRes();

      buildAction({
        createPerson: jest
          .fn()
          .mockImplementation((data: ICreatePersonData) => {
            throw new InvalidColourError();
          }),
      }).execute(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid Colour" });
    });

    it("adds the type to the response payload", () => {
      const req = getMockReq({ body: { name: "Alice" } });
      const { res } = getMockRes();

      buildAction().execute(req, res);

      expect(res.json).toHaveBeenCalledWith({
        data: { id: 1, name: "Alice" },
        type: "person",
      });
    });
  });
});
