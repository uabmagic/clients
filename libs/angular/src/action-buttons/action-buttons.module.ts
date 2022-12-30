import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionButtonsRoutingModule } from './action-buttons-routing.module';
import { ActionButtonsComponent } from './action-buttons.component';
import { SharedModule } from '@uabmagic/angular/shared/shared.module';

@NgModule({
  declarations: [
    ActionButtonsComponent
  ],
  imports: [
    ActionButtonsRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ActionButtonsModule {
  isPlaying = false;
}
