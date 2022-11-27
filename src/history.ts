import { Match, Router, HookArgs, Params, Handler } from "./types";

export class HistoryRouter implements Router {
    private handlers: Map<Match, Handler> = new Map();
    private prevPath = "";
    private curPath: string = location.pathname;
  
    constructor() {
      document.body.addEventListener("click", (event) => {
        const el = event.target as HTMLElement;
        if (!el.matches("a")) {
          return;
        }
        event.preventDefault();
        const url = el.getAttribute("href") ?? "/";
        this.go(url, history.state);
      });
    }
  
    on(match: Match, params: Params) {
      const handler: Handler = { match, params };
      this.handlers.set(match, handler);
      return () => this.handlers.delete(match);
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    go(url: string, state: any): void {
      this.prevPath = this.curPath;
      history.pushState(state, url, url);
      this.curPath = location.pathname;
  
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
        state: history.state,
      };
  
      if (onLeave && this.isMatch(match, this.prevPath)) {
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
  