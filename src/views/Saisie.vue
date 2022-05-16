<template>
<v-app>
  <Navbar/>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-toolbar>
      <v-tabs dark background-color="#142850" grow>
        <v-tab @click="show1">
          <v-badge color="#142850" icon="mdi-vuetify">
            Etat civil
          </v-badge>
        </v-tab>

        <v-tab @click="show2">
          <v-badge color="#142850" icon="mdi-vuetify">
            experience professionnelle
          </v-badge>
        </v-tab>

        <v-tab @click="show3">
          <v-badge color="#142850" icon="mdi-vuetify">
            Conjoint
          </v-badge>
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <div v-if="showform1">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Matricule"
            v-model="object.matricule"
            type="number"
            :rules="nameRules"
            :counter="7"
            required
          ></v-text-field>
        </v-col>


        <v-col cols="12" md="6">
          <v-text-field
            label="Numero du dossier"
            v-model="object.Numero_dossier"
            
            required
          ></v-text-field>
        </v-col>
       
      </v-row>
      <!--------------------------------------------------------------------------------------------->
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="Nom"
            v-model="object.nom"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="Prénom"
            v-model="object.prenom"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label=" اللقب  "
            v-model="object.nomar"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label=" الاسم "
            v-model="object.prenomar"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <!--------------------------------------------------------------------------------------->
      <v-row>
        <v-col cols="12" md="6">
          <div>
            <v-menu
              ref="menu"
              v-model="object.menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Date de Naissance"
                  v-model="object.Date_de_naissance"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="object.Date_de_naissance"
                :active-picker.sync="activePicker"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
                locale="fr"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Sexe"
            v-model="object.Sexe"
            :items="sexe"
            :rules="[(v) => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
      </v-row>
      <!-------------------------------------------------------------->
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            label="Wilaya de naissance"
            v-model="object.Willaya_de_naissance"
            :items="wilaya"
            
            append-outer-icon="map"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Commune"
            v-model="object.Commune_de_naissance"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <!----------------------------------------------------------->
       <v-col cols="12" md="6">
      <v-text-field
        label="Adresse"
        v-model="object.Adresse"
        :rules="nameRules"
        :counter="40"
        required
      ></v-text-field>
        </v-col>
      <!----------------------------------------------------------->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="E-mail"
            v-model="object.Email"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Code Postal"
            v-model="object.code_Postal"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-col cols="12" md="6">
      <v-text-field
        label="Prénom Du Pére"
        v-model="object.Prenom_du_pere"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>
      </v-col>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Nom De La mére"
            v-model="object.Nom_mere"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Prénom De La mére"
            v-model="object.Prenom_mere"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <!----------------------------------------->
      <v-row>
      <v-col cols="12" md="6">
      <v-select
        label="Situation Familiale"
        v-model="object.Situation_familiale"
        :items="situation"
        :rules="[(v) => !!v || 'Choix obligatoire']"
        append-outer-icon="person"
        required
      ></v-select>
       </v-col>
      <!---------------------------------------------------------->
      <v-col cols="12" md="6">
        <v-combobox
          v-model="object.droit"
          :items="droits"
          label="Ayant  Droits"
          multiple
          chips
        ></v-combobox>
      </v-col>
      </v-row>
 <v-col cols="12" md="6">
      <v-text-field
        label="Numero De Telephone"
        v-model="object.numero_de_tel"
        type="number"
        :counter="10"
        :rules="nameRules"
        required
      ></v-text-field>
      </v-col>
      <!----------------------------------------------------------->
      <v-col cols="12" md="2">
      <v-text-field
        label="Nombre D'enfants"
        v-model="object.Nombre_enfants"
        type="number"
        required
      ></v-text-field>
       </v-col>
       <v-col cols="12" md="6">
      <v-file-input
        label="Photo"
        v-model="photo"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="choisir une photo"
        prepend-icon="mdi-camera"
      ></v-file-input>
      </v-col>
      
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn  color="success" class="mr-4" @click="validate()" v-on="on">
        Sauvegarder
      </v-btn>
      </template>
      <span>Sauvegarder les informations</span>
    </v-tooltip>

 
    </div>
    <!-- ---------------------------------------------------------------------->
    <div v-if="showform2">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Ecole"
            v-model="object.Etablissement"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Direction/Service"
            v-model="object.direction"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-radio-group
        v-model="object.Hors_secteur_MERSRS"
        label="Hors Secteur MESRS"
      >
      <v-row>
        <v-col cols="12" md="6">
           <v-radio :label="`OUI`" :value="true"></v-radio>
        </v-col>
        <v-col cols="12" md="6">
          <v-radio :label="`NON`" :value="false"></v-radio>
        </v-col>
      </v-row>
       
       
      </v-radio-group>

      <v-row>
        <v-col clos="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu1"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="object.date_debut_activite"
                label="Date Debut Activité"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="object.date_debut_activite"
              :active-picker.sync="activePicker"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
              locale="fr"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="object.date_fin_activite"
                label="Date Fin Activité"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="object.date_fin_activite"
              :active-picker.sync="activePicker"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
              locale="fr"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-select
        v-model="object.Grade"
        :items="grade"
        :rules="[(v) => !!v || 'champs obligatoire']"
        label="Dernier Grade"
        append-outer-icon="grade"
        required
      ></v-select>

      <v-row>
        <v-col clos="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu3"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="object.date_debut_activite_Mersrs"
                label="Date Debut Activité MERSRS"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="object.date_debut_activite_Mersrs"
              :active-picker.sync="activePicker"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
              locale="fr"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu4"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="object.date_fin_activite_Mersrs"
                label="Date Fin Activité MERSRS"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="object.date_fin_activite_Mersrs"
              :active-picker.sync="activePicker"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
              locale="fr"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-select
        label="Responsabilité"
        v-model="object.Responsabilite"
        :items="responsabilite"
        :rules="[(v) => !!v || 'Choix obligatoire']"
        append-outer-icon="person"
        required
      ></v-select>
      <v-radio-group v-model="radioGroup" label="Designation Du Secteur">
        <v-radio :label="`Etat`" :value="true"></v-radio>
        <v-radio :label="`Privé`" :value="false"></v-radio>
      </v-radio-group>
         <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn  color="success" class="mr-4" @click="validate()" v-on="on">
        Sauvegarder
      </v-btn>
      </template>
      <span>Sauvegarder les informations</span>
    </v-tooltip>


     
    </div>
    <!-------------------------------------------------------------------------------------------------------->
    <div v-if="showform3">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="object.nomco"
           
            :counter="10"
            label="Nom"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="اللقب "
            v-model="object.Nomarco"
            
            :counter="10"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Prénom"
            v-model="object.prenomco"
            
            :counter="10"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="الاسم"
            v-model="object.prenomcoar"
           
            :counter="10"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            label="Date de Naissance"
            v-model="object.Date_de_naissanceco"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="object.Date_de_naissanceco"
          :active-picker.sync="activePicker"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="save"
          locale="fr"
        ></v-date-picker>
      </v-menu>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            label="Wilaya de naissance"
            v-model="object.Willaya_de_naissanceco"
            :items="wilaya"
            :rules="[(v) => !!v || 'Choix obligatoire']"
            append-outer-icon="map"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Commune"
            v-model="object.Commune_de_naissanceco"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        label="Prénom Du Pére"
        v-model="object.Prenom_du_pereco"
       
        :counter="10"
        required
      ></v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Nom De La mére"
            v-model="object.Nom_mereco"
           
            :counter="10"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Prénom De La mére"
            v-model="object.Prenom_mereco"
            
            :counter="10"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-radio-group v-model="object.Conjoint_MESRS" label="Conjoint au MESRS">
        <v-radio :label="`OUI`" :value="true"></v-radio>
        <v-radio :label="`NON`" :value="false"></v-radio>
      </v-radio-group>

        <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn  color="success" class="mr-4" @click="validate()" v-on="on">
        Valider
      </v-btn>
      </template>
      <span>Valider les informations</span>
    </v-tooltip>


        <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn  color="success" class="mr-4" @click="validate()" v-on="on">
        Sauvegarder
      </v-btn>
      </template>
      <span>Sauvegarder les informations</span>
    </v-tooltip>


      
    </div>
  </v-form>
  <Footer/>
</v-app>
</template>

<script>
import axios from "axios";
import router from "../router/index";
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components : {
    Navbar,
    Footer
  },
  data: () => ({
    object: {
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
      Prenom_mere: "",
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
      prenomcoar: "",
      Date_de_naissanceco: "",
      Willaya_de_naissanceco: "",
      Commune_de_naissanceco: "",
      Prenom_du_pereco: "",
      Nom_mereco: "",
      Prenom_mereco: "",
      Conjoint_MESRS: "",
      Ayant_droit: "",
      droit: [],
      valider : true,
    },
    showform1: true,
    showform2: false,
    showform3: false,
    //name: "",
    nameRules: [
      (v) => !!v || "Champ obligatoire",
      (v) =>
        (v && v.length <= 10) || "Ne doit pas contenir plus que 10 caractères",
    ],
    //email: "",
    emailRules: [
      (v) => !!v || "Champ obligatoire",
      (v) => /.+@.+\..+/.test(v) || "E-mail doit etre valide",
    ],
    select: null,
    sexe: ["Homme", "Femme"],
    wilaya: ["01 Adrar" ,"02 Chlef","03 Laghouat", "04 d'Oum El Bouaghi", "05 Batna", "06 Béjaïa"	, "07 Biskra"	, "08 Béchar","09 Blida"	,"10 Bouira"	, "11 Tamanrasset" ,	
    "12 Tébessa","13 Tlemcen"	,"14 Tiaret	","15 Tizi Ouzou","16	Wilaya d'Alger"	,"17	Djelfa",	"18	Jijel","19	Sétif	","20 Saïda	","21	Skikda",	"22	Sidi Bel Abbès",	
"23	Wilaya d'Annaba",
"24	Guelma",	
"25	Constantine",
"26	Médéa",
"27	Mostaganem",
"28	M'Sila "   ,
"29	Mascara"	,
"30 Ouargla"	,
"31 Oran",
	
"32 El Bayadh	",
"33 d'Illizi	",
"34 Bordj Bou Arreridj",	
"35 Boumerdès"	,
 "36 El Tarf"	,
"34	Tindouf	",
"35 Tissemsilt",
"36	Wilaya d'El Oued"	,
"40 Khenchela",
"41 Souk Ahras",	
"43	Mila",
"44 Aïn Defla",	
"45	Naâma	",
"46 Aïn Témouchent",
"47	Ghardaïa"	,
"48 Relizane"],
    situation: ["celibataire", "Marié(e)", "Divorcé(e)", "veuf(ve)"],
    grade: ["1-4", "5-9", "10-11", "12-15", "16 et plus"],
    droits: [
      "Moudjahid",
      "Fils de chahid",
      "Fille de Chahid",
      "Veuf de Chahid",
    ],
    
 search: null,
    responsabilite: [
      "Secretaire general",
      "Sous-directeur",
      "Responsable de structure",
      "Chef de service rectorat",
      "Chef de Bureau",
      "Chef de service institut",
      "Chef de section",
    ],
    checkbox: false,
    /************************ **/
    activePicker: null,
    date: null,
    dateFin: null,
    menu: false,
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
  }),
  //_______________________________________________________________________________________________________
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  //_______________________________________________________________________________________________________
  async mounted () {
      try {
            const res = await axios.get('http://localhost:3000/demandeur/info',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token'),
            },
             params : {
              Numero_dossier : localStorage.getItem('Numero_dossier')
            }
            }) 
            
            this.object.Numero_dossier = res.data.Numero_dossier
            this.object.matricule = res.data.matricule
            this.object.nom = res.data.info_generale.nom
            this.object.prenom = res.data.info_generale.prenom
            this.object.nomar = res.data.info_generale.nomar 
            this.object.prenomar = res.data.info_generale.prenomar
            this.object.Date_de_naissance = res.data.info_generale.Date_de_naissance
            this.object.Adresse = res.data.info_generale.Adresse
            this.object.numero_de_tel = res.data.info_generale.numero_de_tel
            this.object.Commune_de_naissance = res.data.info_generale.Commune_de_naissance
            this.object.Willaya_de_naissance = res.data.info_generale.Willaya_de_naissance
            this.object.Sexe = res.data.info_generale.Sexe
            this.object.Email = res.data.info_generale.Email
            this.object.code_postal = res.data.info_generale.code_postal
            this.object.Prenom_du_pere = res.data.info_generale.Prenom_du_pere
            this.object.Nom_mere = res.data.info_generale.Nom_mere
            this.object.Prenom_mere = res.data.info_generale.Prenom_mere
            this.object.Situation_familiale = res.data.info_generale.Situation_familiale
            this.object.Nombre_enfants = res.data.info_generale.Nombre_enfants
            this.object.direction = res.data.Experience_professionnelle.direction
            this.object.Etablissement = res.data.Experience_professionnelle.Etablissement
            this.object.Grade = res.data.Experience_professionnelle.Grade
            this.object.date_debut_activite = res.data.Experience_professionnelle.date_debut_activite
            this.object.date_fin_activite = res.data.Experience_professionnelle.date_fin_activite
            this.object.Hors_secteur_MERSRS = res.data.Experience_professionnelle.Hors_secteur_MERSRS
            this.object.direction = res.data.Experience_professionnelle.direction
            this.object.date_debut_activite_Mersrs = res.data.Experience_professionnelle.date_debut_activite_Mersrs
            this.object.date_fin_activite_Mersrs = res.data.Experience_professionnelle.date_fin_activite_Mersrs
            this.object.Responsabilite = res.data.Experience_professionnelle.Responsabilite
            this.object.nomco = res.data.Conjoint.nomco
            this.object.Nomarco = res.data.Conjoint.Nomarco
            this.object.prenomco = res.data.Conjoint.prenomco
            this.object.prenomcoar = res.data.Conjoint.prenomcoar
            this.object.Date_de_naissanceco = res.data.Conjoint.Date_de_naissanceco
            this.object.Commune_de_naissanceco = res.data.Conjoint.Commune_de_naissanceco
            this.object.Willaya_de_naissanceco = res.data.Conjoint.Willaya_de_naissanceco
            this.object.Prenom_du_pereco = res.data.Conjoint.Prenom_du_pereco
            this.object.Nom_mereco = res.data.Conjoint.Nom_mereco
            this.object.Prenom_mereco = res.data.Conjoint.Prenom_mereco
            this.object.Conjoint_MESRS = res.data.Conjoint.Conjoint_MESRS
            
          
            if (res.data.Ayant_droit.Moujahid == true) this.object.droit.push('Moudjahid')
            if (res.data.Ayant_droit.fils_chahid == true) this.object.droit.push('Fils de chahid')
            if (res.data.Ayant_droit.veuf_chahid == true) this.object.droit.push('Veuf de Chahid')
            if (res.data.Ayant_droit.fille_chahid == true) this.object.droit.push('Fille de Chahid')
            
        
      } catch(e) {
        alert('error')
      }
      
    },
  methods: {
    async savee () {
      try {
        const res = await axios.post(
          "http://localhost:3000/critere/affect_auth_demand",
          this.object,
          {
            headers: {
              Authorization: "Bearear " + localStorage.getItem("token"),
            },
          }
        );
        this.object.Numero_dossier = res.data.Numero_dossier
        console.log(res);
        //alert(res.data.message);
        
        
        
   
        
        router.push({ name: "acceuil" });
      } catch (e) {
        alert("error");
    }
    },
    async saveee () {
      try {
        const res = await axios.post(
          "http://localhost:3000/demandeur/valide",
          this.object,
          {
            headers: {
              Authorization: "Bearear " + localStorage.getItem("token"),
            },
          }
        );
        //this.object.Numero_dossier = res.data.Numero_dossier
        console.log(res);
        //alert(res.data.message);
        
   
        
        //router.push({ name: "acceuil" });
      } catch (e) {
        alert("error");
        //router.push({ name: "saisie" });
      }
    },
    async validate() {
      try {
        const res = await axios.post(
          "http://localhost:3000/demandeur/modif_demand",
          this.object,
          {
            headers: {
              Authorization: "Bearear " + localStorage.getItem("token"),
            },
          }
        );
        //this.object.Numero_dossier = res.data.Numero_dossier
        console.log(res);
        //alert(res.data.message);
        
   
        
        router.push({ name: "acceuil" });
      } catch (e) {
        alert("error");
        //router.push({ name: "saisie" });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    show1() {
      this.showform1 = true;
      this.showform2 = false;
      this.showform3 = false;
    },
    show2() {
      this.showform2 = true;
      this.showform1 = false;
      this.showform3 = false;
    },
    show3() {
      this.showform3 = true;
      this.showform2 = false;
      this.showform1 = false;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>
