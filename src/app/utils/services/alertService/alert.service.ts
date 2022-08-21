import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../common-components/confirm-dialog/confirm-dialog.component';
export enum MessageType {
    success = 'success',
    error = 'error',
    normal = ''
}
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

    openSnackBar(message: string, type?: string) {
        switch (type) {
            case MessageType.error:
                this._snackBar.open(message, 'X', {
                    duration: 3000,
                    panelClass: ['snackbar-error']
                });
                break;
            case MessageType.success:
                this._snackBar.open(message, 'X', {
                    duration: 3000,
                    panelClass: ['snackbar-success']
                });
                break;
            case MessageType.normal:
                this._snackBar.open(message, 'X', {
                    duration: 3000
                });
                break;

            default:
                break;
        }
    }
    openConfirmDialog(message?: string, okText?: string, cancelText?: string, btnColor?: string) {
        return this.dialog
            .open(ConfirmDialogComponent, {
                width: '430px',
                data: {
                    message,
                    buttonText: {
                        ok: okText,
                        cancel: cancelText
                    }
                },
                panelClass: btnColor == 'confirmAction' ? 'confirmAction' : ''
            })
            .afterClosed();
    }
}
