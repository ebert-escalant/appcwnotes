import { Injectable } from '@angular/core'
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { AuthService } from '../guards/auth.service'

type ResponseError = Observable<HttpEvent<unknown>>
type ClosureError = (error: HttpErrorResponse) => ResponseError

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private router: Router, private authService: AuthService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let reqClone = request
		const token = this.authService.getToken()

		if (token) {
			reqClone = request.clone({
				headers: request.headers.set('Authorization', `Bearer ${token.accessToken}`)
			})
		}

		return next.handle(reqClone)
			.pipe(catchError(this.handleError(request, next)))
	}

	handleError(_request: HttpRequest<unknown>, _next: HttpHandler): ClosureError {
		return (error: HttpErrorResponse): ResponseError => {
			if (error.status === 401) {
				this.authService.removeData()
				this.router.navigate(['/auth/login'])
			}

			return throwError(() => error)
		}
	}
}