/* eslint-disable */

type TMatch = (() => void) | string | RegExp;

interface IHookArgs {
  prevPath: string;
  curPath: string;
  state: any;
}

interface IParams {
  onEnter?: (state: IHookArgs) => Promise<void>;
  onLeave?: (state: IHookArgs) => Promise<void>;
  onBeforeEnter?: (state: IHookArgs) => Promise<void>;
}

export interface IRouter {
  on(match: TMatch, params?: IParams): () => void;
  go(url: string, state: any): void;
}

export class HistoryRouter implements IRouter {
  constructor() {
    document.body.addEventListener("click", (event) => {
      const el = event.target as HTMLElement;
      if (!el.matches("a")) {
        return;
      }
      event.preventDefault();
      let url = el.getAttribute("href") ?? "/";
      this.go(url, history.state);
    });
  }

  on(match: TMatch, params?: IParams) {
    return () => {};
  }

  go(url: string, state: any): void {}
}
