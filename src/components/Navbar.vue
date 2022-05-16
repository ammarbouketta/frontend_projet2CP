<template>
   <nav>
     
       <v-app-bar  color=#142850 dark app >
           <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
           <v-toolbar-title class="text-uppercase ">
               <span class="font-weight-light">ESI-</span>
               <span>LOG</span>
           </v-toolbar-title>
           <v-spacer></v-spacer>
           <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          v-on="on"
        >
          <v-icon left>expand_more</v-icon>
            <span>Menu</span>
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
          <v-list-item-title >{{link.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
            </v-menu>
            <v-btn text @click="exit()">
                <span>Exit</span>
                <v-icon right>exit_to_app</v-icon>
             </v-btn>
       </v-app-bar>
      <v-navigation-drawer  v-model="drawer" dark app class="=#142850 darken-4">
          <v-layout column align-center>
               <v-flex class="mt-5"> 
                    <v-avatar size="100">
                            <img src="/img1.png" alt="">
                    </v-avatar>
                    <p class="white--text subheading mt-1 text-center">{{username}}</p>
                    <p class="white--text subheading mt-1 text-center">{{profil}}</p>
               </v-flex>
               <v-flex class="mt-4 mb-4">
                <Popup />
               </v-flex>
          </v-layout>
          <v-list flat>
              <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
                  <v-list-item-action>
                     <v-icon >{{link.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content >
                      <v-list-item-title >{{link.text}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
      </v-navigation-drawer>
   </nav>
</template>
<script>
//import axios from "axios";
import axios from "axios";
import router from '../router/index'
import Popup from './Popup.vue'
export default {
  
   data: () => ({
      username : 'Utilisateur',
      profil : '{Actif}',
      drawer: true,
      links :[
          {icon: 'timeline', text:'Statistiques', route: '/acceuil'},
          {icon: 'folder', text:'Documents ad', route: '/doc'},
          {icon: 'group', text:'Utilisateurs', route: '/utilisateur'},
          {icon: 'edit', text:'Accusé et saisie', route: '/accuse'},
          {icon: 'undo', text:'Recours', route: '/recours/affich'},
          {icon: 'group_add', text:'Demandeur', route: '/Demandeur'},
          {icon: 'history', text:'Historique', route: '/historique'},
          {icon: 'settings', text:'Parametres', route: '/parametres'},
          //{icon: 'add_circle', text:'Inscription', route: '/Inscription'},
          
       
      ]
     
    }),
    components: {
    Popup
  },
  methods : {
    exit () {
      
      localStorage.clear(),
      router.push({ name: 'home' })
    }
  },
  
 async mounted () {
      try {
            const res = await axios.get('http://localhost:3000/user/infos_user',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token'),
            }
            }) 
        this.username = res.data.nom + ' ' + res.data.prenom 
        this.profil = res.data.type_profil
      } catch(e) {
        alert('error')
      }
      
    },
   
}
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>