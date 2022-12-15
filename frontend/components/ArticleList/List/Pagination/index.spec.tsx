/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import axios from "axios";
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
                content: [],
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
});
