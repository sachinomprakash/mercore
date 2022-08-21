import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { first, take } from 'rxjs/operators';
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
export class DocumentListComponent implements OnInit, OnDestroy, OnChanges {
    @Input() set docList(val: any) {
        console.log(val);
        this.docList1 = val;
    }
    @Input() title?: string;
    fileList: IFile[] = [];
    @Output() activeDocument = new EventEmitter<any>();
    @Output() onDocComplete = new EventEmitter();
    constructor(
        private cddServiceService: CddServiceService,
        private documentService: DocumentService,
        private cdRef: ChangeDetectorRef
    ) {}
    completedDoc: any;
    selectedFile: IFile;
    docList1: any;

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.cddServiceService
            .getSelectedStepData()
            .pipe(take(1))
            .subscribe((res: any) => {
                console.log('gaurav ');
                // this.docList1 = res.types;
                if (this.docList1.length > 0) {
                    this.fileList = this.docList1;
                    const activeDoc = this.docList1.find((file: any) => !file.files?.length);
                    activeDoc
                        ? this.selectedDocument(activeDoc)
                        : this.selectedDocument(this.docList1[0]);
                }
                this.cdRef.markForCheck();
            });

        this.documentService.getMoveToNextDocType().subscribe((res: any) => {
            console.log('am I here?', res);

            console.log('on init');
            if (res) {
                this.nextDoc();
            }
        });

        // this.documentService
        //     .getMoveToNextDocType()
        //     .pipe(take(1))
        //     .subscribe(res => {
        //         console.log('am I here?');

        //         if (res) {
        //             console.log('sachin');
        //             this.nextDoc();
        //         }
        //     });
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
        this.cdRef.markForCheck();
    }
}
