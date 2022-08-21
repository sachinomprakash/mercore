import { Component, Input, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { CddServiceService } from 'src/app/utils/services/httpServices/cdd/cdd-service.service';

@Component({
    selector: 'app-progress-table',
    templateUrl: './progress-table.component.html',
    styleUrls: ['./progress-table.component.scss']
})
export class ProgressTableComponent implements OnInit {
    @Input() docs: any;
    @Input() type: string;
    searchString: string;
    constructor(private cddService: CddServiceService) {}

    ngOnInit(): void {
        this.cddService.searchField.subscribe({
            next: (res: any) => {
                this.searchString = res;
            }
        });
    }
}
