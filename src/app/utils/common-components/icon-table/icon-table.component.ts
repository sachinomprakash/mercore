import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-icon-table',
    templateUrl: './icon-table.component.html',
    styleUrls: ['./icon-table.component.scss']
})
export class IconTableComponent implements OnInit {
    @Input() records: any;
    @Input() tableHeader: any;
    @Input() component: string;
    @Output() actionTrigger = new EventEmitter();
    hideDelete: boolean;
    constructor() {}

    ngOnInit(): void {
        this.component === 'connectedIndividuals'
            ? (this.hideDelete = true)
            : (this.hideDelete = false);
    }

    onClickAction(record: any, actionType: string) {
        this.actionTrigger.emit({ record, actionType });
    }
}
