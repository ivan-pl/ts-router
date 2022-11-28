import { Match } from "./types";

export function isMatch(match: Match, path: string) {
  if (typeof match === "string") {
    return match === path;
  }

  if (match instanceof RegExp) {
    return match.test(path);
  }

  return match(path);
}
