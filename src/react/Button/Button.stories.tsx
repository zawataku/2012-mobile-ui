import type { Meta, StoryObj } from "@storybook/react-vite";
import { ICON_NAMES, ICON_POSITIONS, THEMES } from "../../core";
import { Button } from ".";
import type { ButtonProps } from ".";

// Controls の値のうち、<a> にも <button> にも渡せる見た目の props だけを取り出す
const styleArgs = ({
  icon,
  iconpos,
  theme,
  inline,
  mini,
  corners,
  shadow,
  iconshadow,
  active,
  disabled,
}: ButtonProps) => ({ icon, iconpos, theme, inline, mini, corners, shadow, iconshadow, active, disabled });

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    corners: true,
    shadow: true,
    iconshadow: true,
    active: false,
    disabled: false,
  },
  argTypes: {
    icon: { control: "select", options: [undefined, ...ICON_NAMES] },
    iconpos: { control: "inline-radio", options: [undefined, ...ICON_POSITIONS] },
    theme: { control: "inline-radio", options: [undefined, ...THEMES] },
    inline: { control: "inline-radio", options: [undefined, true, false] },
    mini: { control: "inline-radio", options: [undefined, true, false] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** リンク・button 要素・送信ボタン（docs/buttons/buttons-types.html） */
export const Types: Story = {
  render: (args) => (
    <>
      <Button {...styleArgs(args)} href="#">
        Link button
      </Button>
      <Button {...styleArgs(args)}>Button element</Button>
      <Button {...styleArgs(args)} type="submit">
        Submit
      </Button>
      <Button {...styleArgs(args)} type="reset">
        Reset
      </Button>
    </>
  ),
};

/** アイコン（docs/buttons/buttons-icons.html） */
export const Icons: Story = {
  render: (args) => (
    <>
      {ICON_NAMES.filter((name) => !/^(checkbox|radio)-/.test(name)).map((name) => (
        <Button key={name} {...styleArgs(args)} icon={name} inline>
          {name}
        </Button>
      ))}
    </>
  ),
};

/** アイコンの位置（docs/buttons/buttons-icons.html） */
export const IconPositions: Story = {
  render: (args) => (
    <>
      <Button {...styleArgs(args)} icon="arrow-l" iconpos="left">
        Left
      </Button>
      <Button {...styleArgs(args)} icon="arrow-r" iconpos="right">
        Right
      </Button>
      <Button {...styleArgs(args)} icon="arrow-u" iconpos="top">
        Top
      </Button>
      <Button {...styleArgs(args)} icon="arrow-d" iconpos="bottom">
        Bottom
      </Button>
      <Button {...styleArgs(args)} icon="delete" iconpos="notext">
        Delete
      </Button>
    </>
  ),
};

/** inline（docs/buttons/buttons-inline.html） */
export const Inline: Story = {
  render: (args) => (
    <>
      <Button {...styleArgs(args)} inline href="#">
        Cancel
      </Button>
      <Button {...styleArgs(args)} inline theme="b" href="#">
        Save
      </Button>
      <br />
      <Button {...styleArgs(args)} inline icon="delete">
        Cancel
      </Button>
      <Button {...styleArgs(args)} inline icon="check" theme="b">
        Save
      </Button>
    </>
  ),
};

/** mini（docs/buttons/buttons-types.html） */
export const Mini: Story = {
  render: (args) => (
    <>
      <Button {...styleArgs(args)} mini>
        Mini
      </Button>
      <Button {...styleArgs(args)} mini icon="gear">
        Mini with icon
      </Button>
      <Button {...styleArgs(args)} mini inline icon="star">
        Mini inline
      </Button>
      <Button {...styleArgs(args)} mini inline icon="check" iconpos="right">
        Mini inline
      </Button>
    </>
  ),
};

/** swatch（docs/buttons/buttons-themes.html） */
export const Themes: Story = {
  render: (args) => (
    <>
      {THEMES.map((theme) => (
        <Button key={theme} {...styleArgs(args)} theme={theme} icon="arrow-r" iconpos="right">
          Swatch {theme}
        </Button>
      ))}
    </>
  ),
};

/** active・無効状態 */
export const States: Story = {
  render: (args) => (
    <>
      <Button {...styleArgs(args)} active>
        Active
      </Button>
      <Button {...styleArgs(args)} disabled>
        Disabled button
      </Button>
      <Button {...styleArgs(args)} disabled href="#">
        Disabled link
      </Button>
    </>
  ),
};
