import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Space } from '../models/space.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getSpaceData(): Observable<Space[]> {
    return this.httpClient.get<Space[]>('https://www.ag-grid.com/example-assets/space-mission-data.json');
  }

  getBarChartData() {
    return [
      {
        year: "2023",
        isro: 293,
        spacex: 169,
        nasa: 145,
        arianespace: 128,
        generaldynamics: 201,
      },
      {
        year: "2022",
        isro: 140,
        spacex: 61,
        nasa: 41,
        arianespace: 21,
        generaldynamics: 120,
      },
      {
        year: "2021",
        isro: 193,
        spacex: 114,
        nasa: 295,
        arianespace: 201,
        generaldynamics: 121,
      },
      {
        year: "2020",
        isro: 117,
        spacex: 186,
        nasa: 74,
        arianespace: 92,
        generaldynamics: 150,
      },
      {
        year: "2019",
        isro: 140,
        spacex: 86,
        nasa: 54,
        arianespace: 112,
        generaldynamics: 20,
      },
    ];
  }
}
