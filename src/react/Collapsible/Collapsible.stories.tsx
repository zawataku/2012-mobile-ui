import type { Meta, StoryObj } from "@storybook/react-vite";
import { ICON_NAMES, ICON_POSITIONS, THEMES } from "../../core";
import { Listview, ListviewItem } from "../Listview";
import { Collapsible, CollapsibleSet } from ".";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  subcomponents: { CollapsibleSet },
  args: {
    heading: "I'm a header",
    inset: true,
    mini: false,
    defaultCollapsed: true,
  },
  argTypes: {
    theme: { control: "inline-radio", options: [undefined, ...THEMES] },
    contentTheme: { control: "inline-radio", options: [undefined, ...THEMES] },
    iconpos: { control: "inline-radio", options: [undefined, ...ICON_POSITIONS] },
    collapsedIcon: { control: "select", options: [undefined, ...ICON_NAMES] },
    expandedIcon: { control: "select", options: [undefined, ...ICON_NAMES] },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = (
  <p>
    I'm the collapsible content. By default I'm closed, but you can click the header to open me.
  </p>
);

/** 基本（docs/content/content-collapsible.html） */
export const Default: Story = {
  render: (args) => <Collapsible {...args}>{text}</Collapsible>,
};

/** 最初から開いている */
export const Expanded: Story = {
  ...Default,
  args: { defaultCollapsed: false },
};

/** swatch と中身の swatch（docs/content/content-collapsible.html） */
export const Themes: Story = {
  render: (args) => (
    <>
      {THEMES.map((theme) => (
        <Collapsible
          key={theme}
          {...args}
          heading={`theme="${theme}" contentTheme="${theme}"`}
          theme={theme}
          contentTheme={theme}
          defaultCollapsed={false}
        >
          {text}
        </Collapsible>
      ))}
    </>
  ),
};

/** アイコンとその位置・mini・inset なし */
export const Variations: Story = {
  render: (args) => (
    <>
      <Collapsible {...args} heading="Custom icons" collapsedIcon="arrow-r" expandedIcon="arrow-d">
        {text}
      </Collapsible>
      <Collapsible {...args} heading="Icon right" iconpos="right">
        {text}
      </Collapsible>
      <Collapsible {...args} heading="Mini" mini>
        {text}
      </Collapsible>
      <Collapsible {...args} heading="Not inset" inset={false} contentTheme="c">
        {text}
      </Collapsible>
    </>
  ),
};

/** 中にリスト */
export const WithListview: Story = {
  render: (args) => (
    <Collapsible {...args} heading="Pets" contentTheme="c" defaultCollapsed={false}>
      <Listview>
        <ListviewItem href="#">Canary</ListviewItem>
        <ListviewItem href="#">Cat</ListviewItem>
        <ListviewItem href="#">Dog</ListviewItem>
      </Listview>
    </Collapsible>
  ),
};

/** セット: 1 つ開くとほかは閉じる（docs/content/content-collapsible-set.html） */
export const Set: Story = {
  render: () => (
    <>
      <CollapsibleSet>
        <Collapsible heading="Section 1" defaultCollapsed={false}>
          {text}
        </Collapsible>
        <Collapsible heading="Section 2">{text}</Collapsible>
        <Collapsible heading="Section 3">{text}</Collapsible>
      </CollapsibleSet>
      <CollapsibleSet theme="b" contentTheme="d">
        <Collapsible heading="Themed set 1">{text}</Collapsible>
        <Collapsible heading="Themed set 2">{text}</Collapsible>
        <Collapsible heading="Themed set 3" defaultCollapsed={false}>
          {text}
        </Collapsible>
      </CollapsibleSet>
      <CollapsibleSet inset={false} contentTheme="c" iconpos="right" mini>
        <Collapsible heading="Not inset, mini">{text}</Collapsible>
        <Collapsible heading="Icon right">{text}</Collapsible>
      </CollapsibleSet>
    </>
  ),
};
