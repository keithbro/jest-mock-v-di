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
    it("requires a name parameter", () => {
      const req = getMockReq({ body: {} });
      const { res } = getMockRes();

      const { dependencies, execute } = buildAction();
      execute(req, res);

      expect(dependencies.createPerson).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "name is required",
      });
    });

    it("responds with 400 if the colour is invalid", () => {
      const req = getMockReq({
        body: { name: "Alice", favouriteColour: "rain" },
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
  });
});
