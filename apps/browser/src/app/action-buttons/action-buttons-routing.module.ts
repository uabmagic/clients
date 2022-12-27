import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionButtonsComponent } from './action-buttons.component';

const routes: Routes = [
  {
    path: '',
    component: ActionButtonsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../now-playing/now-playing.module').then(m => m.NowPlayingModule)
      },
      {
        path: 'nowplaying',
        loadChildren: () => import('../now-playing/now-playing.module').then(m => m.NowPlayingModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('../requests/requests.module').then(m => m.RequestsModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionButtonsRoutingModule { }
