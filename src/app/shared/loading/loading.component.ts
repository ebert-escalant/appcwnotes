import { Component, DoCheck } from '@angular/core'
import { LoadingService } from './../../services/loading.service'

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements DoCheck {
	loading!: boolean
	constructor(private loadingService: LoadingService) {
		this.loading = this.loadingService.getLoading()
	}

	ngDoCheck() {
		this.loading = this.loadingService.getLoading()
	}
}