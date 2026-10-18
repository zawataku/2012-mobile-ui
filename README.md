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
| Button / ControlGroup | 実装済み |
| Page / Header / Footer / Navbar / Fixed toolbar | 実装済み |
| Grid / Collapsible / CollapsibleSet | 未実装 |
| フォーム（TextInput / Slider / FlipSwitch / Checkbox / Radio / Select） | 未実装 |
| Popup / Dialog / Loader | 未実装 |
| ページ遷移アニメーション | 未実装 |

ページ遷移はアニメーションのみ提供する予定です。ルーティングは react-router などを利用してください。

## 使い方

React 19 以上が必要です。


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

### Button

`href` を指定すると `<a>`、指定しなければ `<button>`（既定の `type` は `"button"`）になります。それ以外の属性（`onClick`、`ref` など）はそのまま要素に渡されます。

```tsx
<Button icon="check" theme="b" inline onClick={save}>Save</Button>
<Button href="/settings" icon="gear" iconpos="notext">Settings</Button>
```

| prop | 型 | 説明 |
| --- | --- | --- |
| `icon` | `IconName` | アイコン |
| `iconpos` | `"left" \| "right" \| "top" \| "bottom" \| "notext"` | アイコンの位置（既定は `left`）。`notext` はアイコンのみ |
| `inline` | `boolean` | 横幅をテキストに合わせる |
| `mini` | `boolean` | 小さいサイズ |
| `corners` / `shadow` / `iconshadow` | `boolean` | 角丸・影・アイコンの影（既定はすべて `true`） |
| `active` | `boolean` | active 状態（青） |
| `disabled` | `boolean` | 無効状態 |
| `theme` | `Theme` | swatch |

### ControlGroup

```tsx
<ControlGroup type="horizontal" legend="表示">
  <Button>リスト</Button>
  <Button>グリッド</Button>
</ControlGroup>
```

| prop | 型 | 説明 |
| --- | --- | --- |
| `type` | `"vertical" \| "horizontal"` | 並べる向き（既定は `vertical`） |
| `legend` | `ReactNode` | グループの見出し |
| `mini` | `boolean` | 中のボタンをまとめて小さいサイズにする |
| `shadow` | `boolean` | グループ全体の影（既定は `false`） |

### Page / Content / Header / Footer

```tsx
<Page>
  <Header
    title="Edit Contact"
    left={<BackButton />}
    right={<Button icon="check" theme="b">Save</Button>}
  />
  <Content>…</Content>
  <Footer title="Footer" />
</Page>
```

画面遷移（どの Page を表示するか）は react-router などのルーターに任せます。

| コンポーネント | prop | 説明 |
| --- | --- | --- |
| `Page` | `theme` | swatch（既定は `c`） |
| `Content` | `theme` | swatch（省略するとページの swatch） |
| `Header` | `title` / `left` / `right` | タイトルと左右の要素（通常は `Button`）。`children` はタイトルの下に続く（`Navbar` など） |
| `Footer` | `title` / `padded` | 中央のテキスト。`padded` で中身の周りに余白を付ける（ボタンを並べるとき） |
| `Header` / `Footer` | `theme` | swatch（既定は `a`） |
| `Header` / `Footer` | `fixed` / `fullscreen` / `tapToggle` / `transition` | 固定ツールバー（下記） |
| `BackButton` | `onClick` | 「Back」ボタン。`onClick` を省略すると `history.back()` |

#### 固定ツールバー

`fixed` を付けると、スクロールしてもヘッダー・フッターが画面に残ります（`position: sticky`）。ボタンやリンク以外の場所をタップすると表示・非表示が切り替わります（`tapToggle={false}` で無効）。`fullscreen` を付けると、コンテンツに重ねて半透明で表示します（写真ビューアなど）。`transition` は `"slide"`（既定）・`"fade"`・`"none"` です。

### Navbar

```tsx
<Navbar>
  <NavbarItem href="#" icon="home" active>Home</NavbarItem>
  <NavbarItem href="#" icon="search">Search</NavbarItem>
</Navbar>
```

項目数に応じて 1〜5 列に並びます（6 個以上は 2 列）。`NavbarItem` は `Button` と同じ props を受け取ります（角丸・影・アイコン位置は Navbar が決めます）。

| prop | 型 | 説明 |
| --- | --- | --- |
| `iconpos` | `IconPosition` | アイコンの位置（既定は `top`） |
| `grid` | `"solo" \| "a" \| "b" \| "c" \| "d"` | 列数を指定する（省略すると項目数から決める） |

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
