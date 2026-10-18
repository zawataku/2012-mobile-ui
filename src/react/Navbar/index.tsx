import { Children, createContext, isValidElement, useContext } from "react";
import type React from "react";
import { cx, gridClassNames } from "../../core";
import type { GridColumns, IconPosition } from "../../core";
import { Button } from "../Button";
import type { ButtonProps } from "../Button";

// Navbar 内のアイコンの位置。どの項目にもアイコンがなければ undefined
const NavbarIconposContext = createContext<IconPosition | undefined>(undefined);

// ---------------------------------------------------------------------------
// Navbar（data-role="navbar"）
// ---------------------------------------------------------------------------
export type NavbarProps = {
  /** アイコンの位置（data-iconpos）。既定は top。どれか 1 つでもアイコンがある項目すべてに適用する */
  iconpos?: IconPosition;
  /** 列数（data-grid）。省略すると項目数から決める（6 個以上は 2 列） */
  columns?: GridColumns;
  /** NavbarItem を並べる */
  children?: React.ReactNode;
  className?: string;
};

export const Navbar = ({ iconpos = "top", columns, children, className }: NavbarProps) => {
  const items = Children.toArray(children);
  const hasIcon = items.some(
    (item) => isValidElement<{ icon?: unknown }>(item) && item.props.icon != null,
  );
  const { container, blocks } = gridClassNames(items.length, columns);

  return (
    <div className={cx("m2012-navbar m2012-mini", className)} role="navigation">
      <NavbarIconposContext value={hasIcon ? iconpos : undefined}>
        <ul className={container}>
          {items.map((item, i) => (
            <li key={isValidElement(item) && item.key != null ? item.key : i} className={blocks[i]}>
              {item}
            </li>
          ))}
        </ul>
      </NavbarIconposContext>
    </div>
  );
};

// ---------------------------------------------------------------------------
// NavbarItem
// ---------------------------------------------------------------------------
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/** Button の props から、Navbar が決める見た目（角丸・影・inline・アイコン位置）を除いたもの */
export type NavbarItemProps = DistributiveOmit<
  ButtonProps,
  "corners" | "shadow" | "inline" | "iconpos"
>;

/** Navbar の項目。選択中の項目には active を付ける */
export const NavbarItem = (props: NavbarItemProps) => {
  const iconpos = useContext(NavbarIconposContext);
  // アイコンのない項目も、ほかの項目とテキストの位置をそろえる
  const alignment = iconpos && !props.icon ? `m2012-btn-icon-${iconpos}` : undefined;

  return (
    <Button
      {...props}
      corners={false}
      shadow={false}
      inline
      iconpos={iconpos}
      className={cx(alignment, props.className)}
    />
  );
};
