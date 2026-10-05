import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

function Column(props) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 w-full md:w-80 border-t-4 ${props.color}`}
    >
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-700">{props.displayTitle}</h3>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${props.badgeColor}`}
        >
          {props.tasks.length}
        </span>
      </div>

      <Droppable droppableId={props.title}>
        {(provided, snapshot) => (
          <div
            className={`flex flex-col gap-3 min-h-[100px] rounded-lg transition-colors ${
              snapshot.isDraggingOver ? "bg-blue-50/50 p-2" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onStatusChange={props.onStatusChange}
                onDelete={props.onDelete}
                onEditTask={props.onEditTask}
              />
            ))}
            {provided.placeholder}
            {props.tasks.length === 0 && !snapshot.isDraggingOver && (
              <p className="text-gray-400 text-sm text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                تسکی وجود ندارد
              </p>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;