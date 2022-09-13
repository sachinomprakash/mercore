import { Component, OnInit } from '@angular/core';
import { IStep } from 'src/app/models/cip.model';
import { stepConstants } from '../../constants/steps.constants';

@Component({
    selector: 'progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {
    editable: boolean = false;
    currentStep: number = 0;
    steps: Array<IStep>;
    constructor() {}

    ngOnInit(): void {
        this.steps = stepConstants;
    }
}
