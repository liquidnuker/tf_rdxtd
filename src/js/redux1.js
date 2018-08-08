import {createStore} from "redux";

const initialState = {
  visibilityFilter: "SHOW_ALL",
  todos: [{
    id: "id1",
    text: "text1",
    completed: true
  }, {
    id: "id2",
    text: "text2",
    completed: true
  }, {
    id: "id3",
    text: "text3",
    completed: true
  }]
};

// reducer helpers
// ======================================================/
const updateObject = (oldObject, newValues) =>  {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
};

const updateItemInArray = (array, itemId, updateItemCallback) => {
  // array = state.todos
  // itemId = action.id

  let updatedItems = array.map((i) => {
    if (i.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return i;
    }

    // item to be updated
    // console.log(i); // Object { id: "id1", text: "text1", completed: true }

    // Use the provided callback to create an updated item
    let updatedItem = updateItemCallback(i);
    return updatedItem;
  });

  // return all items with the updated item
  return updatedItems;
};

const indexFinder = (arr, value) =>  {
  for (let key = 0; key < arr.length; key++) {
    if (arr[key].id === value) {
      return key;
    }
  }
};

// reducer functions
// ======================================================/
const setVisibilityFilter = (state, action) => {
  return updateObject(state, {
    visibilityFilter: action.filter
  });
};

const addTodo = (state, action) => {
  let addTodos = state.todos.concat({
    id: action.id,
    text: action.text,
    completed: false
  });
  return updateObject(state, {
    todos: addTodos
  });
};

const editTodo = (state, action) => {
  let newTodos = updateItemInArray(state.todos, action.id, (i) => {
    return updateObject(i, {
      text: action.text
    });
  });
  return updateObject(state, {
    todos: newTodos
  });
};

const toggleTodo = (state, action) => {
  let toggleTodos = updateItemInArray(state.todos, action.id, (i) => {
    return updateObject(i, {
      completed: !i.completed
    });
  });

  return updateObject(state, {
    todos: toggleTodos
  });
};

const deleteTodo = (state, action) => {
  let arr2 = state.todos;
  arr2.splice(indexFinder(arr2, action.id), 1);

  return updateObject(state, {
    todos: arr2
  });  
};

function appReducer(state = initialState, action) {
  switch (action.type) {
  case "SET_VISIBILITY_FILTER":
    return setVisibilityFilter(state, action);

  case "ADD_TODO":
    return addTodo(state, action);

  case "TOGGLE_TODO":
    return toggleTodo(state, action);

  case "EDIT_TODO":
    return editTodo(state, action);

  case "DELETE_TODO":
    return deleteTodo(state, action);

  default:
    return state;
  }
}

const showItems = () => {
  console.log(fromStore.visibilityFilter);

  for (let i in fromStore.todos) {
    console.log(fromStore.todos[i]);
  }
};

let store = createStore(appReducer);
let fromStore = "";

store.subscribe(() => {
  fromStore = store.getState();
    showItems();
  }
);

store.dispatch({
  type: "DELETE_TODO",
  id: "id3"
});

store.dispatch({
  type: "ADD_TODO",
  id: "id3",
  text: "addtodotext1"
});

store.dispatch({
  type: "TOGGLE_TODO",
  id: "id3"
});

store.dispatch({
  type: "EDIT_TODO",
  id: "id3",
  text: "editedText"
});