import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFile } from 'src/app/models/case.model';
import { DocumentService } from '../../services/docService/document.service';
import { CddServiceService } from '../../services/httpServices/cdd/cdd-service.service';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListComponent implements OnInit, OnDestroy {
    @Input() docList: any;
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
    moveToNextDocTypeSub: Subscription;
    selectedStepDataSub: Subscription;

    ngOnInit(): void {
        this.getDocumentList();
        this.moveToNextDocument();
    }

    getDocumentList(): void {
        this.selectedStepDataSub = this.cddServiceService
            .getSelectedStepData()
            .subscribe((res: any) => {
                this.docList1 = res.types;
                if (this.docList1.length > 0) {
                    this.fileList = this.docList1;
                    const activeDoc = this.docList1.find((file: any) => !file.files?.length);
                    activeDoc
                        ? this.selectedDocument(activeDoc)
                        : this.selectedDocument(this.docList1[0]);
                }
                this.cdRef.markForCheck();
            });
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

    selectedDocument(document: IFile): void {
        const selectedFile: IFile | undefined = this.fileList.find((file: IFile) => file.active);
        if (selectedFile) {
            selectedFile.active = false;
        }
        document.active = true;
        this.selectedFile = document;
        this.activeDocument.emit(document);
    }

    nextDocument(): void {
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

    ngOnDestroy(): void {
        this.moveToNextDocTypeSub?.unsubscribe();
        this.selectedStepDataSub?.unsubscribe();
    }
}
