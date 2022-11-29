import { Match, Router, HookArgs, Params, Handler } from "./types";
import { isMatch } from "./utils";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  go(url: string, state: any): void {
    url = url || "/";
    this.prevPath = this.curPath;
    this.state = state;
    location.hash = url;
    this.curPath = url;

    this.handlers.forEach((handler) => this.callHandler(handler));
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
      isMatch(match, this.prevPath)
    ) {
      await onLeave(args);
    }

    if (isMatch(match, this.curPath)) {
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
