import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './../models/Categoria'; 

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {
	public url = 'http://localhost:8080/categorias/';

  constructor(private http: HttpClient) { }
  
  public list(){
	 return this.http.get(this.url);  
  }
  
  public findById(id:number){
	 return this.http.get(this.url + id); 
  }
  
  public post(categoria:Categoria){
	 return this.http.post(this.url,categoria);  
  }
  
  public put(categoria:Categoria){
	  return this.http.put(this.url + categoria.id, categoria);
  }
  
  public deleteItem(id:number){
	 return this.http.delete(this.url + id); 
  }
  
}
