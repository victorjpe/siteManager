import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PictureGridComponent } from './picture-grid/picture-grid';
@NgModule({
	declarations: [PictureGridComponent],
	imports: [ IonicModule ],
	exports: [PictureGridComponent]
})
export class ComponentsModule {}
