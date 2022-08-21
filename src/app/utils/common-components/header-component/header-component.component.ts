import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modulePath, routeConstant } from '../../constants/route.constant';
import { AlertService } from '../../services/alertService/alert.service';
import { CommonService } from '../../services/common/common.service';

@Component({
    selector: 'app-header-component',
    templateUrl: './header-component.component.html',
    styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {
    profileObj: any;
    loginPath: string;
    constructor(
        private router: Router,
        private commonService: CommonService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        const stage = localStorage.getItem('stage');
        if (stage === '3') {
            this.loginPath = `/${modulePath.home}`;
        } else {
            this.loginPath = `/${modulePath.customer}/${routeConstant.productSelection}`;
        }
        this.commonService.getUserProfile().subscribe((res: any) => {
            this.commonService.getProfDetails(res.result);
            this.profileObj = res.result;
        });
    }

    navigateToSettings() {
        this.router.navigate([`/settings`]);
    }

    logout() {
        this.router.navigate([`/auth/login`]);
        localStorage.clear();
    }

    routeToHome() {
        this.router.navigate([this.loginPath]);
    }
    toast() {
        this.alertService.openSnackBar('Coming Soon', '');
    }
}
