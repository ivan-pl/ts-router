import { Match, Router, HookArgs, Params, Handler } from "./types";

class HashRouter implements Router {
  private handlers: Map<Match, Handler> = new Map();
  private prevPath = "";
  private curPath: string = location.hash;
  state: HookArgs["state"];

  constructor() {
    document.body.addEventListener("click", (event) => {
      const el = event.target as HTMLElement;
      if (!el.matches("a")) {
        return;
      }
      event.preventDefault();
      const url = el.getAttribute("href") ?? "/";
      this.go(url, {});
    });
  }

  on(match: Match, params: Params): () => void {
    const handler: Handler = { match, params };
    this.handlers.set(match, handler);
    return () => this.handlers.delete(match);
  }

  go(url: string, state: any): void {
    this.prevPath = this.curPath;
    this.state = state;
    location.hash = url;
    this.curPath = url;

    this.handlers.forEach((handler) => this.callHandler(handler));
  }

  private isMatch(match: Match, path: string) {
    if (typeof match === "string") {
      return match === path;
    }

    if (match instanceof RegExp) {
      return match.test(path);
    }

    return match(path);
  }

  private async callHandler({
    match,
    params: { onEnter, onBeforeEnter, onLeave } = {},
  }: Handler) {
    const args: HookArgs = {
      curPath: this.curPath,
      prevPath: this.prevPath,
      state: this.state,
    };

    if (
      onLeave &&
      this.prevPath !== this.curPath &&
      this.isMatch(match, this.prevPath)
    ) {
      await onLeave(args);
    }

    if (this.isMatch(match, this.curPath)) {
      if (onBeforeEnter) {
        await onBeforeEnter(args);
      }
      if (onEnter) {
        await onEnter(args);
      }
    }
  }
}

export default HashRouter;
