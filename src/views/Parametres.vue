<template>
<v-app>
  <Navbar/>
    <v-container>
      <div  class="monprofil">
           <div class="image" >
             <v-avatar size="100">
              <img src="/img1.png" alt="">
             </v-avatar>
           </div>
      <v-row>
        <v-col cols="10">
          <div class="affichage">
          <v-text-field
            v-model="object.nom"
            label="Votre nom"
            filled
          ></v-text-field>
          </div>
          </v-col>
          <v-col cols="10">
          <div class="affichage">
          <v-text-field
            v-model="object.prenom"
            label="Votre prenom"
            filled
          ></v-text-field>
          </div>
          </v-col>
          <v-col cols="10">
            <div class="affichage">
           <v-text-field
            v-model="object.email"
            label="Votre adresse e-mail"
            filled
          ></v-text-field>
          </div>
          </v-col>
          <v-col cols="10">
          <div class="affichage">
          <v-text-field
            v-model="object.type_profil"
            label="membre de la commission"
            filled
          ></v-text-field>
          </div>
          </v-col>
      </v-row>
      <button class="button" @click="edit()">Modifier Profil</button>
      <div class="modale" v-if="toggleModal">
        <div class="input-box">
        <input type="password" placeholder="Mot de passe actuel">
        </div>
        <div class="input-box">
        <input name="mdp" type="password"  placeholder="Nouveau mot de passe" >
        </div>
        <div class="input-box">
        <input name="mdp2" type="password"  placeholder="Retapez le nouveau mot de passe " >
        </div>
      </div>
      </div>
    </v-container>
    <Footer/>
</v-app>
</template>
<script>
import axios from "axios";
import router from '../router/index'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
  export default {
    components: {Navbar, Footer},
    data() {
    return {
      object : {
        nom: '',
        prenom: '',
        email: '',
        type_profil: '',
      }
    }},
    async mounted () {
      try {
            const res = await axios.get('http://localhost:3000/user/infos_user',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token'),
            }
            }) 
        this.object = res.data
      } catch(e) {
        //alert('error')
      }
      
    },
    methods : {
      async edit () {
        try {
          const res = await axios.post('http://localhost:3000/user/update',this.object,
          {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token')
            },
          })
          console.log(res)
          {
            //alert(res.data.message)
            router.push({ name: 'acceuil' })}
        } catch (e) {
          console.log(e)
          alert ('une erreur est survenue')
          router.push({ name: 'parametres' })
        }
        
    
      
      }
      }
    }
 
</script>
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
  .buttonmodale{
    position: relative;
    text-align: center;
    left: 130px;
    width: 30%;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    background-color: #142850;
    border: none;
    border-radius: 4px;
  }
  .motdepasse{
    position: relative;
    left: 50px;
  }
  .button:hover {
  background: steelblue;
}
.button:active {
  background: steelblue;
}
.affichage{
  position: relative;
  left: 200px;
  float: left;
  width: 60%;
}
.modale{
  position:fixed;
 top: 50%;
 left: 50%;
 display: block;
 transform: translate(-50%, -50%);
 z-index: 99;
 width: 100%;
 max-width: 400px;
 background-color: white;
 border-radius: 16px;
 padding: 25px;
 border: 1px solid #046381;
}
.input-box{
    margin: 31px auto;
    width: 80%;
    border-bottom: 1px solid #046381 ;
    padding-top: 10px;
    padding-bottom: 5px;
}
.input-box input {
    width: 80%;
    border: none;
    outline: none;
    background: transparent;
}
::placeholder{
    color:slategray;
}
 .login-btn{
    position: relative;
    left: 0px;
    margin: 31px auto;
    width: 80%;
    display: block;
    outline: none;
    padding: 10px 0;
    border: 1px solid #046381;
}
.logout-btn{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 10px;
    text-align: center;
    outline: none;
}
</style>