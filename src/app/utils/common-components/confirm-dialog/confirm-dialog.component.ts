import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    entityId: any;
    message = 'Are you sure?';
    confirmButtonText = 'Yes';
    cancelButtonText = 'Cancel';
    crossIconVisibilityVar = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) {
        if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
            if (data.crossIconVisibility) {
                this.crossIconVisibilityVar = true;
            }
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
}
