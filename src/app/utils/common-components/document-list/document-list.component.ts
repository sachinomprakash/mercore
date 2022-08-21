import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { IDocRequest, IFile } from 'src/app/models/case.model';
import { CommonService } from '../../services/common/common.service';
import { DocumentService } from '../../services/docService/document.service';
import { CddServiceService } from '../../services/httpServices/cdd/cdd-service.service';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListComponent implements OnInit, OnDestroy {
    @Input() docList?: any;
    @Input() title?: string;
    fileList: IFile[] = [];
    @Output() activeDocument = new EventEmitter<any>();
    @Output() onDocComplete = new EventEmitter();
    constructor(
        private cddServiceService: CddServiceService,
        private documentService: DocumentService
    ) {}
    completedDoc: any;
    selectedFile: IFile;

    ngOnInit(): void {
        this.cddServiceService.selectedStepData.subscribe((res: any) => {
            console.log(res);
            this.docList = res.types;
            if (this.docList.length > 0) {
                this.fileList = this.docList;
                const activeDoc = this.docList.find((file: any) => !file.files.length);
                activeDoc
                    ? this.selectedDocument(activeDoc)
                    : this.selectedDocument(this.docList[0]);
            }
        });
        this.documentService.getvalue().subscribe(res => {
            if (res) {
                console.log('called');
                this.nextDoc();
            }
        });
    }
    ngOnDestroy(): void {}

    selectedDocument(doc: IFile) {
        const obj = this.fileList.find(file => file.active);
        if (obj) {
            obj.active = false;
        }
        doc.active = true;
        this.selectedFile = doc;
        this.activeDocument.emit(doc);
    }

    nextDoc() {
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
