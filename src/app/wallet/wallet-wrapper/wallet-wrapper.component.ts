import { Component, OnInit } from '@angular/core';
import { IDocRequest } from 'src/app/models/case.model';
import { CDDDocRequests, storageKeys } from 'src/app/utils/constants/app.constant';
import { AuthService } from 'src/app/utils/services/authService/auth.service';
import { WalletService } from 'src/app/utils/services/httpServices/wallet.service';

@Component({
    selector: 'app-wallet-wrapper',
    templateUrl: './wallet-wrapper.component.html',
    styleUrls: ['./wallet-wrapper.component.scss']
})
export class WalletWrapperComponent implements OnInit {
    summaryDocs: any;
    constructor(private walletService: WalletService, private authService: AuthService) {}

    ngOnInit(): void {
        this.getContentData();
    }

    getContentData() {
        const contentId = this.authService.getStorageValue(storageKeys.guestContentId);
        this.walletService.getSharedContentData(contentId).subscribe({
            next: (res: any) => {
                this.summaryDocs = {
                    ...res,
                    entityDocs: res.entityDocs
                        ? [
                              {
                                  name: 'Company Profile',
                                  files: this.filterEntityDocs(
                                      res.entityDocs,
                                      CDDDocRequests.arrayOfCompanyProfile
                                  )
                              },
                              {
                                  name: 'Ownership',
                                  files: this.filterEntityDocs(
                                      res.entityDocs,
                                      CDDDocRequests.arrayOfOwnershipDocs
                                  )
                              }
                          ]
                        : []
                };
                console.log(this.summaryDocs);
            }
        });
    }

    filterEntityDocs(entityDocs: any, docs: any) {
        let filteredDocs: any = [];
        entityDocs.forEach((doc: IDocRequest) => {
            docs.forEach((cpDocs: any) => {
                if (cpDocs.replace(' ', '') === doc.name.replace(' ', '')) {
                    doc?.files.map((i: any) => filteredDocs.push(i));
                }
            });
        });
        return filteredDocs;
    }
}
