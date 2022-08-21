import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-wallet-overview',
    templateUrl: './wallet-overview.component.html',
    styleUrls: ['./wallet-overview.component.scss']
})
export class WalletOverviewComponent implements OnInit {
    @Input() summaryDocs: any;
    constructor() {}

    ngOnInit(): void {}

    data = [
        {
            label: 'COMPANY NAME',
            value: 'Cake Investment Ltd',
            formName: 'company_name'
        },
        {
            label: 'previous company name (within 10 years)',
            value: 'Cake Investment Ltd',
            formName: 'company_name'
        },
        {
            label: 'company registration number',
            value: '88876678',
            formName: 'company_name'
        },
        {
            label: 'country of incorporation/Registration',
            value: 'United Kingdom',
            formName: 'company_name'
        },
        {
            label: 'industry sector',
            value: 'Bakery',
            formName: 'company_name'
        },
        {
            label: 'date of incorporation',
            value: '19/05/2019',
            formName: 'company_name'
        },
        {
            label: 'company registered address and postcode',
            value: '113 Liverpool Street, AC1 2XY',
            formName: 'company_name'
        },
        {
            label: 'lei number',
            value: '123dg56dhb7rj6hhh586khdne7',
            formName: 'company_name'
        },
        {
            label: 'legal entity Type',
            value: 'Mutual Fund',
            formName: 'company_name'
        }
    ];
    trading = [
        {
            label: 'TRADING NAME',
            value: 'Cake Investment Ltd',
            formName: 'company_name'
        },
        {
            label: 'Physical Presence Locations',
            value: 'United Kingdom',
            formName: 'company_name'
        },
        {
            label: 'Countries of operation',
            value: 'United Kingdom, USA, Canada',
            formName: 'company_name'
        },
        {
            label: 'Countries of Intended Trade',
            value: 'United Kingdom, USA, Canada',
            formName: 'company_name'
        },
        {
            label: 'TRADING ADDRESS AND POSTCODE',
            value: '113 Liverpool Street, AC1 2XY',
            formName: 'company_name'
        }
    ];
}
