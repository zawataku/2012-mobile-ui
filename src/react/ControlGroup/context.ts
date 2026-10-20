import { createContext, useContext } from "react";

type ControlGroupContextValue = {
  type: "vertical" | "horizontal";
  mini: boolean;
};

export const ControlGroupContext = createContext<ControlGroupContextValue | null>(null);

/** 囲んでいる ControlGroup の向きと mini（チェックボックス・ラジオが使う）。外なら null */
export const useControlGroup = () => useContext(ControlGroupContext);
