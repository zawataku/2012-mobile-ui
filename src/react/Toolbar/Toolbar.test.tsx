import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "../Button";
import { Content, Page } from "../Page";
import { BackButton, Footer, Header } from ".";

describe("Header", () => {
  it("banner ランドマークになり、既定で swatch a になる", () => {
    render(<Header title="Title" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("m2012-header", "m2012-surface-bar");
    expect(header).toHaveAttribute("data-m2012-theme", "a");
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toHaveClass("m2012-title");
  });

  it("左右の要素を ui-btn-left / ui-btn-right の位置に置く", () => {
    render(
      <Header
        title="Title"
        left={<Button>Cancel</Button>}
        right={<Button>Save</Button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Cancel" }).parentElement).toHaveClass(
      "m2012-btn-left",
    );
    expect(screen.getByRole("button", { name: "Save" }).parentElement).toHaveClass(
      "m2012-btn-right",
    );
  });

  it("theme と className を反映する", () => {
    render(<Header theme="b" className="extra" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-m2012-theme", "b");
    expect(header).toHaveClass("extra");
  });
});

describe("Footer", () => {
  it("contentinfo ランドマークになり、padded で余白の class を付ける", () => {
    render(<Footer title="Footer" padded />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("m2012-footer", "m2012-surface-bar", "m2012-bar");
    expect(footer).toHaveAttribute("data-m2012-theme", "a");
    expect(screen.getByText("Footer")).toHaveClass("m2012-title");
  });
});

describe("固定ツールバー", () => {
  const renderPage = (ui: React.ReactNode) =>
    render(
      <Page>
        {ui}
        <Content>
          <p>本文</p>
          <Button>Action</Button>
        </Content>
      </Page>,
    );

  it("fixed / fullscreen の class を付ける", () => {
    renderPage(<Header fixed fullscreen title="Title" />);
    expect(screen.getByRole("banner")).toHaveClass(
      "m2012-header-fixed",
      "m2012-header-fullscreen",
      "m2012-slidedown",
    );
  });

  it("ページのタップで表示・非表示を切り替える（ボタンのタップは除く）", () => {
    renderPage(<Header fixed title="Title" />);
    const header = screen.getByRole("banner");

    fireEvent.click(screen.getByRole("button", { name: "Action" }));
    expect(header).not.toHaveClass("m2012-fixed-hidden");

    // スクロールしていないのでアニメーションせずに切り替わる
    fireEvent.click(screen.getByText("本文"));
    expect(header).toHaveClass("m2012-fixed-hidden");

    fireEvent.click(screen.getByText("本文"));
    expect(header).not.toHaveClass("m2012-fixed-hidden");
  });

  it("tapToggle={false} では切り替えない", () => {
    renderPage(<Footer fixed tapToggle={false} title="Footer" />);
    fireEvent.click(screen.getByText("本文"));
    expect(screen.getByRole("contentinfo")).not.toHaveClass("m2012-fixed-hidden");
  });

  it("fullscreen ではアニメーションしてから隠す", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    renderPage(<Footer fixed fullscreen title="Footer" />);
    const footer = screen.getByRole("contentinfo");

    fireEvent.click(screen.getByText("本文"));
    expect(footer).toHaveClass("m2012-out", "m2012-reverse");
    expect(footer).not.toHaveClass("m2012-fixed-hidden");

    fireEvent.animationEnd(footer);
    expect(footer).toHaveClass("m2012-fixed-hidden");
    expect(footer).not.toHaveClass("m2012-out");
  });

  it("animationend が来なくても一定時間で状態を進める", () => {
    vi.useFakeTimers();
    renderPage(<Header fixed fullscreen title="Title" />);
    const header = screen.getByRole("banner");

    fireEvent.click(screen.getByText("本文"));
    expect(header).toHaveClass("m2012-out");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(header).toHaveClass("m2012-fixed-hidden");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
});

describe("BackButton", () => {
  it("既定で history.back() を呼ぶ", () => {
    const back = vi.spyOn(window.history, "back").mockImplementation(() => {});
    render(<BackButton />);
    const button = screen.getByRole("button", { name: "Back" });
    expect(button).toHaveClass("m2012-btn-icon-left");
    fireEvent.click(button);
    expect(back).toHaveBeenCalledOnce();
    back.mockRestore();
  });

  it("onClick を指定したらそちらを呼ぶ", () => {
    const onClick = vi.fn();
    const back = vi.spyOn(window.history, "back").mockImplementation(() => {});
    render(<BackButton onClick={onClick}>戻る</BackButton>);
    fireEvent.click(screen.getByRole("button", { name: "戻る" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(back).not.toHaveBeenCalled();
    back.mockRestore();
  });
});
