import { Component, OnInit } from '@angular/core';
import { modulePath, routeConstant } from '../../constants/route.constant';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    activeClass: boolean = false;
    loginPath: string;
    sideMenu: any = [];
    constructor() {}

    ngOnInit(): void {
        const stage = localStorage.getItem('stage');
        if (stage === '3') {
            this.loginPath = `/${modulePath.home}`;
        } else {
            this.loginPath = `/${modulePath.customer}/${routeConstant.productSelection}`;
        }
        this.sideMenu = [
            {
                menu: 'Home',
                img: 'home.svg',
                path: this.loginPath,
                dis: true,
                active: true
            },
            {
                menu: 'Messages',
                img: 'messages.svg',
                submenu: [
                    {
                        childMenu: 'Coming Soon'
                    }
                ]
            },
            {
                menu: 'Support',
                img: 'customer support.svg',
                dis: false,
                submenu: [
                    {
                        childMenu: 'Email'
                    },
                    {
                        childMenu: 'Phone'
                    }
                ]
            }
        ];
    }
    activeclass() {
        this.activeClass = true;
    }
    navigate(item: any) {
        switch (item.childMenu) {
            case 'Email':
                window.open('mailto:support@mercore.com', '_blank');
                break;
            case 'Phone':
                window.open('tel:+44 (0)7734 037 015', '_blank');
                break;
            default:
                break;
        }
    }
}
