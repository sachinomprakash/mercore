import { Component, Input, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/models/cdd.model';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { ConnectedIndividualsService } from 'src/app/utils/services/httpServices/connected-individuals/connected-individuals.service';

@Component({
    selector: 'app-add-docs',
    templateUrl: './add-docs.component.html',
    styleUrls: ['./add-docs.component.scss']
})
export class AddDocsComponent implements OnInit {
    showNodata: boolean;
    constructor(
        private commonservice: CommonService,
        private connectedIndividualsService: ConnectedIndividualsService
    ) {}
    @Input() entityId: string;
    @Input() personInfo: PersonModel;
    @Input() personDocuments: any;
    personDocs: any;
    files: any;

    ngOnInit(): void {
        window.scroll(0, 0);
        if (this.personDocuments.files.length > 0) {
            this.showNodata = true;
        } else {
            this.showNodata = false;
        }
        this.personDocs = this.personDocuments;
    }

    forward() {
        this.connectedIndividualsService.docComplete.next(true);
    }
    activeDoc(ev: any) {
        this.findFiles(ev);
    }

    findFiles(selectedDoc: any) {
        this.files = this.personDocuments.files.find((doc: any) => doc._id === selectedDoc._id);
        this.commonservice.getLatestValue(this.files);
    }
}
