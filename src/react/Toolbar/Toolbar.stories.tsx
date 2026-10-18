import type { Meta, StoryObj } from "@storybook/react-vite";
import { THEMES } from "../../core";
import { Button } from "../Button";
import { ControlGroup } from "../ControlGroup";
import { Navbar, NavbarItem } from "../Navbar";
import { Content, Page } from "../Page";
import { BackButton, Footer, Header } from ".";

const meta = {
  title: "Components/Toolbar",
  component: Header,
  subcomponents: { Footer, BackButton },
  parameters: { frame: "none" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/** ヘッダー（docs/toolbars/docs-headers.html） */
export const Headers: Story = {
  render: () => (
    <>
      <Header title="Page Title" />
      <br />
      <Header
        title="Edit Contact"
        left={<Button icon="delete">Cancel</Button>}
        right={
          <Button icon="check" theme="b">
            Save
          </Button>
        }
      />
      <br />
      <Header title="Page Title" right={<Button icon="gear">Options</Button>} />
      <br />
      <Header title="Page Title" left={<BackButton onClick={() => {}} />} />
      <br />
      <Header
        title="Page Title"
        left={
          <Button href="#" icon="home" iconpos="notext">
            Home
          </Button>
        }
        right={
          <Button href="#" icon="search" iconpos="notext">
            Search
          </Button>
        }
      />
      <br />
      <Header
        title="Full size buttons"
        left={<Button mini={false}>Cancel</Button>}
        right={<Button mini={false}>Save</Button>}
      />
    </>
  ),
};

/** ヘッダーの swatch（docs/toolbars/bars-themes.html） */
export const Themes: Story = {
  render: () => (
    <>
      {THEMES.map((theme) => (
        <div key={theme}>
          <Header
            theme={theme}
            title={`Header swatch ${theme}`}
            left={<Button icon="arrow-l">Back</Button>}
            right={<Button icon="gear">Options</Button>}
          />
          <br />
        </div>
      ))}
    </>
  ),
};

/** フッター（docs/toolbars/docs-footers.html） */
export const Footers: Story = {
  render: () => (
    <>
      <Footer title="Footer content" />
      <br />
      {/* jQuery Mobile と同じく、ボタンの間は空白文字で空ける */}
      <Footer padded>
        <Button inline icon="plus">
          Add
        </Button>{" "}
        <Button inline icon="arrow-u">
          Up
        </Button>{" "}
        <Button inline icon="arrow-d">
          Down
        </Button>
      </Footer>
      <br />
      <Footer padded>
        <ControlGroup type="horizontal">
          <Button icon="plus">Add</Button>
          <Button icon="arrow-u">Up</Button>
          <Button icon="arrow-d">Down</Button>
        </ControlGroup>
      </Footer>
    </>
  ),
};

/** ヘッダー・フッター内の Navbar（docs/toolbars/docs-navbar.html） */
export const WithNavbar: Story = {
  render: () => (
    <>
      <Header title="Page Title">
        <Navbar>
          <NavbarItem href="#" active>
            One
          </NavbarItem>
          <NavbarItem href="#">Two</NavbarItem>
          <NavbarItem href="#">Three</NavbarItem>
        </Navbar>
      </Header>
      <br />
      <Footer>
        <Navbar>
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
      </Footer>
    </>
  ),
};

const paragraphs = Array.from({ length: 30 }, (_, i) => (
  <p key={i}>
    {i + 1}. スクロールしてもヘッダーとフッターは画面に残ります。ボタンやリンク以外の場所をタップすると、
    ツールバーの表示・非表示が切り替わります。
  </p>
));

/** 固定ツールバー（docs/toolbars/bars-fixed.html） */
export const Fixed: Story = {
  render: () => (
    <Page>
      <Header fixed title="Fixed Header" left={<BackButton onClick={() => {}} />} />
      <Content>{paragraphs}</Content>
      <Footer fixed>
        <Navbar>
          <NavbarItem href="#" icon="home" active>
            Home
          </NavbarItem>
          <NavbarItem href="#" icon="search">
            Search
          </NavbarItem>
          <NavbarItem href="#" icon="gear">
            Setup
          </NavbarItem>
        </Navbar>
      </Footer>
    </Page>
  ),
};

/** 全画面ツールバー（docs/toolbars/bars-fullscreen.html）。タップで表示・非表示を切り替える */
export const Fullscreen: Story = {
  render: () => (
    <Page theme="a">
      <Header fixed fullscreen title="Photo Viewer" left={<BackButton onClick={() => {}} />} />
      <Content>
        <div
          style={{
            height: "150vh",
            background: "linear-gradient(160deg, #3a6186, #89253e)",
          }}
        />
      </Content>
      <Footer fixed fullscreen>
        <Navbar>
          <NavbarItem icon="arrow-l">Prev</NavbarItem>
          <NavbarItem icon="star">Fav</NavbarItem>
          <NavbarItem icon="arrow-r">Next</NavbarItem>
        </Navbar>
      </Footer>
    </Page>
  ),
};
