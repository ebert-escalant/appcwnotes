import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BaseComponent } from './views/layout/base/base.component'
import { authGuard } from './core/guards/auth.guard'

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./views/pages/index/index.module').then(m => m.IndexModule)
			},
			{
				path: 'notes',
				canActivate: [authGuard],
				loadChildren: () => import('./views/pages/notes/notes.module').then(m => m.NotesModule)
			}
		]
	},
	{
		path: 'auth',
		loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }