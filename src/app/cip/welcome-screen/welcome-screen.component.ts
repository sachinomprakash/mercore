import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { modulePath, routeConstant } from 'src/app/utils/constants/route.constant';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
    selector: 'app-welcome-screen',
    templateUrl: './welcome-screen.component.html',
    styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
    route: string;
    subContent: string;
    constructor(
        private router: Router,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.setContent();
    }
    setContent() {
        switch (this.router.url) {
            case '/customer/welcome':
                this.route = `/customer/${routeConstant.cip}`;
                break;
            case '/customer/product-selection':
                this.route = `${modulePath.home}`;
                break;
            default:
                break;
        }
    }
    contactUs() {
        this.dialog.open(ContactUsComponent, {
            width: '35vw',
            panelClass: 'popup-wrap'
        });
    }
    navigate() {
        this.router.navigate([this.route]);
    }
}
