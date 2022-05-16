<template>
<v-app>
  <Navbar/>
  <v-form>
    <v-container>
      <div  class="monprofil">
           <div class="image" >
             <v-avatar size="100">
              <img src="/img1.png" alt="">
             </v-avatar>
           </div>
         <div class="affichage">
         <v-row>
          <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="object.matricule"
            :rules="[v => !!v || 'veuillez remplir ce champs ']"
            label="Matricule"
            required
            
             
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="object.Numero_dossier"
            :rules="[v => !!v || 'veuillez remplir ce champs']"
            label="N° Dossier"
            required
          ></v-text-field>
        </v-col>
         <v-col
          cols="10"
          md="5"
        >
        
          <v-text-field
            v-model="object.nom"
            :rules="[v => !!v || 'veuillez remplir ce champs ']"
            label="Votre nom"
            required
          ></v-text-field>
          </v-col>
          <v-col
          cols="10"
          md="5"
        >
        
          <v-text-field
            v-model="object.prenom"
            :rules="[v => !!v || 'veuillez remplir ce champs ']"
            label="Votre prenom"
            required
          ></v-text-field>
          </v-col>
          <v-container fluid>
        <v-col
          cols="10"
          md="10"
        >
          <v-textarea
           clearable
           clear-icon="mdi-close-circle"
           label="Votre motif de recours"
           v-model="object.motif"
          ></v-textarea>
        </v-col>
         </v-container>
      </v-row>
        </div>
        <v-btn class="button" @click="sauvgarder()">
                        <v-icon small left >inbox</v-icon>
                        
                        <span>Sauvgarder</span>
        </v-btn>
      
      </div>
    </v-container>
  </v-form>
  <Footer/>
</v-app>
</template>
<style scoped>
 .monprofil
 {
   padding: 10px;
   margin-top: 10px;
   border: 1px solid #046381;
   width: 80%;
   position: relative;
   margin-left: auto;
   margin-right: auto;
 }
  .image{
    position: relative;
    left: 360px;
  }
  button{
    position: relative;
    left: 325px;
    width: 20%;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    background-color: #142850;
    border: none;
    border-radius: 4px;
  }
  .button:hover {
  background: steelblue;
}
.button:active {
  background: steelblue;
}
.affichage{
   width: 80%;
   position: relative;
   left: 2cm;
   margin-left: auto;
   margin-right: auto;
   display: flex;
}
</style>
<script>
import axios from "axios";
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components : {
    Navbar,
    Footer
  },
    data: () => ({
     object : {
        nom: '',
        prenom: '',
        matricule: '',
        Numero_dossier: '',
        motif: '',
      }
      
    }),
methods: {
      async sauvgarder () {
        try {
            const res = await axios.post('http://localhost:3000/recours/ajout_recours',this.object,{
              headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token')
            },
        })
          console.log(res)
           alert("Recours ajouter")
        } catch (e) {
          alert("error")
        }
        // this.$v.$touch()
     
      },
}
}
</script>