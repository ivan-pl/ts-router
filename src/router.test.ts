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

  describe("implements api", () => {
    let router: IRouter;

    beforeEach(() => {
      router = new HistoryRouter();
    });

    it(".go triggers by click on <a> element", () => {
      router.go = jest.fn();
      const button = document.createElement("button");
      document.body.append(button);
      const link = document.createElement("a");
      const href = "some-link";
      link.setAttribute("href", href);
      document.body.append(link);

      button.click();
      expect(router.go).not.toHaveBeenCalled();

      link.click();
      expect(router.go).toHaveBeenCalled();
      expect(router.go).toHaveBeenCalledWith(href, history.state);
    });

    it("routes to root for empty href", () => {
      router.go = jest.fn();
      const link = document.createElement("a");
      document.body.append(link);
      link.click();

      expect(router.go).toHaveBeenCalledWith("/", history.state);
    });
  });
});
