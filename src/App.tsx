import { Listview, ListviewHeader, ListviewItem } from "./components/Listview";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e5e5e5",
        minHeight: "100vh",
      }}
    >
      <Listview>
        <ListviewHeader>Components</ListviewHeader>
        <ListviewItem>Pages & dialogs</ListviewItem>
        <ListviewItem>Toolbars</ListviewItem>
        <ListviewItem>Buttons</ListviewItem>
      </Listview>
    </div>
  );
}

export default App;
