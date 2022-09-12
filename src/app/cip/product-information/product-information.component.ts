import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
    selector: 'app-product-information',
    templateUrl: './product-information.component.html',
    styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {
    @ViewChild('shoes', { static: true }) private shoes: MatSelectionList;
    selectedOptions: any;
    typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    constructor() {}

    ngOnInit(): void {
        console.log('call');
    }
    selectAll(data: any) {
        console.log(data);
        this.shoes.selectAll();
    }
}
