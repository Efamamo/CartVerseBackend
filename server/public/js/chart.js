// Pie Chart 1 (Donut Chart)
var options1 = {
  series: [10, 20, 20, 20, 20, 20],
  chart: {
    width: '100%',
    type: 'donut',
  },
  labels: ['New Arrival', 'Trending', 'Futured', 'Purchased', 'Whishlisted'],
  theme: {
    monochrome: {
      enabled: false,
      foreColor: '#ff0000', // Corrected to use proper color
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  title: {
    text: 'Order Status Report',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return [name, val.toFixed(1) + '%'];
    },
  },
  legend: {
    show: false,
  },
};

var chart1 = new ApexCharts(document.querySelector('#piechart1'), options1);
chart1.render();

// Pie Chart 2 (Pie Chart)
var options2 = {
  series: [10, 20, 20, 20, 20, 20],
  chart: {
    width: '100%',
    type: 'pie',
  },
  labels: ['New Arrival', 'Trending', 'Futured', 'Purchased', 'Whishlisted'],
  theme: {
    monochrome: {
      enabled: false,
      foreColor: '#ff0000', // Corrected to use proper color
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  title: {
    text: 'Order Status Report',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return [name, val.toFixed(1) + '%'];
    },
  },
  legend: {
    show: false,
  },
};

var chart2 = new ApexCharts(document.querySelector('#piechart2'), options2);
chart2.render();

// Bar Chart (Monthly Orders)
var barOptions = {
  series: [
    {
      name: 'Order',
      data: [150, 200, 180, 220, 170, 250, 240, 260], // Example data for orders each month
    },
  ],
  chart: {
    height: 400, // Increased height to provide more space for the chart
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val;
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    position: 'bottom', // Move months to below the bars
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        fontSize: '12px',
      },
      offsetY: 5, // Adjust the space between the bars and the x-axis labels
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true, // Show y-axis labels
    },
  },
  title: {
    text: 'Monthly Orders General Report',
    floating: true,
    offsetY: 0, // Adjusted the offset to give space for the title
    align: 'center',
    style: {
      color: '#444',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
};

var barChart = new ApexCharts(document.querySelector('#barchart2'), barOptions);
barChart.render();
