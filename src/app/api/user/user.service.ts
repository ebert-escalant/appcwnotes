import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginBody, LoginResponse, RegisterBody, RegisterResponse } from 'src/app/models/user/user'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) { }

	login(data: LoginBody) {
		return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
	}

	register(data: RegisterBody) {
		return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, data)
	}
}