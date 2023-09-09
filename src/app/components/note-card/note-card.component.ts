import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Note } from 'src/app/models/note/note'
import { faCalendarDays, faStar, faEllipsisV, faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import { RouterModule } from '@angular/router'

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'note-card',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule, RouterModule],
	templateUrl: './note-card.component.html',
	styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
	@Input() note: Note | undefined
	@Output() deleteNote = new EventEmitter<string>()
	@Output() editNote = new EventEmitter<string>()
	@Output() favoriteNote = new EventEmitter<string>()
	@Output() showNote = new EventEmitter<string>()

	faCalendarDays = faCalendarDays
	faStar = faStar
	faEllipsisV = faEllipsisV
	faEdit = faEdit
	faTrashAlt = faTrashAlt
	faEye = faEye

	showTools = false

	delete(id: string) {
		this.showTools = false
		this.deleteNote.emit(id)
	}

	edit(id: string) {
		this.showTools = false
		this.editNote.emit(id)
	}

	favorite(id: string) {
		this.favoriteNote.emit(id)
	}

	show(id: string) {
		this.showTools = false
		this.showNote.emit(id)
	}
}