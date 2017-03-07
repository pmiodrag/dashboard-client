import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'listtodict',  pure: false})
export class ListToDict implements PipeTransform {
     transform(list: any[]): any[] {
        let dict : Array<any> = new Array<any>()
        // create instance vars to store keys and final output
        list.forEach(key => {
                dict.push({ 'name': key.name });

            });
        // return the resulting array
        return dict;
    }
}