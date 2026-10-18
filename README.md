# 2012-mobile-ui

jQuery Mobile® 1.2.0 のデザインを参考にした、React 用の UI コンポーネントライブラリです（非公式）。

jQuery Mobile 1.2.0 で提供されていたコンポーネントを、React コンポーネントとして全て再現することを目標にしています。jQuery には依存せず、見た目は CSS Modules で再現しています。

> [!NOTE]
> 開発初期段階のため、npm には未公開です。API は今後変更される可能性があります。

## コンポーネント

| コンポーネント | 状態 |
| --- | --- |
| Listview | 一部実装済み（基本表示・inset・divider・count・見出し / 説明 / aside・アイコン / サムネイル・static） |
| Button / ControlGroup | 未実装 |
| Page / Header / Footer / Navbar / Fixed toolbar | 未実装 |
| Grid / Collapsible / CollapsibleSet | 未実装 |
| フォーム（TextInput / Slider / FlipSwitch / Checkbox / Radio / Select） | 未実装 |
| Popup / Dialog / Loader | 未実装 |
| ページ遷移アニメーション | 未実装 |

ページ遷移はアニメーションのみ提供する予定です。ルーティングは react-router などを利用してください。

## 使い方

```tsx
import { Listview, ListviewItem, ListviewDivider } from "2012-mobile-ui";

export const Example = () => (
  <Listview inset>
    <ListviewDivider count={2}>Inbox</ListviewDivider>
    <ListviewItem
      href="#"
      heading="Stephen Weber"
      desc="And then we all went to the park..."
      aside="6:24 PM"
      count={1}
    />
    <ListviewItem href="#">Toolbars</ListviewItem>
    <ListviewItem>読み取り専用の項目</ListviewItem>
  </Listview>
);
```

### Listview

| prop | 型 | 説明 |
| --- | --- | --- |
| `inset` | `boolean` | 角丸・影付きの inset 表示（`data-inset="true"` 相当） |

### ListviewItem

| prop | 型 | 説明 |
| --- | --- | --- |
| `href` / `onClick` | `string` / `MouseEventHandler` | 指定するとクリック可能な項目になり、右矢印が付く |
| `heading` | `ReactNode` | 見出し |
| `desc` | `ReactNode` | 補助説明テキスト |
| `aside` | `ReactNode` | 右寄せの補足テキスト |
| `count` | `ReactNode` | 右側の count バブル |
| `icon` / `iconAlt` | `string` | 左側の 16px アイコン画像 |
| `thumb` / `thumbAlt` | `string` | 左側の 80px サムネイル画像 |
| `arrow` | `boolean` | 右矢印の表示を明示的に切り替える |

### ListviewDivider

| prop | 型 | 説明 |
| --- | --- | --- |
| `count` | `ReactNode` | 右側の count バブル |

## 開発

[pnpm](https://pnpm.io/) を使います。

```sh
pnpm install
pnpm dev      # デモページを起動
pnpm build    # ライブラリをビルド（dist/ に出力）
pnpm lint
```

### 参照用ソース

見た目の確認には jQuery Mobile 1.2.0 のソース（CSS・ドキュメント）を参照しています。`reference/` は Git 管理外なので、各自で配置してください。

```sh
git clone --depth 1 --branch 1.2.0 https://github.com/jquery/jquery-mobile.git reference/jquery-mobile-1.2.0
```

## 商標

jQuery® および jQuery Mobile® は OpenJS Foundation の登録商標です。このプロジェクトは OpenJS Foundation および jQuery Mobile プロジェクトとは関係がなく、承認も受けていません。

jQuery Mobile® is a registered trademark of the OpenJS Foundation. This project is not affiliated with or endorsed by the OpenJS Foundation.
