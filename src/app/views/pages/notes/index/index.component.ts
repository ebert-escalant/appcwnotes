import { Component, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { NoteService } from 'src/app/api/note/note.service'
import { Note } from 'src/app/models/note/note'
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { LoadingService } from 'src/app/services/loading.service'

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
	@ViewChild('deleteNoteSwal') deleteNoteSwal!: SwalComponent

	notes: Note[] = []
	isLoading = true
	idNoteAction!: string
	faSearch = faSearch
	search = ''

	constructor(
		private noteService: NoteService,
		private toastr: ToastrService,
		private loadingService: LoadingService
	) {}

	ngOnInit() {
		this.getNotes()
	}

	searchNotes() {
		this.isLoading = true

		this.noteService.getAll(this.search).subscribe({
			next: (response) => {
				this.isLoading = false

				this.notes = response
			},
			error: (error) => {
				this.isLoading = false

				console.log(error)
			}
		})
	}

	getNotes() {
		this.noteService.getAll().subscribe({
			next: (response) => {
				this.isLoading = false

				this.notes = response
			},
			error: (error) => {
				this.isLoading = false

				console.log(error)
			}
		})
	}

	deleteNote(id: string) {
		this.idNoteAction = id

		this.deleteNoteSwal.fire()
	}

	favoriteNote(id: string) {
		this.loadingService.setLoading(true)

		this.noteService.favorite(id).subscribe({
			next: (response) => {
				this.loadingService.setLoading(false)

				this.toastr.success(response.message)
				this.getNotes()
			},
			error: (error) => {
				this.loadingService.setLoading(false)

				console.log(error)
			}
		})
	}

	confirmDelete() {
		this.loadingService.setLoading(true)

		this.noteService.delete(this.idNoteAction).subscribe({
			next: (response) => {
				this.isLoading = false
				this.loadingService.setLoading(false)

				this.toastr.success(response.message)
				this.getNotes()
			},
			error: (error) => {
				this.isLoading = false
				this.loadingService.setLoading(false)

				console.log(error)
			}
		})
	}
}