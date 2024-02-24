import { ColumnType, TaskType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  columns: ColumnType[];
  addColumn: (title: string) => void;
  deleteColumn: (id: string) => void;
  setColumns: (columns: ColumnType[]) => void;

  tasks: TaskType[];
  addTask: (title: string, columnId: string) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: TaskType[]) => void;
}

export const useStore = create(
  persist<Store>(
    (set) => ({
      columns: [],
      tasks: [],

      addColumn: (title) => {
        set((state) => ({
          columns: [...state.columns, { id: crypto.randomUUID(), title }],
        }));
      },
      deleteColumn: (id) => {
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id),
          tasks: state.tasks.filter((task) => task.columnId !== id),
        }));
      },
      setColumns: (columns) => {
        set((state) => ({ ...state, columns }));
      },

      addTask: (content, columnId) => {
        set((state) => ({
          ...state,
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), content, columnId },
          ],
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          ...state,
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      setTasks: (tasks) => {
        set((state) => ({ ...state, tasks }));
      },
    }),
    { name: "store" }
  )
);
