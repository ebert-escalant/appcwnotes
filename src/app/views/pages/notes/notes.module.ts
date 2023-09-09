import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IndexComponent } from './index/index.component'
import { InsertComponent } from './insert/insert.component'
import { NoteCardComponent } from 'src/app/components/note-card/note-card.component'
import { EditComponent } from './edit/edit.component'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ShowComponent } from './show/show.component'
import { HighlightModule } from 'ngx-highlightjs'
import { ClipboardModule } from '@angular/cdk/clipboard'

const routes: Routes = [
	{
		path: '',
		component: IndexComponent
	},
	{
		path: 'insert',
		component: InsertComponent
	},
	{
		path: 'edit/:id',
		component: EditComponent
	},
	{
		path: 'show/:id',
		component: ShowComponent
	}
]

@NgModule({
	declarations: [
		IndexComponent,
		InsertComponent,
		EditComponent,
		ShowComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		SweetAlert2Module,
		RouterModule.forChild(routes),
		NoteCardComponent,
		HighlightModule,
		ClipboardModule
	]
})
export class NotesModule { }