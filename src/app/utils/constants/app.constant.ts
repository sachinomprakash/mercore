export const apiEndPoint = {
    user: {
        login: '/v1/users/login',
        forgotPassword: '/v1/users/forgot-password-link',
        register: '/v1/users/register',
        verifyOTP: '/v1/users/verify-otp',
        sendOTP: '/v1/users/send-otp',
        setPassword: '/v1/users/set-password/',
        resetPassword: '/v1/users/reset-password/',
        resendEmail: '/v1/users/resend-email-verification-link',
        resentOTPTTL: '/v1/users/otp-ttl-info',
        profile: '/users/me',
        profileUpdate: '/v1/users/profile',
        changePassword: '/v1/users/change-password',
        emailChange: '/v1/users/email-change-verification'
    },
    static: {
        getCountries: '/countries',
        getLegalEntity: '/legal-entity-type',
        industrySector: '/industry-sector',
        getProductMaster: '/new-product-category-master',
        getRoles: '/v1/shorthand-form-person-role-mapping/legal-form/',
        sow: '/v1/source-of-wealth',
        sowDocs: '/v1/source-of-wealth-document',
        legalForm: '/v1/legal-entity-form',
        static: '/static',
        industryProducts: '/v1/trading-products'
    },
    cip: {
        stage1: 'stage=1',
        stage2: 'stage=2',
        addNew: '/v1/new-cip',
        add: '/v1/cip',
        otherProductMaster: '/product-sub-category'
    },
    kyb: {
        getCompanyInfo: '/v1/integration/entity'
    },
    file: {
        version: '/v1',
        document: '/document',
        documents: '/documents',
        upload: '/upload',
        doc: '/doc-upload',
        case: '/case',
        cases: '/cases',
        file: '/file',
        files: '/files',
        entity: '/entity'
    },
    cases: {
        add: '/v1/cases',
        caseTask: '/case-task'
    },
    people: {
        entity: '/v1/entity',
        entities: '/v1/entities',
        person: '/person',
        persons: '/persons',
        version: '/v1',
        upload: '/docs-upload',
        personDoc: '/v1/person-document',
        onfidovalidation: '/onfidovalidation'
    },
    ubo: {
        uboKyc: '/ubo-kyc',
        upload: '/upload'
    },
    login: '/api/login',
    forgot: '/api/forgot',
    register: '',
    kyc: {
        entity: '/v1/entity',
        getAllQuestion: 'getAllQuestion',
        question: 'questions'
    },
    wallet: {
        verifySession: '/v1/verify-share-token',
        guestSignUp: '/v1/register/guest',
        guestLogin: '/v1/login/guest',
        getContent: '/v1/share-content/'
    }
};

export const regex = {
    email: '^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$'
};

export const storageKeys = {
    refreshToken: 'refreshToken',
    accessToken: 'token',
    authorization: 'authorization',
    guestContentSessionToken: 'gst_tkn_session',
    guestContentId: 'gst_content_id'
};
export const serverStatusCode = {
    enterOTPLimitExceed: 'UM_ERR_113',
    invalidOTP: 'UM_ERR_114',
    otpSendLimitExceed: 'UM_ERR_115',
    otpAlreadySent: 'UM_ERR_116',
    otpExpire: 'UM_ERR_117'
};
export const userPasswordType = {
    setPassword: 1,
    forgotPassword: 2
};
export enum PolicyType {
    TermCondition = 1,
    PrivacyPolicy = 2
}
export const ReviwedStatus = [
    { key: 'OPEN', value: 'open' },
    { key: 'INPROGRESS', value: 'In progress' }
];

export enum status {
    OPEN = 'OPEN',
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
    SUBMITTED = 'SUBMITTED'
}

export enum CaseTableEvent {
    Continue = 'continue',
    ProgressSummary = 'progress_summary'
}

export enum PeopleTableEvent {
    Edit = 'edit',
    Delete = 'delete'
}

export const tables = {
    cases: [
        { name: 'ID', key: 'id', type: 'string' },
        { name: 'Application no', key: 'application_number', type: 'string' },
        { name: 'Entity name', key: 'company_name', type: 'string' },
        { name: 'Request Type', key: 'object_type', type: 'string' },
        { name: 'Details', key: 'description', type: 'string' },
        { name: 'Status', key: 'status', type: 'status' },
        { name: 'Last Update', key: 'updated_at', type: 'date' },
        {
            name: '',
            key: '',
            type: 'action-progress',
            value: 'View progress summary',
            class: 'button summary-btn',
            event: CaseTableEvent.ProgressSummary
        },
        {
            name: '',
            key: '',
            type: 'action',
            value: 'Continue',
            event: CaseTableEvent.Continue,
            class: 'button app-btn'
        }
    ],
    people: [
        { name: 'Name', key: `first_name`, type: 'concat-string' },
        { name: 'Role', key: 'roles', type: 'array' },
        {
            name: '',
            key: '',
            type: 'action',
            value: 'Edit',
            event: PeopleTableEvent.Edit,
            class: 'button app-btn'
        },
        {
            name: '',
            key: '',
            type: 'action',
            value: 'Delete',
            class: 'button summary-btn',
            event: PeopleTableEvent.Delete
        }
    ]
};
export const caseTable = [
    {
        id: 1,
        name: 'Test',
        type: 'Document Request',
        details: 'Onboarding',
        reviwed: 'In progress',
        updated: new Date()
    },
    {
        id: 2,
        name: 'Test',
        type: 'Document Request',
        details: 'Onboarding',
        reviwed: 'In progress',
        updated: new Date()
    },
    {
        id: 3,
        name: 'Test',
        type: 'Document Request',
        details: 'Onboarding',
        reviwed: 'In progress',
        updated: new Date()
    },
    {
        id: 4,
        name: 'Test',
        type: 'Document Request',
        details: 'Onboarding',
        reviwed: 'In progress',
        updated: new Date()
    }
];
export const defaultLegalForm = [
    'Joint Liability Company',
    'Public Joint Stock Company',
    'Simple Commandite Company',
    'Sole Proprietor',
    'Limited Liability Company',
    'Private Joint Stock Company',
    'Incorporated Cell',
    'Open Ended Investment Company',
    'Private Company Unlimited without Shares',
    'Limited Liability Partnership',
    'Restricted Scope Company',
    'Protected Cell Company',
    'Public Company Limited by Shares',
    'Limited Partnership',
    'General Partnership',
    'Private Company Unlimited with Shares',
    'Close Ended Investment Company',
    'Private Company Limited by Shares',
    'Incorporated Cell Company',
    'Private Company Limited by Guarantee',
    'Foundation',
    'Intellectual Property Holding Company',
    'Segregated Portfolio Company',
    'Company Limited By Guarantee',
    'Restricted Purposes Company',
    'Company Limited By Shares',
    'RAK Economic Zone Company',
    'Unlimited Company'
];

export const CDDDocRequests = {
    companyProfile: {
        id: 20,
        name: 'Authorized Signatories'
    },
    ownership: {
        id: 2,
        name: 'Ownership'
    },
    arrayOfCompanyProfile: [
        'Active status verification',
        'Certificate of Incorporation or equivalent',
        'Memorandum & Articles of Association or equivalent',
        'Annual Report or equivalent',
        'Audited Financial Statements,Regulatory Return or Management Accounts',
        'Proof of Regulation',
        'Proof of Listing',
        'Proof of Consolidation',
        'SPV bye-laws',
        'Transfer Agreement (if applicable)',
        'Prospectus or offering memorandum (if applicable)',
        'Certified copy of the Investment and,if applicable,Delegate Investment Management agreement',
        'Documentation outlining structure of the fund',
        'Charter, Constitution, Government mandate or equivalent',
        'Proof of link to Government',
        'Documentation confirming Trust information'
    ],
    arrayOfOwnershipDocs: [
        'Share Register',
        'Confirmation of investors holding â‰¥ 10% interest in SPV securities',
        'Ultimate Beneficial Owners',
        'Directors & Officers',
        'Authorized Signatories'
    ]
};

export enum GuestAuthType {
    login = '1',
    signup = '2'
}
