import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { AgGridModule } from 'ag-grid-angular';
import { Space } from '../models/space.model';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from 'ag-charts-community';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, AgGridModule, AgChartsAngularModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public pieChartOptions!: AgChartOptions;
  public barChartOptions!: AgChartOptions;
  themeClass = "ag-theme-material";
  spaceData: Space[] = [];
  colDefs!: ColDef<Space>[];
  loading = true;

  private dataService = inject(DataService);

  ngOnInit() {

    this.colDefs = [
      { field: 'mission' },
      { field: 'company' },
      { field: 'location' },
      { field: 'date' },
      { field: 'price' },
      // { field: 'successful' },
      { field: 'rocket' },
    ];

    this.getSpaceData();
  }

  getSpaceData() {
    this.dataService.getSpaceData()
      .pipe(delay(3000))
      .subscribe(data => {
        this.spaceData = data;
        this.loading = false;
        this.getPieChart();
        this.getBarChart();
    });
  }

  getPieChart() {
    this.pieChartOptions = {
      data: this.getPieChartData(),
      title: {
        text: 'Space Mission Composition',
      },
      series: [
        {
            type: 'pie',
            angleKey: 'value',
            legendItemKey: 'key',
            fills: ['#459d55', '#ffa03a']
        },
      ],
    };
  }

  getPieChartData() {
    return [
      { key: 'Success', value: this.spaceData?.filter(item => item.successful)?.length },
      { key: 'Failed', value: this.spaceData?.filter(item => !item.successful)?.length },
    ];
  }

  getBarChart() {
    this.barChartOptions = {
      title: {
        text: "Space Mission By Company Category",
      },
      subtitle: {
        text: 'In Billion U.S. Dollars',
      },
      data: this.dataService.getBarChartData(),
      series: [
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'isro',
          yName: 'ISRO',
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'nasa',
          yName: 'NASA',
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'spacex',
          yName: 'Space X',
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'arianespace',
          yName: 'Ariane Space',
        },
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'generaldynamics',
          yName: 'General Dynamics',
        },
      ],
    };
  }


}
