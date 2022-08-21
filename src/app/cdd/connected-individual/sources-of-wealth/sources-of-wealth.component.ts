import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonModel } from 'src/app/models/cdd.model';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { ConnectedIndividualsService } from 'src/app/utils/services/httpServices/connected-individuals/connected-individuals.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { SourcespopupComponent } from '../../sourcespopup/sourcespopup.component';

@Component({
    selector: 'app-sources-of-wealth',
    templateUrl: './sources-of-wealth.component.html',
    styleUrls: ['./sources-of-wealth.component.scss']
})
export class SourcesOfWealthComponent implements OnInit {
    @Input() entityId: string;
    @Input() personInfo: PersonModel;
    soucesDocs: any = [];
    soucesOfWealthDocs: any = [];
    constructor(
        private dialog: MatDialog,
        private staticService: StaticService,
        private alertService: AlertService,
        private connectedIndividualsService: ConnectedIndividualsService
    ) {}

    ngOnInit(): void {
        this.getUboDocs();
        this.getAllSourcesDocs();
    }

    getUboDocs() {
        this.connectedIndividualsService
            .getUboKycDocs(this.entityId, this.personInfo._id)
            .subscribe(res => {
                this.soucesDocs = res.result;
            });
    }

    staffMember(docs?: any, type?: string) {
        let sowDocUpload: any;
        if (type === 'edit') {
            this.connectedIndividualsService
                .getUboKycById(this.entityId, this.personInfo._id, docs._id)
                .subscribe(res => {
                    sowDocUpload = {
                        files: res.result.document_types.map((result: any) => {
                            result.meta = result.files;
                            result.id = result.source_of_wealth_document_id;
                            return result;
                        })
                    };
                });
        } else {
            sowDocUpload = this.soucesOfWealthDocs;
        }

        setTimeout(() => {
            this.dialog
                .open(SourcespopupComponent, {
                    height: 'auto',
                    width: '77vw',
                    panelClass: 'popup-wrap',
                    data: {
                        docs: sowDocUpload,
                        sowData: docs,
                        entityId: this.entityId,
                        personInfo: this.personInfo
                    }
                })
                .afterClosed()
                .subscribe(res => {
                    if (res) {
                        this.getUboDocs();
                        this.getAllSourcesDocs();
                    }
                });
        }, 700);
    }
    getAllSourcesDocs() {
        this.staticService.getSourcesOfWealthDocs().subscribe((res: any) => {
            res.result.map((result: any) => {
                result.meta = [];
                result.comment = '';
                return result;
            });
            this.soucesOfWealthDocs.files = res.result;
        });
    }

    deleteSourcesOfWealth(ev: any) {
        this.alertService
            .openConfirmDialog(`Are you sure you want to remove ${ev.name}`, 'Yes', 'Cancel')
            .subscribe((res: any) => {
                res &&
                    this.connectedIndividualsService
                        .deleteUboKyc(this.personInfo.entity_id, this.personInfo._id, ev._id)
                        .subscribe({
                            next: () => {
                                this.soucesDocs = this.soucesDocs.filter(
                                    (obj: any) => obj._id != ev._id
                                );
                            },
                            error: err => {
                                this.alertService.openSnackBar(err.error.message, 'error');
                            }
                        });
            });
    }

    next() {
        this.connectedIndividualsService.sowComplete.next(true);
    }
}
