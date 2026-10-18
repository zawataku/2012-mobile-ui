// ライブラリビルドのエントリ。
// CSS を読み込むことで dist/style.css が出力される（利用側は "2012-mobile-ui/style.css" を読み込む）。
// 型定義は CSS の import を含まない src/index.ts から出力する。
import "./core/styles/index.css";

export * from "./index";
