import type { Meta, StoryObj } from "@storybook/react-vite";
import { THEMES } from "../../core";
import { Listview, ListviewDivider, ListviewItem } from ".";

// サムネイル / アイコン用のプレースホルダ画像
const placeholder = (size: number, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="100%" height="100%" fill="${color}"/></svg>`,
  )}`;

const meta = {
  title: "Components/Listview",
  component: Listview,
  subcomponents: { ListviewItem, ListviewDivider },
  args: {
    inset: false,
  },
  argTypes: {
    theme: { control: "inline-radio", options: [undefined, ...THEMES] },
  },
} satisfies Meta<typeof Listview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 基本のリスト（docs/lists/lists-ul.html） */
export const Basic: Story = {
  render: (args) => (
    <Listview {...args}>
      <ListviewItem href="#">Acura</ListviewItem>
      <ListviewItem href="#">Audi</ListviewItem>
      <ListviewItem href="#">BMW</ListviewItem>
      <ListviewItem href="#">Cadillac</ListviewItem>
      <ListviewItem href="#">Ferrari</ListviewItem>
    </Listview>
  ),
};

/** inset（docs/lists/lists-inset.html） */
export const Inset: Story = {
  ...Basic,
  args: { inset: true },
};

/** 区切り（docs/lists/lists-divider.html） */
export const Dividers: Story = {
  render: (args) => (
    <Listview {...args}>
      <ListviewDivider>A</ListviewDivider>
      <ListviewItem href="#">Adam Kinkaid</ListviewItem>
      <ListviewItem href="#">Alex Wickerham</ListviewItem>
      <ListviewItem href="#">Avery Johnson</ListviewItem>
      <ListviewDivider>B</ListviewDivider>
      <ListviewItem href="#">Bob Cabot</ListviewItem>
      <ListviewDivider>C</ListviewDivider>
      <ListviewItem href="#">Caleb Booth</ListviewItem>
      <ListviewItem href="#">Christopher Adams</ListviewItem>
    </Listview>
  ),
};

/** count バブル（docs/lists/lists-count.html） */
export const Count: Story = {
  args: { inset: true },
  render: (args) => (
    <Listview {...args}>
      <ListviewDivider count={3}>Folders</ListviewDivider>
      <ListviewItem href="#" count={12}>
        Inbox
      </ListviewItem>
      <ListviewItem href="#" count={0}>
        Outbox
      </ListviewItem>
      <ListviewItem href="#" count={4}>
        Drafts
      </ListviewItem>
      <ListviewItem count={328}>Sent（読み取り専用）</ListviewItem>
    </Listview>
  ),
};

/** 見出し・説明・aside（docs/lists/lists-formatting.html） */
export const Formatting: Story = {
  render: (args) => (
    <Listview {...args}>
      <ListviewDivider count={2}>Friday, October 8, 2010</ListviewDivider>
      <ListviewItem
        href="#"
        heading="Stephen Weber"
        desc="You've been invited to a meeting at Filament Group in Boston, MA"
        aside="6:24 PM"
      />
      <ListviewItem
        href="#"
        heading="jQuery Team"
        desc="Boston Conference Planning"
        aside="9:18 AM"
      />
      <ListviewDivider count={1}>Thursday, October 7, 2010</ListviewDivider>
      <ListviewItem
        href="#"
        heading="Avery Walker"
        desc="Re: Dinner Tonight"
        aside="4:48 PM"
      />
    </Listview>
  ),
};

/** サムネイル（docs/lists/lists-thumbnails.html） */
export const Thumbnails: Story = {
  render: (args) => (
    <Listview {...args}>
      <ListviewItem
        href="#"
        thumb={placeholder(80, "#7a8b99")}
        heading="Broken Bells"
        desc="Broken Bells"
      />
      <ListviewItem
        href="#"
        thumb={placeholder(80, "#b5651d")}
        heading="Warning"
        desc="Hot Chip"
      />
      <ListviewItem
        href="#"
        thumb={placeholder(80, "#2e8b57")}
        heading="Wolfgang Amadeus Phoenix"
        desc="Phoenix"
      />
    </Listview>
  ),
};

/** 16px アイコン（docs/lists/lists-icons.html） */
export const Icons: Story = {
  args: { inset: true },
  render: (args) => (
    <Listview {...args}>
      <ListviewItem href="#" icon={placeholder(16, "#c00")} count={4}>
        France
      </ListviewItem>
      <ListviewItem href="#" icon={placeholder(16, "#00c")}>
        Germany
      </ListviewItem>
      <ListviewItem href="#" icon={placeholder(16, "#0a0")} count={10}>
        Great Britain
      </ListviewItem>
    </Listview>
  ),
};

/** 読み取り専用（docs/lists/lists-readonly.html） */
export const ReadOnly: Story = {
  render: (args) => (
    <Listview {...args}>
      <ListviewItem>The Godfather</ListviewItem>
      <ListviewItem>Inception</ListviewItem>
      <ListviewItem>The Good, the Bad and the Ugly</ListviewItem>
      <ListviewItem>Pulp Fiction</ListviewItem>
    </Listview>
  ),
};

/** swatch ごとの見た目（docs/lists/lists-themes.html） */
export const Themes: Story = {
  render: () => (
    <>
      {THEMES.map((theme) => (
        <Listview key={theme} inset theme={theme}>
          <ListviewDivider theme={theme}>swatch {theme}</ListviewDivider>
          <ListviewItem href="#" count={3}>
            リンク項目
          </ListviewItem>
          <ListviewItem>読み取り専用の項目</ListviewItem>
        </Listview>
      ))}
    </>
  ),
};
