import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): unknown {
        let minutes: any = Math.floor(value / 60);
        let seconds: any = value - minutes * 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return minutes + ':' + seconds;
    }
}
