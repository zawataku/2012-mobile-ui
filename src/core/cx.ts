/** 真値の class 名だけを空白区切りでつなぐ */
export const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(" ");
