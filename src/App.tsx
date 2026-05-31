import { Listview, ListviewItem, ListviewDivider } from "./components/Listview";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "480px",
        margin: "0 auto",
        backgroundColor: "#e5e5e5",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* 基本の全幅リスト（非 inset）: divider + リンク矢印 + count */}
      <Listview>
        <ListviewDivider>Components</ListviewDivider>
        <ListviewItem href="#">Pages &amp; dialogs</ListviewItem>
        <ListviewItem href="#" count={12}>
          Toolbars
        </ListviewItem>
        <ListviewItem href="#" count={3}>
          Buttons
        </ListviewItem>
        <ListviewDivider count={2}>Form elements</ListviewDivider>
        <ListviewItem href="#">Text inputs</ListviewItem>
        <ListviewItem>読み取り専用の項目（static）</ListviewItem>
      </Listview>

      {/* inset リスト: 角丸 + 影、見出し/説明/aside/サムネイル */}
      <Listview inset>
        <ListviewDivider>Inbox</ListviewDivider>
        <ListviewItem
          href="#"
          heading="Stephen Weber"
          desc="And then we all went to the park..."
          aside="6:24 PM"
          count={1}
        >
        </ListviewItem>
        <ListviewItem
          href="#"
          heading="jQuery Team"
          desc="Boston Conference Planning"
          aside="9:18 AM"
        >
        </ListviewItem>
        <ListviewItem href="#" arrow={false}>
          矢印なしのリンク
        </ListviewItem>
      </Listview>
    </div>
  );
}

export default App;
