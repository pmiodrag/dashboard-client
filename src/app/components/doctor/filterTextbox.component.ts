import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'filter-textbox',
  template: `<md-input-container>
                        <input mdInput placeholder="Filter doctors" align="end"  [(ngModel)]="model.filter" 
                (keyup)="filterChanged($event)" ngDefaultControl>
                    </md-input-container>`
    
  
//  directives: [FORM_DIRECTIVES, MD_INPUT_DIRECTIVES]
})
export class FilterTextboxComponent {

  
    model: { filter: string } = { filter: null };
    
    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.model.filter); //Raise changed event
    }
}
