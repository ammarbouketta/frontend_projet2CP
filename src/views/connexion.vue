<template>
<v-app>
  <Navbar/>

  <v-card>
    <v-card-title>Connexion</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          v-model="object.email"
          required
          :rules="[(v) => !!v || 'veuillez saisir votre adresse email']"
          type="email"
        ></v-text-field>
        <v-text-field
          label="mot_de_passe"
          v-model="object.password"
          type="password"
          required
          :rules="[(v) => !!v || 'veuillez saisir votre mot de passe']"
        ></v-text-field>

        <v-checkbox
          v-model="object.type_profil"
          label="administrateur"
          color="red"
          value="administrateur"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="object.type_profil"
          label="valideur"
          color="#3cd1c2"
          value="valideur"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="object.type_profil"
          label="editeur"
          color="orange"
          value="editeur"
          hide-details
        ></v-checkbox>
        <p>{{ email }}{{ password }}</p>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn outlined color="orange" @click="login()">
        <v-icon small left>person</v-icon>
        <span>Se Connecter</span>
      </v-btn>
    </v-card-actions>
  </v-card>
  <Footer/>
  </v-app>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import router from '../router/index'
import Footer from '../components/Footer.vue'
//import Navbar from '../components/Navbar.vue'
export default {
    components: {
    
    Footer
  },
  
  data() {
    
    return {
        object : {
            email: "",
            password: "",
            type_profil:""
        }
     
    };
  },
    methods: {
    async login() {
      
      try {
          const res = await axios.post('http://localhost:3000/user/login',this.object)
          console.log(res)
          //alert('Logged in !');
          localStorage.setItem('token',res.data.token)
          router.push({ name: 'acceuil' });
      } catch(e) {
          alert('Adresse ou mot de passe incorrect');
          router.push({ name: 'connexion' });
      }
    
    },
    
    // 
    
    
  },
};
</script>
<style></style>