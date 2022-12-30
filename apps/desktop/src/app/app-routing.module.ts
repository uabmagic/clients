import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActionButtonsModule } from '@uabmagic/angular/action-buttons/action-buttons.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => ActionButtonsModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
