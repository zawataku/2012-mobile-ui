import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Dialog, Popup } from ".";
import { Loader } from "../Loader";

// jsdom の <dialog> は showModal を持たないので、open 属性で開く（コンポーネント側の代替処理）
const dialogOf = (text: string) => screen.getByText(text).closest("dialog") as HTMLDialogElement;

describe("Popup", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("閉じているときは何も描画しない", () => {
    const { container } = render(<Popup open={false}>中身</Popup>);
    expect(container).toBeEmptyDOMElement();
  });

  it("開くと <dialog> の中にポップアップを出す", () => {
    render(
      <Popup open theme="e" overlayTheme="a" padded>
        中身
      </Popup>,
    );
    const dialog = dialogOf("中身");
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveClass("m2012-popup-container");

    const popup = screen.getByText("中身");
    expect(popup).toHaveClass(
      "m2012-popup",
      "m2012-surface-body",
      "m2012-corner-all",
      "m2012-overlay-shadow",
      "m2012-content",
    );
    expect(popup).toHaveAttribute("data-m2012-theme", "e");

    const backdrop = dialog.querySelector(".m2012-popup-screen");
    expect(backdrop).toHaveClass("m2012-surface-overlay", "m2012-in");
    expect(backdrop).toHaveAttribute("data-m2012-theme", "a");
  });

  it("背景のタップ・Escape キー・閉じるボタンで onClose を呼ぶ", () => {
    const onClose = vi.fn();
    render(
      <Popup open onClose={onClose} closeButton="right">
        中身
      </Popup>,
    );
    const dialog = dialogOf("中身");

    fireEvent.click(dialog.querySelector(".m2012-popup-screen")!);
    fireEvent.keyDown(screen.getByText("中身"), { key: "Escape" });
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveClass("m2012-btn-right", "m2012-btn-icon-notext");
    fireEvent.click(close);
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("アニメーションがなければすぐに閉じる", () => {
    const { rerender } = render(<Popup open>中身</Popup>);
    rerender(<Popup open={false}>中身</Popup>);
    expect(screen.queryByText("中身")).not.toBeInTheDocument();
  });

  it("アニメーションがあれば閉じるアニメーションを待ってから取り除く", () => {
    const { rerender } = render(
      <Popup open transition="pop">
        中身
      </Popup>,
    );
    expect(screen.getByText("中身")).toHaveClass("m2012-pop", "m2012-in");

    rerender(
      <Popup open={false} transition="pop">
        中身
      </Popup>,
    );
    const popup = screen.getByText("中身");
    expect(popup).toHaveClass("m2012-pop", "m2012-out", "m2012-reverse");

    fireEvent.animationEnd(popup);
    expect(screen.queryByText("中身")).not.toBeInTheDocument();
  });

  it("指定した点を中心に、画面の余白の内側に置く", () => {
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(40);
    window.innerWidth = 400;
    window.innerHeight = 600;

    render(
      <Popup open positionTo={{ x: 200, y: 100 }}>
        中身
      </Popup>,
    );
    const dialog = dialogOf("中身");
    expect(dialog.style.left).toBe("150px");
    expect(dialog.style.top).toBe("80px");
    expect(dialog.style.maxWidth).toBe("370px");
  });
});

describe("Dialog", () => {
  it("ヘッダー・本文・フッターを持つ枠を出す", () => {
    render(
      <Dialog open title="Delete page?" footer={<span>フッター</span>}>
        本文
      </Dialog>,
    );
    const dialog = dialogOf("本文");
    expect(dialog).toHaveClass("m2012-dialog", "m2012-surface-overlay");
    expect(dialog).toHaveAttribute("data-m2012-theme", "a");
    expect(dialog).toHaveAccessibleName("Delete page?");

    expect(screen.getByRole("heading", { name: "Delete page?" }).parentElement).toHaveClass(
      "m2012-header",
      "m2012-corner-top",
    );
    const content = screen.getByText("本文");
    expect(content).toHaveClass("m2012-content", "m2012-surface-body");
    expect(content).toHaveAttribute("data-m2012-theme", "c");
    expect(screen.getByText("フッター").parentElement).toHaveClass("m2012-footer", "m2012-corner-bottom");
  });

  it("閉じるボタンで onClose を呼ぶ", () => {
    const onClose = vi.fn();
    render(
      <Dialog open title="Title" onClose={onClose}>
        本文
      </Dialog>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("フッターがなければ本文の下側を角丸にする", () => {
    render(
      <Dialog open title="Title">
        本文
      </Dialog>,
    );
    expect(screen.getByText("本文")).toHaveClass("m2012-corner-bottom");
  });
});

describe("Loader", () => {
  it("既定はスピナーのみで、テキストは読み上げに使う", () => {
    render(<Loader />);
    const loader = screen.getByRole("status");
    expect(loader).toHaveClass("m2012-loader", "m2012-loader-default");
    expect(loader).toHaveAttribute("data-m2012-theme", "a");
    expect(loader).toHaveTextContent("loading");
  });

  it("textVisible・textonly・visible を反映する", () => {
    const { rerender } = render(<Loader textVisible text="読み込み中" />);
    expect(screen.getByRole("status")).toHaveClass("m2012-loader-verbose");
    rerender(<Loader textonly />);
    expect(screen.getByRole("status")).toHaveClass("m2012-loader-verbose", "m2012-loader-textonly");
    rerender(<Loader visible={false} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("フォーカス", () => {
  it("閉じたら、開く前にフォーカスがあった要素に戻す", () => {
    const Example = ({ open }: { open: boolean }) => (
      <>
        <button type="button">Opener</button>
        <Popup open={open}>
          <button type="button">Inside</button>
        </Popup>
      </>
    );
    const { rerender } = render(<Example open={false} />);
    const opener = screen.getByRole("button", { name: "Opener" });
    opener.focus();

    rerender(<Example open />);
    screen.getByRole("button", { name: "Inside" }).focus();
    rerender(<Example open={false} />);
    expect(opener).toHaveFocus();
  });
});
