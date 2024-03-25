// store.js

import { createStore } from "vuex";
import { collection, getDocs , addDoc} from "firebase/firestore";
import { db } from "./firestore";
export default createStore({
  state: {
    list: [],
  },

  mutations: {
    addRow(state, payload) {
      state.list.push(payload);
      console.log(state.list);
    },
    editRow(state, payload) {
      state.list.push(payload);
    },
    deleteRow(state, id) {
      const payloadId = id;
      state.list = state.list.filter((item) => item.id !== id);
    },
    deleteAllRow(state) {
      state.list = [];
    },
    isEditinginputRow(state, id) {
      const payloadId = id;
      state.list = state.list.filter((item) => {
        if (item.id === id) {
          item.isEditinginput = true;
        }

        return true;
      });
    },

    isEditinginputRowsave(state, id) {
      const payloadId = id;
      state.list = state.list.filter((item) => {
        if (item.id === id) {
          item.isEditinginput = false;
        }

        return true;
      });
    },

    editRowdata(state, payload) {
      const payloadId = payload.id;
      state.list = state.list.filter((item) => {
        if (item.id === payload.id) {
          item.name = payload.name;
          item.project = payload.project;
          item.slice = payload.slice;
          item.Estihr = payload.Estihr;
          item.startdate = payload.startdate;
          item.enddate = payload.enddate;
        }

        return true;
      });
    },

    inputsearchdata(state, payload) {
      const res = state.list.filter((e) => {
        return e.name.toLowerCase().includes(payload.toLowerCase());
      });

      console.log(res);
    },
    getDatamutation(state, payload) {
      state.list.push(payload);
      console.log(payload);
    },
  },

  actions: {
    async addRowaction({ commit }, payload) {
      try{
        const docRef = await addDoc(collection(db, "Employeelist"), payload);
        commit("addRow", { ...payload, id: docRef.id });
        console.log("Document written with ID: ", docRef.id);
      }
      //console.log(payload);
      //commit("addRow", payload);
      catch (error) {
        console.error("Error adding document: ", error);
        throw error; // Rethrow the error to handle it in the component
      }
    },

    deleteRowaction({ commit }, id) {
      commit("deleteRow", id);
    },

    deleteAllRowaction({ commit }) {
      commit("deleteAllRow");
    },
    isEditinginputRowaction({ commit }, payload) {
      commit("isEditinginputRow", payload);
    },
    isEditinginputRowsaveaction({ commit }, payload) {
      commit("isEditinginputRowsave", payload);
    },
    editRowdataaction({ commit }, payload) {
      commit("editRowdata", payload);
    },
    inputsearchaction({ commit }, payload) {
      commit("inputsearchdata", payload);
    },

    async getData({ commit }, payload) {
      
      //console.log(payload);
      const datsss = await getDocs(collection(db, "Employeelist"));
      datsss.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, doc.data());
       commit("getDatamutation", doc.data());
      });
    },
    //     async fetchData({ commit }) {
    //       try {

    // /*
    // *
    // *
    // *
    // * FETCH HERE
    // *
    // *
    // */
    //         // Retrieve data from Firestore
    //        const querySnapshot = await todosRef.get();

    //        // const data = [];
    //         //querySnapshot.forEach((doc) => {
    //          // data.push({ id: doc.id, ...doc.data() });
    //         //});
    //        // console.log(data, 'this is the data')
    //         // Commit the data to the store
    //         // commit('setFirestoreData', data);
    //       } catch (error) {
    //         console.error('Error fetching data from Firestore:', error);
    //       }
    //     },
  },
});
