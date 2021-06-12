import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

@NgModule({
  // ... declarations property ...
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  // ... providers and bootstrap properties ...
})
export class AppModule {}