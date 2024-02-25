import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/store/useStore";
import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { memo } from "react";

type ColumnDropdownProps = {
  columnId: string;
};

const ColumnDropdown = memo(function ColumnDropdown({
  columnId,
}: ColumnDropdownProps) {
  const removeColumn = useStore((state) => state.deleteColumn);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => removeColumn(columnId)}
          className="font-semibold"
        >
          <Trash className="size-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default ColumnDropdown;
