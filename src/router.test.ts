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

    it("has .on", () => {
      expect(router.on).toBeInstanceOf(Function);
      const unsubscribe = router.on("");
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it("has .go", () => {
      expect(router.go).toBeInstanceOf(Function);
    });
  });
});
