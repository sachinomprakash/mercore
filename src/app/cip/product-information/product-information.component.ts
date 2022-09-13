import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewRef
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/cip.model';
import { routeConstant } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';

@Component({
    selector: 'app-product-information',
    templateUrl: './product-information.component.html',
    styleUrls: ['./product-information.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInformationComponent implements OnInit {
    @Input() productList?: number[];
    @Input() cipStage: number;
    productMasterData: Array<ProductCategory>;
    clientForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private staticService: StaticService,
        private cipService: CipService,
        private cdnRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        window.scroll(0, 0);
        this.initializeForm();
        this.getProducts();
    }

    initializeForm() {
        this.clientForm = this.fb.group({
            myOtherControl: new FormArray([], Validators.required)
        });
    }

    getProducts() {
        this.staticService.getProductMaster().subscribe(res => {
            this.productMasterData = [res.result[0]];
            this.cdnRef.detectChanges();
            this.productMasterData.map(item => {
                if (item.subCategories.length > 0) {
                    item.subCategories = item.subCategories.filter(
                        (subCat: any) => subCat.is_active
                    );
                }
            });
        });
        if (this.productList) {
            for (const id of this.productList) {
                this.updateControl(id, true);
            }
        }
    }

    selctAll(select: any, index: number) {
        const formArray: FormArray = this.clientForm.get('myOtherControl') as FormArray;
        this.productMasterData[index].subCategories.forEach((obj: any) => {
            if (select.checked) {
                if (!this.clientForm.value.myOtherControl.some((val: any) => obj.id == val)) {
                    formArray.push(new FormControl(obj.id));
                }
            } else {
                const index = formArray.controls.findIndex(ctrl => {
                    return ctrl.value == obj.id;
                });
                if (index >= 0) {
                    formArray.removeAt(index);
                }
            }
        });
    }

    onSelect(event: any) {
        if (event.option._selected) {
            this.updateControl(event.option._value, true);
        } else {
            this.updateControl(event.option._value, false);
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

    submit() {
        if (this.clientForm.invalid) {
            return;
        }
        let list_products = this.clientForm.value.myOtherControl.filter(
            (val: string) => typeof val != 'string' || !val.includes('other')
        );
        // this.loaderService.show();

        if (this.cipStage === 0) {
            this.cipService.postCipData({ list_products }, '1').subscribe({
                next: () => {
                    this.cipService.syncCipData.next(true);
                    this.cipService.setMoveToNextStep(true);
                },
                error: err => {
                    this.alertService.openSnackBar(err.error.message, 'error');
                }
            });
        } else {
            let products = list_products;
            this.cipService.addCIP({ list_products: products }, '1').subscribe({
                next: () => {
                    this.cipService.syncCipData.next(true);
                    this.cipService.setMoveToNextStep(true);
                },
                error: err => {
                    this.alertService.openSnackBar(err.error.message, 'error');
                }
            });
        }
    }

    isChecked(id: number) {
        const formArray: FormArray = this.clientForm.get('myOtherControl') as FormArray;
        return formArray.controls.some(ctrl => ctrl.value == id);
    }

    get controls() {
        return this.clientForm.controls;
    }
    back() {
        this.cipService.setBackToStep(true);
    }
}

// Check this
