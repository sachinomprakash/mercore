export class PersonModel {
    _id: string;
    email: string;
    entity_id: string;
    first_name: string;
    is_deleted: boolean;
    last_name: string;
    middle_name: string;
    roles: Array<any>;
    job_title: string;

    constructor(obj: any) {
        this._id = obj._id || '';
        this.email = obj.email || '';
        this.first_name = obj.first_name || '';
        this.is_deleted = obj.is_deleted || false;
        this.last_name = obj.last_name || '';
        this.middle_name = obj.middle_name || '';
        this.roles = obj.roles || [];
        this.job_title = obj.job_title || '';
    }
}
