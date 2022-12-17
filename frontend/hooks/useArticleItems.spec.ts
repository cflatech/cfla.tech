import { renderHook } from "@testing-library/react";
import * as swr from "swr";
import { useArticleItems } from "./useArticleItems";

describe("useArticleItems", () => {
  describe("SWRでエラーが発生した場合、", () => {
    beforeEach(() => {
      jest.spyOn(swr, "default").mockImplementation(
        () =>
          ({
            data: [
              {
                id: { value: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573" },
                title: "4",
                blocks: [],
                date: "2022-12-15",
                tag: [],
              },
            ],
            error: "error",
            isLoading: false,
          } as unknown as swr.SWRResponse),
      );
    });

    test("空のitemsが返る", () => {
      const { result } = renderHook(() => useArticleItems(1));
      expect(result.current.items).toEqual([]);
    });
    test("isLoadingがfalseである", () => {
      const { result } = renderHook(() => useArticleItems(1));
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("errorが発生せずLoading中の場合、", () => {
    beforeEach(() => {
      jest.spyOn(swr, "default").mockImplementation(
        () =>
          ({
            data: [
              {
                id: { value: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573" },
                title: "4",
                blocks: [],
                date: "2022-12-15",
                tag: [],
              },
            ],
            error: null,
            isLoading: true,
          } as unknown as swr.SWRResponse),
      );
    });
    test("空のitemsが返る", () => {
      const { result } = renderHook(() => useArticleItems(1));
      expect(result.current.items).toEqual([]);
    });
    test("isLoadingがtrueである", () => {
      const { result } = renderHook(() => useArticleItems(1));
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe("errorが発生せずLoadingでもない場合、", () => {
    beforeEach(() => {
      jest.spyOn(swr, "default").mockImplementation(
        () =>
          ({
            data: [
              {
                id: { value: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573" },
                title: "4",
                blocks: [],
                date: "2022-12-15",
                tag: [],
              },
            ],
            error: null,
            isLoading: false,
          } as unknown as swr.SWRResponse),
      );
    });

    test("受け取ったitemsが返る", () => {
      const { result } = renderHook(() => useArticleItems(1));
      expect(result.current.items).toEqual([
        {
          id: { value: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573" },
          title: "4",
          blocks: [],
          date: "2022-12-15",
          tag: [],
        },
      ]);
    });
    test("isLoadingがfalseである", () => {
      const { result } = renderHook(() => useArticleItems(1));
      expect(result.current.isLoading).toBe(false);
    });
  });
});
