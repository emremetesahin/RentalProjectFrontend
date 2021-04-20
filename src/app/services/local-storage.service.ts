import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  set<T>(key:string,value:any)
  {
    localStorage.setItem(key,value);
  }
  get<T>(key:string)
  {
    return localStorage.getItem(key);
  }
  remove(key:string)
  {
    localStorage.removeItem(key);
  }

}
