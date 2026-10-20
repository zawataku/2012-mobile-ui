import { useRef, useState } from "react";
import type React from "react";
import {
  buttonClassNames,
  cx,
  flipSwitchLabelWidths,
  sliderPercent,
  sliderValueFromKey,
  sliderValueFromPercent,
  snapSliderValue,
} from "../../core";
import type { Theme } from "../../core";
import { useFieldId } from "./shared";

type SliderCommonProps = {
  /** ラベル */
  label?: React.ReactNode;
  /** 小さいサイズ（data-mini） */
  mini?: boolean;
  /** つまみの swatch。省略すると親から継承する（親にもなければ c） */
  theme?: Theme;
  /** トラックの swatch（data-track-theme）。省略すると親から継承する */
  trackTheme?: Theme;
  disabled?: boolean;
  /** フォーム送信時の名前 */
  name?: string;
  id?: string;
  className?: string;
};

const handleClassName = (disabled: boolean | undefined) =>
  cx(buttonClassNames({ disabled }).root, "m2012-slider-handle");

const HandleInner = () => (
  <span className="m2012-btn-inner m2012-btn-corner-all">
    <span className="m2012-btn-text" />
  </span>
);

// トラックの外までドラッグしても追従させる。ポインタがすでに離れているなどで失敗しても操作は続ける
const capturePointer = (event: React.PointerEvent<HTMLElement>) => {
  try {
    event.currentTarget.setPointerCapture(event.pointerId);
  } catch {
    // ignore
  }
};

// ポインタの位置がトラックの何 % か（0〜100）。トラックの幅が取れなければ null
const percentFromPointer = (track: HTMLElement | null, clientX: number): number | null => {
  const rect = track?.getBoundingClientRect();
  if (!rect || rect.width === 0) {
    return null;
  }
  return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
};

// ---------------------------------------------------------------------------
// Slider（input[type=range]）
// ---------------------------------------------------------------------------
export type SliderProps = SliderCommonProps & {
  min?: number;
  max?: number;
  step?: number;
  /** 値（制御する場合） */
  value?: number;
  /** 最初の値。既定は min */
  defaultValue?: number;
  /** 値が変わったとき */
  onChange?: (value: number) => void;
  /** つまみの位置まで塗る（data-highlight） */
  highlight?: boolean;
  /** トラックを短くして横に並べる（data-inline） */
  inline?: boolean;
};

/** 数値の入力欄と、ドラッグ・キー操作で値を選べるトラック */
export const Slider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  highlight = false,
  inline = false,
  mini = false,
  theme,
  trackTheme,
  disabled,
  name,
  id,
  className,
}: SliderProps) => {
  const inputId = useFieldId(id);
  const labelId = `${inputId}-label`;
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);
  const [uncontrolled, setUncontrolled] = useState(() =>
    snapSliderValue(defaultValue ?? min, min, max, step),
  );
  const [draft, setDraft] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const current = value ?? uncontrolled;
  const percent = sliderPercent(current, min, max);

  const commit = (next: number) => {
    if (next === current) {
      return;
    }
    if (value === undefined) {
      setUncontrolled(next);
    }
    onChange?.(next);
  };

  const moveTo = (clientX: number) => {
    const position = percentFromPointer(trackRef.current, clientX);
    if (position != null) {
      commit(sliderValueFromPercent(position, min, max, step));
    }
  };

  return (
    <>
      {label != null && (
        <label className="m2012-label" htmlFor={inputId} id={labelId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="number"
        name={name}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={draft ?? String(current)}
        onChange={(event) => {
          setDraft(event.target.value);
          const typed = parseFloat(event.target.value);
          if (!Number.isNaN(typed) && typed >= min && typed <= max) {
            commit(snapSliderValue(typed, min, max, step));
          }
        }}
        onBlur={() => setDraft(null)}
        className={cx(
          "m2012-slider-input m2012-input-text m2012-surface-body m2012-corner-all m2012-shadow-inset",
          mini && "m2012-mini",
          disabled && "m2012-disabled",
        )}
        data-m2012-theme={theme}
      />
      <div
        ref={trackRef}
        className={cx(
          "m2012-slider m2012-surface-btn-down m2012-btn-corner-all",
          mini && "m2012-slider-mini",
          inline && "m2012-slider-inline",
          disabled && "m2012-disabled",
          className,
        )}
        data-m2012-theme={trackTheme}
        onPointerDown={(event) => {
          if (disabled) {
            return;
          }
          event.preventDefault();
          capturePointer(event);
          setDragging(true);
          moveTo(event.clientX);
          handleRef.current?.focus();
        }}
        onPointerMove={(event) => {
          if (dragging) {
            moveTo(event.clientX);
          }
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {highlight && (
          <div
            className="m2012-slider-bg m2012-btn-active m2012-btn-corner-all"
            style={{ width: `${percent}%` }}
          />
        )}
        <span
          ref={handleRef}
          className={handleClassName(disabled)}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-labelledby={label != null ? labelId : undefined}
          aria-disabled={disabled || undefined}
          title={String(current)}
          style={{ left: `${percent}%` }}
          data-m2012-theme={theme}
          onKeyDown={(event) => {
            if (disabled) {
              return;
            }
            const next = sliderValueFromKey(event.key, current, min, max, step);
            if (next != null) {
              event.preventDefault();
              commit(next);
            }
          }}
        >
          <HandleInner />
        </span>
      </div>
    </>
  );
};

// ---------------------------------------------------------------------------
// FlipSwitch（select[data-role=slider]）
// ---------------------------------------------------------------------------
export type FlipSwitchProps = SliderCommonProps & {
  /** ON のときのラベル。既定は "On" */
  onLabel?: React.ReactNode;
  /** OFF のときのラベル。既定は "Off" */
  offLabel?: React.ReactNode;
  /** ON か（制御する場合） */
  checked?: boolean;
  /** 最初に ON にしておくか */
  defaultChecked?: boolean;
  /** 切り替わったとき */
  onChange?: (checked: boolean) => void;
  /** フォーム送信時の値。既定は "on" / "off" */
  onValue?: string;
  offValue?: string;
};

type Drag = {
  /** ドラッグを始めたときの状態 */
  start: boolean;
  moved: boolean;
  percent: number;
  /** つまみの幅がトラックの何 % か */
  handlePercent: number;
};

/**
 * ON / OFF を切り替えるスイッチ。タップで切り替え、ドラッグでは中央を越えて離したときだけ切り替わる
 */
export const FlipSwitch = ({
  label,
  onLabel = "On",
  offLabel = "Off",
  checked,
  defaultChecked = false,
  onChange,
  onValue = "on",
  offValue = "off",
  mini = false,
  theme,
  trackTheme,
  disabled,
  name,
  id,
  className,
}: FlipSwitchProps) => {
  const handleId = useFieldId(id);
  const labelId = `${handleId}-label`;
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const [drag, setDrag] = useState<Drag | null>(null);
  const current = checked ?? uncontrolled;

  const percent = drag ? drag.percent : current ? 100 : 0;
  const widths = flipSwitchLabelWidths(percent, drag?.handlePercent ?? 0);

  const commit = (next: boolean) => {
    if (next === current) {
      return;
    }
    if (checked === undefined) {
      setUncontrolled(next);
    }
    onChange?.(next);
  };

  return (
    <>
      {label != null && (
        <label className="m2012-label" id={labelId} onClick={() => handleRef.current?.focus()}>
          {label}
        </label>
      )}
      {name != null && <input type="hidden" name={name} value={current ? onValue : offValue} />}
      <div
        ref={trackRef}
        className={cx(
          "m2012-slider m2012-slider-switch m2012-surface-btn-down m2012-btn-corner-all",
          mini && "m2012-slider-mini",
          disabled && "m2012-disabled",
          className,
        )}
        data-m2012-theme={trackTheme}
        onPointerDown={(event) => {
          const position = percentFromPointer(trackRef.current, event.clientX);
          if (disabled || position == null) {
            return;
          }
          event.preventDefault();
          capturePointer(event);
          const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
          const handleWidth = handleRef.current?.offsetWidth ?? 0;
          setDrag({
            start: current,
            moved: false,
            percent: position,
            handlePercent: trackWidth ? (handleWidth / trackWidth) * 100 : 0,
          });
          handleRef.current?.focus();
        }}
        onPointerMove={(event) => {
          const position = percentFromPointer(trackRef.current, event.clientX);
          if (drag && position != null) {
            setDrag({ ...drag, moved: true, percent: position });
          }
        }}
        onPointerUp={() => {
          if (!drag) {
            return;
          }
          // タップなら切り替え、ドラッグなら中央を越えて離したときだけ切り替える
          const toggled = !drag.moved || drag.percent >= 50 !== drag.start;
          setDrag(null);
          if (toggled) {
            commit(!drag.start);
          }
        }}
        onPointerCancel={() => setDrag(null)}
      >
        <span
          className="m2012-slider-label m2012-slider-label-a m2012-btn-active m2012-btn-corner-all"
          style={{ width: `${widths.on}%` }}
          aria-hidden="true"
        >
          {onLabel}
        </span>
        <span
          className="m2012-slider-label m2012-slider-label-b m2012-surface-btn-down m2012-btn-corner-all"
          style={{ width: `${widths.off}%` }}
          aria-hidden="true"
        >
          {offLabel}
        </span>
        <div className="m2012-slider-inneroffset">
          <span
            ref={handleRef}
            id={handleId}
            className={cx(handleClassName(disabled), !drag && "m2012-slider-handle-snapping")}
            role="switch"
            tabIndex={disabled ? -1 : 0}
            aria-checked={current}
            aria-labelledby={label != null ? labelId : undefined}
            aria-disabled={disabled || undefined}
            title={textOf(current ? onLabel : offLabel)}
            style={{ left: `${percent}%` }}
            data-m2012-theme={theme}
            onKeyDown={(event) => {
              if (disabled) {
                return;
              }
              const next = keyToChecked(event.key, current);
              if (next != null) {
                event.preventDefault();
                commit(next);
              }
            }}
          >
            <HandleInner />
          </span>
        </div>
      </div>
    </>
  );
};

const keyToChecked = (key: string, current: boolean): boolean | null => {
  switch (key) {
    case " ":
    case "Enter":
      return !current;
    case "ArrowRight":
    case "ArrowUp":
    case "End":
      return true;
    case "ArrowLeft":
    case "ArrowDown":
    case "Home":
      return false;
    default:
      return null;
  }
};

const textOf = (node: React.ReactNode): string | undefined =>
  typeof node === "string" || typeof node === "number" ? String(node) : undefined;
