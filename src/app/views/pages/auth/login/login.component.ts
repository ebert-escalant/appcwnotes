import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/api/user/user.service'
import { AuthService } from 'src/app/core/guards/auth.service'
import { LoginBody } from 'src/app/models/user/user'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	returnUrl!: string
	form!: FormGroup
	isLoading = false

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService
	) {
		this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	ngOnInit() {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
	}

	get email() { return this.form.controls['email'] }
	get password() { return this.form.controls['password'] }

	login() {
		if (this.form.invalid) {
			this.toastr.error('Completa y corrige los campos')
			return
		}

		this.isLoading = true

		const data: LoginBody = this.form.value

		const body = {
			email: data.email,
			password: data.password
		}

		this.userService.login(body).subscribe({
			next: (response) => {
				this.isLoading = false

				this.authService.saveToken(response.token)
				this.authService.saveUser(response.user)
				this.router.navigate([this.returnUrl])

				this.toastr.success('Login success')
			},
			error: (error) => {
				this.isLoading = false

				this.toastr.error('Login failed')
				console.log(error)
			}
		})
	}

	goToRegister() {
		this.router.navigate(['/auth/register'])
	}
}