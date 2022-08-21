import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/utils/services/alertService/alert.service';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { ConnectedIndividualsService } from 'src/app/utils/services/httpServices/connected-individuals/connected-individuals.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';

@Component({
    selector: 'app-sourcespopup',
    templateUrl: './sourcespopup.component.html',
    styleUrls: ['./sourcespopup.component.scss']
})
export class SourcespopupComponent implements OnInit {
    checkColumn1: boolean;
    checkColumn2: boolean;
    sourcesOfWealthForm: FormGroup;
    soucesOfWealthDocs: any = [];
    sow_id: any;
    files: any;
    source_of_wealth: any;
    constructor(
        private staticService: StaticService,
        private dialogRef: MatDialogRef<SourcespopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private connectedIdividualService: ConnectedIndividualsService,
        private commonservice: CommonService,
        private alertService: AlertService
    ) {}
    soucesOfWealth: Array<any>;
    ngOnInit(): void {
        this.getAllSources();
        this.initForm();
        this.soucesOfWealthDocs = this.data.docs;
        this.source_of_wealth = this.data.sowData?._id;
    }

    initForm() {
        this.sourcesOfWealthForm = this.fb.group({
            source_of_wealth_id: [
                this.data.sowData?.source_of_wealth_id || '',
                Validators.required
            ],
            free_text: [this.data.sowData?.free_text || undefined, Validators.maxLength(500)]
        });
        if (this.data.sowData) {
            this.getSowValue(this.data.sowData?.source_of_wealth_id);
            this.setEmpValue();
        }
    }
    getAllSources() {
        this.staticService.getSourcesOfWealth().subscribe(res => {
            this.soucesOfWealth = res.result.map((sow: any) => this.mapSourcesOfWelath(sow));
        });
    }

    mapSourcesOfWelath(sow: any) {
        return {
            viewValue: sow.name,
            value: sow.id
        };
    }

    setEmpValue() {
        if (this.sourcesOfWealthForm.value.free_text) {
            this.checkColumn2 = true;
        } else this.checkColumn2 = false;
    }

    getSowValue(ev: any) {
        if (ev) {
            this.checkColumn1 = true;
        } else this.checkColumn1 = false;
    }

    getSourceOfWealthId(ev: any) {
        this.sow_id = ev;
    }

    submit() {
        let postData;
        if (this.sourcesOfWealthForm.value.free_text) {
            postData = this.sourcesOfWealthForm.value;
        } else {
            postData = { source_of_wealth_id: this.sourcesOfWealthForm.value.source_of_wealth_id };
        }
        if (this.sow_id || this.data.sowData) {
            this.connectedIdividualService
                .updateUboKyc(
                    this.data.personInfo.entity_id,
                    this.data.personInfo._id,
                    postData,
                    this.sow_id ? this.sow_id : this.data.sowData._id
                )
                .subscribe({
                    next: () => {
                        this.dialogRef.close(true);
                    },
                    error: err => {
                        this.alertService.openSnackBar(err.error.message, 'error');
                    }
                });
        } else {
            this.connectedIdividualService
                .creatUboKyc(this.data.personInfo.entity_id, this.data.personInfo._id, postData)
                .subscribe({
                    next: () => {
                        this.dialogRef.close(true);
                    },
                    error: err => {
                        this.alertService.openSnackBar(err.error.message, 'error');
                    }
                });
        }
    }
    activeDoc(ev: any) {
        this.findFiles(ev);
    }

    findFiles(selectedDoc: any) {
        this.files = this.data.docs.files.find((doc: any) => doc.name === selectedDoc.name);
        this.commonservice.getLatestValue(this.files);
    }
}
