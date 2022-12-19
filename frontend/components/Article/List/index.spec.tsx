import { render, RenderResult, screen } from "@testing-library/react";
import * as swr from "swr";
import { List } from ".";

describe("List", () => {
  let list: RenderResult;
  describe("errorが発生した場合、", () => {
    beforeEach(() => {
      jest.spyOn(swr, "default").mockImplementation(
        () =>
          ({
            data: [
              {
                id: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573",
                title: "4",
                blocks: [],
                date: "2022-12-15",
              },
            ],
            error: "error",
            isLoading: false,
          } as unknown as swr.SWRResponse),
      );

      list = render(<List page={1} />);
    });
    afterEach(() => {
      list.unmount();
    });

    test("リストが表示されない", async () => {
      expect(screen.queryByTestId("list")).toBe(null);
    });
  });

  describe("errorが発生せずLoading中の場合、", () => {
    beforeEach(() => {
      jest.spyOn(swr, "default").mockImplementation(
        () =>
          ({
            data: [
              {
                id: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573",
                title: "4",
                blocks: [],
                date: "2022-12-15",
              },
            ],
            error: null,
            isLoading: true,
          } as unknown as swr.SWRResponse),
      );

      list = render(<List page={1} />);
    });
    afterEach(() => {
      list.unmount();
    });

    test("リストが表示されない", async () => {
      expect(screen.queryByTestId("list")).toBe(null);
    });
  });

  describe("errorが発生せずLoadingでもない場合、", () => {
    beforeEach(() => {
      jest.spyOn(swr, "default").mockImplementation(
        () =>
          ({
            data: [
              {
                id: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573",
                title: "4",
                blocks: [],
                date: "2022-12-15",
              },
            ],
            error: null,
            isLoading: false,
          } as unknown as swr.SWRResponse),
      );

      list = render(<List page={1} />);
    });
    afterEach(() => {
      list.unmount();
    });

    test("リストが表示される", async () => {
      expect(screen.queryByTestId("list")).not.toBe(null);
    });
  });
});
