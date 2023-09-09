import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NoteService } from 'src/app/api/note/note.service'
import { Note } from 'src/app/models/note/note'
import { faCopy, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
	selector: 'app-show',
	templateUrl: './show.component.html',
	styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
	isLoading = true
	idNote!: string
	note!: Note
	faCopy = faCopy
	faArrowLeft = faArrowLeft
	faCheckCircle = faCheckCircle
	showCopied = false

	constructor(
		private noteService: NoteService,
		private route: ActivatedRoute,
		private clipboard: Clipboard
	) { }

	ngOnInit() {
		this.idNote = this.route.snapshot.paramMap.get('id') || ''

		this.getNote()
	}

	getNote() {
		this.noteService.get(this.idNote).subscribe({
			next: (response) => {
				this.isLoading = false

				if (response) {
					this.note = response
				}
			},
			error: (error) => {
				this.isLoading = false

				console.log(error)
			}
		})
	}

	copyCode() {
		this.showCopied = true

		this.clipboard.copy(this.note.code)

		setTimeout(() => {
			this.showCopied = false
		}, 4000)
	}
}