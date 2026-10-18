import type { Preview } from "@storybook/react-vite";
import "../src/core/styles/index.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "swatch（data-m2012-theme）",
      toolbar: {
        title: "Swatch",
        icon: "paintbrush",
        items: [
          { value: "", title: "指定なし（c）" },
          { value: "a", title: "a" },
          { value: "b", title: "b" },
          { value: "c", title: "c" },
          { value: "d", title: "d" },
          { value: "e", title: "e" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "",
  },
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // jQuery Mobile のページ幅に近い 480px の枠で表示する。
    // ページ全体の story（parameters.frame = "none"）は枠なしで画面いっぱいに表示する
    (Story, { globals, parameters }) =>
      parameters.frame === "none" ? (
        <div data-m2012-theme={globals.theme || undefined}>
          <Story />
        </div>
      ) : (
        <div
          data-m2012-theme={globals.theme || undefined}
          style={{
            maxWidth: 480,
            margin: "0 auto",
            padding: 15,
            minHeight: "100vh",
            boxSizing: "border-box",
            background: "#e5e5e5",
          }}
        >
          <Story />
        </div>
      ),
  ],
};

export default preview;
