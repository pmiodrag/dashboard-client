import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customslice',  pure: false})
export class CustomSlice implements PipeTransform {
     transform(list: any[], start: number, end: number): any[] {
        // create instance vars to store keys and final output
      
        //console.log("Slice pipe", list, start);
        // return the resulting array
        return list.slice(start,end);
    }
}