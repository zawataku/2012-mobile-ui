import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { ControlGroup } from ".";

const meta = {
  title: "Components/ControlGroup",
  component: ControlGroup,
  args: {
    type: "vertical",
    mini: false,
    shadow: false,
  },
  argTypes: {
    type: { control: "inline-radio", options: ["vertical", "horizontal"] },
  },
} satisfies Meta<typeof ControlGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 縦並び（docs/buttons/buttons-grouped.html） */
export const Vertical: Story = {
  render: (args) => (
    <ControlGroup {...args}>
      <Button href="#">Timeline</Button>
      <Button href="#">Mentions</Button>
      <Button href="#">Retweets</Button>
    </ControlGroup>
  ),
};

/** 横並び（docs/buttons/buttons-grouped.html） */
export const Horizontal: Story = {
  ...Vertical,
  args: { type: "horizontal" },
};

/** 見出し付き */
export const WithLegend: Story = {
  ...Vertical,
  args: { legend: "Timeline" },
};

/** mini */
export const Mini: Story = {
  render: (args) => (
    <>
      <ControlGroup {...args} mini type="horizontal">
        <Button href="#">Yes</Button>
        <Button href="#">No</Button>
        <Button href="#">Maybe</Button>
      </ControlGroup>
      <ControlGroup {...args} mini type="vertical">
        <Button href="#">Yes</Button>
        <Button href="#">No</Button>
        <Button href="#">Maybe</Button>
      </ControlGroup>
    </>
  ),
};

/** アイコン付き・アイコンのみ */
export const Icons: Story = {
  render: (args) => (
    <>
      <ControlGroup {...args} type="horizontal">
        <Button icon="arrow-u" iconpos="notext">
          Up
        </Button>
        <Button icon="arrow-d" iconpos="notext">
          Down
        </Button>
        <Button icon="delete" iconpos="notext">
          Delete
        </Button>
      </ControlGroup>
      <ControlGroup {...args} type="vertical">
        <Button icon="home">Home</Button>
        <Button icon="gear">Settings</Button>
        <Button icon="info" iconpos="right">
          About
        </Button>
      </ControlGroup>
    </>
  ),
};
