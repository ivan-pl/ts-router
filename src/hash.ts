import { Match, Router, HookArgs, Params, Handler } from "./types";

class HashRouter implements Router {
  constructor() {}

  on(match: Match, params?: Params | undefined): () => void {
    return () => {};
  }

  go(url: string, state: any): void {}
}

export default HashRouter;
