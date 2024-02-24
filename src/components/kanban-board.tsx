import Column from "./column";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { ColumnType } from "@/types";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useStore } from "@/store/useStore";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

function KanbanBoard() {
  const columns = useStore((state) => state.columns);
  const addColumn = useStore((state) => state.addColumn);
  const setColumns = useStore((state) => state.setColumns);

  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

  const sensors = useSensors(
    // Need to move the column 5px for it to be considered as dragging
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const activeIndex = columns.findIndex((col) => col.id === activeId);
    const overIndex = columns.findIndex((col) => col.id === overId);
    setColumns(arrayMove(columns, activeIndex, overIndex));
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
          {activeColumn && <Column column={activeColumn} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

export default KanbanBoard;
