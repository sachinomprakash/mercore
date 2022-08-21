import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { init } from 'onfido-sdk-ui';
import { OnFidoService } from 'src/app/utils/services/onFido/on-fido.service';

@Component({
    selector: 'app-on-fido',
    templateUrl: './on-fido.component.html',
    styleUrls: ['./on-fido.component.scss']
})
export class OnFidoComponent implements OnInit {
    onfido: any;
    token: string;
    applicantId: string;
    constructor(private onFidoService: OnFidoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.applicantId = this.activatedRoute.snapshot.queryParams['applicantId'];
        this.token = this.activatedRoute.snapshot.queryParams['token'];
        if (this.token) {
            this.onfido = init({
                token: this.token,
                smsNumberCountryCode: 'CA',
                language: {
                    locale: 'en_US',
                    phrases: {
                        'DOCUMENT_SELECTOR.IDENTITY.NATIONAL_IDENTITY_CARD_HINT': 'Hello Sachin'
                    },
                    mobilePhrases: {
                        national_identity_card: 'My Identity Card Mobile',
                        'capture.driving_licence.instructions': 'Hello Sachin'
                    }
                },
                steps: [
                    {
                        type: 'document',
                        options: {
                            documentTypes: {
                                passport: true,
                                driving_licence: true,
                                national_identity_card: true
                            },
                            forceCrossDevice: true,
                            useLiveDocumentCapture: true
                        }
                    },
                    {
                        type: 'face',
                        options: {
                            uploadFallback: false,
                            requestedVariant: 'video'
                        }
                    },
                    'complete'
                ],

                onComplete: (data: any) => {
                    // callback for when everything is complete
                    console.log('everything is complete', this.applicantId);
                    const documentIds = [
                        data.document_front.id,
                        data.document_back.id,
                        data.face.id
                    ];
                    const report_names = ['document', 'facial_similarity_video'];
                    let requestPayload = {
                        applicant_id: this.applicantId,
                        report_names: report_names,
                        document_ids: documentIds,
                        onfido_token: this.token
                    };
                    this.onFidoService
                        .updateKYCStatus(requestPayload)
                        .subscribe(res => console.log(res));
                }
            });
        }
    }
}
