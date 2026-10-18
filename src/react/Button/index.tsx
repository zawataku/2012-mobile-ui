import type React from "react";
import { buttonClassNames, cx } from "../../core";
import type { ButtonClassOptions, Theme } from "../../core";

// ---------------------------------------------------------------------------
// Button（<a class="ui-btn"> / <button class="ui-btn">）
// ---------------------------------------------------------------------------
type ButtonOwnProps = ButtonClassOptions & {
  /** swatch。省略すると親から継承する（親にもなければ c） */
  theme?: Theme;
  children?: React.ReactNode;
  className?: string;
};

/** href を指定するとリンク（<a>）になる */
export type AnchorButtonProps = ButtonOwnProps &
  Omit<React.ComponentPropsWithRef<"a">, keyof ButtonOwnProps> & {
    href: string;
  };

/** href を指定しなければ <button>（既定の type は "button"） */
export type NativeButtonProps = ButtonOwnProps &
  Omit<React.ComponentPropsWithRef<"button">, keyof ButtonOwnProps> & {
    href?: undefined;
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const splitOwnProps = <P extends ButtonOwnProps>(props: P) => {
  const {
    icon,
    iconpos,
    inline,
    mini,
    corners,
    shadow,
    iconshadow,
    active,
    disabled,
    theme,
    children,
    className,
    ...rest
  } = props;
  const classNames = buttonClassNames({
    icon,
    iconpos,
    inline,
    mini,
    corners,
    shadow,
    iconshadow,
    active,
    disabled,
  });

  // アイコンのみのボタンは、jQuery Mobile と同じくテキストを title にも入れる
  const title =
    icon && iconpos === "notext" && typeof children === "string" ? children : undefined;

  const content = (
    <span className={classNames.inner}>
      <span className={classNames.text}>{children}</span>
      {classNames.icon && <span className={classNames.icon} aria-hidden="true" />}
    </span>
  );

  return {
    rest,
    common: {
      className: cx(classNames.root, className),
      "data-m2012-theme": theme,
      children: content,
    },
    title,
    disabled,
  };
};

export const Button = (props: ButtonProps) => {
  if (props.href !== undefined) {
    const { rest, common, title, disabled } = splitOwnProps(props);
    const { href, ...anchorProps } = rest;
    return (
      <a
        title={title}
        {...anchorProps}
        {...common}
        // 無効なリンクは href を外してフォーカス・遷移できないようにする
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
      />
    );
  }

  const { rest, common, title, disabled } = splitOwnProps(props);
  const { type = "button", ...buttonProps } = rest;
  return (
    <button title={title} type={type} {...buttonProps} {...common} disabled={disabled} />
  );
};
