import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BaseComponent } from './base/base.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
	declarations: [
		BaseComponent,
		SidebarComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FontAwesomeModule
	]
})
export class LayoutModule { }