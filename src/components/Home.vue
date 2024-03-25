<script>
import { ref } from "vue";
import Datepicker from "vue3-datepicker";

import { useCollection } from "vuefire";
import { collection , getDocs } from "firebase/firestore";

import { db } from "../firestore";
const dat = useCollection(collection(db, 'Employeelist'));
export default {
  data() {
    return {
      Editing: false,
      textFieldValue: "Initial Text",
      editValue: "",
      id: null,
      name: "",
      project: "",
      slice: "",
      Estihr: "",
      startdate: "",
      enddate: "",
      updatedlist: [],
      inputsearch: "",
      selectfilter: "name",
    };
  },

  methods: {
    editclick() {
      this.Editing = true;
    },
    saveclick() {
      this.Editing = false;
    },
    async addclick() {
      try {
        await this.$store.dispatch("addRowaction", {
          //id: Math.floor(Math.random() * 10) + 1,
          //name: this.name,
          //project: this.project,
          //slice: this.slice,
          //Estihr: this.Estihr,
          //startdate: this.startdate,
          //enddate: this.enddate,
          name: this.name,
            project: this.project,
            slice: this.slice,
            Estihr: this.Estihr,
            startdate: this.startdate,
            enddate: this.enddate,
            
        });

        // Reset form fields after adding data
          this.name = "";
          this.project = "";
          this.slice = "";
          this.Estihr = "";
          this.startdate = "";
          this.enddate = "";
      } 
      catch (error) {
        console.error("Error adding data to Firestore: ", error);
      }
      
    },
    deleteRow(id) {
      this.$store.dispatch("deleteRowaction", id);

    },
    deleteAll() {
      this.$store.dispatch("deleteAllRowaction");
    },
    editRow(id) {
      this.$store.dispatch("isEditinginputRowaction", id);
    },
    saveRow(id) {
      this.$store.dispatch("isEditinginputRowsaveaction", id);
      const latestId = this.updatedlist.filter((n) => n.id === id);
      this.$store.dispatch("editRowdataaction", latestId);
    },
    namechangeinput(e) {
      const dataId = event.target.getAttribute("data-id");

      const updatedobject = this.updatedlist.push({
        id: dataId,

        name: e.target.value,

        project: this.$store.state.list[dataId].project,

        slice: this.$store.state.list[dataId].slice,

        Estihr: this.$store.state.list[dataId].Estihr,

        startdate: this.$store.state.list[dataId].startdate,

        enddate: this.$store.state.list[dataId].enddate,
      });

      this.$store.dispatch("editRowdataaction", updatedobject);
    },

    projectchangeinput(e) {
      const dataId = event.target.getAttribute("data-id");

      const updatedobject = this.updatedlist.push({
        id: dataId,

        name: this.$store.state.list[dataId].name,

        project: e.target.value,

        slice: this.$store.state.list[dataId].slice,

        Estihr: this.$store.state.list[dataId].Estihr,

        startdate: this.$store.state.list[dataId].startdate,

        enddate: this.$store.state.list[dataId].enddate,
      });

      this.$store.dispatch("editRowdataaction", updatedobject);
    },

    slicechangeinput(e) {
      const dataId = event.target.getAttribute("data-id");

      const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

      const temp = urlRegex.test(e.target.value);

      const updatedobject = this.updatedlist.push({
        id: dataId,

        name: this.$store.state.list[dataId].name,

        project: this.$store.state.list[dataId].project,

        slice: temp ? e.target.value : "",

        Estihr: this.$store.state.list[dataId].Estihr,

        startdate: this.$store.state.list[dataId].startdate,

        enddate: this.$store.state.list[dataId].enddate,
      });

      this.$store.dispatch("editRowdataaction", updatedobject);
    },

    estihrchangeinput(e) {
      const dataId = event.target.getAttribute("data-id");

      const updatedobject = this.updatedlist.push({
        id: dataId,

        name: this.$store.state.list[dataId].name,

        project: this.$store.state.list[dataId].project,

        slice: this.$store.state.list[dataId].slice,

        Estihr: e.target.value,

        startdate: this.$store.state.list[dataId].startdate,

        enddate: this.$store.state.list[dataId].enddate,
      });

      this.$store.dispatch("editRowdataaction", updatedobject);
    },

    startdatechangeinput(e) {
      const dataId = event.target.getAttribute("data-id");

      const updatedobject = this.updatedlist.push({
        id: dataId,

        name: this.$store.state.list[dataId].name,

        project: this.$store.state.list[dataId].project,

        slice: this.$store.state.list[dataId].slice,

        Estihr: this.$store.state.list[dataId].Estihr,

        startdate: e.target.value,

        enddate: this.$store.state.list[dataId].enddate,
      });

      this.$store.dispatch("editRowdataaction", updatedobject);
    },

    enddatechangeinput(e) {
      const dataId = event.target.getAttribute("data-id");

      const updatedobject = this.updatedlist.push({
        id: dataId,

        name: this.$store.state.list[dataId].name,

        project: this.$store.state.list[dataId].project,

        slice: this.$store.state.list[dataId].slice,

        Estihr: this.$store.state.list[dataId].Estihr,

        startdate: this.$store.state.list[dataId].startdate,

        enddate: e.target.value,
      });

      this.$store.dispatch("editRowdataaction", updatedobject);
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    },
    async loaddata(){
    try{
    await this.$store.dispatch("fetchData")
    }
    catch{
    }

    },
  },
  computed: {
    finalresult() {
      if (this.inputsearch.length !== 0) {
        return this.$store.state.list.filter((e) => {
          const filterValue = e[this.selectfilter].toLowerCase();
          return filterValue.includes(this.inputsearch.toLowerCase());
        });
      } else {
        return this.$store.state.list;
      }
    },
  },
  created(){
  this.loaddata();
  },
  components: {
    Datepicker,
  },
  setup() {
    const selectedDate = ref(null);

    return {
      selectedDate,
    };
  },
   mounted() {
this.$store.dispatch("getData");
  

  //const datsss = await getDocs(collection(db, "Employeelist"));
  //datsss.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log(doc.id, doc.data());
  //this.$store.dispatch("getData" , doc.data());

  //});
  },
};
</script>

<template>
  <div class="tablemain">
    <div class="searchblock">
      <form @submit.prevent="search">
        <label for="searchInput">Search:</label>
        <input
          type="search"
          id="searchInput"
          name="searchInput"
          placeholder="Enter your name"
          v-model="inputsearch"
        />
        <select id="dropdown" name="dropdown" v-model="selectfilter">
          <option value="name">name</option>
          <option value="project">project</option>
          <option value="slice">slice</option>
        </select>
      </form>
    </div>

    <div class="tableheader">Main Head DMG</div>
    <div class="tablerow" v-for="(items, index) in finalresult" :id="items.id">
      <div class="tableblock">
        {{ items.name }}
        <input
          type="text"
          v-model="items.name"
          v-if="items.isEditinginput"
          @input="namechangeinput"
          :data-id="items.id"
        />
      </div>
      <div class="tableblock">
        {{ items.project }}
        <input
          type="text"
          v-model="items.project"
          v-if="items.isEditinginput"
          @input="projectchangeinput"
          :data-id="items.id"
        />
      </div>
      <div class="tableblock">
        {{ items.slice }}
        <input
          type="text"
          v-model="items.slice"
          v-if="items.isEditinginput"
          @input="slicechangeinput"
          :data-id="items.id"
        />
      </div>
      <div class="tableblock">
        {{ items.Estihr }}
        <input
          type="text"
          v-model="items.Estihr"
          v-if="items.isEditinginput"
          @input="estihrchangeinput"
          :data-id="items.id"
        />
      </div>
      <div class="tableblock">
        {{ formatDate(items.startdate) }}

        <datepicker
          v-model="items.startdate"
          v-if="items.isEditinginput"
          @input="startdatechangeinput"
          :data-id="items.id"
        ></datepicker>
      </div>
      <div class="tableblock">
        {{ formatDate(items.enddate) }}
        <datepicker
          v-model="items.enddate"
          v-if="items.isEditinginput"
          @input="enddatechangeinput"
          :data-id="items.id"
        ></datepicker>
      </div>
      <div class="button-cell">
        <button
          class="button edit"
          v-if="!items.isEditinginput"
          @click="editRow(items.id)"
        >
          Edit
        </button>
      </div>
      <div class="button-cell">
        <button
          class="button save"
          v-if="items.isEditinginput"
          @click="saveRow(items.id)"
        >
          save
        </button>
      </div>
      <div class="button-cell">
        <button class="button delete" @click="deleteRow(items.id)">
          Delete
        </button>
      </div>
    </div>

    <div class="tablerow">
      <div class="tableblock"><input type="text" v-model="name" /></div>
      <div class="tableblock"><input type="text" v-model="project" /></div>
      <div class="tableblock"><input type="text" v-model="slice" /></div>
      <div class="tableblock"><input type="text" v-model="Estihr" /></div>
      <div class="tableblock"><input type="text" v-model="startdate" /></div>
      <div class="tableblock"><input type="text" v-model="enddate" /></div>
      <div class="button-cell">
        <button class="button edit">Edit</button>
      </div>
      <div class="button-cell">
        <button class="button" @click="addclick()">Add</button>
      </div>
      <div class="button-cell">
        <button class="button delete" @click="deleteRow()">Delete</button>
      </div>
    </div>

    <div class="deleteall">
      <button class="button deleteall" @click="deleteAll()">Delete All</button>
    </div>
  </div>

  <ul>
    <li v-for="todo in dat" :key="todo.id">
      <span>my test</span>
    </li>
  </ul>
</template>
<style>
.tablemain {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  margin: 40px 0px;
}

.tableheader,
.tablerow {
  display: flex;
  background-color: #3498db;
  color: #fff;
  font-weight: bold;
}

.tableblock,
.button-cell {
  flex: 1;
  padding: 10px;
  text-align: center;
}

.tablerow {
  background-color: #ecf0f1;
}
.tableheader {
  padding: 10px;
}
.tablerow:hover {
  background-color: #bdc3c7;
}
.tableblock {
  color: #000;
}
.button {
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
}

.button.edit {
  background-color: #3498db;
}

.button.delete {
  background-color: #e74c3c;
}
.tablenameblock {
  display: flex;
  flex-wrap: wrap;
}
.searchblock {
  margin-bottom: 20px;
  padding: 20px;
}
.searchblock form label {
  margin-right: 10px;
}

.searchblock form button {
  margin-left: 20px;
}
.search-filter {
  padding: 20px;
}
</style>
