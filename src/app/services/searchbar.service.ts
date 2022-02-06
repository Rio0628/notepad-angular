import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  
  public searchbarValue = '';
  public searchValueUpdated = false;

  getSearchValue = () => {
    console.log(this.searchbarValue);
    return this.searchbarValue;
  }

  updateSearchValueState() {
    return this.searchValueUpdated;
  }

  updateSearchValue = (value: any) => {
    this.searchbarValue = value;
    console.log(this.searchbarValue);
    return this.searchbarValue;
  }

  constructor() { }
}
