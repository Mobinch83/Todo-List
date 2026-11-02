import { useState } from "react";
import Column from "../components/column";
import { Link } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";

function BoardPage({
  todoTasks,
  doingTasks,
  doneTasks,
  onStatusChange,
  onDelete,
  onEditTask,
  onDragEnd,
  onUndo,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterTasks = (tasks) => {
    const term = searchTerm.trim().toLowerCase();
    if (term === "") return tasks;
    return tasks.filter((task) => task.title.toLowerCase().includes(term));
  };

  const filteredTodo = filterTasks(todoTasks);
  const filteredDoing = filterTasks(doingTasks);
  const filteredDone = filterTasks(doneTasks);

  const totalFound =
    filteredTodo.length + filteredDoing.length + filteredDone.length;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 p-6 md:p-10 transition-colors"
      dir="ltr"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            📋 <span>Todo List</span>
          </h1>
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-semibold"
          >
            ➕ افزودن تسک جدید
          </Link>
        </div>

        {/* جستجو */}
        <div className="max-w-xl mx-auto mb-10" dir="rtl">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی تسک..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-12 pl-12 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 left-3 flex items-center px-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                title="پاک کردن"
              >
                ✕
              </button>
            )}
          </div>

          {searchTerm.trim() !== "" && (
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              {totalFound > 0
                ? `${totalFound} تسک پیدا شد`
                : "تسکی با این عنوان پیدا نشد"}
            </p>
          )}
        </div>

        {/* برد */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            <Column
              title="ToDo"
              displayTitle="برای انجام"
              tasks={filteredTodo}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEditTask={onEditTask}
              onUndo={onUndo}
              color="border-blue-400"
              badgeColor="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
            />
            <Column
              title="Doing"
              displayTitle="در حال انجام"
              tasks={filteredDoing}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEditTask={onEditTask}
              onUndo={onUndo}
              color="border-yellow-400"
              badgeColor="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
            />
            <Column
              title="Done"
              displayTitle="انجام شده"
              tasks={filteredDone}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEditTask={onEditTask}
              onUndo={onUndo}
              color="border-green-400"
              badgeColor="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default BoardPage;
