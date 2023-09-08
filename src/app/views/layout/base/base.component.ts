import { Component } from '@angular/core'
import { faUserCircle, faHome, faListCheck, faNotesMedical, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
	faUserCircle = faUserCircle
	faHome = faHome
	faListCheck = faListCheck
	faNotesMedical = faNotesMedical
	faArrowRightFromBracket = faArrowRightFromBracket
}