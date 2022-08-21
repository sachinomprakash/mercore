import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-multiselect-search-dropdown',
    templateUrl: './multiselect-search-dropdown.component.html',
    styleUrls: ['./multiselect-search-dropdown.component.scss']
})
export class MultiselectSearchDropdownComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() array: any;
    @Input() selectedValues: any;
    @Input() label: any;
    @Input() multiple: boolean;
    showCrossIcon: boolean;
    protected data: any[] = [];
    public multiCtrl: FormControl = new FormControl([], Validators.required);
    public multiFilterCtrl: FormControl = new FormControl();
    public filterMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    @Output() formValid = new EventEmitter<any>();
    @ViewChild('multiSelect') multiSelect: MatSelect;

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();
    constructor() {}

    ngOnInit(): void {
        this.data = this.array;
        if (this.selectedValues) {
            const selectedObjs = this.array.filter((objOne: any) => {
                return this.selectedValues.some((objTwo: any) => {
                    return objOne.value == objTwo;
                });
            });
            if (this.multiple) {
                this.multiCtrl.setValue(selectedObjs);
            } else {
                this.multiCtrl.setValue(selectedObjs[0]);
            }
        }
        this.filterMulti.next(this.data.slice());
        // listen for search field value changes
        this.multiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.showCrossIcon = !!this.multiCtrl?.value?.length;
            this.formValid.emit(this.multiCtrl?.value);
            this.filterBanksMulti();
        });
    }

    public errorHandling = (error: string) => {
        return this.multiCtrl.hasError(error);
    };

    ngAfterViewInit() {
        this.setInitialValue();
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    protected setInitialValue() {
        this.filterMulti.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
            this.multiSelect.compareWith = (a: any, b: any) => a && b && a.value === b.value;
        });
    }

    protected filterBanksMulti() {
        if (!this.data) {
            return;
        }
        // get the search keyword
        let search = this.multiFilterCtrl.value;
        if (!search) {
            this.filterMulti.next(this.data.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filterMulti.next(
            this.data.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
        );
    }
    clearSelection(event: Event) {
        event.stopPropagation(); // <-- stop event propagation
        this.multiCtrl.reset(); // <-- brackets () were missing
        this.showCrossIcon = false;
    }
}
