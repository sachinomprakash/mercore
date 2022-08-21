/* eslint-disable indent */
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output
} from '@angular/core';
import { finalize } from 'rxjs';
import { IFile } from 'src/app/models/case.model';
import { PersonModel } from 'src/app/models/cdd.model';
import { AlertService } from '../../services/alertService/alert.service';
import { CommonService } from '../../services/common/common.service';
import { DocumentService } from '../../services/docService/document.service';
import { FileUploadService } from '../../services/httpServices/upload/file-upload.service';

@Component({
    selector: 'app-upload-container',
    templateUrl: './upload-container.component.html',
    styleUrls: ['./upload-container.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadContainerComponent implements OnInit, OnChanges {
    @Input() docFiles?: IFile;
    @Input() entityId: any;
    @Input() caseId?: any;
    @Input() uploadComponent?: any;
    @Input() personInfo?: PersonModel;
    @Input() source_of_wealth_id?: any;
    @Output() setSourcesOfWealthId = new EventEmitter<any>();
    sow_id: any;
    files: any[] = [];
    docObj: IFile;
    typeId: number;
    comments: string;
    @Output() documentTypeValid = new EventEmitter<boolean>();
    validTypes = [
        '.xls',
        'application/vnd.ms-excel',
        '.xlsx',
        'image/jpg',
        'application/pdf',
        'image/jpeg',
        'image/png',
        'text/csv',
        '.doc',
        '.docx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    document_id: any;
    deleteDocId: any;
    mappingId: any;
    prevDoc: IFile;
    prevComment: string;
    // @Output() completeDocument = new EventEmitter<any>();
    constructor(
        private commonService: CommonService,
        private alertService: AlertService,
        private fileUploadService: FileUploadService,
        private documentService: DocumentService
    ) {}
    ngOnInit(): void {
        if (this.source_of_wealth_id) {
            this.sow_id = this.source_of_wealth_id;
        }
    }
    ngOnChanges(): void {
        this.commonService.file.subscribe(x => {
            this.docObj = x;
            this.mappingId = x.documentMappingId;
            this.typeId = x.id;
            this.document_id = x._id;
            this.deleteDocId = x._id;
            this.files = x.meta || x.files;
            if (x.comment) {
                this.comments = x.comment;
            } else {
                this.comments = '';
            }
        });
        this.files.length > 0 &&
            this.files.forEach(file => {
                file.progress = 100;
            });
    }

    onFileDropped($event: any) {
        this.prepareFilesList($event);
    }

    fileBrowseHandler(files: any) {
        this.prepareFilesList(files.target.files);
        files.target.value = '';
    }

    deleteFile(file: any, index: number) {
        this.alertService.openConfirmDialog().subscribe({
            next: res => {
                if (res) {
                    !file._id
                        ? this.files?.splice(index, 1)
                        : this.fileUploadService
                              .removeFile(
                                  file._id,
                                  this.caseId,
                                  this.typeId,
                                  this.deleteDocId,
                                  this.uploadComponent,
                                  this.entityId,
                                  this.personInfo?._id,
                                  this.document_id
                              )
                              .subscribe({
                                  next: () => {
                                      this.files?.splice(index, 1);
                                      if (!this.files?.length) {
                                          this.documentTypeValid.emit(false);
                                          this.documentService.emptyDoc.next({
                                              ...this.docObj,
                                              files: this.files
                                          });
                                      }
                                  },
                                  error: err => {
                                      this.alertService.openSnackBar(err.error.message, 'error');
                                  }
                              });
                }
            }
        });
    }

    /**
     * Simulate the upload process
     */
    uploadFilesSimulator(index: number, error?: any, files?: any) {
        if (error) {
            let fileArr: any[];
            fileArr = this.files.filter(cv => {
                return files.find((e: any) => {
                    return e.name == cv.name;
                });
            });
            fileArr.forEach((file: any) => {
                file['errored'] = true;
            });
        } else {
            this.documentService.docUploaded.next({ ...this.docObj, comments: this.comments });
            setTimeout(() => {
                if (index === this.files.length) {
                    return;
                } else {
                    const progressInterval = setInterval(() => {
                        if (this.files[index].progress === 100) {
                            clearInterval(progressInterval);
                            this.uploadFilesSimulator(index + 1);
                            this.commonService.getLatestValue(this.docObj);
                        } else {
                            this.files[index].progress += 5;
                        }
                    }, 200);
                }
            }, 100);
        }
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: Array<any>) {
        const arr = [];
        for (const item of files) {
            if (this.validTypes.indexOf(item.type) === -1) {
                this.alertService.openSnackBar(`${item.name} file type is not supported.`, 'error');
            } else {
                if (item.size > 10485760) {
                    item.progress = 100;
                    item.errored = true;
                } else {
                    item.progress = 0;
                    arr.push(item);
                }
                this.files.push(item);
            }
        }
        this.uploadFile(arr);
    }

    uploadFile(files: any) {
        this.fileUploadService
            .uploadFile(
                files,
                this.entityId,
                this.typeId,
                this.mappingId,
                this.caseId,
                this.uploadComponent,
                this.document_id,
                this.source_of_wealth_id,
                this.personInfo?._id,
                this.sow_id
            )
            .subscribe({
                next: (res: any) => {
                    let fileArr: any[];
                    fileArr = res.result.files.filter((cv: any) => {
                        return !this.files.find((e: any) => {
                            return e.original_name == cv.original_name;
                        });
                    });
                    fileArr.forEach(file => (file.progress = 0));
                    fileArr = [...this.files, ...fileArr];
                    const filtered = fileArr.filter(val => !files.includes(val));
                    this.files = filtered;
                    this.docObj.meta = this.files;
                    this.uploadFilesSimulator(0);
                    if (this.uploadComponent === 'soucesOfWealth') {
                        this.setSourcesOfWealthId.emit(res.result._id);
                        this.sow_id = res.result._id;
                    }
                },
                error: err => {
                    console.log(err.error.message);
                    this.alertService.openSnackBar(err.error.message, 'error');
                    this.uploadFilesSimulator(0, 'error', files);
                }
            });
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes: any, decimals?: any) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    setDocumentCompleted() {
        if (this.comments) {
            this.prevDoc = this.docObj;
            this.prevComment = this.comments;
            this.fileUploadService
                .addComments(
                    { comment: this.comments },
                    '',
                    this.caseId,
                    this.typeId,
                    this.uploadComponent,
                    this.personInfo?._id,
                    this.deleteDocId,
                    this.document_id,
                    this.entityId,
                    this.sow_id
                )
                .subscribe({
                    next: (res: any) => {
                        this.documentService.docUploaded.next({
                            ...this.prevDoc,
                            comment: this.prevComment
                        });
                        if (res.result._id) {
                            this.documentService.userDocUploaded.next(res.result);
                        }
                    },
                    error: err => this.alertService.openSnackBar(err.error.message, 'error')
                });
        }
        console.log('saved', this.documentService);
        this.documentService.setMoveToNextDocType(true);
        // this.documentService.setvalue(true);

        if (this.files && this.files?.length) {
        }
    }
    get validFilesCount() {
        return this.files.filter(x => !x.errored && x._id).length;
    }
}
