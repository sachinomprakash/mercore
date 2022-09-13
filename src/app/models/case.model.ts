export interface IFileMetaData {
    _id: string;
    file_size: number;
    file_type: string;
    original_name: string;
    uri: string;
}
export interface IFile {
    name: string;
    id: number;
    status: string;
    active: boolean;
    description: string;
    meta: IFileMetaData[];
    files: IFileMetaData[];
}
export interface IDocRequest {
    id: number;
    name: string;
    description?: string;
    files: IFile[];
    entityDocuments: IFile[];
}
export class Case {
    application_number: string;
    company_name: string;
    description: string;
    entity_id: string;
    name: string;
    status: string;
    type_id: number;
    legal_entity_form_id: number;
    document_request: { entityDocuments: IDocRequest[] };

    constructor(obj: Case) {
        this.application_number = obj.application_number;
        this.legal_entity_form_id = obj.legal_entity_form_id;
        this.company_name = obj.company_name;
        this.description = obj.description;
        this.entity_id = obj.entity_id;
        this.name = obj.name;
        this.status = obj.status;
        this.type_id = obj.type_id;
        this.document_request = obj.document_request;
    }
}
