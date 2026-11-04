import { useState } from "react";
import Column from "../components/column";
import { Link, useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "../context/AuthContext";
import logoLight from "../assets/logo/logo-light.png";
import logoDark from "../assets/logo/logo-dark.png";

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
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
      className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 p-6 md:p-10 transition-colors"
      dir="ltr"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <img
              src={logoLight}
              alt="لوگو"
              className="h-18 w-18 rounded-lg object-contain dark:hidden"
            />
            <img
              src={logoDark}
              alt="لوگو"
              className="hidden h-18 w-18 rounded-lg object-contain dark:block"
            />
            <span>Todo List</span>
          </h1>
          <Link
            to="/"
            className="bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-semibold"
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

        {/* حساب کاربری */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-sm font-bold uppercase text-white shadow-md">
              {currentUser?.username?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                وارد شده با
              </p>
              <p
                dir="ltr"
                className="truncate text-right text-sm font-medium text-gray-700 dark:text-gray-200"
                title={currentUser?.username}
              >
                {currentUser?.username}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-red-200 bg-red-50/50 px-3.5 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow-md active:scale-95 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            خروج
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
