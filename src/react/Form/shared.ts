import { useId } from "react";
import type React from "react";

/** id が指定されていなければ生成する（ラベルと入力欄を結び付けるため） */
export const useFieldId = (id?: string): string => {
  const generated = useId();
  return id ?? generated;
};

/** 複数の ref に同じ要素を渡す */
export const mergeRefs =
  <T>(...refs: Array<React.Ref<T> | undefined>) =>
  (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }
  };

/** ネイティブの setter で値を書き換え、React の onChange が発火する input イベントを送る */
export const setNativeValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};
