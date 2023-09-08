import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Note, NoteBody } from 'src/app/models/note/note'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root'
})
export class NoteService {
	constructor(private http: HttpClient) { }

	getAll(search = '') {
		return this.http.get<Note[]>(`${environment.apiUrl}/notes?search=${search}`)
	}

	get(id: string) {
		return this.http.get<Note | null>(`${environment.apiUrl}/notes/${id}`)
	}

	create(data: NoteBody) {
		return this.http.post<{ message: string}>(`${environment.apiUrl}/notes`, data)
	}

	update(id: string, data: NoteBody) {
		return this.http.put<{ message: string}>(`${environment.apiUrl}/notes/${id}`, data)
	}

	delete(id: string) {
		return this.http.delete<{ message: string}>(`${environment.apiUrl}/notes/${id}`)
	}

	favorite(id: string) {
		return this.http.patch<{ message: string}>(`${environment.apiUrl}/notes/${id}/favorite`, {})
	}
}