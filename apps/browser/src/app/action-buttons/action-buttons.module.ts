import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionButtonsRoutingModule } from './action-buttons-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ActionButtonsComponent } from './action-buttons.component';

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
export class ActionButtonsModule { }
