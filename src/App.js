import React, { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./services/todoService";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data?.todos || []); // Ensure todos is always an array
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            const newTask = { id: Date.now().toString(), title: newTodo };
            setTodos([...todos, newTask]); // Optimistic UI update
            setNewTodo("");
            await addTodo(newTask);
            fetchTodos(); // Ensure data stays consistent with DB
        }
    };
    
    const handleUpdateTodo = async (id) => {
        const updatedTitle = prompt("Enter new title:");
        if (updatedTitle) {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, title: updatedTitle } : todo)); // UI update
            await updateTodo(id, updatedTitle);
            fetchTodos();
        }
    };
    
    const handleDeleteTodo = async (id) => {
        setTodos(todos.filter(todo => todo.id !== id)); // Optimistically remove from UI
        await deleteTodo(id);
        fetchTodos();
    };
    
    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTodo}>Add</button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => handleUpdateTodo(todo.id)}>Edit</button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
