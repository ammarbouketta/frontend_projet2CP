<template>
<v-app>
  <Navbar/>
  <div class="projects">
    <h1 class="subheading grey--text">Classement des demandeurs</h1>
    <v-container>
            <v-tooltip bottom>
 <template v-slot:activator="{ on }">
   
 <v-btn small outlined color="green" router to=/Classement class="mr-2" dark v-on="on" @click="classement()">
 <v-icon left small>dialpad</v-icon>
 <span class="caption text-lowercase"> Fichier classement</span>
  
 </v-btn>
  </template>
 <span>genrer fichier classement</span>
 </v-tooltip>
 <a :href = 'link' target="_blank">Telecharger fichier classement</a>
     
     
      <v-card flat  v-for="project in projects" :key="project.Numero_dossier" class="mb-1">
          <v-layout row wrap :class="`pa-3 project ${project.type_profil}`">
              <v-flex xs6 sm4 md2>
                <div class="caption grey--text">prénom</div>
                <div >{{project.info_generale.prenom}}</div>
            </v-flex>
            <v-flex xs12 md6>
                <div class="caption grey--text">nom</div>
                <div >{{project.info_generale.nom}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">nombre de points</div>
                <div >{{project.Nombre_de_points}}</div>
            </v-flex>
            
             <v-layout row wrap class="mb-2">
             <v-flex left ="400px" xs6 sm6 md2 >
                    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="green"  class="mr-2" dark v-on="on" @click="infos(project.Numero_dossier)">
           <v-icon left small>infos</v-icon>
            <span class="caption text-lowercase">Info</span>
        </v-btn>

<!-- <transition name="fade" appear>
           
  <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
 </transition>
 <transition name="slide" appear>
  <div class="modal" v-if="showModal">
   <h1> <v-icon color="red" left size="40">warning</v-icon> ATTENTION !</h1>
   <div>voulez-vous supprimer le demandeur : </div>
     <div >{{project.nom}}</div>
   <v-row>
   <v-btn  @click="supprimer(project.Numero_dossier)"   small outlined color="green"  class="mr-2" dark v-on="on">
    <v-icon left small>done</v-icon>
    <span class="caption text-lowercase">confirmer</span> 
   </v-btn>
   <v-btn @click="showModal = false" small outlined color="red"  class="mr-2" dark v-on="on">
    <v-icon left small>dangerous</v-icon>
    <span class="caption text-lowercase">annuler</span>
   </v-btn>
   </v-row>
  </div>
 </transition> -->

      </template>
        
      </v-tooltip>
              </v-flex> 
               <v-flex xs6 sm4 md2>
                    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
           <v-btn small outlined color="green"  class="mr-2" dark v-on="on" @click="points(project.Numero_dossier)">
           <v-icon left small>dialpad</v-icon>
            <span class="caption text-lowercase">points accordés</span>
        </v-btn>
      </template>
      <span>les points accordés pour cet demandeur</span>
    </v-tooltip>
              </v-flex>
               <v-flex xs6 sm4 md2>


  <v-tooltip bottom>
      <template v-slot:activator="{ on }">
          <v-btn small outlined color="blue"  class="mr-2" dark v-on="on" @click="etat_actuel(project.Numero_dossier)">
           <v-icon left small>history</v-icon>
            <span class="caption text-lowercase">état actuel</span>
        </v-btn>
      </template>
      <span>fichier word des information de cet demandeur</span>
    </v-tooltip>

      
              </v-flex>  
             </v-layout>
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
import router from '../router/index'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  name: "projects",
  components: {Navbar, Footer},
  data: () => ({
    link : "http://localhost:3000/classement1.docx"  ,
    projects: [],
    //showModal: true,
  }),
    async mounted ()  {
    const res = await axios.get('http://localhost:3000/demandeur/allV',
    {
      headers : {
        'Authorization' : 'Bearear ' + localStorage.getItem('token')
      },
    })
    this.projects = res.data;
    console.log(res)
  },
  methods: {
    infos (id) {
      localStorage.setItem('Numero_dossier',id)
      router.push({ name: 'saisie'})
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    // supprimer(Numero_dossier) {
    //   this.showModal = false
    //   const res = axios.delete('http://localhost:3000/demandeur/delete',
    //   {
    //     data : {
    //       'Numero_dossier' : Numero_dossier
    //     },
    //     headers : {
    //     'Authorization' : 'Bearear ' + localStorage.getItem('token')
    //   },
    //   }
    // )
    // router.push({ name: 'acceuil' })
    // console.log(res)
    // },
    points(id) {
      //axios.get('http://localhost:3000/demandeur/test', { params : { id : id }})
      localStorage.setItem('Numero_dossier',id)
      //console.log(res)
      router.push({ name: 'points'})
    },
    
    async classement () {
      try {
        const res = await axios.post('http://localhost:3000/demandeur//classement/pdf')
        console.log(res)
        alert('classement géneré avec succée sous format word')
      } catch (e) {
        alert('error')
      }
    }
  },
};
</script>
<style >
.project.valideur {
  border-left: 4px solid #3cd1c2;
}
.project.editeur {
  border-left: 4px solid orange;
}
.project.administrateur {
  border-left: 4px solid red;
}
.v-chip.valideur {
  color: #3cd1c2;
}
.p.ovnored {
  color: orange;
}
.p.administrateur {
  color: red;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  padding: 25px;
}
.modal.h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}
.modal.p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>