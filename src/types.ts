export type TMatch = string | RegExp | ((path: string) => boolean);

export interface IHookArgs {
  prevPath: string;
  curPath: string;
  state: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IParams {
  onEnter?: (state: IHookArgs) => Promise<void>;
  onLeave?: (state: IHookArgs) => Promise<void>;
  onBeforeEnter?: (state: IHookArgs) => Promise<void>;
}

export interface IHandler {
  match: TMatch;
  params: IParams;
}
