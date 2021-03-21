import { getMockReq, getMockRes } from "@jest-mock/express";
import { CreatePersonAction } from "./controller_w_di";
import { CreatePersonData, Person } from "./domain";

const MockDeps = () => ({
  createPerson: jest
    .fn<Person, CreatePersonData[]>()
    .mockImplementation((data) => ({ id: 1, name: data.name })),
});

const buildAction = () => {
  const deps = MockDeps();
  const action = CreatePersonAction(deps);
  return { action, deps };
};

describe("controller", () => {
  describe("createPerson", () => {
    it("adds the type to the response payload", () => {
      const req = getMockReq({ body: { name: "Rick" } });
      const { res } = getMockRes();

      buildAction().action(req, res);

      expect(res.json).toHaveBeenCalledWith({
        data: { id: 1, name: "Rick" },
        type: "person",
      });
    });

    it("requires a name parameter", () => {
      const req = getMockReq({ body: {} });
      const { res } = getMockRes();

      const { deps, action } = buildAction();
      action(req, res);

      expect(deps.createPerson).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "name is required",
      });
    });
  });
});
