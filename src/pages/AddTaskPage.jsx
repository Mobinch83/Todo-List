import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AddTaskPage({
  newTaskTitle,
  onTitleChange,
  newTaskPriority,
  onPriorityChange,
  onAddTask,
}) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4 transition-colors"
      dir="rtl"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
        {/* هدر */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            افزودن تسک جدید
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            اطلاعات تسک رو وارد کن و به لیست اضافه کن
          </p>
        </div>

        {/* فرم */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              عنوان تسک
            </label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="مثلاً: یادگیری React Hooks"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              اولویت
            </label>
            <select
              value={newTaskPriority}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="high">🔴 بالا</option>
              <option value="medium">🟡 متوسط</option>
              <option value="low">🟢 پایین</option>
            </select>
          </div>

          <button
            onClick={onAddTask}
            className="w-full bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ➕ افزودن تسک
          </button>

          <Link
            to="/board"
            className="block text-center text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors pt-2"
          >
            مشاهده برد تسک‌ها ←
          </Link>
        </div>

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

export default AddTaskPage;
