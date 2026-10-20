import type React from "react";
import { cx } from "../../core";

// ---------------------------------------------------------------------------
// FieldContain（data-role="fieldcontain"）
// ---------------------------------------------------------------------------
export type FieldContainProps = Omit<React.ComponentPropsWithRef<"div">, "children"> & {
  /** ラベルを見た目だけ隠す（class="ui-hide-label"）。スクリーンリーダーには読ませる */
  hideLabel?: boolean;
  /** ラベル付きのフォーム部品（TextInput など）を 1 つ入れる */
  children?: React.ReactNode;
};

/**
 * フォームの 1 項目分の入れ物。画面幅 450px 以上ではラベルと入力欄を横に並べ、
 * それ未満では縦に並べて項目の間に区切り線を引く
 */
export const FieldContain = ({ hideLabel = false, className, children, ...rest }: FieldContainProps) => (
  <div
    {...rest}
    className={cx(
      "m2012-field-contain m2012-body m2012-br",
      hideLabel && "m2012-hide-label",
      className,
    )}
  >
    {children}
  </div>
);
