import { Component, DoCheck, OnInit } from '@angular/core'
import {
	faUserCircle,
	faHome,
	faListCheck,
	faNotesMedical,
	faArrowRightFromBracket,
	faArrowRightToBracket,
	faAddressCard
} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/core/guards/auth.service'
import { User } from 'src/app/models/user/user'

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, DoCheck {
	user!: User | null
	faUserCircle = faUserCircle
	faHome = faHome
	faListCheck = faListCheck
	faNotesMedical = faNotesMedical
	faArrowRightFromBracket = faArrowRightFromBracket
	faArrowRightToBracket = faArrowRightToBracket
	faAddressCard = faAddressCard

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.user = this.authService.getUser()
	}

	ngDoCheck() {
		this.user = this.authService.getUser()
	}

	logout() {
		this.authService.removeData()
	}
}