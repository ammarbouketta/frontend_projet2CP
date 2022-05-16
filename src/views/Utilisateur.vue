<template>
<v-app>
  <Navbar/>
  <div class="projects">
    <h1 class="subheading grey--text">Liste du personnel de commission </h1>
    <v-container>
      <v-layout row wrap class="mb-4">
      <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="green" router to=/Inscription class="mr-2" dark v-on="on">
           <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">ajouter utilisateur</span>
        </v-btn>
      </template>
        <span>s'inscrire</span>
      </v-tooltip>
       <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="blue" @click="sortBy('email')" class="mr-2" dark v-on="on">
           <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">trier par email</span>
        </v-btn>
      </template>
        <span>trier personnel</span>
      </v-tooltip>
      </v-layout>
      <v-card flat  v-for="project in projects" :key="project.email" class="mb-1">
          <v-layout row wrap :class="`pa-3 project ${project.type_profil}`">
            <v-flex xs12 md6>
                <div class="caption grey--text">email</div>
                <div >{{project.email}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">mot de passe</div>
                <div >******</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">type profil</div>
                <div >{{project.type_profil}}</div>
            </v-flex>
             <v-flex xs6 sm4 md2>
                   <v-avatar size="30" class="red lighten-2">
                     <img :src="photo_de_profil" alt="" >
                   </v-avatar>
            </v-flex>
             <v-flex xs6 sm4 md1>
                    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="green"  class="mr-2" dark v-on="on" @click="showModal = true">
           <v-icon left small>delete</v-icon>
            <span class="caption text-lowercase">supprimer</span>
        </v-btn>
         <transition name="fade" appear>
           
  <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
 </transition>
 <transition name="slide" appear>
  <div class="modal" v-if="showModal">
   <h1> <v-icon color="red" left size="40">warning</v-icon> ATTENTION !</h1>
   <div>voulez-vous supprimer l'utilisateur : </div>
     <div >{{project.email}}</div>
   <v-row>
   <v-btn  @click="supprimer(project.email)"   small outlined color="green"  class="mr-2" dark v-on="on">
    <v-icon left small>done</v-icon>
    <span class="caption text-lowercase">confirmer</span> 
   </v-btn>
   <v-btn @click="showModal = false" small outlined color="red"  class="mr-2" dark v-on="on">
    <v-icon left small>dangerous</v-icon>
    <span class="caption text-lowercase">annuler</span>
   </v-btn>
   </v-row>
  </div>
 </transition>
      </template>
        <span>supprimer cet utilisateur</span>
      </v-tooltip>
              </v-flex> 
               <v-flex xs6 sm4 md1>
                    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="green"  class="mr-2" dark v-on="on" @click="info(project.email)">
           <v-icon left small>infos</v-icon>
            <span class="caption text-lowercase">infos</span>
        </v-btn>
      </template>
        <span>information de cet utilisateur</span>
      </v-tooltip>
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
import router from '../router/index'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  name: "projects",
  components: {
    Navbar,
    Footer
  },
  data: () => ({
    projects: [
      
    ],
    photo_de_profil: "/img1.png",
    //showModal: false,
  }),
  
  async mounted ()  {
    const res = await axios.get('http://localhost:3000/user/afficher',
    {
      headers : {
        'Authorization' : 'Bearear ' + localStorage.getItem('token')
      },
    })
    this.projects = res.data; 

  },
   methods: {
    sortBy(prop) {
      this.project.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));


    },
    supprimer(email) {
      this.showModal = false
      const res = axios.delete('http://localhost:3000/user/delete',
      {
        data : {
          'email' : email
        },
        headers : {
        'Authorization' : 'Bearear ' + localStorage.getItem('token')
      },

      }
    )
    router.push({ name: 'acceuil' })
    console.log(res)
    },

    info(email) {
    localStorage.setItem('email',email)
    router.push({ name: 'info_user' })
    }
    // 
    
    
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

