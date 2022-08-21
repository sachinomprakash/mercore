import { FormControl, FormGroup } from '@angular/forms';
import { COUNTRY_ADDRESS_POSTALS } from '../constants/zipCode.constants';

export class ZipCodeValidator {
    static checkCountryZip(alpha2Code?: any) {
        const a = COUNTRY_ADDRESS_POSTALS.find(o => o.abbrev === alpha2Code);
        return a?.postal;
    }
}
