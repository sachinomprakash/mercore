import { FormControl, FormGroup } from '@angular/forms';
import { PatternConstants } from 'src/app/utils/constants/patternConstants';

export class PasswordValidator {
    static hasNumber(control: FormControl) {
        if (!/\d/.test(control.value)) {
            return { number: true };
        }
        return null;
    }
    static hasUpper(control: FormControl) {
        if (!/[A-Z]/.test(control.value)) {
            return { uppercase: true };
        }
        return null;
    }
    static specailChar(control: FormControl) {
        const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
        if (!regex.test(control.value)) {
            return { specail: true };
        }
        return null;
    }
    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
    static businessEmail(control: FormControl) {
        const regex = PatternConstants.businessEmail;
        if (!regex.test(control.value.toLowerCase())) {
            return { businessemail: true };
        }
        return null;
    }
}
