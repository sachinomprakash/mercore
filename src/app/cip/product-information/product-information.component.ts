import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'lodash';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { LoaderService } from 'src/app/utils/services/loader/loader.service';

@Component({
    selector: 'app-product-information',
    templateUrl: './product-information.component.html',
    styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {
    @Input() productList?: number[];
    @Input() cipStage: number;
    @Output() onNext = new EventEmitter();
    searchedList: any[] = [];
    productMasterData: any[];
    clientForm: FormGroup;
    descriptionMaxLength = 200;
    lazySearch = new BehaviorSubject({});
    otherStatusSetSelected: boolean;
    otherCategoryId: any;
    otherCategoryOldValue: string;

    constructor(
        private fb: FormBuilder,
        private staticService: StaticService,
        private cipService: CipService,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        window.scroll(0, 0);
        // this.checkOtherValue();
        this.clientForm = this.fb.group({
            myOtherControl: new FormArray([], Validators.required)
        });

        this.staticService.getProductMaster().subscribe(res => {
            this.productMasterData = JSON.parse(JSON.stringify(res.result));

            let otherSubCategoryData = JSON.parse(JSON.stringify(res.result));

            otherSubCategoryData.map((item: any) => {
                if (item.subCategories.length > 0) {
                    item.subCategories = item.subCategories.filter(
                        (subCat: any) => !subCat.is_active
                    );
                }
            });

            this.productMasterData.map(item => {
                if (item.subCategories.length > 0) {
                    item.subCategories = item.subCategories.filter(
                        (subCat: any) => subCat.is_active
                    );
                }
            });
        });
    }

    selctAll(select: any, index: number) {
        const formArray: FormArray = this.clientForm.get('myOtherControl') as FormArray;
        this.productMasterData[index].subCategories.forEach((obj: any) => {
            if (select.checked) {
                if (!this.clientForm.value.myOtherControl.some((val: any) => obj.id == val)) {
                    formArray.push(new FormControl(obj.id));
                }
                // obj.checked = true;
            } else {
                const index = formArray.controls.findIndex(ctrl => {
                    return ctrl.value == obj.id;
                });
                if (index >= 0) {
                    formArray.removeAt(index);
                }
                // obj.checked = false;
            }
        });
    }
    readMoreless(disLength: any) {
        disLength == 200 ? (this.descriptionMaxLength = 0) : (this.descriptionMaxLength = 200);
    }
    onSelect(event: any) {
        if (event.option._selected) {
            if (typeof event.option._value == 'string' && event.option._value.includes('other')) {
                this.clientForm.addControl(
                    'otherProduct',
                    new FormControl('', [Validators.required, Validators.minLength(3)])
                );
            } else {
                this.updateControl(event.option._value, true);
            }
        } else {
            if (typeof event.option._value == 'string' && event.option._value.includes('other')) {
                this.otherStatusSetSelected = false;
                this.clientForm.removeControl('otherProduct');
                this.updateControl(this.otherCategoryId, false);
            } else {
                this.updateControl(event.option._value, false);
            }
        }
    }
    updateControl(value: number, checked: boolean) {
        const formArray: FormArray = this.clientForm.get('myOtherControl') as FormArray;
        if (checked) {
            formArray.push(new FormControl(value));
        } else {
            const index = formArray.controls.findIndex(ctrl => {
                return ctrl.value == value;
            });
            if (index >= 0) {
                formArray.removeAt(index);
            }
        }
    }
    showTextField() {
        return !!this.clientForm.get('otherProduct');
    }
    onSearch(searchString: string) {
        searchString = searchString.toLowerCase();
        this.searchedList = [];
        if (!searchString) {
            return;
        }
        for (const category of this.productMasterData) {
            const filterData = filter(
                category.subCategories,
                (item: any) => item.name.toLowerCase().indexOf(searchString) > -1
            );
            this.searchedList = this.searchedList.concat(filterData);
        }
    }
    next() {
        if (this.clientForm.invalid) {
            return;
        }
        let list_products = this.clientForm.value.myOtherControl.filter(
            (val: string) => typeof val != 'string' || !val.includes('other')
        );
        // this.loaderService.show();
        if (!this.otherStatusSetSelected) {
            list_products = list_products.filter((item: any) => item != this.otherCategoryId);
        }
        if (this.cipStage === 0) {
            this.cipService.postCipData({ list_products }, '1').subscribe({
                next: () => {
                    this.cipService.syncCipData.next(true);
                    this.onNext.emit({ valid: true });
                    this.loaderService.hide();
                },
                error: err => {
                    this.loaderService.hide();
                }
            });
        } else if (
            this.clientForm.value.otherProduct &&
            this.clientForm.value.otherProduct.length > 3 &&
            this.otherCategoryOldValue != this.clientForm.value.otherProduct
        ) {
            let otherProductValue = this.clientForm.value.otherProduct;
            this.cipService
                .addOtherCIP({
                    name: otherProductValue,
                    description: '',
                    category_id: this.productMasterData[0]?.id
                })
                .subscribe(response => {
                    let products = [...new Set([...list_products, '' + response.result.id])];
                    this.cipService.addCIP({ list_products: products }, '1').subscribe({
                        next: () => {
                            this.cipService.syncCipData.next(true);
                            this.onNext.emit({ valid: true });
                            this.loaderService.hide();
                        },
                        error: err => {
                            this.loaderService.hide();
                        }
                    });
                });
        } else {
            let products = list_products;
            if (
                this.clientForm.value.otherProduct &&
                this.clientForm.value.otherProduct.length > 3
            ) {
                products = [...new Set([...list_products, '' + this.otherCategoryId])];
            }
            this.cipService.addCIP({ list_products: products }, '1').subscribe({
                next: () => {
                    this.cipService.syncCipData.next(true);
                    this.onNext.emit({ valid: true });
                    this.loaderService.hide();
                },
                error: err => {
                    this.loaderService.hide();
                }
            });
        }
    }
    otherInput(event: any) {
        if (event.code == 'Space' || event.code == 'Enter' || event.code == 'KeyS') {
            event.stopPropagation();
        }
    }
    isChecked(id: number) {
        const formArray: FormArray = this.clientForm.get('myOtherControl') as FormArray;
        return formArray.controls.some(ctrl => ctrl.value == id);
    }
    get controls() {
        return this.clientForm.controls;
    }

    isDisabled() {
        if (this.clientForm.controls['otherProduct']) {
            if (this.clientForm.controls['otherProduct'].value.length >= 3) {
                return false;
            }
            return true;
        } else {
            return this.clientForm.invalid;
        }
    }
}
