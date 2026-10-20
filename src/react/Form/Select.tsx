import { useLayoutEffect, useRef } from "react";
import type React from "react";
import { buttonClassNames, cx } from "../../core";
import type { IconName, IconPosition, Theme } from "../../core";
import { mergeRefs, useFieldId } from "./shared";

export type SelectProps = Omit<React.ComponentPropsWithRef<"select">, "multiple"> & {
  /** ラベル */
  label?: React.ReactNode;
  /** 小さいサイズ（data-mini） */
  mini?: boolean;
  /** 横幅をテキストに合わせる（data-inline） */
  inline?: boolean;
  /** swatch。省略すると親から継承する（親にもなければ c） */
  theme?: Theme;
  /** アイコン（data-icon）。既定は arrow-d。null でアイコンなし */
  icon?: IconName | null;
  /** アイコンの位置（data-iconpos）。既定は right */
  iconpos?: IconPosition;
  /** 角丸・影・アイコンの影（既定はすべて true） */
  corners?: boolean;
  shadow?: boolean;
  iconshadow?: boolean;
  /** <option> / <optgroup> を並べる */
  children?: React.ReactNode;
};

/**
 * ボタンの見た目のセレクトボックス。タップすると OS のメニューで選ぶ（jQuery Mobile の nativeMenu）。
 * value / defaultValue / onChange は通常の select と同じ。
 * ボタンに表示する項目名は、描画した select 要素から読み取る（<option> を別のコンポーネントで包んでもよい）
 */
export const Select = ({
  label,
  mini,
  inline,
  theme,
  icon = "arrow-d",
  iconpos = "right",
  corners,
  shadow,
  iconshadow,
  id,
  className,
  disabled,
  value,
  defaultValue,
  onChange,
  ref,
  children,
  ...rest
}: SelectProps) => {
  const selectId = useFieldId(id);
  const selectRef = useRef<HTMLSelectElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // 選択中の項目名をボタンに写す（描画のたびと、選び直したとき）
  const syncText = () => {
    const select = selectRef.current;
    if (select && textRef.current) {
      textRef.current.textContent = select.selectedOptions[0]?.text ?? "";
    }
  };
  useLayoutEffect(syncText);

  const classNames = buttonClassNames({
    icon: icon ?? undefined,
    iconpos,
    mini,
    inline,
    corners,
    shadow,
    iconshadow,
    disabled,
  });

  return (
    <>
      {label != null && (
        <label className="m2012-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className={cx("m2012-select", className)}>
        <div className={classNames.root} data-m2012-theme={theme} aria-disabled={disabled || undefined}>
          <span className={classNames.inner}>
            <span className={classNames.text}>
              <span ref={textRef} />
            </span>
            {classNames.icon && <span className={classNames.icon} aria-hidden="true" />}
          </span>
          <select
            {...rest}
            ref={mergeRefs(ref, selectRef)}
            id={selectId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={(event) => {
              syncText();
              onChange?.(event);
            }}
          >
            {children}
          </select>
        </div>
      </div>
    </>
  );
};
