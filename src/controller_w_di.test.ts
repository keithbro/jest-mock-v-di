import { getMockReq, getMockRes } from "@jest-mock/express";
import { buildCreatePersonAction } from "./controller_w_di";
import { ICreatePersonData, IPerson } from "./domain";
import { inject } from "./test_utils";

const buildAction = inject(buildCreatePersonAction, () => ({
  createPerson: jest
    .fn<IPerson, ICreatePersonData[]>()
    .mockImplementation((data) => ({ id: 1, name: data.name })),
}));

describe("controller", () => {
  describe("createPerson", () => {
    it("adds the type to the response payload", () => {
      const req = getMockReq({ body: { name: "Rick" } });
      const { res } = getMockRes();

      buildAction().execute(req, res);

      expect(res.json).toHaveBeenCalledWith({
        data: { id: 1, name: "Rick" },
        type: "person",
      });
    });

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
  });
});
