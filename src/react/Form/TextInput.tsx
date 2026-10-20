import { useLayoutEffect, useRef, useState } from "react";
import type React from "react";
import { cx } from "../../core";
import type { Theme } from "../../core";
import { Button } from "../Button";
import { mergeRefs, setNativeValue, useFieldId } from "./shared";

type TextFieldOptions = {
  /** ラベル。省略する場合は aria-label などで名前を付ける */
  label?: React.ReactNode;
  /** 小さいサイズ（data-mini） */
  mini?: boolean;
  /** swatch。省略すると親から継承する（親にもなければ c） */
  theme?: Theme;
};

const fieldClassName = (mini: boolean, disabled: boolean | undefined, className?: string) =>
  cx(
    "m2012-input-text m2012-surface-body m2012-corner-all m2012-shadow-inset",
    mini && "m2012-mini",
    disabled && "m2012-disabled",
    className,
  );

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label className="m2012-label" htmlFor={htmlFor}>
    {children}
  </label>
);

// ---------------------------------------------------------------------------
// TextInput（input[type=text] など）
// ---------------------------------------------------------------------------
export type TextInputProps = Omit<React.ComponentPropsWithRef<"input">, "size"> &
  TextFieldOptions & {
    /** type="search" の消去ボタンのテキスト（読み上げ用）。既定は "clear text" */
    clearButtonText?: string;
  };

/**
 * 1 行の入力欄。type="search" では左に虫眼鏡、右に消去ボタンが付く。
 * label を指定するとラベルと入力欄を並べて返すので、FieldContain に入れると横に並ぶ
 */
export const TextInput = ({
  label,
  mini = false,
  theme,
  type = "text",
  id,
  className,
  disabled,
  clearButtonText = "clear text",
  ...rest
}: TextInputProps) => {
  const fieldId = useFieldId(id);

  if (type === "search") {
    return (
      <>
        {label != null && <Label htmlFor={fieldId}>{label}</Label>}
        <SearchField
          {...rest}
          id={fieldId}
          mini={mini}
          theme={theme}
          disabled={disabled}
          className={className}
          clearButtonText={clearButtonText}
        />
      </>
    );
  }

  return (
    <>
      {label != null && <Label htmlFor={fieldId}>{label}</Label>}
      <input
        {...rest}
        id={fieldId}
        type={type}
        disabled={disabled}
        className={fieldClassName(mini, disabled, className)}
        data-m2012-theme={theme}
      />
    </>
  );
};

type SearchFieldProps = Omit<TextInputProps, "label" | "type" | "mini"> & {
  id: string;
  mini: boolean;
  clearButtonText: string;
};

// 検索欄（.ui-input-search）。入力があるときだけ消去ボタンを出す
const SearchField = ({
  mini,
  theme,
  disabled,
  className,
  clearButtonText,
  value,
  defaultValue,
  onChange,
  ref,
  ...rest
}: SearchFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uncontrolled, setUncontrolled] = useState(String(defaultValue ?? ""));
  const current = value !== undefined ? String(value) : uncontrolled;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setUncontrolled(event.target.value);
    }
    onChange?.(event);
  };

  const clear = () => {
    const input = inputRef.current;
    if (input) {
      // 制御・非制御どちらでも onChange で空になったことを知らせる
      setNativeValue(input, "");
      input.focus();
    }
  };

  return (
    <div
      className={cx(
        "m2012-input-search m2012-surface-body m2012-shadow-inset m2012-btn-corner-all m2012-icon-searchfield",
        mini && "m2012-mini",
        disabled && "m2012-disabled",
        className,
      )}
      data-m2012-theme={theme}
    >
      <input
        {...rest}
        ref={mergeRefs(ref, inputRef)}
        type="search"
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onChange={handleChange}
        disabled={disabled}
        className={cx("m2012-input-text m2012-surface-body", mini && "m2012-mini")}
      />
      <Button
        className={cx("m2012-input-clear", !current && "m2012-input-clear-hidden")}
        icon="delete"
        iconpos="notext"
        mini={mini}
        title={clearButtonText}
        disabled={disabled}
        onClick={clear}
      >
        {clearButtonText}
      </Button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Textarea
// ---------------------------------------------------------------------------
export type TextareaProps = React.ComponentPropsWithRef<"textarea"> & TextFieldOptions;

// 自動で広げるときに足す高さ（jQuery Mobile と同じ 15px）
const EXTRA_LINE_HEIGHT = 15;

/** 複数行の入力欄。入力に合わせて高さが自動で伸びる */
export const Textarea = ({
  label,
  mini = false,
  theme,
  id,
  className,
  disabled,
  onInput,
  value,
  ref,
  ...rest
}: TextareaProps) => {
  const fieldId = useFieldId(id);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const grow = () => {
    const textarea = textareaRef.current;
    if (textarea && textarea.clientHeight < textarea.scrollHeight) {
      textarea.style.height = `${textarea.scrollHeight + EXTRA_LINE_HEIGHT}px`;
    }
  };

  // 最初の表示や外から値が変わったときも高さを合わせる
  useLayoutEffect(grow, [value]);

  return (
    <>
      {label != null && <Label htmlFor={fieldId}>{label}</Label>}
      <textarea
        {...rest}
        ref={mergeRefs(ref, textareaRef)}
        id={fieldId}
        value={value}
        disabled={disabled}
        onInput={(event) => {
          grow();
          onInput?.(event);
        }}
        className={fieldClassName(mini, disabled, className)}
        data-m2012-theme={theme}
      />
    </>
  );
};
