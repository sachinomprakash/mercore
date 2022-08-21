import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PolicyType } from 'src/app/utils/constants/app.constant';

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
    title!: string;
    policyType!: PolicyType;
    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe({
            next: (res: any) => {
                this.policyType = res.type;
                if (this.policyType == PolicyType.TermCondition) {
                    this.title = 'Here is Terms & Conditions';
                } else {
                    this.title = 'Here is Privacy Policy';
                }
            }
        });
    }
}
