import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) { }

  private endPoint : string = 'local';

  listar() {
    return this.http.get(env.apiUri + this.endPoint).toPromise();
  }

  excluir(id: string) {
    // HttpClient.delete() não permite passar um parâmetro body.
    // Por isso, aqui usamos HttpClient.request('delete', ...).
    return this.http.request('delete', env.apiUri + this.endPoint, 
      {body: {_id: id}}).toPromise();
  }

  novo(editora: any) {
    return this.http.post(env.apiUri + this.endPoint, editora).toPromise();
  }

  obterUm(id: string) {
    return this.http.get(env.apiUri + this.endPoint + '/' + id).toPromise();
  }

  atualizar(editora: any) {
    return this.http.put(env.apiUri + this.endPoint, editora).toPromise();
  }
}