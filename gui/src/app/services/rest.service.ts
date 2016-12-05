import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class RestService {
    public modelName: string;
    private headers: Headers;

    //cache data
    public last_getAll: Array<any>;
    public last_get: any;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.modelName = "to-configure";

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    //HELPERS
    public getAllFromLS(maxtime: number = 0): Array<any>{
      let json = localStorage.getItem("rest_all_"+this.modelName);
      if(json){
        let obj = JSON.parse(json);
        if(obj && (obj.date < (Date.now() - maxtime)) ){
          return obj;
        }
      }
    }


    public getFromCache(id): any{
      if(this.last_getAll){
        return this.last_getAll.find((unit) => unit.id === id);
      }
      else{
        return null;
      }
    }

    private getActionUrl(){
      return this._configuration.ServerWithApiUrl + this.modelName + '/';
    }


    //REST functions
    public getAll(): Observable<any[]>{
        return this._http.get(this.getActionUrl())
            .map((response: Response) => {
              //recuperation du tableau portant le nom de la collection
              let data = response.json()[this.modelName];
              //transformation du format indexé, au format associatif
              let tab = data.records.map((elem)=>{
                let unit = {};
                //on se base sur le numéro des columns et l'ordre pour reconstruire l'objet
                data.columns.forEach((champ,index) => {
                  unit[champ] = elem[index];
                });
                return unit;
              });
              this.last_getAll = tab;
              let obj = {
                date: Date.now(),
                data: tab
              };
              localStorage.setItem("rest_all_"+this.modelName,JSON.stringify(obj));
              return tab;
            })
            .catch(this.handleError);
    }

    public get(id: number): Observable<any>{
        return this._http.get(this.getActionUrl() + id)
            .map((response: Response) => {
              let data = response.json();
              this.last_get = data;
              return data;
            })
            .catch(this.handleError);
    }

    public add(item: any): Observable<number>{
        let toAdd = JSON.stringify(item);

        return this._http.post(this.getActionUrl(), toAdd, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public addAll(tab: Array<any>): Observable<Array<number>>{
      let toAdd = JSON.stringify(tab);

      return this._http.post(this.getActionUrl(), toAdd, { headers: this.headers })
          .map((response: Response) => response.json())
          .catch(this.handleError);
    }

    public update(id: number, itemToUpdate: any): Observable<number>{
        return this._http.put(this.getActionUrl() + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public delete(id: number): Observable<Response>{
        return this._http.delete(this.getActionUrl() + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
