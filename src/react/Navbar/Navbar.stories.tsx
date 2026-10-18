import type { Meta, StoryObj } from "@storybook/react-vite";
import { ICON_POSITIONS } from "../../core";
import { Navbar, NavbarItem } from ".";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  subcomponents: { NavbarItem },
  args: {
    iconpos: "top",
  },
  argTypes: {
    iconpos: { control: "inline-radio", options: ICON_POSITIONS },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const labels = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** 項目数に応じて 1〜5 列、6 個以上は 2 列（docs/toolbars/docs-navbar.html） */
export const Columns: Story = {
  render: (args) => (
    <>
      {[1, 2, 3, 4, 5, 10].map((count) => (
        <div key={count} style={{ marginBottom: 16 }}>
          <Navbar {...args}>
            {labels.slice(0, count).map((label, i) => (
              <NavbarItem key={label} href="#" active={i === 0}>
                {label}
              </NavbarItem>
            ))}
          </Navbar>
        </div>
      ))}
    </>
  ),
};

/** アイコン付き */
export const Icons: Story = {
  render: (args) => (
    <Navbar {...args}>
      <NavbarItem href="#" icon="grid" active>
        Summary
      </NavbarItem>
      <NavbarItem href="#" icon="star">
        Favs
      </NavbarItem>
      <NavbarItem href="#" icon="gear">
        Setup
      </NavbarItem>
    </Navbar>
  ),
};

/** アイコンの位置 */
export const IconPositions: Story = {
  render: () => (
    <>
      {(["top", "left", "right", "bottom"] as const).map((iconpos) => (
        <div key={iconpos} style={{ marginBottom: 16 }}>
          <Navbar iconpos={iconpos}>
            <NavbarItem href="#" icon="arrow-l">
              Prev
            </NavbarItem>
            <NavbarItem href="#" icon="home">
              Home
            </NavbarItem>
            <NavbarItem href="#" icon="arrow-r">
              Next
            </NavbarItem>
          </Navbar>
        </div>
      ))}
    </>
  ),
};
