import Column from "./column";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { ColumnType, TaskType } from "@/types";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useStore } from "@/store/useStore";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TaskCard from "./task-card";

function KanbanBoard() {
  const columns = useStore((state) => state.columns);
  const addColumn = useStore((state) => state.addColumn);
  const setColumns = useStore((state) => state.setColumns);
  const setTasks = useStore((state) => state.setTasks);
  const tasks = useStore((state) => state.tasks);

  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveColumn = active.data.current?.type === "column";
    const isOverColumn = over.data.current?.type === "column";

    // Dragging a column over another column
    if (isActiveColumn && isOverColumn) {
      const activeIndex = columns.findIndex((col) => col.id === activeId);
      const overIndex = columns.findIndex((col) => col.id === overId);

      setColumns(arrayMove(columns, activeIndex, overIndex));
    }

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";

    // Dragging a task over another task
    if (isActiveTask && isOverTask) {
      const activeIndex = tasks.findIndex((task) => task.id === activeId);
      const overIndex = tasks.findIndex((task) => task.id === overId);

      setTasks(arrayMove(tasks, activeIndex, overIndex));
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || !active) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";
    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      const currentColumnId = active.data.current?.task.columnId;
      const overColumnId = over.data.current?.task.columnId;

      if (currentColumnId !== overColumnId) {
        setTasks(
          tasks.map((task) =>
            task.id === activeId ? { ...task, columnId: overColumnId } : task
          )
        );
      }
    }

    const isOverAColumn = over.data.current?.type === "column";

    // Dropping a task over a column
    if (isActiveTask && isOverAColumn) {
      const currentColumnId = active.data.current?.task.columnId;
      const overColumnId = over.data.current?.column.id;

      if (currentColumnId !== overColumnId) {
        const taskid = tasks.findIndex((task) => task.id === activeId);
        const updatedTasks = tasks.map((task) =>
          task.id === activeId ? { ...task, columnId: overColumnId } : task
        );

        setTasks(arrayMove(updatedTasks, taskid, updatedTasks.length - 1));
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden h-full">
        <SortableContext items={columns.map((col) => col.id)}>
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </SortableContext>
        <Button
          onClick={() => addColumn(`Column ${columns.length + 1}`)}
          className="w-80 shrink-0 mt-1"
        >
          Add Column <Plus className="size-4 ml-2" />
        </Button>
      </div>
      {createPortal(
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} />}
          {activeColumn && <Column column={activeColumn} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

export default KanbanBoard;
