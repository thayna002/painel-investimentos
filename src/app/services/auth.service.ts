import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.get<any[]>('/assets/mocks/login.json').pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.senha === senha);

        if (!user) throw new Error('INVALIDO');

        // salva token fake
        localStorage.setItem('token', 'fake-jwt');

        // salva id do cliente
        localStorage.setItem('clientId', user.clientId.toString());

        return user;
      })
    );
  }

  logout() {
    localStorage.clear();
  }
}
