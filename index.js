const todos = [
    {
        id: 1,
        task: "Hitta pengar",
        done: false,
    },
];

exports.handler = async (event) => {
    const { method } = event.requestContext.http;
    let responseMessage = event;

    if (method === "GET") {
        if (event.hasOwnProperty("queryStringParameters")) {
            responseMessage = getSingleTodo(event);
        } else {
            responseMessage = getAllTodos();
        }
    }

    if (method === "POST") responseMessage = addNewTodo(event);

    if (method === "PUT") responseMessage = changeTodoStatus(event);

    if (method === "DELETE") responseMessage = deleteTodo(event);

    response = {
        statusCode: 200,
        body: JSON.stringify(responseMessage),
    };
    return response;
};

// GET
// Genom ett GET-anrop skall man kunna hämta alla todouppgifter i arrayen.
function getAllTodos() {
    return {
        message: "All Todos:",
        todos: todos,
    };
}
// POST
// Genom ett POST-anrop där du skickar med ett nytt objekt i eventets body skall du lägga till den nya todon i arrayen.
function addNewTodo(event) {
    const taskInput = JSON.parse(event.body).task;
    const newTodo = {
        id: todos[todos.length - 1].id + 1,
        task: taskInput,
        done: false,
    };
    todos.push(newTodo);
    return {
        message: "New todo added:",
        todo: newTodo,
    };
}

// GET
// Använd dig av query parametrar för att hämta en specifik todo.
function getSingleTodo(event) {
    const id = event.queryStringParameters.id;
    const foundTodo = todos.find((todo) => todo.id === Number(id));
    return {
        message: "found todo:",
        todo: foundTodo,
    };
}

// PUT
// Genom ett PUT-anrop där du anger vilken todo som skall uppdateras i en query parameter, så skall den angivna todon toggla "done".
function changeTodoStatus(event) {
    const id = event.queryStringParameters.id;
    const foundTodo = todos.find((todo) => todo.id === Number(id));
    foundTodo.done ? (foundTodo.done = false) : (foundTodo.done = true);
    return {
        message: "Todo changed:",
        todo: foundTodo,
    };
}

// DELETE
// Genom ett DELETE-anrop där du anger vilken todo som skall tas bort i en query parameter, så skall den angivna todon raderas.
function deleteTodo(event) {
    const id = event.queryStringParameters.id;
    const foundTodo = todos.find((todo) => todo.id === Number(id));
    const index = todos.indexOf(foundTodo);
    todos.splice(index, 1);
    return {
        message: "Todo Deleted:",
        todo: foundTodo,
    };
}
