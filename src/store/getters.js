export default {
  categoriesName(state) {
    return state.categories.map(category => category.name);
  },
  sortTodos: state => categroy => {
    return state.todos.filter(item => item.category == categroy);
  }
};
