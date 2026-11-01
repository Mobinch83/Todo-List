import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddTaskPage from "./pages/AddTaskPage";
import BoardPage from "./pages/BoardPage";
import ConfirmModal from "./components/ConfirmModal";
import InfoModal from "./components/InfoModal";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      {
        id: "1",
        title: "Learn React",
        description: "",
        status: "ToDo",
        priority: "high",
      },
      {
        id: "2",
        title: "Learn JS",
        description: "در حال انجام",
        status: "Doing",
        priority: "medium",
      },
      {
        id: "3",
        title: "Learn HTML & CSS",
        description: "انجام شد",
        status: "Done",
        priority: "low",
      },
    ];
  });

  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newStatus = task.status === "Done" ? "ToDo" : "Done";
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
  };

  const confirmDelete = () => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete));
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleEditTask = (id, newTitle) => {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(editedTasks);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        id: crypto.randomUUID(),
        title: newTaskTitle,
        description: "",
        status: "ToDo",
        priority: newTaskPriority,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskPriority("medium");
      setShowAddSuccess(true);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === draggableId) {
        return { ...task, status: destination.droppableId };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const todoTasks = tasks.filter((task) => task.status === "ToDo");
  const doingTasks = tasks.filter((task) => task.status === "Doing");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Routes>
        <Route
          path="/"
          element={
            <AddTaskPage
              newTaskTitle={newTaskTitle}
              onTitleChange={setNewTaskTitle}
              newTaskPriority={newTaskPriority}
              onPriorityChange={setNewTaskPriority}
              onAddTask={handleAddTask}
            />
          }
        />
        <Route
          path="/board"
          element={
            <BoardPage
              todoTasks={todoTasks}
              doingTasks={doingTasks}
              doneTasks={doneTasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
              onEditTask={handleEditTask}
              onDragEnd={handleDragEnd}
            />
          }
        />
      </Routes>
      
      <ConfirmModal
        isOpen={taskToDelete !== null}
        message="مطمئنی می‌خوای این تسک رو حذف کنی؟"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <InfoModal
        isOpen={showAddSuccess}
        message="تسک با موفقیت اضافه شد"
        onClose={() => setShowAddSuccess(false)}
      />
    </>
  );
}

export default App;
