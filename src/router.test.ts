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
    const createLink = (href?: string) => {
      const link = document.createElement("a");
      if (href) {
        link.setAttribute("href", href);
      }
      document.body.append(link);
      return link;
    };

    beforeEach(() => {
      router = new HistoryRouter();
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it(".go triggers by click on <a> element", () => {
      router.go = jest.fn();
      const button = document.createElement("button");
      document.body.append(button);
      const href = "some-link";
      const link = createLink(href);

      button.click();
      expect(router.go).not.toHaveBeenCalled();

      link.click();
      expect(router.go).toHaveBeenCalled();
      expect(router.go).toHaveBeenCalledWith(href, history.state);
    });

    it("routes to root for empty href", () => {
      router.go = jest.fn();
      const link = createLink();
      link.click();

      expect(router.go).toHaveBeenCalledWith("/", history.state);
    });

    it(".on supports strings", () => {
      const spy = jest.fn();
      const path = "/contacts";
      const unknownLink = createLink("/unknownPath");
      const link = createLink(path);
      router.on(path, { onEnter: spy });

      unknownLink.click();
      expect(spy).not.toHaveBeenCalled();

      link.click();
      expect(spy).toHaveBeenCalled();
    });

    it(".on supports RegExp", () => {
      const spy = jest.fn();
      const path = "/contacts";
      const unknownLink = createLink("/unknownPath");
      const link = createLink(path);
      router.on(/tacts$/, { onEnter: spy });

      unknownLink.click();
      expect(spy).not.toHaveBeenCalled();

      link.click();
      expect(spy).toHaveBeenCalled();
    });

    it(".on supports Functions", () => {
      const spy = jest.fn();
      const path = "/contacts";
      const unknownLink = createLink("/unknownPath");
      const link = createLink(path);
      router.on((match) => match === path, { onEnter: spy });

      unknownLink.click();
      expect(spy).not.toHaveBeenCalled();

      link.click();
      expect(spy).toHaveBeenCalled();
    });
  });
});
