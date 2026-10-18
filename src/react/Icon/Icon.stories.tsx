import type { Meta, StoryObj } from "@storybook/react-vite";
import { ICON_NAMES } from "../../core";
import { Icon } from ".";

const meta = {
  title: "Foundations/Icon",
  component: Icon,
  args: {
    name: "arrow-r",
    shadow: false,
    alt: false,
  },
  argTypes: {
    name: { control: "select", options: ICON_NAMES },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 全アイコン（docs/buttons/buttons-icons.html） */
export const All: Story = {
  render: (args) => (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 12,
        margin: 0,
        padding: 0,
        listStyle: "none",
        fontFamily: "var(--m2012-font-family)",
        fontSize: 14,
      }}
    >
      {ICON_NAMES.map((name) => (
        <li key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon {...args} name={name} />
          {name}
        </li>
      ))}
    </ul>
  ),
};

/** 黒いアイコン（ui-icon-alt）。明るい背景の上で使う */
export const Alt: Story = {
  ...All,
  args: { alt: true },
  decorators: [
    (Story) => (
      <div style={{ padding: 12, background: "#fff" }}>
        <Story />
      </div>
    ),
  ],
};

/** 影付き（ui-icon-shadow）。ボタンの中では既定で付く */
export const Shadow: Story = {
  ...All,
  args: { shadow: true },
};
