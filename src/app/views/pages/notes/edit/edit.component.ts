import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { NoteService } from 'src/app/api/note/note.service'
import { Note, NoteBody } from 'src/app/models/note/note'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { LoadingService } from 'src/app/services/loading.service'
import { LanguageService } from 'src/app/api/language/language.service'
import { Language } from 'src/app/models/language/language'

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
	form!: FormGroup
	isLoading = true
	idNote!: string
	note!: Note
	languages: Language[] = []
	faArrowLeft = faArrowLeft

	constructor(
		private formBuilder: FormBuilder,
		private noteService: NoteService,
		private toastr: ToastrService,
		private route: ActivatedRoute,
		private languageService: LanguageService,
		private loadingService: LoadingService
	) {
		this.form = this.formBuilder.group({
			title: ['', [Validators.required, Validators.maxLength(255)]],
			description: ['', [Validators.required]],
			language: '',
			code: ''
		})
	}

	ngOnInit() {
		this.idNote = this.route.snapshot.paramMap.get('id') || ''

		this.languageService.getLanguages().then((response) => {
			this.languages = response
		})

		this.getNote()
	}

	get tittle() { return this.form.controls['tittle'] }
	get description() { return this.form.controls['description'] }
	get language() { return this.form.controls['language'] }
	get code() { return this.form.controls['code'] }

	getNote() {
		this.noteService.get(this.idNote).subscribe({
			next: (response) => {
				this.isLoading = false

				if (response) {
					this.note = response

					this.form.patchValue({
						title: response.title,
						description: response.description,
						language: response.language,
						code: response.code
					})
				}
			},
			error: (error) => {
				this.isLoading = false

				console.log(error)
			}
		})
	}

	update() {
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

		this.noteService.update(this.idNote, body).subscribe({
			next: (response) => {
				this.loadingService.setLoading(false)

				this.toastr.success(response.message)

				this.getNote()
			},
			error: (error) => {
				this.loadingService.setLoading(false)

				console.log(error)
				this.toastr.error('Ocurrió un error al crear la nota')
			}
		})
	}
}