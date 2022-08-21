import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: string, maxLength: number, append: string): string {
        if (maxLength && value.length > maxLength) {
            return value.slice(0, maxLength).concat(append);
        }
        return value;
    }
}
