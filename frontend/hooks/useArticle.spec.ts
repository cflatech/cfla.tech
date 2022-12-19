import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { useArticle } from "./useArticle";

jest.mock("swr");

describe("useArticle", () => {
  describe("SWRでエラーが発生した場合", () => {
    beforeEach(() => {
      (useSWR as jest.Mock).mockReturnValue({
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
      });
    });

    test("nullが返る", () => {
      const { result } = renderHook(() => useArticle("1"));
      expect(result.current.article).toBeNull();
    });
  });

  describe("SWRがLodingの場合、", () => {
    beforeEach(() => {
      (useSWR as jest.Mock).mockReturnValue({
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
      });
    });

    test("nullが返る", () => {
      const { result } = renderHook(() => useArticle("1"));
      expect(result.current.article).toBeNull();
    });
  });

  describe("記事が取得できた場合", () => {
    beforeEach(() => {
      (useSWR as jest.Mock).mockReturnValue({
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
      });
    });
    test("記事情報が取得できる", () => {
      const { result } = renderHook(() => useArticle("1"));
      expect(result.current.article).not.toBeNull();
    });
  });
});
