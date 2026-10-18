import { Children, createContext, isValidElement, useContext, useId, useState } from "react";
import type React from "react";
import { collapsibleClassNames, collapsibleIcon, cx } from "../../core";
import type { IconName, IconPosition, Theme } from "../../core";
import { Button } from "../Button";

// セット内の折りたたみが受け継ぐ設定（jQuery Mobile では collapsible-set の data 属性から受け継ぐ）
type CollapsibleOptions = {
  /** 見出しの swatch。省略すると親から継承する（親にもなければ c） */
  theme?: Theme;
  /** 中身の swatch（data-content-theme）。指定すると中身に背景と枠線が付く */
  contentTheme?: Theme;
  /** 角丸・左右の枠線付きで、上下に余白を取る（data-inset）。既定は true */
  inset?: boolean;
  /** 見出しを小さいサイズにする（data-mini） */
  mini?: boolean;
  /** 見出しのアイコンの位置（data-iconpos）。既定は left */
  iconpos?: IconPosition;
  /** 閉じているときのアイコン（data-collapsed-icon）。既定は plus */
  collapsedIcon?: IconName;
  /** 開いているときのアイコン（data-expanded-icon）。既定は minus */
  expandedIcon?: IconName;
};

type CollapsibleSetContextValue = CollapsibleOptions & {
  expanded: number | null;
  toggle: (index: number) => void;
};

const CollapsibleSetContext = createContext<CollapsibleSetContextValue | null>(null);
const CollapsibleIndexContext = createContext(-1);

// ---------------------------------------------------------------------------
// Collapsible（data-role="collapsible"）
// ---------------------------------------------------------------------------
export type CollapsibleProps = CollapsibleOptions & {
  /** 見出しのテキスト */
  heading: React.ReactNode;
  /** 見出しの要素（h1〜h6）。既定は 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** 閉じているか（制御する場合）。CollapsibleSet の中では無視する */
  collapsed?: boolean;
  /** 最初に閉じておくか（data-collapsed）。既定は true */
  defaultCollapsed?: boolean;
  /** 開閉したとき */
  onCollapsedChange?: (collapsed: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};

/** 見出しのタップで中身を開閉する */
export const Collapsible = ({
  heading,
  headingLevel = 3,
  collapsed: collapsedProp,
  defaultCollapsed = true,
  onCollapsedChange,
  children,
  className,
  ...options
}: CollapsibleProps) => {
  const set = useContext(CollapsibleSetContext);
  const index = useContext(CollapsibleIndexContext);
  const inSet = set != null && index >= 0;
  const contentId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultCollapsed);

  const collapsed = inSet ? set.expanded !== index : (collapsedProp ?? uncontrolled);
  const {
    theme,
    contentTheme,
    inset = true,
    mini = false,
    iconpos = "left",
    collapsedIcon,
    expandedIcon,
  } = { ...(inSet ? set : {}), ...withoutUndefined(options) };

  const toggle = () => {
    if (inSet) {
      set.toggle(index);
      return;
    }
    if (collapsedProp === undefined) {
      setUncontrolled(!collapsed);
    }
    onCollapsedChange?.(!collapsed);
  };

  const classNames = collapsibleClassNames({ collapsed, inset, themedContent: contentTheme != null });
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={cx(classNames.root, className)}>
      <Heading className={classNames.heading}>
        <Button
          className="m2012-collapsible-heading-toggle"
          icon={collapsibleIcon(collapsed, { collapsedIcon, expandedIcon })}
          iconpos={iconpos}
          mini={mini}
          theme={theme}
          corners={false}
          shadow={false}
          aria-expanded={!collapsed}
          aria-controls={contentId}
          onClick={toggle}
        >
          {heading}
        </Button>
      </Heading>
      <div
        id={contentId}
        className={classNames.content}
        data-m2012-theme={contentTheme}
      >
        {children}
      </div>
    </div>
  );
};

// undefined の props でセットの設定を上書きしないようにする
const withoutUndefined = <T extends object>(object: T): Partial<T> =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined)) as Partial<T>;

// ---------------------------------------------------------------------------
// CollapsibleSet（data-role="collapsible-set"）
// ---------------------------------------------------------------------------
export type CollapsibleSetProps = CollapsibleOptions & {
  /** 開いている折りたたみの位置（制御する場合）。null ならすべて閉じる */
  expanded?: number | null;
  /**
   * 最初に開いておく折りたたみの位置。
   * 省略すると、defaultCollapsed={false} を指定した最初の Collapsible を開く
   */
  defaultExpanded?: number | null;
  /** 開閉したとき */
  onExpandedChange?: (expanded: number | null) => void;
  /** Collapsible を並べる */
  children?: React.ReactNode;
  className?: string;
};

/** Collapsible をひとまとまりにし、同時に 1 つだけ開くようにする（アコーディオン） */
export const CollapsibleSet = ({
  expanded: expandedProp,
  defaultExpanded,
  onExpandedChange,
  children,
  className,
  ...options
}: CollapsibleSetProps) => {
  const [uncontrolled, setUncontrolled] = useState<number | null>(() => {
    if (defaultExpanded !== undefined) {
      return defaultExpanded;
    }
    const index = Children.toArray(children).findIndex(
      (child) =>
        isValidElement<{ defaultCollapsed?: boolean }>(child) &&
        child.props.defaultCollapsed === false,
    );
    return index >= 0 ? index : null;
  });
  const expanded = expandedProp !== undefined ? expandedProp : uncontrolled;

  const toggle = (index: number) => {
    const next = expanded === index ? null : index;
    if (expandedProp === undefined) {
      setUncontrolled(next);
    }
    onExpandedChange?.(next);
  };

  return (
    <div className={cx("m2012-collapsible-set", className)}>
      <CollapsibleSetContext value={{ ...options, expanded, toggle }}>
        {Children.map(children, (child, index) => (
          <CollapsibleIndexContext value={index}>{child}</CollapsibleIndexContext>
        ))}
      </CollapsibleSetContext>
    </div>
  );
};
