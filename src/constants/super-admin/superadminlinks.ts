export const SuperAdminNavs = [
    {
        id: 'general-dashboard',
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        path: '/super-admin/dashboard'
    },
    {
        id: 'super-admin-loan',
        title: 'Loan Manager',
        icon: 'bi bi-cash-stack',
        path: '#',
        subPages: [
            {
                id: 'super-admin-loan',
                title: 'Dashboard',
                icon: '',
                path: '/super-admin/loan',
            },
            {
                id: 'super-admin-loanmanagement',
                title: 'Loan Management',
                icon: '',
                path: '/super-admin/loan-management',
            },
            {
                id: 'super-admin-loan',
                title: 'Marketer Managemnts',
                icon: '',
                path: '#',
            },
            {
                id: 'super-admin-loan',
                title: 'Branch Management',
                icon: '',
                path: '#',
            },
            {
                id: 'super-admin-loan',
                title: 'Settings',
                icon: '',
                path: '#',
            },

        ]
    },
    {
        id: 'super-admin-dd',
        title: 'Duplicate Detector',
        icon: 'bi bi-journal-check',
        path: '/super-admin/duplicate-checker',
        subPages: [
            {
                id: 'super-admin-dd',
                title: 'Dashboard',
                icon: '',
                path: '#',
            },
        ]
    },
    {
        id: 'super-admin-hrmanager',
        title: 'HR Manager',
        icon: 'bi bi-person-lines-fill',
        path: '/super-admin/hr',
        subPages: []
    },
    {
        id: 'super-admin-hrmanager',
        title: 'Accounting',
        icon: 'bi bi-building-check',
        path: '#',
        subPages: []
    },
    {
        id: 'super-admin-hrmanager',
        title: 'Settings',
        icon: 'bi bi-gear',
        path: '/super-admin/settings',
        subPages: []
    },
]