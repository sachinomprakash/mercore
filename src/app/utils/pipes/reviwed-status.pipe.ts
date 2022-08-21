import { Pipe, PipeTransform } from '@angular/core';
import { ReviwedStatus } from '../constants/app.constant';

@Pipe({
    name: 'reviwedStatus'
})
export class ReviwedStatusPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        let index = ReviwedStatus.findIndex(data => data.key === value);
        if (index > -1) {
            return ReviwedStatus[index].value;
        }
        return null;
    }
}
