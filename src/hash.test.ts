import HashRouter from "./hash";
import { Router } from "./types";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

describe("has interface", () => {
  let router: Router;
  beforeEach(() => {
    router = new HashRouter();
  });

  it("returns instance of Router", () => {
    expect(router).toBeInstanceOf(HashRouter);
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
  let router: Router;
  const createLink = (href?: string) => {
    const link = document.createElement("a");
    if (href) {
      link.setAttribute("href", href);
    }
    document.body.append(link);
    return link;
  };

  beforeEach(() => {
    router = new HashRouter();
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
    expect(router.go).toHaveBeenCalledWith(href, {});
  });

  it("routes to root for empty href", () => {
    router.go = jest.fn();
    const link = createLink();
    link.click();

    expect(router.go).toHaveBeenCalledWith("/", {});
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

  it("supports onEnter", () => {
    const param = { onEnter: jest.fn() };
    const path = "/";
    const link = createLink(path);
    router.on(path, param);

    expect(param.onEnter).not.toBeCalled();
    link.click();
    expect(param.onEnter).toBeCalled();
  });

  it("supports onLeave", () => {
    const param = { onEnter: jest.fn(), onLeave: jest.fn() };
    const path = "/contact";
    const link = createLink(path);
    router.on(path, param);

    expect(param.onLeave).not.toBeCalled();
    link.click();
    expect(param.onLeave).not.toBeCalled();

    const anotherPath = path + "/random-link";
    const anotherLink = createLink(anotherPath);
    router.on(anotherPath);

    expect(param.onLeave).not.toBeCalled();
    anotherLink.click();
    expect(param.onLeave).toBeCalled();
  });

  it("supports onBeforeEnter", async () => {
    const callStack: ("onEnter" | "onBeforeEnter")[] = [];
    const params = {
      onEnter: jest.fn(async () => {
        callStack.push("onEnter");
      }),
      onBeforeEnter: jest.fn(async () => {
        callStack.push("onBeforeEnter");
      }),
    };
    const path = "/contact";
    const link = createLink(path);
    router.on(path, params);

    expect(params.onEnter).not.toBeCalled();
    expect(params.onBeforeEnter).not.toBeCalled();
    link.click();
    await sleep(5);
    expect(params.onEnter).toBeCalled();
    expect(params.onBeforeEnter).toBeCalled();
    expect(callStack).toEqual(["onBeforeEnter", "onEnter"]);
  });

  it("supports unsubscribe", () => {
    const params = {
      onEnter: jest.fn(),
    };
    const path = "/contact";
    const link = createLink(path);
    const unsubscribe = router.on(path, params);

    expect(params.onEnter).not.toBeCalled();
    link.click();
    expect(params.onEnter).toBeCalledTimes(1);
    link.click();
    expect(params.onEnter).toBeCalledTimes(2);
    unsubscribe();
    link.click();
    expect(params.onEnter).toBeCalledTimes(2);
  });
});
