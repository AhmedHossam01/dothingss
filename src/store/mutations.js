export default {
  removeItem(state, id) {
    state.todos.splice(
      state.todos.findIndex(item => item.id == id),
      1
    );
  },

  toggleAddingTodo(state) {
    state.addingTodo = !state.addingTodo;
  },

  addTodo(state, { text, category, id }) {
    if (text.length == 0 || category.length == 0) {
      return;
    }

    state.todos.push({
      id: id,
      text: text,
      category: category,
      completed: false,
      editing: false
    });
  },

  updateTodo(state, { newValue, id }) {
    if (newValue.length == 0) {
      return;
    }

    const index = state.todos.findIndex(item => item.id == id);
    state.todos[index].text = newValue;
  },

  checkTodo(state, { newValue, id }) {
    const index = state.todos.findIndex(item => item.id == id);
    state.todos[index].completed = newValue;
  },

  getTodos(state, todos) {
    state.todos = todos;
  },

  getCategories(state, categories) {
    state.categories = categories;
  },

  addCategory(state, {
    name, 
    authorID, 
    ID}) {
    state.categories.push({
      name: name,
      authorID: authorID,
      id: ID
    });
  },

  removeCategory(state, id) {
    state.categories.splice(
      state.categories.findIndex(category => category.id == id),
      1
    );
  }
};
