import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {
    transform(value: boolean, ...args: unknown[]): unknown {
        return value ? 'Active' : 'Inactive';
    }
}
