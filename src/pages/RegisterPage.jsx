import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3) {
      setError("نام کاربری باید حداقل ۳ حرف باشه");
      return;
    }
    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشه");
      return;
    }
    if (password !== confirm) {
      setError("رمز عبور و تکرارش یکی نیستن");
      return;
    }

    const result = register(username.trim(), password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/login");
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all";

  return (
    <div
      className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4 transition-colors"
      dir="rtl"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700"
      >
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🚀</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            ثبت‌نام
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            یه حساب بسازید و تسک‌هات رو مدیریت کنید
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              تکرار رمز عبور
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputClass}
              dir="ltr"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ثبت‌نام
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
            حساب دارید؟{" "}
            <Link
              to="/login"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              وارد شوید
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
