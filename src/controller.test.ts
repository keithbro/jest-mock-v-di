import { getMockReq, getMockRes } from "@jest-mock/express";
import { createPersonAction as action } from "./controller";
import { CreatePersonData, Person, createPerson } from "./domain";

jest.mock("./domain", () => ({
  createPerson: jest
    .fn<Person, CreatePersonData[]>()
    .mockImplementation((data) => ({ id: 1, name: data.name })),
}));

describe("controller", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("createPerson", () => {
    it("adds the type to the response payload", () => {
      const req = getMockReq({ body: { name: "Rick" } });
      const { res } = getMockRes();

      action(req, res);

      expect(res.json).toHaveBeenCalledWith({
        data: { id: 1, name: "Rick" },
        type: "person",
      });
    });

    it("requires a name parameter", () => {
      const req = getMockReq({ body: {} });
      const { res } = getMockRes();

      action(req, res);

      expect(createPerson).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "name is required",
      });
    });
  });
});
