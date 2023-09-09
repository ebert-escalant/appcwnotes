import { Injectable } from '@angular/core'
import { Language } from 'src/app/models/language/language'

@Injectable({
	providedIn: 'root'
})
export class LanguageService {
	languages: Language[] = [
		{ value: 'xml', label: 'XML/HTML' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'scss', label: 'SCSS' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'json', label: 'JSON' },
		{ value: 'css', label: 'CSS' },
		{ value: 'php', label: 'PHP' },
		{ value: 'sql', label: 'SQL' },
		{ value: 'bash', label: 'Bash' },
		{ value: 'java', label: 'Java' },
		{ value: 'python', label: 'Python' },
		{ value: 'nginx', label: 'Nginx' },
		{ value: 'apache', label: 'Apache' },
		{ value: 'ini', label: 'INI' },
		{ value: 'yaml', label: 'YAML' },
		{ value: 'shell', label: 'Shell' },
		{ value: 'plaintext', label: 'Texto plano' }
	]

	getLanguages(): Promise<Language[]> {
		return new Promise((resolve, _reject) => {
			resolve(this.languages)
		})
	}
}