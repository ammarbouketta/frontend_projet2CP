
<template>
<v-app>
  <Navbar/>
  <div>
    <h1 class="subheading grey--text">Statistique du recensement </h1>
    <v-row>
    <v-col>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions1"
      :series="series"
    ></apexchart>
    <h4 class="subheading grey--text">demandes de logements par tranche d'age </h4>
    </v-col>
    <v-col>
    <apexchart
      width="460"
      type="pie"
      :options="chartOptions2"
      :series="series2"
    ></apexchart>
    <h4 class="subheading grey--text">demandes de logements par sexe </h4>
    </v-col>
    </v-row>
      <v-row>
        <v-col>
    <apexchart
      width="500"
      type="pie"
      :options="chartOptions3"
      :series="series3"
    ></apexchart>
    <h4 class="subheading grey--text">demandes de logements selon dossiers rejetes ou acceptes</h4>
        </v-col>
        <v-col>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions4"
      :series="series4"
    ></apexchart>
    <h4 class="subheading grey--text">demandes de logements par grade </h4>
    </v-col>
    </v-row>
  </div>
  <Footer/>
  </v-app>
</template>
<script>
import axios from "axios";
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components : {
      Footer,
      Navbar
  },
  data: function() {
    return {
      chartOptions1: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: ["entre 18 et 25", "entre 25 et 40", "entre 40 et 55", "entre 55 et 70", "plus de 70"],
        },
      },
      series: [
        {
          name: "series-1",
          data: [
          ],
        },
      ],
      chartOptions2: {
        labels: ['homme', 'femme']
      },
       series2: [
       ],
       chartOptions3: {
        labels: ['dossies acceptes', 'dossiers rejetes','dossiers validés','dossiers non validés','dossiers bénéficiares','dossiers bénéficiares']
      },
       series3: [],
       chartOptions4: {
      labels: ["entre 1 et 4", "entre 5 et 9", "entre 10 et 11", "entre 12 et 15", "plus de 16"]
      },
        series4: [
        {
          name: "series-1",
          data: [1, 0, 1, 0, 1],
        },
      ],
      
    };
  },
  async mounted () {
      try {
            const res = await axios.get('http://localhost:3000/statistique/statistique1',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token')
            },
            }) 
            console.log(res.data)
        this.series2 = res.data
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            const res1 = await axios.get('http://localhost:3000/statistique/statistique2',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token')
            },
            }) 
        this.series3 = res1.data
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const res3 = await axios.get('http://localhost:3000/statistique/statistique3',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token')
            },
            }) 
            console.log(res3.data)
        this.series[0].data = res3.data
//         //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const res4 = await axios.get('http://localhost:3000/statistique/statistique5',
            {
            headers : {
              'Authorization' : 'Bearear ' + localStorage.getItem('token')
            },
            }) 
            console.log(res4.data)
        this.series4[0].data = res4.data
          } catch(e) {
           alert('error')
      }
      
    },
};
</script>