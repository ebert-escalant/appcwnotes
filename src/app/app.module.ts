import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { ToastrModule } from 'ngx-toastr'
import { LayoutModule } from './views/layout/layout.module'

import { AuthInterceptor } from './core/interceptors/auth.interceptor'
import { AppComponent } from './app.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs'

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		LayoutModule,
		FontAwesomeModule,
		ToastrModule.forRoot({
			timeOut: 5000,
			positionClass: 'toast-top-right',
			progressBar: true,
			closeButton: true,
			preventDuplicates: true
		}),
		SweetAlert2Module.forRoot()
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				coreLibraryLoader: () => import('highlight.js/lib/core'),
				languages: {
					xml: () => import('highlight.js/lib/languages/xml'),
					typescript: () => import('highlight.js/lib/languages/typescript'),
					scss: () => import('highlight.js/lib/languages/scss'),
					javascript: () => import('highlight.js/lib/languages/javascript'),
					json: () => import('highlight.js/lib/languages/json'),
					css: () => import('highlight.js/lib/languages/css'),
					php: () => import('highlight.js/lib/languages/php'),
					sql: () => import('highlight.js/lib/languages/sql'),
					bash: () => import('highlight.js/lib/languages/bash'),
					java: () => import('highlight.js/lib/languages/java'),
					python: () => import('highlight.js/lib/languages/python'),
					nginx: () => import('highlight.js/lib/languages/nginx'),
					apache: () => import('highlight.js/lib/languages/apache'),
					ini: () => import('highlight.js/lib/languages/ini'),
					yaml: () => import('highlight.js/lib/languages/yaml'),
					shell: () => import('highlight.js/lib/languages/shell'),
					plaintext: () => import('highlight.js/lib/languages/plaintext')
				},
			},
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }