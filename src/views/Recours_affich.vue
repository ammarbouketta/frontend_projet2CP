<template>
<v-app>
  <Navbar/>
  <div class="projects">
    <h1 class="subheading grey--text">Liste de recours</h1>
    <v-container>
      <v-layout row wrap class="mb-4">
      <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="green" router to=/recours class="mr-2" dark v-on="on">
           <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">ajouter recours</span>
        </v-btn>
         <a :href = 'link' target="_blank">Telecharger dernier recours ajouté</a>
      </template>
        <span>saisir un recours</span>
      </v-tooltip>
      </v-layout>
      <v-card flat  v-for="project in projects" :key="project.email" class="mb-1">
          <v-layout row wrap :class="`pa-3 project ${project.type_profil}`">
            <v-flex xs12 md6>
                <div class="caption grey--text">Nom</div>
                <div >{{project.nom}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">prenom</div>
                <div >{{project.prenom}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">motif de recours</div>
                <div >{{project.motif}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">date</div>
                <div >{{project.date_recours}}</div>
            </v-flex>
          </v-layout>
      </v-card>
    </v-container>
  </div>
  <Footer/>
</v-app>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
    
  name: 'projects',
  components: {
   Navbar,
   Footer
  },
  data: () => ({
    link : "http://localhost:3000/Accusé_Reception1.docx"  ,
    projects : []
  }),
  async mounted ()  {
    const res = await axios.get('http://localhost:3000/recours/afficher',
    {
      headers : {
        'Authorization' : 'Bearear ' + localStorage.getItem('token')
      },
    })
    this.projects = res.data
    
    
    
  },
 
  }
</script>
<style >
  .project {
      border-left: 4px solid orange;
  }
  
   .v-chip.valideur {
      color: #3cd1c2;
  }
  .p.ovnored {
      color: red;
  }
  
</style>