import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { UserService } from 'src/app/utils/services/httpServices/user.service';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
    token: any;
    loginPath = `/${modulePath.auth}/${routeConstant.login}`;

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (res: any) => {
                this.token = res.token;
                console.log(res);
                this.userService.verifyEmail(this.token).subscribe({
                    next: (res: any) => {},
                    error: (err: any) => {
                        this.alertService.openSnackBar(err.error.message, 'error');
                    }
                });
                // Handle Reset Token
            }
        });
    }
}
