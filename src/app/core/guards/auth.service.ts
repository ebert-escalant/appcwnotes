import { Injectable } from '@angular/core'
import { Token, User } from 'src/app/models/user/user'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private expirationDate!: Date

	isAuthenticated(): boolean {
		const user = this.getUser()
		const token = this.getToken()
		if (user && token && !this.isTokenExpired()) {
			return true
		}

		return false
	}

	isTokenExpired(): boolean {
		const token = this.getToken()
		if (token) {
			const now = new Date()
			return now >= this.expirationDate
		}

		return true
	}

	getUser(): User | null {
		const user = localStorage.getItem('user')
		if (user) {
			return JSON.parse(user)
		}

		return null
	}

	getToken(): Token | null {
		const token = localStorage.getItem('token')
		if (token) {
			return JSON.parse(token)
		}

		return null
	}

	saveUser(user: User): void {
		localStorage.setItem('user', JSON.stringify(user))
	}

	saveToken(token: Token): void {
		this.expirationDate = new Date(new Date().getTime() + token.expiresIn * 1000)
		localStorage.setItem('token', JSON.stringify(token))
	}

	removeData(): void {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}
}