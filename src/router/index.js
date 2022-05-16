import Vue from 'vue'
import VueRouter from 'vue-router'
import Acceuil from '../views/Acceuil.vue'
import Utilisateur from '../views/Utilisateur.vue'
import Historique from '../views/Historique.vue'
import Saisie from '../views/Saisie.vue'
import Recours_affich from '../views/Recours_affich.vue'
import Parametres from '../views/Parametres.vue'
import Inscription from '../views/Inscription.vue'
import Recours from '../views/Recours.vue'

import accuse from '../views/accuse.vue'
import points from '../views/Points.vue'
import connexion from '../views/connexion.vue'
import Demandeur from '../views/Demandeurs.vue'

import doc from '../views/doc.vue'
import Classement from '../views/classement.vue'
import info from '../views/info_user.vue'
import home from '../views/home.vue'

import Critere from '../views/Critere.vue'





Vue.use(VueRouter)

const routes = [
  {
    path: '/acceuil',
    name: 'acceuil',
    component: Acceuil
  },
  {
    path: '/Utilisateur',
    name: 'utilisateur',
    component: Utilisateur
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/historique',
    name: 'historique',
    component: Historique
  },
  
  {
    path: '/saisie',
    name: 'saisie',
    component: Saisie
  },
  {
    path: '/recours/affich',
    name: 'recours',
    component: Recours_affich
  },
  {
    path: '/parametres',
    name: 'parametres',
    component: Parametres
  },
  {
    path: '/Inscription',
    name: 'inscription',
    component: Inscription
  },

  {
    path: '/recours',
    name: 'recours',
    component: Recours
  },
  {
    path: '/accuse',
    name: 'accuse',
    component: accuse
  },

  {
    path: '/points',
    name: 'points',
    component: points
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: connexion
  },

  {
    path: '/Demandeur',
    name: 'demandeur',
    component: Demandeur
  },
  {
    path: '/doc',
    name: 'document_ad',
    component: doc
  },
  // },

  {
    path: '/',
    name: 'home',
    component: home
  },

  {
    path: '/Classement',
    name: 'classement',
    component: Classement
  },

  {
    path: '/info',
    name: 'info_user',
    component: info
  },

  {
    path: '/critere',
    name: 'critere',
    component: Critere
  },


  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router