<template>
<v-app>
  <Navbar/>
  <v-card>
        <v-card-title>Inscription </v-card-title>
        <v-card-text>
        <v-form>
            <v-text-field label="nom" v-model="object.nom" required :rules="[v => !!v || 'veuillez saisir votre nom']"></v-text-field>
            <v-text-field label="prenom" v-model="object.prenom" required :rules="[v => !!v || 'veuillez saisir votre prenom']"></v-text-field>
            <v-text-field label="Email" v-model="object.email" required :rules="[v => !!v || 'veuillez saisir votre adresse email']"></v-text-field>
            <v-text-field label="mot_de_passe" v-model="object.password" type="password" required :rules="[v => !!v || 'veuillez saisir votre mot de passe']"></v-text-field>
            <v-text-field label="confirmation mot de passe" v-model="object.password" type="password" required :rules="[v => !!v || 'veuillez saisir le meme mot de passe']"></v-text-field>
            <!-- <v-checkbox
              v-model="object.type_profil"
              label="administrateur"
              color=orange
              value="administrateur"
              hide-details
            ></v-checkbox> -->
            <v-checkbox
              v-model="object.type_profil"
              label="valideur"
              color=#3cd1c2
              value="valideur"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.type_profil"
              label="editeur"
              color=orange
              value="editeur"
              hide-details
            ></v-checkbox>
        </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn outlined color="orange" @click="inscrire()">
                        <v-icon small left >person</v-icon>
                        
                        <span>Ajouter utilisateur</span>
            </v-btn>
        </v-card-actions>
    </v-card>
    <Footer/>
</v-app>
</template>

<script>
import axios from "axios";
import router from '../router/index'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  name: "inscription",
  components: {Navbar, Footer},
  data(){
        return {
            object: {
              
                nom : '',
                prenom : '',
                email: '',
                password: '',
                type_profil: ''
            }
        }
    },
  
  methods: {
    async inscrire() {
      try {
        const res = await axios.post('http://localhost:3000/user/signup',this.object,
      {
        headers : {
          'Authorization' : 'Bearear ' + localStorage.getItem('token')
        },
      })
      console.log(res)
      router.push({ name: 'acceuil' });
      } catch(e) {
        alert('une erreur est servenu, veuillez refaire linscription a nouveau');
        router.push({ name: 'inscription' });
      }
      
    },
    // 
    
    
  },
}
</script>

<style>
</style>