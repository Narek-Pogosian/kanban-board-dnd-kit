import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useStore } from "@/store/useStore";
import { useState } from "react";

type AddTaskSheetProps = {
  columnId: string;
};

function AddTaskSheet({ columnId }: AddTaskSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const addTask = useStore((state) => state.addTask);

  function handleAddTask() {
    if (!content) return;

    addTask(content, columnId);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="w-full mt-2">Add Task</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a task!</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            expedita.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            placeholder="Enter the tasks description"
          />
          <Button className="w-full mt-4" onClick={handleAddTask}>
            Add Task
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AddTaskSheet;
