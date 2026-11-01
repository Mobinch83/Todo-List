import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import InfoModal from "./InfoModal";

function TaskCard({ task, index, onStatusChange, onDelete, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  const priorityColors = {
    high: "bg-red-50 border-red-200 hover:border-red-300",
    medium: "bg-yellow-50 border-yellow-200 hover:border-yellow-300",
    low: "bg-green-50 border-green-200 hover:border-green-300",
  };

  const priorityLabels = {
    high: "🔴 بالا",
    medium: "🟡 متوسط",
    low: "🟢 پایین",
  };

  const handleSave = () => {
    if (editedTitle.trim() !== "") {
      onEditTask(task.id, editedTitle);
      setIsEditing(false);
      setShowEditSuccess(true);
    }
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3.5 rounded-xl border-2 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${
            priorityColors[task.priority] || "bg-gray-50 border-gray-200"
          } ${snapshot.isDragging ? "rotate-2 shadow-xl scale-105" : ""}`}
        >
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleSave}
                  className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  ✓ ذخیره
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  ✕ لغو
                </button>
              </div>
            </div>
          ) : (
            <>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                {task.title}
              </h4>
              {task.description && (
                <p className="text-xs text-gray-500 mb-2">{task.description}</p>
              )}

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/5">
                <span className="text-[11px] font-bold opacity-80">
                  {priorityLabels[task.priority]}
                </span>

                <div className="flex gap-1">
                  {task.status !== "Done" && (
                    <button
                      onClick={() => onStatusChange(task.id)}
                      className="text-sm bg-white/70 hover:bg-white p-1.5 rounded-lg shadow-sm transition"
                      title="تغییر وضعیت"
                    >
                      ✅
                    </button>
                    )}
                    
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm bg-white/70 hover:bg-white p-1.5 rounded-lg shadow-sm transition"
                    title="ویرایش"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-sm bg-white/70 hover:bg-red-50 p-1.5 rounded-lg shadow-sm transition"
                    title="حذف"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </>
          )}
          <InfoModal
            isOpen={showEditSuccess}
            message="ویرایش با موفقیت انجام شد"
            onClose={() => setShowEditSuccess(false)}
          />
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
