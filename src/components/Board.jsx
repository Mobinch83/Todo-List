import Column from "./column";

function Board({
  todoTasks,
  doingTasks,
  doneTasks,
  onStatusChange,
  onDelete,
  onEditTask,
  onUndo,
}) {
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans" dir="ltr">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📋 Todo List
      </h1>

      {/* کانتینر سه ستون */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-start max-w-6xl mx-auto">
        <Column
          title="To Do"
          tasks={todoTasks}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEditTask={onEditTask}
          color="border-blue-400"
        />
        <Column
          title="Doing"
          tasks={doingTasks}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEditTask={onEditTask}
          color="border-yellow-400"
        />
        <Column
          title="Done"
          tasks={doneTasks}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEditTask={onEditTask}
          onUndo={onUndo}
          color="border-green-400"
        />
      </div>
    </div>
  );
}

export default Board;
