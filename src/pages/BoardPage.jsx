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
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 p-6 md:p-10 transition-colors"
      dir="ltr"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
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

        {/* برد */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            <Column
              title="ToDo"
              displayTitle="برای انجام"
              tasks={todoTasks}
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
              tasks={doingTasks}
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
              tasks={doneTasks}
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
