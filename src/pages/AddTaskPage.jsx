import { Link } from "react-router-dom";

function AddTaskPage({
  newTaskTitle,
  onTitleChange,
  newTaskPriority,
  onPriorityChange,
  onAddTask,
}) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4 transition-colors"
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
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
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
      </div>
    </div>
  );
}

export default AddTaskPage;
