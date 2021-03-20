import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiURL='https://localhost:44390/api/cars/getall';

  constructor() { }
}
