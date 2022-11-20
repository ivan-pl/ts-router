/* eslint-disable */

type TMatch = (() => void) | string | RegExp;
interface IParams {
  onEnter?: () => void;
  onLeave?: () => void;
  onBeforeEnter?: () => void;
}

export interface IRouter {
  on(match: TMatch, params?: IParams): () => void;
  go(url: string): void;
}

export class HistoryRouter implements IRouter {
  on(match: TMatch, params?: IParams) {
    return () => {};
  }

  go(url: string): void {}
}
