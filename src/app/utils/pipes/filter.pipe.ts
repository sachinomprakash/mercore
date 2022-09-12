import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class FilterPipe implements PipeTransform {
    transform(item: any[], searchText: string, type: string): any[] {
        if (!item) return [];
        if (!searchText) return item;

        searchText = searchText.toLowerCase();
        if (type == 'industrypipe') {
            return item.filter(it => {
                return it.viewValue.toLowerCase().includes(searchText);
            });
        } else if (type == 'driver') {
            return item.filter(it => {
                return it.first_name.toLowerCase().includes(searchText);
            });
        } else {
            return item.filter(it => {
                if (it.license_plate) return it.license_plate.toLowerCase().includes(searchText);
            });
        }
    }
}
