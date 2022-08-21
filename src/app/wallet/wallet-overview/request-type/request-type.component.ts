import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'app-product-type',
    templateUrl: './request-type.component.html',
    styleUrls: ['./request-type.component.scss']
})
export class ProductsComponent implements OnInit {
    @Input() list_products: any;
    constructor() {}

    ngOnInit(): void {}
}
