export interface User {
	id: string
	name: string
	email: string
}

export interface Token {
	accessToken: string
	expiresIn: number
}

export interface LoginBody {
	email: string
	password: string
}

export interface RegisterBody {
	name: string
	email: string
	password: string
}

export interface LoginResponse {
	user: User
	token: Token
}

export interface RegisterResponse {
	message: string
}