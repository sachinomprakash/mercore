import { FormGroup } from '@angular/forms';

export interface IAddress {
    country: number;
    address: string;
    city: string;
    zipcode: string;
}
export interface IDate {
    date: number;
    month: number;
    year: number;
}

export class CIP {
    _id: string;
    company_name: string;
    company_Website: string;
    company_phone_number: string;
    company_phone_number_country_id: number;

    stage: number;
    company_registration_number: string;
    lei_number: string;
    industry_sector_id: number;
    industry_sectors: [];
    legal_entity_type_id: number;
    previous_company_names: [];
    application_number: string;
    date_of_incorporation_object: IDate;
    trading_name: string;
    trading_address: IAddress;
    is_trading_address_same: boolean;
    company_address: IAddress;
    list_products: number[];
    sector_of_intended_trade: number[];
    physical_presence: number[];
    countries_of_presence_operations: number[];
    countries_of_intended_trade: number[];
    legal_entity_form_id: number;

    constructor(obj: any) {
        this._id = obj._id || '';
        this.company_name = obj.company_name || '';
        this.application_number = obj.application_number || '';
        this.previous_company_names = obj.previous_company_names || [];
        this.stage = obj.stage || 0;
        this.company_Website = obj.company_Website || '';
        this.company_phone_number = obj.company_phone_number || '';
        this.company_phone_number_country_id = obj.company_phone_number_country_id || '';
        this.company_registration_number = obj.company_registration_number || '';
        this.date_of_incorporation_object = obj.date_of_incorporation_object || '';
        this.industry_sector_id = obj.industry_sector_id || '';
        this.industry_sectors = obj.industry_sectors || [];
        this.legal_entity_type_id = obj.legal_entity_type_id || '';
        this.is_trading_address_same = obj.is_trading_address_same;
        this.lei_number = obj.lei_number || '';
        this.trading_name = obj.trading_name;
        this.trading_address = obj.trading_address || '';
        this.company_address = obj.company_address || '';
        this.list_products = obj.list_products || [];
        this.sector_of_intended_trade = obj.sector_of_intended_trade || [];
        this.physical_presence = obj.physical_presence || [];
        this.countries_of_presence_operations = obj.countries_of_presence_operations || [];
        this.countries_of_intended_trade = obj.countries_of_intended_trade || [];
        this.legal_entity_form_id = obj.legal_entity_form_id || '';
    }
}

export class IStep {
    label: string;
    index: number;
    image: string;
    description: string;
}

export class CipStep {
    label: string;
    index: number;
    completed: boolean;
    editable: boolean;
    route: string;
}
