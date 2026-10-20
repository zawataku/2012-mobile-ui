import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { THEMES } from "../../core";
import { Button } from "../Button";
import { FieldContain, TextInput } from "../Form";
import { Listview, ListviewDivider, ListviewItem } from "../Listview";
import { Loader } from "../Loader";
import { Dialog, Popup } from ".";
import type { PopupProps } from ".";

const meta = {
  title: "Components/Popup",
  component: Popup,
  subcomponents: { Dialog, Loader },
  args: {
    open: false,
  },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ボタンを押すとその場所にポップアップを開く
const PopupButton = ({
  label,
  popup,
}: {
  label: string;
  popup: Omit<PopupProps, "open" | "onClose" | "positionTo">;
}) => {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={anchor} inline onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Popup {...popup} open={open} onClose={() => setOpen(false)} positionTo={anchor} />
    </>
  );
};

/** ツールチップ（docs/pages/popup/index.html） */
export const Tooltip: Story = {
  render: () => (
    <PopupButton
      label="Tooltip"
      popup={{ padded: true, theme: "e", children: <p>This is a completely basic popup, no options set.</p> }}
    />
  ),
};

/** メニュー（Listview を入れる） */
export const Menu: Story = {
  render: () => (
    <PopupButton
      label="Menu"
      popup={{
        transition: "pop",
        children: (
          <div style={{ minWidth: 210 }}>
            <Listview inset>
              <ListviewDivider>Choose an action</ListviewDivider>
              <ListviewItem href="#">View details</ListviewItem>
              <ListviewItem href="#">Edit</ListviewItem>
              <ListviewItem href="#">Disable</ListviewItem>
              <ListviewItem href="#">Delete</ListviewItem>
            </Listview>
          </div>
        ),
      }}
    />
  ),
};

/** フォーム（閉じるボタン付き） */
export const Form: Story = {
  render: () => (
    <PopupButton
      label="Login"
      popup={{
        theme: "a",
        overlayTheme: "b",
        closeButton: "right",
        transition: "pop",
        padded: true,
        children: (
          <div style={{ padding: "10px 20px" }}>
            <h3>Please sign in</h3>
            <FieldContain hideLabel>
              <TextInput label="Username:" placeholder="username" />
            </FieldContain>
            <FieldContain hideLabel>
              <TextInput label="Password:" type="password" placeholder="password" />
            </FieldContain>
            <Button theme="b" icon="check">
              Sign in
            </Button>
          </div>
        ),
      }}
    />
  ),
};

/** 背景の swatch（data-overlay-theme） */
export const OverlayThemes: Story = {
  render: () => (
    <>
      {THEMES.map((theme) => (
        <PopupButton
          key={theme}
          label={`Overlay ${theme}`}
          popup={{
            overlayTheme: theme,
            transition: "fade",
            padded: true,
            closeButton: "left",
            children: <p>overlayTheme="{theme}"</p>,
          }}
        />
      ))}
    </>
  ),
};

/** 画面の中央に開く（positionTo="window"） */
export const CenteredInWindow: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button inline onClick={() => setOpen(true)}>
          Open in center
        </Button>
        <Popup open={open} onClose={() => setOpen(false)} overlayTheme="a" transition="pop" padded>
          <p>Escape キーか背景のタップで閉じます。</p>
        </Popup>
      </>
    );
  },
};

/** ダイアログ（docs/pages/dialog.html） */
export const DialogPage: Story = {
  name: "Dialog",
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button inline onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Delete page?">
          <h3>Are you sure you want to delete this page?</h3>
          <p>This action cannot be undone.</p>
          <Button theme="b" onClick={() => setOpen(false)}>
            Sounds good
          </Button>
          <Button theme="c" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Dialog>
      </>
    );
  },
};

/** 読み込み中の表示（docs/pages/loader.html） */
export const Loaders: Story = {
  render: function Render() {
    const [mode, setMode] = useState<"none" | "default" | "verbose" | "textonly">("none");
    return (
      <>
        <Button inline onClick={() => setMode("default")}>
          Default
        </Button>
        <Button inline onClick={() => setMode("verbose")}>
          With text
        </Button>
        <Button inline onClick={() => setMode("textonly")}>
          Text only
        </Button>
        <Button inline onClick={() => setMode("none")}>
          Hide
        </Button>
        <Loader
          visible={mode !== "none"}
          text="Loading..."
          textVisible={mode === "verbose"}
          textonly={mode === "textonly"}
        />
      </>
    );
  },
};
