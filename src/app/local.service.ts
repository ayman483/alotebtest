import { Injectable } from '@angular/core';


class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: any;
  clear(): void {}
  getItem(key: string): string | null {return null;}
  key(index: number): string | null {return null;}
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private storage: Storage;

  constructor() {
    this.storage = new LocalStorage();
  }

  public saveData(key: string, value: any) : void {
    localStorage.setItem(key, value);
  }
  public setItem(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }

  public getItem(key: string): string| any {
    return localStorage.getItem(key);
  }

  public getData(key: any) : string | null{
    return localStorage.getItem(key)
  }
  public removeData(key: any) : void {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
