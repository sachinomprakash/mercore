import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, debounce, debounceTime } from 'rxjs';
import { CommonService } from '../../services/common/common.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
    @Input() placeholder!: string;
    @Input() padding?: string;
    @Output() onType = new EventEmitter();
    lazySearch = new BehaviorSubject({});
    @ViewChild('search') private search: any;
    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.lazySearch.pipe(debounceTime(100)).subscribe({
            next: (res: any) => {
                this.onSearch(res?.target?.value || '');
            }
        });
        this.commonService.resetSearchObservable.subscribe(res => {
            if (res) {
                this.removeSearchText(this.search);
            }
        });
    }
    onSearch(searchString: any) {
        this.onType.emit(searchString);
    }
    removeSearchText(search: any) {
        search.value = '';
        this.onSearch('');
    }
}
