import { Component, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { NoteService } from 'src/app/api/note/note.service'
import { Note } from 'src/app/models/note/note'
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2'
import { Router } from '@angular/router'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
		private router: Router
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

	editNote(id: string) {
		this.router.navigate(['/notes/edit', id])
	}

	favoriteNote(id: string) {
		this.noteService.favorite(id).subscribe({
			next: (response) => {
				this.isLoading = false

				this.toastr.success(response.message)
				this.getNotes()
			}
		})
	}

	confirmDelete() {
		this.noteService.delete(this.idNoteAction).subscribe({
			next: (response) => {
				this.isLoading = false

				this.toastr.success(response.message)
				this.getNotes()
			},
			error: (error) => {
				this.isLoading = false

				console.log(error)
			}
		})
	}
}