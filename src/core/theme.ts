/** swatch の一覧（jQuery Mobile 1.2.0 のデフォルトテーマ） */
export const THEMES = ["a", "b", "c", "d", "e"] as const;

/** swatch。data-m2012-theme 属性の値になる */
export type Theme = (typeof THEMES)[number];

/** swatch を切り替える属性名 */
export const THEME_ATTRIBUTE = "data-m2012-theme";
