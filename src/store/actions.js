import db from "../../firebase";
import firebase from "firebase";

let currUserId = "";

export default {
  getTodos({ commit, state }) {
    if (firebase.auth().currentUser) {
      currUserId = firebase.auth().currentUser.uid;
    }

    db.collection("todos")
      .where("authorID", "==", currUserId)
      .get()
      .then(snapshot => {
        let todos = [];
        snapshot.docs.forEach(doc => {
          const todo = {
            category: doc.data().category,
            text: doc.data().text,
            id: doc.id,
            completed: doc.data().completed,
            editing: doc.data().editing
          };
          todos.push(todo);
        });

        commit("getTodos", todos);

        if (!todos.length) {
          state.requiresAlertTodos = true
        }

        state.loading = false
      });
  },

  getCategories({ commit }) {
    if (firebase.auth().currentUser) {
      currUserId = firebase.auth().currentUser.uid;
    }

    db.collection("categories")
      .where("authorID", "==", currUserId)
      .get()
      .then(snapshot => {
        let categories = [];
        snapshot.docs.forEach(doc => {
          const category = {
            name: doc.data().name,
            id: doc.id
          };
          categories.push(category);
        });
        commit("getCategories", categories);
      });
  },

  removeItem({ commit }, id) {
    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        commit("removeItem", id);
      });
  },

  removeCategory({ commit }, id) {
    db.collection("categories")
      .doc(id)
      .delete()
      .then(() => {
        commit("removeCategory", id);
      });
  },

  addTodo({ commit, state }, { text, category }) {
    db.collection("todos")
      .add({
        text: text,
        completed: false,
        editing: false,
        category: category,
        authorID: currUserId
      })
      .then(docRef => {
        commit("addTodo", {
          text: text,
          completed: false,
          editing: false,
          category: category,
          id: docRef.id
        });
        state.requiresAlertTodos = false
      });
  },

  updateTodo({ commit }, { newValue, id, category }) {
    db.collection("todos")
      .doc(id)
      .set({
        text: newValue,
        completed: false,
        editing: false,
        category: category,
        authorID: currUserId
      })
      .then(() => {
        commit("updateTodo", {
          newValue,
          id
        });
      });
  },

  checkTodo({ commit }, { newValue, id, text, category }) {
    db.collection("todos")
      .doc(id)
      .set({
        id: id,
        text: text,
        completed: newValue,
        editing: false,
        authorID: currUserId,
        category: category
      })
      .then(() => {
        commit("checkTodo", {
          newValue,
          id
        });
      });
  },

  // Use default parameters to set authorID to currUserId, and then call this action
  // from register and pass the uid to it. Search to know how to get uid after register

  addCategory({ commit }, name) {
    db.collection("categories")
      .add({
        name: name,
        authorID: currUserId
      })
  },

  addDefaultCategory({ commit }, id) {
    db.collection("categories")
      .add({
        name: "Today",
        authorID: id
      })
  }
};
