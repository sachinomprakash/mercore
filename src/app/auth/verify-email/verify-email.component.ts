import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { UserService } from 'src/app/utils/services/httpServices/user.service';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
    email!: string;
    constructor(private userService: UserService, private alertService: AlertService) {}

    ngOnInit(): void {
        this.email = localStorage.getItem('email') || '';
    }
    sendEmail() {
        this.userService.resendVerificationEmail({ email: this.email }).subscribe({
            next: (res: any) => {
                this.alertService.openSnackBar(res.message, 'success');
            },
            error: (err: any) => {
                this.alertService.openSnackBar(err.error.message, 'error');
            }
        });
    }
}
