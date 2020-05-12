import {NgModule} from '@angular/core';
import {DayRenderPipe} from './dayRenderPipe';

@NgModule({
  exports: [
    DayRenderPipe
  ],
  declarations: [
    DayRenderPipe
  ]
})
export class SharedModule {

}
