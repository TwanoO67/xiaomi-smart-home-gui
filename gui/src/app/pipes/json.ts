import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toJSON'})
export class toJSONPipe implements PipeTransform {

  constructor(){ }

  transform(obj: any): string {
    return JSON.stringify(obj);
  }
}
