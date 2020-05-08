import { AbstractControl } from '@angular/forms';

const date = new Date();

export function cardNumberValidator(control: AbstractControl): { [key: string]: any } | null {

    if (/[^0-9-\s]+/.test(control.value)) return { incorrect: true };

    // The Luhn Algorithm.
    let nCheck = 0, bEven = false;
    let value = control.value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10) == 0 ? null : { incorrect: true };
}

export function cardExpDateValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!/^\d{2}\/\d{2}$/g.test(control.value)) return { incorrect: true };
    let month = control.value.split('/')[0],
        year = 20 + control.value.split('/')[1];
    let newDate = new Date(year, month);
    console.log(newDate > date);
    return newDate > date ? null : { incorrect: true };
}