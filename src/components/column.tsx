import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ColumnType } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import { useStore } from "@/store/useStore";
import ColumnDropdown from "./column-dropdown";
import AddTaskSheet from "./add-task-sheet";
import TaskCard from "./task-card";
import Paper from "./ui/paper";

type ColumnProps = {
  column: ColumnType;
};

function Column({ column }: ColumnProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const tasks = useStore((state) =>
    state.tasks.filter((t) => t.columnId === column.id)
  );

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-full w-80 shrink-0 opacity-60 space-y-2"
      >
        <Paper className="h-14"></Paper>
        <Paper className="h-28"></Paper>
        <Paper className="h-28"></Paper>
        <Paper className="h-28"></Paper>
        <Paper className="h-28"></Paper>
      </div>
    );
  }

  return (
    <div className="h-full w-80 shrink-0" ref={setNodeRef} style={style}>
      {/* COLUMN HEADER */}
      <Paper
        className="font-bold h-14 pl-4 pr-2 flex justify-between items-center cursor-grab border-primary/20 border"
        {...attributes}
        {...listeners}
      >
        <div className="flex gap-2 items-center">
          <span className="border border-primary/20 rounded-full w-8 h-8 flex justify-center items-center text-sm">
            {tasks.length}
          </span>
          <h2>{column.title}</h2>
        </div>
        <ColumnDropdown columnId={column.id} />
      </Paper>

      <AddTaskSheet columnId={column.id} />

      {/* TASKS */}
      <div className="h-full overflow-y-auto overflow-x-hidden py-2 space-y-2 px-[1px]">
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
