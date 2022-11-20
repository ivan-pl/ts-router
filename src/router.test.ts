import { HistoryRouter, IRouter } from "./router";

describe("HistoryRouter", () => {
  describe("has interface", () => {
    let router: IRouter;
    beforeEach(() => {
      router = new HistoryRouter();
    });

    it("returns instance of Router", () => {
      expect(router).toBeInstanceOf(HistoryRouter);
    });
  });
});
