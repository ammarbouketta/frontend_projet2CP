<template>
<v-app>
  <Navbar/>
  <v-card>
       
        <h1 class="subheading grey--text">Ajout D'un Critère</h1>
        <v-card-text>
        <v-form>
       <v-col cols="12" md="6">
          <v-select
            label="Catégorie"
            v-model="object.categorie"
            :items="categories"
            :rules="[(v) => !!v || 'Item is required']"
           
            required
          ></v-select>
        </v-col>
             <v-col cols="12" md="6">
            <v-text-field label="Nom critére" v-model="object.nom" required ></v-text-field>
             </v-col>
             <v-col cols="12" md="2">
      <v-text-field
        label="Points"
        v-model="object.nb_points"
        type="number"
        required
      ></v-text-field>
       </v-col>
           
        </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn outlined color="orange" @click="inscrire()">
                        <v-icon small left > add_circle</v-icon>
                        
                        <span>Ajouter Critère</span>
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
              
                categorie : '',
                nom : '',
                nb_points: '',
  
            },
           categories: ["Situation familialle", "Grade","ancienneté par année","conjoint au MESRS","responsabilités administratives","Ayant_droits"],
        }
    },
  
   methods: {
    async inscrire() {
      try {
        const res = await axios.post('http://localhost:3000/critere/crit',this.object,
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