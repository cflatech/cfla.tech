import { Id } from "./id.value-object";

describe("constructor", () => {
  describe("UUID以外の形式のIDが指定された場合", () => {
    test("InvaildArgumentExceptionが返る", () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Id("1234");
      }).toThrow();
    });
  });
});

describe("value", () => {
  describe("UUIDの形式のIDが指定された場合", () => {
    test("IDが取得できる", () => {
      const id = new Id("550e8400-e29b-41d4-a716-446655440000");
      expect(id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    });
  });
});
