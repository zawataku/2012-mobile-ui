import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ControlGroup } from "../ControlGroup";
import { Checkbox, FieldContain, FlipSwitch, Radio, Select, Slider, TextInput, Textarea } from ".";

describe("FieldContain", () => {
  it("区切り線付きの入れ物になり、hideLabel でラベルを隠す class を付ける", () => {
    const { container } = render(<FieldContain hideLabel />);
    expect(container.firstElementChild).toHaveClass(
      "m2012-field-contain",
      "m2012-body",
      "m2012-br",
      "m2012-hide-label",
    );
  });
});

describe("TextInput", () => {
  it("ラベルと入力欄を結び付ける", () => {
    render(<TextInput label="Name" mini theme="e" />);
    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveClass("m2012-input-text", "m2012-surface-body", "m2012-mini");
    expect(input).toHaveAttribute("data-m2012-theme", "e");
  });

  it("search では入力があるときだけ消去ボタンを出し、押すと空にする", () => {
    const onChange = vi.fn();
    render(<TextInput label="Search" type="search" defaultValue="abc" onChange={onChange} />);
    const input = screen.getByLabelText<HTMLInputElement>("Search");
    const clear = screen.getByRole("button", { name: "clear text" });
    expect(input.parentElement).toHaveClass("m2012-input-search", "m2012-icon-searchfield");
    expect(clear).not.toHaveClass("m2012-input-clear-hidden");

    fireEvent.click(clear);
    expect(input.value).toBe("");
    expect(onChange).toHaveBeenCalled();
    expect(clear).toHaveClass("m2012-input-clear-hidden");
    expect(input).toHaveFocus();

    fireEvent.change(input, { target: { value: "x" } });
    expect(clear).not.toHaveClass("m2012-input-clear-hidden");
  });

  it("制御された search でも消去を onChange で知らせる", () => {
    const values: string[] = [];
    render(
      <TextInput
        type="search"
        aria-label="Search"
        value="abc"
        onChange={(event) => values.push(event.target.value)}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "clear text" }));
    expect(values).toEqual([""]);
  });
});

describe("Textarea", () => {
  it("ラベルと結び付き、入力欄の class を持つ", () => {
    render(<Textarea label="Comment" />);
    expect(screen.getByLabelText("Comment")).toHaveClass("m2012-input-text", "m2012-corner-all");
  });
});

describe("Checkbox / Radio", () => {
  it("ラベルをアイコン付きのボタンにする", () => {
    render(<Checkbox label="Agree" />);
    const input = screen.getByLabelText("Agree");
    expect(input).toHaveAttribute("type", "checkbox");
    const label = input.nextElementSibling;
    expect(label).toHaveClass("m2012-btn", "m2012-btn-icon-left", "m2012-btn-corner-all");
    expect(label).not.toHaveClass("m2012-shadow");
    expect(label?.querySelector(".m2012-icon")).toHaveClass("m2012-icon-checkbox-off");
    expect(input.parentElement).toHaveClass("m2012-checkbox");
  });

  it("横並びの ControlGroup ではアイコンを出さず、mini を受け継ぐ", () => {
    render(
      <ControlGroup type="horizontal" mini>
        <Radio label="List" name="view" />
        <Radio label="Grid" name="view" />
      </ControlGroup>,
    );
    const label = screen.getByLabelText("List").nextElementSibling;
    expect(label?.querySelector(".m2012-icon")).not.toBeInTheDocument();
    expect(label).toHaveClass("m2012-mini");
  });

  it("通常の input と同じく checked と onChange が使える", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Agree" onChange={onChange} />);
    fireEvent.click(screen.getByText("Agree"));
    expect(screen.getByLabelText("Agree")).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe("Select", () => {
  const options = (
    <>
      <option value="a">Apple</option>
      <optgroup label="More">
        <option value="b">Banana</option>
      </optgroup>
    </>
  );

  it("選択中の項目をボタンに表示し、変更に追従する", () => {
    render(<Select label="Fruit">{options}</Select>);
    const select = screen.getByLabelText("Fruit");
    const button = select.parentElement!;
    expect(button).toHaveClass("m2012-btn", "m2012-btn-icon-right");
    expect(button).toHaveTextContent("Apple");
    expect(button.querySelector(".m2012-icon")).toHaveClass("m2012-icon-arrow-d");

    fireEvent.change(select, { target: { value: "b" } });
    expect(button).toHaveTextContent("Banana");
  });

  it("<option> を別のコンポーネントで包んでも項目名を表示する", () => {
    const Options = () => (
      <>
        <option value="x">Xylophone</option>
        <option value="y">Yo-yo</option>
      </>
    );
    render(
      <Select label="Toy" defaultValue="y">
        <Options />
      </Select>,
    );
    expect(screen.getByLabelText("Toy").parentElement).toHaveTextContent("Yo-yo");
  });

  it("制御された value を表示する", () => {
    render(
      <Select label="Fruit" value="b" onChange={() => {}}>
        {options}
      </Select>,
    );
    expect(screen.getByLabelText("Fruit").parentElement).toHaveTextContent("Banana");
  });
});

describe("Slider", () => {
  it("キー操作と数値の入力欄で値を変える", () => {
    const onChange = vi.fn();
    render(<Slider label="Volume" defaultValue={50} step={10} onChange={onChange} />);
    const handle = screen.getByRole("slider");
    expect(handle).toHaveAttribute("aria-valuenow", "50");
    expect(handle).toHaveStyle({ left: "50%" });

    fireEvent.keyDown(handle, { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith(60);
    expect(handle).toHaveAttribute("aria-valuenow", "60");

    const input = screen.getByRole("spinbutton", { name: "Volume" });
    fireEvent.change(input, { target: { value: "20" } });
    expect(handle).toHaveAttribute("aria-valuenow", "20");
  });

  it("トラックのタップ位置に値を合わせる", () => {
    render(<Slider label="Volume" />);
    const track = screen.getByRole("slider").parentElement!;
    track.getBoundingClientRect = () => ({ left: 0, width: 200 }) as DOMRect;
    fireEvent.pointerDown(track, { clientX: 150, pointerId: 1 });
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
  });

  it("無効なときは操作できない", () => {
    render(<Slider label="Volume" disabled defaultValue={10} />);
    const handle = screen.getByRole("slider");
    fireEvent.keyDown(handle, { key: "ArrowRight" });
    expect(handle).toHaveAttribute("aria-valuenow", "10");
    expect(handle.parentElement).toHaveClass("m2012-disabled");
  });
});

describe("FlipSwitch", () => {
  it("タップとキー操作で切り替える", () => {
    const onChange = vi.fn();
    render(<FlipSwitch label="Wi-Fi" onChange={onChange} name="wifi" />);
    const handle = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(handle).toHaveAttribute("aria-checked", "false");

    const track = handle.closest(".m2012-slider-switch") as HTMLElement;
    track.getBoundingClientRect = () => ({ left: 0, width: 100 }) as DOMRect;
    fireEvent.pointerDown(track, { clientX: 10, pointerId: 1 });
    fireEvent.pointerUp(track, { pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(handle).toHaveAttribute("aria-checked", "true");
    expect(document.querySelector('input[name="wifi"]')).toHaveValue("on");

    fireEvent.keyDown(handle, { key: " " });
    expect(handle).toHaveAttribute("aria-checked", "false");
  });

  it("ドラッグは中央を越えて離したときだけ切り替える", () => {
    render(<FlipSwitch label="Wi-Fi" />);
    const handle = screen.getByRole("switch");
    const track = handle.closest(".m2012-slider-switch") as HTMLElement;
    track.getBoundingClientRect = () => ({ left: 0, width: 100 }) as DOMRect;

    fireEvent.pointerDown(track, { clientX: 5, pointerId: 1 });
    fireEvent.pointerMove(track, { clientX: 30, pointerId: 1 });
    fireEvent.pointerUp(track, { pointerId: 1 });
    expect(handle).toHaveAttribute("aria-checked", "false");

    fireEvent.pointerDown(track, { clientX: 5, pointerId: 1 });
    fireEvent.pointerMove(track, { clientX: 80, pointerId: 1 });
    fireEvent.pointerUp(track, { pointerId: 1 });
    expect(handle).toHaveAttribute("aria-checked", "true");
  });

  it("ON / OFF でラベルの幅を切り替える", () => {
    render(<FlipSwitch label="Wi-Fi" defaultChecked />);
    expect(screen.getByText("On")).toHaveStyle({ width: "100%" });
    expect(screen.getByText("Off")).toHaveStyle({ width: "0%" });
  });
});
