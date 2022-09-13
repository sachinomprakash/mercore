import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFile } from 'src/app/models/case.model';
import { DocumentService } from '../../services/docService/document.service';
import { CddServiceService } from '../../services/httpServices/cdd/cdd-service.service';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
    @Input() docList?: any;
    @Input() title?: string;
    @Output() activeDocument = new EventEmitter<any>();
    @Output() onDocComplete = new EventEmitter();
    fileList: IFile[] = [];
    moveToNextDocTypeSub: Subscription;
    selectedStepDataSub: Subscription;
    completedDoc: any;
    selectedFile: IFile;
    constructor(
        private cddServiceService: CddServiceService,
        private documentService: DocumentService
    ) {}

    ngOnInit(): void {
        this.cddServiceService.selectedStepData.subscribe((res: any) => {
            this.docList = res.types;
            if (this.docList && this.docList.length > 0) {
                this.fileList = this.docList;
                const activeDoc = this.docList.find((file: any) => !file.files.length);
                activeDoc
                    ? this.selectedDocument(activeDoc)
                    : this.selectedDocument(this.docList[0]);
            }
        });
        this.moveToNextDocument();
    }

    moveToNextDocument(): void {
        this.moveToNextDocTypeSub = this.documentService
            .getMoveToNextDocType()
            .subscribe((res: any) => {
                if (res) {
                    this.nextDocument();
                }
            });
    }
    ngOnDestroy(): void {
        this.moveToNextDocTypeSub?.unsubscribe();
        this.selectedStepDataSub?.unsubscribe();
    }

    selectedDocument(doc: IFile) {
        const obj = this.fileList.find(file => file.active);
        if (obj) {
            obj.active = false;
        }
        doc.active = true;
        this.selectedFile = doc;
        this.activeDocument.emit(doc);
    }

    nextDocument() {
        const index = this.fileList.findIndex(file => file.active);
        if (index >= 0) {
            this.fileList[index].active = false;
            if (this.fileList[index + 1]) {
                this.fileList[index + 1].active = true;
                this.selectedFile = this.fileList[index + 1];
                this.activeDocument.emit(this.fileList[index + 1]);
            } else {
                this.onDocComplete.emit(true);
            }
        }
    }
}
