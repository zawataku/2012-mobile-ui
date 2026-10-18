import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Grid } from ".";

const meta = {
  title: "Components/Grid",
  component: Grid,
  argTypes: {
    columns: { control: "inline-radio", options: [undefined, 1, 2, 3, 4, 5] },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

// docs/content/content-grids.html と同じく、ブロックの範囲が見えるよう bar surface（swatch e）を付ける
const block = (label: string) => (
  <div className="m2012-bar m2012-surface-bar" data-m2012-theme="e" style={{ height: 120 }}>
    {label}
  </div>
);

/** 2〜5 列（docs/content/content-grids.html） */
export const Columns: Story = {
  render: () => (
    <>
      {[2, 3, 4, 5].map((count) => (
        <div key={count} style={{ marginBottom: 16 }}>
          <Grid>{["A", "B", "C", "D", "E"].slice(0, count).map(block)}</Grid>
        </div>
      ))}
    </>
  ),
};

/** 列数を指定すると、行が埋まったところで折り返す */
export const MultipleRows: Story = {
  render: () => <Grid columns={3}>{["A", "B", "C", "A", "B", "C", "A"].map(block)}</Grid>,
};

/** グリッド内のボタン（docs/content/content-grids.html） */
export const Buttons: Story = {
  render: () => (
    <>
      <Grid>
        <Button>Cancel</Button>
        <Button theme="b">Submit</Button>
      </Grid>
      <Grid>
        <Button>Hmm</Button>
        <Button theme="a">No</Button>
        <Button theme="b">Yes</Button>
      </Grid>
      <Grid columns={1}>
        <Button theme="b">More</Button>
      </Grid>
    </>
  ),
};
