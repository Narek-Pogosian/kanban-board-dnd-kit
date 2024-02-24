import KanbanBoard from "./components/kanban-board";
import ThemeToggle from "./components/theme-toggle";

function App() {
  return (
    <div className="container pt-4 pb-8 flex flex-col gap-4 h-screen">
      <ThemeToggle />
      <KanbanBoard />
    </div>
  );
}

export default App;
