const API_URL = "https://ea02f6ihif.execute-api.ca-central-1.amazonaws.com/prod"; 

export const getTodos = async () => {
    const response = await fetch(API_URL);
    return response.json(); // Ensure this returns `{ todos: [...] }`
};

export const addTodo = async (todo) => {
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
};

export const updateTodo = async (id, title) => {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
};

export const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
