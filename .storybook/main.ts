import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (viteConfig) => {
    // vite.config.ts のライブラリビルド設定は Storybook のビルドには不要
    if (viteConfig.build) {
      delete viteConfig.build.lib;
    }
    return viteConfig;
  },
};

export default config;
