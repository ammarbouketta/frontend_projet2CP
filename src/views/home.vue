<template>
<v-app>
  <Navbar/>
<body>
<div class="row">
  <div class="leftcolumn">
    <div class="card">
      <h2>Plateforme de demande de logements de l'ESI</h2>
      <div class="fakeimg">
       <img src="../assets/immobilier.jpg" width="780" height="400">
      </div>
      <p>Cette application permettra à la commission de logements de l’ESI de mieux recenser les demandeurs de logements en gardant trace de toutes leurs données, de regrouper et d’attribuer les critères imposés par la tutelle et enfin, de stocker les différents documents administratifs pouvant servir dans le travail de cette commission. </p>
    </div>
  </div>
  <div class="rightcolumn">
    <div class="card">
      <h2> A propos de l'ESI</h2>
      <div id="slideshow">
          <div class="slide-wrapper">
            <div class="slide"><img src="../assets/ESI.jpg" width="300" height="180"></div>
            <div class="slide"><img src="../assets/ESI2.jpg" width="300" height="180"></div>
            <div class="slide"><img src="../assets/ESI3.jpg" width="300" height="180"></div>
            <div class="slide"><img src="../assets/ESI4.jpg" width="300" height="180"></div>
          </div>
        </div>
      <p><b>L'École nationale supérieure d'informatique (ESI)</b>, anciennement Institut national de formation en informatique (INI), est un établissement d'enseignement supérieur algérien formant des ingénieurs d’État en informatique, est créée le 6 décembre 1969 sous l’appellation de Centre d'étude et de recherche en informatique (CERI), sous le haut patronnage de Mr Bouras. En 1984, le CERI change de nom pour devenir l'Institut national de formation en informatique (INI). L'école prend son nom actuel et change de statut en 2008.</p>
    </div>
  </div>
</div>
</body>
      <v-app-bar  color=#142850 dark app >
              <v-toolbar-title class="text-uppercase ">
              <!--<span class="font-weight-light">ESI-</span>
               <span>LOG</span>-->
               <img src="../assets/logo.png" width="70" height="40">
           </v-toolbar-title>
           <v-spacer></v-spacer>
           <v-menu offset-y>
            </v-menu>
            <v-btn text @click="login()">
                <span>connexion</span>
            </v-btn>
             <a href = 'http://127.0.0.1:8887/index.html' target="_blank">Aide en ligne</a>
       </v-app-bar>
      
   
   <Footer/>
</v-app>
</template>

<script>
import Footer from '../components/Footer.vue'
//import Navbar from '../components/Navbar.vue'
import router from '../router/index'
export default {
  components : {
    
Footer
  },
  methods : {
    login () {
      router.push({ name: 'connexion' });
    }
  } 
  }
</script>


<style scoped>
#shawcase{
  background-image: url(../assets/immobilier.jpg);
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  color:black;
}
* {
  box-sizing: border-box;
}
body {
  padding: 10px;
  background: #f1f1f1;
}
.header {
  padding: 20px;
  text-align: left;
  background: rgb(250, 247, 247);
}
.leftcolumn {   
  float: left;
  width: 65%;
}
.rightcolumn {
  float: left;
  width: 35%;
  background-color: #f1f1f1;
  padding-left: 20px;
}
.fakeimg {
  width: 100%;
  padding: 20px;
}
.card {
  background-color: white;
  padding: 40px;
  margin-top: 20px;
}
.card h2 {
  text-align: center;
  margin:auto;
}
@keyframes slideshow {
  0% {left: 0;}
  33% {left: -100%;}
  67% {left: -200%;}
  100% {left: -300%;}
}
.slide-wrapper {
  overflow:hidden;
  width:100%;
  margin: auto;
}
.slide-wrapper .slide {
  position:relative;
  width:400%;
  margin:0;
  left:0;
  animation:20s ease-in-out 2s infinite alternate slideshow;
}
.slide-wrapper .slide img {
  width:25%;
  float:left;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {   
    width: 100%;
    padding: 0;
  }
}
@media screen and (max-width: 400px) {
  .topnav a {
    float: none;
    width: 100%;
  }
}
</style>