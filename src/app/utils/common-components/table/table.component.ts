import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { modulePath, routeConstant } from '../../constants/route.constant';
import { StaticService } from '../../services/httpServices/static.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() records: any;
    @Input() tableHeader: any;
    @Output() actionTrigger = new EventEmitter();
    constructor(private staticService: StaticService) {}

    ngOnInit(): void {}

    onClickAction(record: any, actionType: string) {
        this.actionTrigger.emit({ record, actionType });
    }
    progressSummary() {}
}
