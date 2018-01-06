import { Component, Input } from '@angular/core';

/**
 * Generated class for the PictureGridComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'picture-grid',
  templateUrl: 'picture-grid.html'
})
export class PictureGridComponent {

  @Input() pictures: any[] = [];
  @Input() king ;
}
