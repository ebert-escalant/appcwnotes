import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	loading = false

	setLoading(value: boolean) {
		this.loading = value
	}

	getLoading() {
		return this.loading
	}
}