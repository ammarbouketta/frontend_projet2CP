<template>
<v-app>
  <Navbar/>
  <v-card flat>
    <v-card-text>
    <v-form v-model="valid">
    <v-container>
       <div><h2> Accusé de réception</h2></div>
        <div class="coordonnee">
      <v-row>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="object.matricule"
            :rules="[v => !!v || 'veuillez remplir ce champs ']"
            label="Matricule"
            type="number"
            :counter="7"
            required
            
             min="0"
          ></v-text-field>

        </v-col>
         

        <v-col
          cols="10"
          md="5"
        >
          <!-- <v-text-field
            v-model="object.Numero_dossier"
            :rules="[v => !!v || 'veuillez remplir ce champs']"
            label="N° Dossier"
            required
            type="number"
             min="0"
          ></v-text-field> -->
        </v-col>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="object.nom"
            :rules="[v => !!v || 'veuillez remplir ce champs']"
            label="Nom"
            required
            type="text"
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          md="5"
        >
          <v-text-field
            v-model="object.prenom"
            :rules="[v => !!v || 'veuillez remplir ce champs']"
            label="Prenom"
            required
            type="text"
          ></v-text-field>
        </v-col>
      </v-row>
         </div>
    </v-container>
  </v-form>
      <v-container fluid>
          <div  class="formulaire">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
          <v-checkbox
              v-model="object.photo"
              value="photo"
              label="Photo"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.demande_manuscrite"
              value="demande_manuscrite"
              label="Demande manuscrite"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.photocopie_piece_idt"
              value="photocopie_piece_idt"
              label="Photocopie de la pièce d'identité"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.fiche_renseignement"
              value="fiche_renseignement"
              label="Fiche de renseignement"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.extrait_naissance"
              value="extrait_naissance"
              label="Extrait de naissance"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.fiche_familiale_ou_individuelle"
              value="fiche_familiale_ou_individuelle"
              label="Fiche familiale ou individuelle"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            </v-col>
            <v-col
            cols="12"
            sm="5"
            md="5"
          >
            <v-checkbox
              v-model="object.pv_de_la_1er_installation_dans_la_poste"
              value="pv_de_la_1er_installation_dans_la_poste"
              label="PV de la première installation dans le poste"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.arreté_de_nomination_visé"
              value="arreté_de_nomination_visé"
              label="Arreté de nomination visé"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.arreté_de_responsabilité_visé"
              value="arreté_de_responsabilité_visé"
              label="Arreté de responsabilité visé"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.arreté_nomination_MESRS"
              value="arreté_nomination_MESRS_(FP)"
              label="Arrêté de nomination visé hors secteur MESRS"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.arreté_nomination_conjoint"
              value="arreté_nomination_conjoint"
              label="Arrêté de nomination visé du conjoint"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="object.attestation_ayant_droit"
              value="attestation_ayant_droit"
              label="Attestation ayant droit"
              color="indigo darken-3"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
        </div>
        <div class="etatdossier">
        <v-row>

          
             <v-radio-group
              v-model="object.dossier_complet"
              
            >
              <v-radio
                :label="`dossier complet`"
                :color="success"
                :value="true"
             ></v-radio>
              <v-radio
                :label="`dossier_incomplet`"
                :color="red"
                :value="false"
             ></v-radio>
            </v-radio-group>
        </v-row>
         </div>
         
          <!-- <button class="button"> imprimer l'accusé</button> -->
          <v-btn class="button" @click="imprimer()">
                        <v-icon small left >inbox</v-icon>
                        
                        <span>Sauvegarder</span>
        </v-btn>
         <a :href = 'link' target="_blank">Telecharger accusé</a>
        
      </v-container>
      
    </v-card-text>
    
  </v-card>
  <Footer/>
</v-app>
</template>
<script>
import axios from "axios";
// import router from '../router/index'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
  export default {
        components: {
    Navbar,
    Footer
  },
    data () {
      return {
        ex4: ['photo', 'demande_manuscrite', 'photocopie_piece_idt', 'fiche_renseignement', 'extrait_naissance', 'fiche_familiale_ou_individuelle', 'pv_de_la_1er_installation_dans_la_poste', 'arreté_de_nomination_visé', 'arreté_de_responsabilité_visé', 'arreté_nomination_MESRS_(FP)', 'arreté_nomination_conjoint', 'attestation_ayant_droit'],
        // complet: 'dossier_complet',
        // incomplet: 'dossier_incomplet',
        //row: null,
        link : "http://localhost:3000/Accuse_de_reception11.docx"  ,
        object: {
      photo:"",
      demande_manuscrite:"",
      photocopie_piece_idt:"",
      fiche_renseignement:"",
      extrait_naissance:"",
      fiche_familiale_ou_individuelle:"",
      pv_de_la_1er_installation_dans_la_poste:"",
      arreté_de_nomination_visé:"",
      arreté_de_responsabilité_visé:"",
      arreté_nomination_MESRS:"",
      arreté_nomination_conjoint:"",
      attestation_ayant_droit:"",
       
      dossier_complet:"",
      Numero_dossier:"",
      matricule: "",
      prenom: "",
      nom: "",
      nomar: "",
      prenomar: "",
      Adresse: "",
      numero_de_tel: "",
      Date_de_naissance: "",
      Commune_de_naissance: "",
      Willaya_de_naissance: "",
      Sexe: "",
      Email: "",
      code_postal: "",
      Prenom_du_pere: "",
      Nom_mere: "",
      prenom_mere: "",
      Situation_familiale: "",
      Nombre_enfants: "",
      direction: "",
      Etablissement: "",
      Grade: "",
      date_debut_activite: "",
      date_fin_activite: "",
      Hors_secteur_MERSRS: "",
      date_debut_activite_Mersrs: "",
      date_fin_activite_Mersrs: "",
      Responsabilite: "",
      nomco: "",
      Nomarco: "",
      prenomco: "",
      prenomarco: "",
      Date_de_naissanceco: "",
      Willaya_de_naissanceco: "",
      Commune_de_naissanceco: "",
      prenom_du_pereco: "",
      nom_mereco: "",
      prenom_mereco: "",
      Conjoint_MESRS: "",
      Ayant_droit: "",
      droit: [],
    },
    }
  },
  methods : {
    async imprimer () {
      try {
        const res = await axios.post(
          "http://localhost:3000/demandeur/form",
          this.object,
          {
            headers: {
              Authorization: "Bearear " + localStorage.getItem("token"),
            },
          }
        );
        this.object.Numero_dossier = res.data.Numero_dossier
        console.log(res);
        alert('Demandeur ajouté et accusé generé sous format word');
        const res1 = await axios.post('http://localhost:3000/demandeur//accuse',this.object)
        console.log(res1)
        
   
        
        //router.push({ name: "acceuil" });
      } catch (e) {
        alert("error d'ajout");
        //router.push({ name: "saisie" });
      }
    }
  }
 }
</script>
<style scoped>
 .formulaire
 {
   padding: 10px;
   border: 1px solid #046381;
   width: 70%;
   position: relative;
   margin-left: auto;
   margin-right: auto;
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
.etatdossier
 {
   width: 70%;
   position: relative;
   left: 260px;
   margin-left: auto;
   margin-right: auto;
 }
 button{
    position: relative;
    left: 500px;
    width: 15%;
    padding: 14px 15px;
    background-color: #142850;
    color:white;
  }
  .button:hover {
  background: steelblue;
}
.button:active {
  background: steelblue ;
}
h2{
  padding: 14px 15px;;
   border: 1px solid #046381;
   width: 30%;
   position: relative;
   left: 35%;
}
</style>