
<template>
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
</template>
<script>
export default {
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
          data: [],
        },
      ],
      chartOptions2: {
        labels: ['homme', 'femme']
      },
       series2: [],
       chartOptions3: {
        labels: ['dossies acceptes', 'dossiers rejetes']
      },
       series3: [],
       chartOptions4: {
      labels: ["entre 1 et 4", "entre 5 et 9", "entre 10 et 11", "entre 12 et 15", "plus de 16"]
      },
        series4: [
        {
          name: "series-1",
          data: [20,10,23,12],
        },
      ],
      
    };
  },
//   async mounted () {
//       try {
//             const res = await axios.get('http://localhost:3000/statistique/statistique1',
//             {
//             headers : {
//               'Authorization' : 'Bearear ' + localStorage.getItem('token')
//             },
//             }) 
//         this.series2.data = res.data
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//             const res1 = await axios.get('http://localhost:3000/statistique/statistique2',
//             {
//             headers : {
//               'Authorization' : 'Bearear ' + localStorage.getItem('token')
//             },
//             }) 
//         this.series3.data = res1.data
// // //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//         const res3 = await axios.get('http://localhost:3000/statistique/statistique3',
//             {
//             headers : {
//               'Authorization' : 'Bearear ' + localStorage.getItem('token')
//             },
//             }) 
//         this.series.data = res3.data
// //         //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//         const res4 = await axios.get('http://localhost:3000/statistique/statistique5',
//             {
//             headers : {
//               'Authorization' : 'Bearear ' + localStorage.getItem('token')
//             },
//             }) 
//         this.series4.data = res4.data
//       } catch(e) {
//         alert('yes')
//       }
      
//     },
};
</script>