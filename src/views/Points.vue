<template>
<v-app>
  <Navbar/>
<v-card flat>
    <v-card-text>
     <v-container>
     <div><h1>   Points accordés</h1></div>
     <div class="coordonnee">
     <v-row>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="matricule"
            label="Matricule"
            filled
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="num"
            label="Numero de dossier"
            filled
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="nom"
            label="Votre nom"
            filled
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="prenom"
            label="Prenom"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
      </div>
    <div  class="monprofil">
         <v-row>
         <v-col cols="12" 
               md="6">
          <label for="situationfamiliale"> Situation familiale</label>
          </v-col>
          <v-col cols="12" 
               md="5">
           <div class="information"> {{situationfamiliale}}</div>
           </v-col>
          <v-col cols="12"
          md="6" >
         
        <label for="grade">Grade suivant cathégorie</label>
        </v-col>
        <v-col cols="12" 
               md="5">
           <div class="information"> {{grade}} </div>
           </v-col>
        <v-col  cols="12" 
        md="6">
        <label for="ancienneté">Ancienneté par année</label>
        </v-col>
        <v-col cols="12" 
               md="5">
           <div class="information"> {{ancienneté}} </div>
           </v-col>
        <v-col cols="12"
        md="6" >
        <label for="conjointMESRS">Conjoint au MESRS</label>
        </v-col>
        <v-col cols="12" 
               md="5">
           <div class="information"> {{conjointMESRS}} </div>
           </v-col>
        <v-col cols="12"
        md="6">
        <label for="responsabilite">Responsabilités administratives</label>
        </v-col>
        <v-col cols="12" 
               md="5">
           <div class="information"> {{responsabilite}} </div>
           </v-col>
        <v-col cols="12"
        md="6">
        <label for="droit">Ayant droit</label>
        </v-col>
        <v-col cols="12" 
               md="5">
           <div class="information"> {{droit}} </div>
           </v-col>
           <v-col cols="12" 
               md="6">
          <div class="total"><h4> Total:</h4></div>
          </v-col>
          <v-col cols="12" 
               md="5">
           <div class="totalinformation"> {{total}}</div>
           </v-col>
       </v-row>
              
    </div>
   </v-container>
   </v-card-text>
  </v-card>
  <Footer/>
</v-app>
</template>
<style scoped>
h1{
  padding: 14px 15px;;
   border: 1px solid #046381;
   width: 25%;
   position: relative;
   left: 35%;
}
 .monprofil
 {
   padding: 10px;
   border: 1px solid #046381;
   width: 70%;
   position: relative;
   margin-left: auto;
   margin-right: auto;
 }
 .information{
  position: relative;
  text-align: center;
  width: 25px;
  border: 1px solid #046381 ;
  outline: none;
  background:white;
  }
  .totalinformation{
  width: 35px;
  text-align: center;
  border: 1px solid #046381 ;
  outline: none;
  background:white;
  left:88%;
  }
  .total{
      position:relative;
      left:88%;
  }
 label{
     position: relative;
     left:2cm;
 }
  .coordonnee
 {
   width: 80%;
   position: relative;
   left: 2cm;
   margin-left: auto;
   margin-right: auto;
   display: flex;
 }
</style>
<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import axios from "axios";
export default {
  components: {Navbar, Footer},
    name: 'calcul de points',
    data () {
        return{
            prenom: '',
            matricule: '',
            num: '',
            situationfamiliale:'',
            //nbrenfant:'',
            grade:'',
            ancienneté:'',
            conjointMESRS: '',
            responsabilite:'',
            droit:'',
            nom:'',
            total:''
        }
        
    },
    async mounted () {
      try {
          
            const res = await axios.get('http://localhost:3000/demandeur/info',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token')
            },
            params : {
              Numero_dossier : localStorage.getItem('Numero_dossier')
            }
            
            }) 
            console.log(res)
        const nb_point = res.data.nb_point_par_critere
        this.nom = res.data.info_generale.nom
        this.prenom = res.data.info_generale.prenom
        this.num = res.data.Numero_dossier
        this.matricule = res.data.matricule
        
        var s = 0
        nb_point[0].criteres.forEach(c => {
                 s += c.nb_points;
             });
      
        this.situationfamiliale = s
        s = 0
        nb_point[1].criteres.forEach(c => {
                 s += c.nb_points;
             });
      
        this.grade = s
        s = 0
        nb_point[2].criteres.forEach(c => {
                 s += c.nb_points;
             });
      
        this.ancienneté = s
        s = 0
        nb_point[3].criteres.forEach(c => {
                 s += c.nb_points;
             });
      
        this.conjointMESRS = s
        s = 0
        nb_point[4].criteres.forEach(c => {
                 s += c.nb_points;
             });
      
        this.responsabilite = s
        s = 0
        nb_point[5].criteres.forEach(c => {
                 s += c.nb_points;
             });
      
        this.droit = s
        this.total = res.data.Nombre_de_points
        
      } catch(e) {
        alert('error')
      }
      
    }
}
</script>



