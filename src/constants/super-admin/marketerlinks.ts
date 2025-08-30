export const MarketerNavs = [
    {
        id: 'general-dashboard',
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        path: '/marketer/db'
    },
    {
        id: 'marketer-loan',
        title: 'Loan Manager',
        icon: 'bi bi-cash-stack',
        path: '#',
        subPages: [
            {
                id: 'super-admin-loan',
                title: 'Dashboard',
                icon: '',
                path: '/marketer/loan-db',
            },
            {
                id: 'super-admin-loan',
                title: 'Loan Managemnts',
                icon: '',
                path: '/marketer/loan-management',
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
        path: '/marketer/duplicate-checker',
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
        title: 'Settings',
        icon: 'bi bi-gear',
        path: '/super-admin/settings',
        subPages: []
    },
]