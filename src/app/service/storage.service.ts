import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class StorageService{
     
    constructor(){

    }

    public setData(dataToStore: {key: string, data: any}): void{
        localStorage.setItem(dataToStore.key,dataToStore.data);
    }

    public reteriveData(key: string): any{
        return localStorage.getItem(key);
    }
	
	public clearStorage(): void{
		localStorage.clear();
	}
	
	public removeData(key: string): void{
		localStorage.removeItem(key);
	}
}