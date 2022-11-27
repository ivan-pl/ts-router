export type Match = string | RegExp | ((path: string) => boolean);

export interface HookArgs {
  prevPath: string;
  curPath: string;
  state: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Params {
  onEnter?: (state: HookArgs) => Promise<void>;
  onLeave?: (state: HookArgs) => Promise<void>;
  onBeforeEnter?: (state: HookArgs) => Promise<void>;
}

export interface Handler {
  match: Match;
  params: Params;
}

export interface Router {
  on(match: Match, params?: Params): () => void;
  go(url: string, state: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
}