import { render, RenderResult, screen } from "@testing-library/react";
import * as router from "next/router";
import * as swr from "swr";
import { NextRouter } from "next/router";
import { List } from "..";

describe("List", () => {
  describe("routerがReadyでない場合", () => {
    let list: RenderResult;

    beforeEach(() => {
      jest
        .spyOn<typeof router, "useRouter">(router, "useRouter")
        .mockImplementationOnce(
          () =>
            ({
              query: {
                page: undefined,
              },
              isReady: false,
            } as unknown as NextRouter),
        );

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

      list = render(<List />);
    });

    afterEach(() => {
      list.unmount();
    });

    test("リストが表示されない", async () => {
      expect(screen.queryByTestId("list")).toBe(null);
    });
  });

  describe("routerがReadyの場合", () => {
    let list: RenderResult;
    beforeEach(() => {
      jest
        .spyOn<typeof router, "useRouter">(router, "useRouter")
        .mockImplementationOnce(
          () =>
            ({
              query: {
                page: undefined,
              },
              isReady: true,
            } as unknown as NextRouter),
        );
    });

    describe("errorが発生した場合、", () => {
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

        list = render(<List />);
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

        list = render(<List />);
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

        list = render(<List />);
      });
      afterEach(() => {
        list.unmount();
      });

      test("リストが表示される", async () => {
        expect(screen.queryByTestId("list")).not.toBe(null);
      });
    });
  });
});
