# 2012-mobile-ui

jQuery Mobile® 1.2.0 のデザインを参考にした、React 用の UI コンポーネントライブラリです（非公式）。

jQuery Mobile 1.2.0 で提供されていたコンポーネントを、React コンポーネントとして全て再現することを目標にしています。jQuery には依存しません。見た目は固定の class 名（`m2012-` で始まる）を使う素の CSS で再現しているので、将来は React 以外のフレームワークにも対応できる設計にしています。

> [!NOTE]
> 開発初期段階のため、npm には未公開です。API は今後変更される可能性があります。

## コンポーネント

| コンポーネント | 状態 |
| --- | --- |
| Icon | 実装済み（jQuery Mobile 1.2.0 のアイコンスプライト 22 種） |
| Listview | 一部実装済み（基本表示・inset・divider・count・見出し / 説明 / aside・アイコン / サムネイル・static・theme） |
| Button / ControlGroup | 未実装 |
| Page / Header / Footer / Navbar / Fixed toolbar | 未実装 |
| Grid / Collapsible / CollapsibleSet | 未実装 |
| フォーム（TextInput / Slider / FlipSwitch / Checkbox / Radio / Select） | 未実装 |
| Popup / Dialog / Loader | 未実装 |
| ページ遷移アニメーション | 未実装 |

ページ遷移はアニメーションのみ提供する予定です。ルーティングは react-router などを利用してください。

## 使い方

```tsx
import "2012-mobile-ui/style.css";
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

### テーマ（swatch）

jQuery Mobile 1.2.0 のデフォルトテーマの swatch `a`〜`e` を使えます。各コンポーネントの `theme` prop か、任意の要素の `data-m2012-theme` 属性で指定します。指定がない部分は親の swatch を引き継ぎ、どこにも指定がなければ `c` になります。

```tsx
<div data-m2012-theme="a">
  <Listview inset>…</Listview> {/* swatch a になる */}
</div>
```

### Icon

| prop | 型 | 説明 |
| --- | --- | --- |
| `name` | `IconName` | アイコンの種類（`arrow-r`、`home`、`search` など。一覧は `ICON_NAMES`） |
| `shadow` | `boolean` | アイコン下の白い影 |
| `alt` | `boolean` | 黒いアイコン + 白いディスク（明るい背景用） |

### Listview

| prop | 型 | 説明 |
| --- | --- | --- |
| `inset` | `boolean` | 角丸・影付きの inset 表示（`data-inset="true"` 相当） |
| `theme` | `Theme` | 項目の swatch |

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
| `theme` | `Theme` | この項目だけの swatch |

### ListviewDivider

| prop | 型 | 説明 |
| --- | --- | --- |
| `count` | `ReactNode` | 右側の count バブル |
| `theme` | `Theme` | swatch（既定は `b`） |

## 開発

[pnpm](https://pnpm.io/) を使います。

```sh
pnpm install
pnpm dev              # Storybook を起動（http://localhost:6006）
pnpm test             # テストを実行
pnpm lint
pnpm build            # ライブラリをビルド（dist/ に出力）
pnpm build-storybook  # Storybook を静的ファイルとしてビルド（storybook-static/ に出力）
```

### ディレクトリ構成

```
src/
  core/    フレームワークに依存しない部分（CSS・テーマ・アイコンスプライト・共通処理）
  react/   React コンポーネント（core の class 名を付けるだけの薄いラッパー）
```

### 参照用ソース

見た目の確認には jQuery Mobile 1.2.0 のソース（CSS・ドキュメント）を参照しています。`reference/` は Git 管理外なので、各自で配置してください。

```sh
git clone --depth 1 --branch 1.2.0 https://github.com/jquery/jquery-mobile.git reference/jquery-mobile-1.2.0
```

## ライセンス表記

アイコンスプライトと CSS の値の一部は jQuery Mobile 1.2.0（MIT License）に由来します。詳細は [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。

## 商標

jQuery® および jQuery Mobile® は OpenJS Foundation の登録商標です。このプロジェクトは OpenJS Foundation および jQuery Mobile プロジェクトとは関係がなく、承認も受けていません。

jQuery Mobile® is a registered trademark of the OpenJS Foundation. This project is not affiliated with or endorsed by the OpenJS Foundation.
