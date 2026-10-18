import type { Meta, StoryObj } from "@storybook/react-vite";
import { THEMES } from "../core";

const meta = {
  title: "Foundations/Theme",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const box = {
  padding: "0.6em 15px",
  marginBottom: 8,
};

/**
 * swatch a〜e の bar / body / btn（docs/api/themes.html）。
 * btn はホバー・押下で色が変わる。
 */
export const Swatches: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {THEMES.map((theme) => (
        <section key={theme} data-m2012-theme={theme}>
          <div className="m2012-surface-bar" style={box}>
            Bar {theme}
          </div>
          <div className="m2012-surface-body" style={box}>
            Body {theme}{" "}
            <a className="m2012-link" href="#">
              リンク
            </a>
          </div>
          <div
            className="m2012-surface-btn m2012-clickable m2012-btn-corner-all m2012-shadow"
            style={{ ...box, textAlign: "center" }}
            tabIndex={0}
          >
            Button {theme}
          </div>
        </section>
      ))}
      <div
        className="m2012-surface-btn m2012-btn-active m2012-btn-corner-all m2012-shadow"
        style={{ ...box, textAlign: "center" }}
      >
        Active（共通）
      </div>
    </div>
  ),
};
