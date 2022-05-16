<template>
<v-app>
  <Navbar/>
  <div class="projects">
    <h1 class="subheading grey--text">Historique des utilisateurs</h1>
    <v-container>
      <v-layout row wrap class="mb-4">
       <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="blue" @click="sortBy('email')" class="mr-2" dark v-on="on">
           <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">trier par date</span>
        </v-btn>
      </template>
        <span>trier l'hitorique </span>
      </v-tooltip>
      </v-layout>
      <v-card flat  v-for="project in projects" :key="project.email" class="mb-1">
          <v-layout row wrap :class="`pa-3 project ${project.type_profil}`">
            <v-flex xs12 md6>
                <div class="caption grey--text">email</div>
                <div >{{project.email}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">heure</div>
                <div >{{project.heure}}</div>
            </v-flex>
             <v-flex xs6 sm4 md2>
                <div class="caption grey--text">date</div>
                <div >{{project.date}}</div>
            </v-flex>
            
             <v-flex xs6 sm4 md2>
                <div class="caption grey--text">fonction faite</div>
                <div >{{project.donnee}}</div>
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
             
          </v-layout>
      </v-card>
    </v-container>
  </div>
  <Footer/>
</v-app>
</template>

<script>
// @ is an alias to /src
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import axios from "axios";
export default {
  name: "projects",
  components: {Navbar, Footer},
  data: () => ({
    photo_de_profil: "/img1.png",
    projects: [],
  }),
  mounted ()  {
    axios.get('http://localhost:3000/historique/afficher',
    {
      headers : {
        'Authorization' : 'Bearear ' + localStorage.getItem('token')
      },
    })
    .then(res => this.projects = res.data);
    
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
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
</style>
<!--import { babelParse } from '@vue/compiler-sfc';
<template>
  <div class="section">
    <p class="titre">Liste des utilisateur</p>
    <ul class="liste">
      <li class="items " v-for="users in utilisateur" v-bind:key="users">
        <p class="donnee">{{users.email}}</p>
        <p class="infos" v-if="showuser">L'Utilisateur  {{users.email}}<br> Mot de passe {{users.mdp}} <br> Type User {{users.type_user}} <br>
        <img :src="users.photo" alt="photo utilisateur">
        </p>
        
        <button class="info" @click="afficher()">Info</button>
        <button class="supp" @click="supprimer(users)">Supprimer</button>
      </li>
    </ul>
    <button class="add" @click="add()">Ajouter Utilisateur</button>
    <div v-if="showform" class="connexion-form">
      <img
        :src="image"
        alt=""
      />
      <h1>Inscription</h1>
      <form action="#" @submit.prevent="login">
        <input type="email" class="input-box" placeholder="Adresse mail" name="email" v-model="email" required>
        <input type="password" class="input-box" placeholder="Mot de passe" name="password" v-model="password" required>
        <input type="password" class="input-box" placeholder="Confirmation mot de passe" name ="passwordconfirm" v-model="passwordconfirm" required>
        <div class="block">
          <input type="checkbox" class="checkbox" id="editeur" name="editeur" value="editeur" >
          
        <p>editeur
        </p>
          <input type="checkbox" class="checkbox" id="valideur" name="valideur" value="valideur" >
           <p>valideur
        </p>
         <input type="checkbox"  class="checkbox" id="administrateur" name="administrateur" value="administrateur" >
          <p>administrateur
      
        </p>
        </div>
        <button type="submit" class="connexion-btn " @click="inscrire()">S'inscrire</button>
      </form>
    </div>
  </div>
</template>
<script>
import image from "../assets/avatar.jpg"
export default {
  data() {
    return {
      utilisateur: [
        { email: "khalil", mdp: "ahmed", type_user: "loremIpsum" ,photo:"hgghj"},
        { email: "nom1", mdp: "prenom1", type_user: "loremIpsum" ,photo:"iuhh"},
        { email: "nom2", mdp: "prenom2", type_user: "loremIpsum" ,photo:"uuhj"},
      ],
      showuser:false,
      showform:false,
      image:image,
      email:"",
      password:"",
      passwordconfirm:"",
    }
  },
  methods:{
    afficher(){
    
      this.showuser=!this.showuser;
      
    },
    supprimer(deleteduser){
      this.utilisateur=this.utilisateur.filter(users => users !==deleteduser);
     
    },
    add(){
       this.showform=!this.showform;
    },
    inscrire(){
      this.showform=!this.showform;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
.infos{
  position: absolute;
  width: 500px;
  height: 200px;
  left: 100px;
  margin-top:20px;
  top: -300px;
  padding-top:60px;
  background:#ebf0f1 ;
  border-radius: 22px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  color:#5e72e4;
  box-shadow: 10px 10px 5px grey;
}
img{
   vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50% 
}
.section{
  position: absolute;
  top:3px;
  right:100px;
}
.add_btn {
  position: absolute;
  width: 150px;
  height: 61px;
  left: 400px;
  top: 183px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  background: rgba(61, 155, 168, 0.2);
  border-radius: 10px;
  border: none;
}
.titre {
  position: absolute;
  width: 327px;
  height: 51px;
  padding-top: 25px;
  left: 400px;
  top: 190px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  background:rgba(61, 155, 168, 0.2);
  border-radius: 10px;
}
.add {
  position: absolute;
   width: 329px;
  height: 70px;
  padding-top: 4px;
  left: 1080px;
  top: 770px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  background:rgba(61, 155, 168, 0.2);
  border-radius: 10px;
  border: none;
}
.add:hover{
  background-color: #ebf0f1;
  color: rgba(0,0,0,0.8);
  border-left-color: #ebf0f1;
  left: 1090px;
  top: 775px;
}
.block{
  display:grid;
  position: relative;
  padding-right:-10px;
  left:px;
  top:30px;
  right: 300px;
  bottom: 20px;
  left:-20px;
  font-size: 13px;
}
.items{
  
  position: relative;
  width: 850px;
  height: 51px;
  left: 50px;
  top:60px;
  margin-bottom:30px;
  margin-top:20px;
  background: rgba(61, 155, 168, 0.2);
  border-radius: 10px;
  
}
.donnee{
  position: relative;
 font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 27px;
  text-align: left;
  left: 10px;
  top:8px;
}
.supp {
  position: relative;
  width: 100px;
  height: 30px;
  left: 250px;
  top: -45px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  background: #5e72e4;
  border-radius: 10px;
  border: none;
}
.info {
  position: relative;
  width: 100px;
  height: 30px;
  left: 200px;
  top:-45px;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  background: #05789f;
  border-radius: 10px;
  border: none;
}
.liste {
  position: absolute;
  width: 975px;
  height: 420px;
  left: 401px;
  top: 300px;
  background: #ebf0f1;
  border-radius: 22px;
}
.connexion-form {
  position: relative;
  margin: 0;
  padding: 0;
  left: 600px;
  top: 100px;
  font-family: "Poppins", sans-serif;
  /* background-image: url("images/background.png");*/
  background-color: #2ea3b3;
  box-shadow: 5px 10px rgba(136, 136, 136,0.4);
  background-size: cover;
  background-position: center;
  width: 600px;
  height:600px;
  box-shadow: 0 0 10px rgba(65, 105, 255, 0.3);
  background: #fff;
  padding: 20px;
  margin: 8% auto 0;
  text-align: center;
}
.connexion-form.input-box {
  border-radius: 20px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #999;
  outline: none;
}
.connexion-btn {
  position: relative;
  bottom:15px;
  color: #fff;
  width: 60%;
  padding: 10px;
  border-radius: 20px;
  font-size: 15px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
  background-color: #3d9ba8;
}
.connexion-form.button:hover {
  background-color: #2ea3b3;
}
.connexion-form.img {
  width: 70px;
  margin-top: -50px;
}
.connexion-form.a {
  color: #3d9ba8;
  font-size: 15px;
}
span {
  position: relative;
  right: 300px;
  bottom: 20px;
  left:-20px;
  font-size: 13px;
}
p {
  position: relative;
  right:10px;
  bottom: 40px;
  font-size: 16px;
}
.labelnom{
     position: relative;
    right:240px;
}
.inputnom{
    width: 40%;
    position: relative;
    right:-76px;
    display:flex;
}
.checkbox{
  right: 300px;
  bottom: 50px;
  left:-20px;
  font-size: 13px;
}
input{
  border-radius: 20px;
  padding: 10px;
  margin: 10px 0;
  width: 70%;
  border: 1px solid #999;
  outline: none;
}
</style>-->

