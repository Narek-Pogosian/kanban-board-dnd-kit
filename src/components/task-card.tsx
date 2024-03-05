import Paper from "./ui/paper";
import { TaskType } from "@/types";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
  task: TaskType;
};

function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useStore((state) => state.deleteTask);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: "task",
        task,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Paper
      className="py-6 group font-semibold text-sm flex justify-between border hover:border-primary/60 transition-colors duration-300"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {task.content}
      <Button
        onClick={() => deleteTask(task.id)}
        size="icon"
        variant="dangerOutline"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Trash className="size-5" />
      </Button>
    </Paper>
  );
}

export default TaskCard;
