import type React from "react";
import { buttonClassNames, cx } from "../../core";
import type { IconPosition, Theme } from "../../core";
import { useControlGroup } from "../ControlGroup/context";
import { useFieldId } from "./shared";

export type CheckboxRadioProps = Omit<React.ComponentPropsWithRef<"input">, "type"> & {
  /** ラベル（ボタンの見た目になる） */
  label: React.ReactNode;
  /** 小さいサイズ（data-mini）。省略すると ControlGroup の mini を受け継ぐ */
  mini?: boolean;
  /** アイコンの位置（data-iconpos）。既定は left */
  iconpos?: IconPosition;
  /** swatch。省略すると親から継承する（親にもなければ c） */
  theme?: Theme;
};

const CheckboxRadio = ({
  type,
  label,
  mini,
  iconpos,
  theme,
  id,
  className,
  ...rest
}: CheckboxRadioProps & { type: "checkbox" | "radio" }) => {
  const inputId = useFieldId(id);
  const group = useControlGroup();
  // 横並びの ControlGroup ではアイコンを出さず、チェックしたものを active にする（CSS）
  const horizontal = group?.type === "horizontal";
  const classNames = buttonClassNames({
    icon: horizontal ? undefined : `${type}-off`,
    iconpos,
    mini: mini ?? (group?.mini || undefined),
    shadow: false,
  });

  return (
    <div className={cx(`m2012-${type}`, className)}>
      <input {...rest} id={inputId} type={type} />
      <label htmlFor={inputId} className={classNames.root} data-m2012-theme={theme}>
        <span className={classNames.inner}>
          <span className={classNames.text}>{label}</span>
          {classNames.icon && <span className={classNames.icon} aria-hidden="true" />}
        </span>
      </label>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Checkbox（input[type=checkbox]）
// ---------------------------------------------------------------------------
export type CheckboxProps = CheckboxRadioProps;

/**
 * ボタンの見た目のチェックボックス。checked / defaultChecked / onChange は通常の input と同じ。
 * 複数並べるときは ControlGroup（legend 付き）に入れる
 */
export const Checkbox = (props: CheckboxProps) => <CheckboxRadio {...props} type="checkbox" />;

// ---------------------------------------------------------------------------
// Radio（input[type=radio]）
// ---------------------------------------------------------------------------
export type RadioProps = CheckboxRadioProps;

/** ボタンの見た目のラジオボタン。同じ name のものから 1 つ選ぶ */
export const Radio = (props: RadioProps) => <CheckboxRadio {...props} type="radio" />;
