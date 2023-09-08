export interface Note {
	id: string
	title: string
	description: string
	language: string
	code: string
	favorite: boolean
	createdAt: string
}

export interface NoteBody {
	title: string
	description: string
	language: string
	code: string
}