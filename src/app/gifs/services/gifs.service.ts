import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private _apiKey:string      = 'jO9IJSNZDJE2jjlcziOdM95GxuXG5vzN';
    private _baseUrl:string     = 'https://api.giphy.com/v1/gifs';
    private _historial:string[] = [];
    public resultados:Gif[]     = [];

    get historial(){ return [...this._historial]; }


    constructor( private http:HttpClient){
        this._historial = JSON.parse( localStorage.getItem('Historial')! ) || [];
        this.resultados = JSON.parse( localStorage.getItem('Resultados')! ) || [];
    }


    buscar( query:string){

        query = query.toLocaleLowerCase();
        
        if(!this._historial.includes( query )){
            this._historial.unshift( query ); 
            this._historial = this._historial.splice( 0,10 );
            localStorage.setItem( 'Historial', JSON.stringify(this._historial) );
        }

        const params = new HttpParams()
                .set('api_key', this._apiKey)
                .set('limit', '10')
                .set('q', query);

        this.http.get<SearchGifsResponse>(`${this._baseUrl}/search`, { params})
            .subscribe( resp => {
                console.log( resp.data);
                this.resultados = resp.data;
                localStorage.setItem( 'Resultados', JSON.stringify(this.resultados) );
            });
      
        //primera forma
        //this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=jO9IJSNZDJE2jjlcziOdM95GxuXG5vzN&q=${query}&limit=10`)
        //    .subscribe( resp => {
        //       console.log( resp.data);
        //       this.resultados = resp.data;
        //       localStorage.setItem( 'Resultados', JSON.stringify(this.resultados) );
        //     });
    }

}
