import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';

@Component({
    selector: 'app-company-type',
    templateUrl: './company-type.component.html',
    styleUrls: ['./company-type.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTypeComponent implements OnInit {
    corporateType: string;
    constructor(private cipService: CipService) {}

    ngOnInit(): void {}

    moveToNextStep() {
        this.cipService.setMoveToNextStep(true);
    }

    setValue(value: string) {
        this.corporateType = value;
    }
}

// Check this
