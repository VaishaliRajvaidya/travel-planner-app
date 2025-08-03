import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";

const Todos = () => {
  const {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    checkedTodo,
    newTodo,
    setNewTodo,
    editingTodo,
    setEditingTodo,
  } = useContext(TodoContext);

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-semibold">
        Please log in to view your CheckList.
      </div>
    );
  }

  const addNewItem = () => {
    if (newTodo.trim() === "") {
      alert("Please enter a todo item.");
      return;
    }
    addTodo({ id: Date.now(), text: newTodo, checked: false });
    setNewTodo("");
  };

  const handleUpdate = () => {
    if (editingTodo) {
      updateTodo({ ...editingTodo, text: newTodo });
      setEditingTodo(null);
      setNewTodo("");
    }
  };

  const handleCheck = (id) => {
    checkedTodo(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-100 to-green-200 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-15 text-green-700 mb-6">
        🌿 My Daily Checklist
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 mb-8">
        <motion.input
          type="text"
          placeholder="Add something inspiring..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          whileFocus={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-md transition-all duration-300"
        />
        <motion.button
          onClick={editingTodo ? handleUpdate : addNewItem}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition-all"
        >
          {editingTodo ? "Update" : "Add"}
        </motion.button>
      </div>

      {/* ✅ Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="origin-left h-1 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-green-500 mb-6"
      />

      <ul className="space-y-4 max-w-3xl mx-auto px-2">
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-white to-green-50 p-4 rounded-xl shadow-md transition-all ${
              todo.checked ? "opacity-60 line-through" : ""
            }`}
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleCheck(todo.id)}
                className="w-5 h-5 accent-green-500"
              />
              <span className="text-gray-800 font-medium">{todo.text}</span>
            </div>
            <div className="flex gap-3 text-xl">
              <motion.button
                onClick={() => {
                  setEditingTodo(todo);
                  setNewTodo(todo.text);
                }}
                whileTap={{ scale: 0.9 }}
                title="Edit"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <i className="ri-edit-2-line"></i>
              </motion.button>
              <motion.button
                onClick={() => removeTodo(todo.id)}
                whileTap={{ scale: 0.9 }}
                title="Delete"
                className="text-red-500 hover:text-red-700 transition"
              >
                <i className="ri-delete-bin-line"></i>
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
