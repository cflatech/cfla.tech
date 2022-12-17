import { render, RenderResult, screen } from "@testing-library/react";
import { Pagination } from ".";
import { useArticleItems } from "../../../../hooks/useArticleItems";

jest.mock("../../../../hooks/useArticleItems");

describe("Pagination", () => {
  describe("はじめのページの場合", () => {
    let pagination: RenderResult;
    beforeEach(() => {
      (useArticleItems as jest.Mock).mockReturnValue({
        items: [],
        isLoading: true,
      });
      pagination = render(<Pagination page={1} />);
    });

    afterEach(() => {
      pagination.unmount();
    });

    test("次のページが表示されない", () => {
      expect(screen.queryByText("次のページ")).toBeNull();
    });
  });

  describe("前のページのItemが存在しない場合", () => {
    let pagination: RenderResult;
    beforeEach(() => {
      (useArticleItems as jest.Mock).mockImplementation(() => ({
        items: [],
        isLoading: false,
      }));
      pagination = render(<Pagination page={1} />);
    });

    afterEach(() => {
      pagination.unmount();
    });

    test("前のページヘが表示されない", () => {
      expect(screen.queryByText("前のページ")).toBeNull();
    });
  });

  describe("前のページのItemを読込中の場合", () => {
    let pagination: RenderResult;
    beforeEach(() => {
      (useArticleItems as jest.Mock).mockImplementation(() => ({
        items: [
          {
            id: "id",
            title: "title",
            date: "2020-11-12",
            blocks: [],
          },
        ],
        isLoading: true,
      }));
      pagination = render(<Pagination page={1} />);
    });

    afterEach(() => {
      pagination.unmount();
    });
    test("前のページヘが表示されない", () => {
      expect(screen.queryByText("前のページ")).toBeNull();
    });
  });

  describe("前のページが存在している場合", () => {
    let pagination: RenderResult;
    beforeEach(() => {
      (useArticleItems as jest.Mock).mockImplementation(() => ({
        items: [
          {
            id: "id",
            title: "title",
            date: "2020-11-12",
            blocks: [],
          },
        ],
        isLoading: false,
      }));
      pagination = render(<Pagination page={1} />);
    });

    afterEach(() => {
      pagination.unmount();
    });
    test("前のページヘが表示されない", () => {
      expect(screen.queryByText("前のページ")).not.toBeNull();
    });
  });
});
