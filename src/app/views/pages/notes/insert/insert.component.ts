import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { NoteService } from 'src/app/api/note/note.service'
import { NoteBody } from 'src/app/models/note/note'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { LoadingService } from 'src/app/services/loading.service'

@Component({
	selector: 'app-insert',
	templateUrl: './insert.component.html',
	styleUrls: ['./insert.component.scss']
})
export class InsertComponent {
	form!: FormGroup
	faArrowLeft = faArrowLeft

	constructor(
		private formBuilder: FormBuilder,
		private noteService: NoteService,
		private toastr: ToastrService,
		private loadingService: LoadingService
	) {
		this.form = this.formBuilder.group({
			title: ['', [Validators.required, Validators.maxLength(255)]],
			description: ['', [Validators.required]],
			language: '',
			code: ''
		})
	}

	get tittle() { return this.form.controls['tittle'] }
	get description() { return this.form.controls['description'] }
	get language() { return this.form.controls['language'] }
	get code() { return this.form.controls['code'] }

	insert() {
		if (this.form.invalid) {
			this.toastr.error('Completa y corrige los campos')
			return
		}

		this.loadingService.setLoading(true)

		const data: NoteBody = this.form.value

		const body = {
			title: data.title,
			description: data.description,
			language: data.language,
			code: data.code
		}

		this.noteService.create(body).subscribe({
			next: (response) => {
				this.loadingService.setLoading(false)

				this.toastr.success(response.message)

				this.form.reset()
			},
			error: (error) => {
				this.loadingService.setLoading(false)

				console.log(error)
				this.toastr.error('Ocurrió un error al crear la nota')
			}
		})
	}
}