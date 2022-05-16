<template>
<v-app>
  <Navbar/>
  <h1 class="subheading grey--text">Documents administratifs</h1>
<div class="global_container">
  <div class="file-upload">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input classe="input" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()" class="upload-button">Submit</button>
    </div>
     <div class="list_file">
      <ul>
          <li v-for="item in items" :key="item" @click="upload(item)"> 
            <a :href = 'link + item' target="_blank">{{item}}</a>
          </li>

    
   
  
</ul>
    </div>
  </div>
   
  
</div>
  


  <Footer/>
</v-app>
</template>


<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import axios from "axios";
  export default {
    components: {Navbar, Footer},
    /*
      Defines the data used by the component
    */
    data(){
      return {
   
          items: [],
          link : "http://localhost:3000/"  ,
        file: ''
      }
    },
   async mounted () {
      const res = await axios.get( 'http://localhost:3000/doc/list_file')
            console.log(res.data);
            this.items = res.data
    },
    methods: {
      /*
        Submits the file to the server
      */
     async upload (file) {
       
       const res = await axios.get( 'http://localhost:3000/doc/send_file',{ params: { file: file }})
            console.log(res.data);
    },
     
      async submitFile(){
        try {
          /*
        
                Initialize the form data
            */
            const formData = new FormData();
            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);
        /* 
          Make the request to the POST /single-file URL
        */
            await axios.post( 'http://localhost:3000/doc/file',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            )
            console.log('SUCCESS!!');
            
            
        }catch(e) {
          console.log('FAILURE!!');
        }
        
      },
      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
    }
  
</script>









<style >
.file-upload {
  box-shadow: 2px 2px 9px 2px #ccc;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1rem;
  width: 60%;
  margin: 0 auto;
}
.upload-button {
  width: 7rem;
  padding: 0.5rem;
  background-color: #06223b;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 1rem;
  
}
</style>