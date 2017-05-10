import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'filter-textbox',
  template:  `<md-input-container>
                        <input mdInput placeholder="Filter patients" align="end"  [(ngModel)]="model.filter" 
                (keyup)="filterChanged($event)" ngDefaultControl>
                    </md-input-container>`
  
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
