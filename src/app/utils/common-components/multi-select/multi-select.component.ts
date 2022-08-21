import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { filter } from 'lodash';
import { IListItem } from '../../interfaces/utils.interface';

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
    @Input() items!: IListItem[];
    @Input() title!: string;
    @Input() selected!: any[];
    @Input() searchPlaceholder: string;
    @Output() onSelectItem = new EventEmitter();
    searchedItems!: IListItem[];
    selectedItems: any[] = [];
    searchString = '';
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.selected) {
            this.selectedItems = [...this.selected];
        }
    }
    onSearch(searchString: string) {
        searchString = searchString.toLowerCase();
        this.searchedItems = filter(
            this.items,
            (item: IListItem) => item.label.toLowerCase().indexOf(searchString) > -1
        );
        this.searchString = searchString;
    }
    isChecked(id: string) {
        return !!this.selectedItems.some(val => val == id);
    }
    onCheckChange(event: any) {
        const emitterData = {
            isChecked: event.checked,
            value: event.source.value,
            deleteIndex: -1
        };
        if (event.checked) {
            this.selectedItems.push(event.source.value);
        } else {
            const index = this.selectedItems.findIndex(val => val == event.source.value);
            this.selectedItems.splice(index, 1);
            emitterData.deleteIndex = index;
        }
        this.onSelectItem.emit({ ...emitterData, values: this.selectedItems });
    }
}
