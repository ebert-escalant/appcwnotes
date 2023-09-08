import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserService } from 'src/app/api/user/user.service'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	form!: FormGroup
	isLoading = false

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private router: Router,
		private toastr: ToastrService
	) {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	get name() { return this.form.controls['name'] }
	get email() { return this.form.controls['email'] }
	get password() { return this.form.controls['password'] }

	register() {
		if (this.form.invalid) {
			this.toastr.error('Completa y corrige los campos')
			return
		}

		this.isLoading = true

		const data = this.form.value

		const body = {
			name: data.name,
			email: data.email,
			password: data.password
		}

		this.userService.register(body).subscribe({
			next: (response) => {
				this.isLoading = false

				this.toastr.success(response.message)
				this.router.navigate(['/login'])

				this.form.reset()
			},
			error: (error) => {
				this.isLoading = false

				this.toastr.error('Register failed')
				console.log(error)
			}
		})
	}

	goToLogin() {
		this.router.navigate(['/auth/login'])
	}
}