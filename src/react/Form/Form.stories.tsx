import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { THEMES } from "../../core";
import { ControlGroup } from "../ControlGroup";
import { Checkbox, FieldContain, FlipSwitch, Radio, Select, Slider, TextInput, Textarea } from ".";

const meta = {
  title: "Components/Forms",
  component: FieldContain,
  subcomponents: { TextInput, Textarea, Checkbox, Radio, Select, Slider, FlipSwitch },
} satisfies Meta<typeof FieldContain>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectOptions = () => (
  <>
    <option value="standard">Standard: 7 day</option>
    <option value="rush">Rush: 3 days</option>
    <option value="express">Express: next day</option>
    <option value="overnight">Overnight</option>
  </>
);

const AllFields = ({ mini }: { mini?: boolean }) => (
  <>
    <FieldContain>
      <TextInput label="Text Input:" name="name" defaultValue="" mini={mini} />
    </FieldContain>
    <FieldContain>
      <Textarea label="Textarea:" name="textarea" mini={mini} />
    </FieldContain>
    <FieldContain>
      <TextInput label="Search Input:" type="search" name="search" defaultValue="" mini={mini} />
    </FieldContain>
    <FieldContain>
      <FlipSwitch label="Flip switch:" name="slider" mini={mini} />
    </FieldContain>
    <FieldContain>
      <Slider label="Slider:" name="slider" defaultValue={0} min={0} max={100} mini={mini} />
    </FieldContain>
    <FieldContain>
      <ControlGroup legend="Choose as many snacks as you'd like:" mini={mini}>
        <Checkbox label="Cheetos" name="checkbox-1a" defaultChecked />
        <Checkbox label="Doritos" name="checkbox-2a" />
        <Checkbox label="Fritos" name="checkbox-3a" />
        <Checkbox label="Sun Chips" name="checkbox-4a" />
      </ControlGroup>
    </FieldContain>
    <FieldContain>
      <ControlGroup legend="Font styling:" type="horizontal" mini={mini}>
        <Checkbox label="b" name="checkbox-6" />
        <Checkbox label="i" name="checkbox-7" defaultChecked />
        <Checkbox label="u" name="checkbox-8" />
      </ControlGroup>
    </FieldContain>
    <FieldContain>
      <ControlGroup legend="Choose a pet:" mini={mini}>
        <Radio label="Cat" name="radio-choice-1" value="choice-1" defaultChecked />
        <Radio label="Dog" name="radio-choice-1" value="choice-2" />
        <Radio label="Hamster" name="radio-choice-1" value="choice-3" />
        <Radio label="Lizard" name="radio-choice-1" value="choice-4" />
      </ControlGroup>
    </FieldContain>
    <FieldContain>
      <ControlGroup legend="Layout view:" type="horizontal" mini={mini}>
        <Radio label="List" name="radio-choice-b" value="list" defaultChecked />
        <Radio label="Grid" name="radio-choice-b" value="grid" />
        <Radio label="Gallery" name="radio-choice-b" value="gallery" />
      </ControlGroup>
    </FieldContain>
    <FieldContain>
      <Select label="Choose shipping method:" name="select-choice-1" mini={mini}>
        <SelectOptions />
      </Select>
    </FieldContain>
  </>
);

/** すべてのフォーム部品（docs/forms/forms-all.html）。画面幅 450px 以上ではラベルが横に並ぶ */
export const All: Story = {
  render: () => <AllFields />,
};

/** mini（docs/forms/forms-all-mini.html） */
export const Mini: Story = {
  render: () => <AllFields mini />,
};

/** ラベルを見た目だけ隠す（ui-hide-label） */
export const HiddenLabels: Story = {
  render: () => (
    <>
      <FieldContain hideLabel>
        <TextInput label="Username:" placeholder="Username" />
      </FieldContain>
      <FieldContain hideLabel>
        <TextInput label="Search:" type="search" placeholder="Search" />
      </FieldContain>
    </>
  ),
};

/** テキスト入力の種類と無効状態 */
export const TextInputs: Story = {
  render: () => (
    <>
      <TextInput label="Password:" type="password" />
      <TextInput label="Number:" type="number" />
      <TextInput label="Email:" type="email" />
      <TextInput label="Disabled:" disabled defaultValue="Disabled" />
      <TextInput label="Search:" type="search" defaultValue="消去ボタンで消せます" />
    </>
  ),
};

/** チェックボックス・ラジオのアイコン位置と mini */
export const CheckboxesAndRadios: Story = {
  render: () => (
    <>
      <Checkbox label="I agree" />
      <Checkbox label="Icon right" iconpos="right" defaultChecked />
      <Checkbox label="Mini" mini />
      <Checkbox label="Disabled" disabled />
      <Radio label="Radio A" name="single" defaultChecked />
      <Radio label="Radio B" name="single" />
    </>
  ),
};

/** Select（optgroup・inline・無効状態） */
export const Selects: Story = {
  render: () => (
    <>
      <Select label="With optgroups:">
        <optgroup label="USPS">
          <option value="standard">Standard: 7 day</option>
          <option value="rush">Rush: 3 days</option>
        </optgroup>
        <optgroup label="FedEx">
          <option value="express">Express: next day</option>
          <option value="overnight">Overnight</option>
        </optgroup>
      </Select>
      <Select label="Inline:" inline defaultValue="rush">
        <SelectOptions />
      </Select>
      <Select label="Disabled:" disabled>
        <SelectOptions />
      </Select>
    </>
  ),
};

/** スライダー（step・highlight・制御） */
export const Sliders: Story = {
  render: function Render() {
    const [value, setValue] = useState(30);
    return (
      <>
        <Slider label="Highlight:" highlight defaultValue={60} />
        <Slider label={`Controlled (${value}):`} value={value} onChange={setValue} step={10} />
        <Slider label="Mini:" mini defaultValue={20} />
        <Slider label="Disabled:" disabled defaultValue={40} />
      </>
    );
  },
};

/** フリップスイッチ */
export const FlipSwitches: Story = {
  render: () => (
    <>
      <FlipSwitch label="Default:" />
      <FlipSwitch label="Yes/No:" onLabel="Yes" offLabel="No" defaultChecked />
      <FlipSwitch label="Mini:" mini />
      <FlipSwitch label="Disabled:" disabled />
    </>
  ),
};

/** swatch（docs/forms/forms-themes.html） */
export const Themes: Story = {
  render: () => (
    <>
      {THEMES.map((theme) => (
        <div key={theme} className="m2012-body m2012-surface-body" data-m2012-theme={theme}>
          <TextInput label={`Text (swatch ${theme}):`} />
          <Checkbox label="Checkbox" defaultChecked />
          <Slider label="Slider:" highlight defaultValue={50} />
        </div>
      ))}
    </>
  ),
};
