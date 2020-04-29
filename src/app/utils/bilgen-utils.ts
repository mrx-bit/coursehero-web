import {MatSnackBar} from '@angular/material';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/typings/esm5/snack-bar';
import {Injectable} from '@angular/core';

@Injectable()
export class BilgenUtils {

    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private _snackBar: MatSnackBar
    ) {}

    public displayMessage(message: string): void {
        this._snackBar.open(message, '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

}
