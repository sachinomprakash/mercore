import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';

@Component({
    selector: 'app-cip-thankyou',
    templateUrl: './cip-thankyou.component.html',
    styleUrls: ['./cip-thankyou.component.scss']
})
export class CipThankyouComponent implements OnInit {
    @Input() applicationRef: any;
    @Input() component?: string;
    constructor(private router: Router, private alertService: AlertService) {}

    ngOnInit(): void {}
    backToHome() {
        this.router.navigateByUrl(`/${modulePath.home}`);
    }
    toast() {
        this.alertService.openSnackBar('Coming Soon', '');
    }
    openLink() {
        window.open(`mailto:support@mercore.com?subject=${this.applicationRef}`, '_blank');
    }
}
