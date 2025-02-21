import { ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    colors: string[];
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
    dataLabels: ApexDataLabels
  };