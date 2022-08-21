import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter'
})
@Injectable()
export class SearchPipe implements PipeTransform {
    transform(value: any[], searchString: string, prop?: any): any {
        if (!value) {
            return [];
        }
        if (!searchString || !prop) {
            return value;
        }
        const _searchText = searchString.toLowerCase(),
            _isArr = Array.isArray(value),
            _flag =
                _isArr && typeof value[0] === 'object'
                    ? true
                    : _isArr && typeof value[0] !== 'object'
                    ? false
                    : true;

        const filterValue = value.filter(ele => {
            let val = _flag ? ele[prop] : ele;
            return val
                .toString()
                .toLowerCase()
                .includes(_searchText);
        });
        return filterValue.length > 0
            ? filterValue
            : [
                  {
                      name: 'No Data Found',
                      document: 'No Data Found',
                      question: 'No Data Found',
                      progressStatus: null
                  }
              ];
    }
}
