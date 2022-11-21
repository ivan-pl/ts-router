/* eslint-disable */

type TMatch = (() => void) | string | RegExp;
interface IParams {
  onEnter?: () => Promise<void>;
  onLeave?: () => Promise<void>;
  onBeforeEnter?: () => Promise<void>;
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
