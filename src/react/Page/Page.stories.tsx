import type { Meta, StoryObj } from "@storybook/react-vite";
import { THEMES } from "../../core";
import { Button } from "../Button";
import { Listview, ListviewItem } from "../Listview";
import { BackButton, Footer, Header } from "../Toolbar";
import { Content, Page } from ".";

const meta = {
  title: "Components/Page",
  component: Page,
  parameters: { frame: "none" },
  argTypes: {
    theme: { control: "inline-radio", options: THEMES },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

/** ページの基本構成（docs/pages/page-anatomy.html） */
export const Basic: Story = {
  render: (args) => (
    <Page {...args}>
      <Header
        title="Page Title"
        left={<BackButton onClick={() => {}} />}
        right={<Button icon="gear">Options</Button>}
      />
      <Content>
        <p>
          Page はヘッダー・コンテンツ・フッターをまとめる 1 画面分の入れ物です。
          どのページを表示するかは、利用側のルーターに任せます。
        </p>
        <Button theme="b" icon="arrow-r" iconpos="right">
          Next
        </Button>
        <Listview inset>
          <ListviewItem href="#">Inset list</ListviewItem>
          <ListviewItem href="#">Inside content</ListviewItem>
        </Listview>
        <p>Content の中の inset でないリストは、左右の余白を打ち消して端まで広がります。</p>
        <Listview>
          <ListviewItem href="#">Full width list</ListviewItem>
          <ListviewItem href="#">Inside content</ListviewItem>
        </Listview>
      </Content>
      <Footer title="Page Footer" />
    </Page>
  ),
};

/** ページ・コンテンツの swatch（docs/pages/pages-themes.html） */
export const Themes: Story = {
  render: () => (
    <>
      {THEMES.map((theme) => (
        <Page key={theme} theme={theme} style={{ minHeight: 0 }}>
          <Header title={`Page swatch ${theme}`} theme={theme} />
          <Content>
            <p>
              本文のテキストです。<a className="m2012-link" href="#">リンク</a>
            </p>
            <Button inline icon="star">
              Button
            </Button>
          </Content>
        </Page>
      ))}
    </>
  ),
};
