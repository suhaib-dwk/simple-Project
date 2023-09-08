<template>
  <canvas id="myChart" class="chart" ></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

import {http} from '../service'; 

export default {
  name: "Chart",
  mounted() {
    http.get('teachers')
      .then(response => {
        const apiData = response.data; 
        console.log(apiData);

        if (Array.isArray(apiData.data)) { 
          const ctx = document.getElementById('myChart');
          const labels = apiData.data.map(teacher => teacher.name); 
          const salaries = apiData.data.map(teacher => teacher.salary); 

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Salary',
                data: salaries,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Salary'
                  }
                }
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                }
              }
            }
          });
        } else {
          console.error('API response does not contain an array of data:', apiData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
};
</script>

<style scoped>
.chart {
  height: 600px;
    width: 1335px;
}
</style>


