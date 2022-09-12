export const stepConstants = [
    {
        label: '10 minutes',
        index: 1,
        image: 'assets/images/cip-step1.svg',
        description: 'Initial information provided'
    },
    {
        label: '1 day',
        index: 2,
        image: 'assets/images/cip-step2.svg',
        description: 'Initial information reviewed and further requests prepared'
    },
    {
        label: '2-3 days',
        index: 3,
        image: 'assets/images/cip-step3.svg',
        description: 'Additional information provided'
    },
    {
        label: '2 days',
        index: 4,
        image: 'assets/images/cip-step4.svg',
        description: 'Final review and onboarding decision​'
    }
];

export const cipStepConstants = [
    {
        label: 'Company Type',
        index: 0,
        completed: false,
        editable: false,
        route: 'company-type'
    },
    {
        label: 'Product Selection',
        index: 1,
        completed: false,
        editable: false,
        route: 'product-selection'
    },
    {
        label: 'Company Information',
        index: 2,
        completed: false,
        editable: false,
        route: 'company-information'
    },
    {
        label: 'Trading Information',
        index: 3,
        completed: false,
        editable: false,
        route: 'trading-information'
    }
];
