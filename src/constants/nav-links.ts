export const NAV_LINKS = [
    {
<<<<<<< HEAD
        id:1,
        name: 'Dashboard',
        superAdminRoutes:[],
        branchManagerRoutes:[],
        authorizerRoutes:[],
        marketerRoutes:[],
        generalScreens:[],
    },
    {
        id:1,
        name: 'Loan Manager',
        superAdminRoutes:[
            {title:'Dashboard',path:'/dashboard',id:'',icon:'bi bi-speedometer2'},
            {title:'Staff Manager',path:'/staff',id:'',icon:''},
            {title:'Customer Manager',path:'/customer',id:'',icon:''},
            {title:'Loan Manager',path:'/loan',id:'',icon:''},
            {title:'Settings',path:'/settings',id:'',icon:''},
        ],
        branchManagerRoutes:[],
        authorizerRoutes:[],
        marketerRoutes:[],
        generalScreens:[],
=======
        id: 1,
        name: 'Dashboard',
        path: '/dashbaord'
    },
    {
        id: 2,
        name: 'Loan Manager',
        superAdminScreens: [
            { title: 'Dashboard', path: 'loan/dashboard', id: '', icon: 'bi bi-speedometer2' },
            { title: 'Staff Manager', path: '/staff', id: '', icon: '' },
            { title: 'Customer Manager', path: '/customer', id: '', icon: '' },
            { title: 'Loan Manager', path: '/loan', id: '', icon: '' },
            { title: 'Profile', path: '/profile', id: '', icon: '' },
            { title: 'Settings', path: '/settings', id: '', icon: '' },
        ],
        branchManagerScreens: [
            { title: 'Dashboard', path: 'loan/dashboard', id: '', icon: 'bi bi-speedometer2' },
            { title: 'Customer Manager', path: '/customer', id: '', icon: '' },
            { title: 'Loan Manager', path: '/loan', id: '', icon: '' },
            { title: 'Profile', path: '/profile', id: '', icon: '' },
            { title: 'Settings', path: '/settings', id: '', icon: '' },
        ],
        authorizerScreens: [
            { title: 'Dashboard', path: 'loan/dashboard', id: '', icon: 'bi bi-speedometer2' },
            { title: 'Customer Manager', path: '/customer', id: '', icon: '' },
            { title: 'Loan Manager', path: '/loan', id: '', icon: '' },
            { title: 'Profile', path: '/profile', id: '', icon: '' },
            { title: 'Settings', path: '/settings', id: '', icon: '' },
        ],
        marketerScreens: [
            { title: 'Dashboard', path: 'marketer/loan/dashboard', id: '', icon: 'bi bi-speedometer2' },
            { title: 'Customer Manager', path: 'marketer/loan/customer', id: '', icon: '' },
            { title: 'Loan Manager', path: 'marketer/loan', id: '', icon: '' },
            { title: 'Profile', path: 'marketer/profile', id: '', icon: '' },
            { title: 'Settings', path: 'marketer/settings', id: '', icon: '' },
        ],
        generalScreens: [],
>>>>>>> 4cec6425ad09e719e25b1b335ec7911e50b2b0a3
    },
    {
        id: 3,
        name: 'Duplicate Detector',
<<<<<<< HEAD
        superAdminRoutes:[{title:'Dashboard',path:'duplicate/dashboard',id:'',icon:'bi bi-speedometer2'},],
        branchManagerRoutes:[],
        authorizerRoutes:[],
        marketerRoutes:[],
        generalScreens:[],
=======
        superAdminScreens: [],
        branchManagerScreens: [],
        authorizerScreens: [],
        marketerScreens: [],
        generalScreens: [],
>>>>>>> 4cec6425ad09e719e25b1b335ec7911e50b2b0a3
    },
    {
        id: 4,
        name: 'HR Manager',
<<<<<<< HEAD
        superAdminRoutes:[{title:'Dashboard',path:'hr/dashboard',id:'',icon:'bi bi-speedometer2'},],
        branchManagerRoutes:[],
        authorizerRoutes:[],
        marketerRoutes:[],
        generalScreens:[],
=======
        superAdminScreens: [],
        branchManagerScreens: [],
        authorizerScreens: [],
        marketerScreens: [],
        generalScreens: [],
>>>>>>> 4cec6425ad09e719e25b1b335ec7911e50b2b0a3
    },
    {
        id: 5,
        name: 'Accounting',
<<<<<<< HEAD
        superAdminRoutes:[{title:'Dashboard',path:'account/dashboard',id:'',icon:'bi bi-speedometer2'},],
        branchManagerRoutes:[],
        authorizerRoutes:[],
        marketerRoutes:[],
        generalScreens:[],
    },
    {
        id:5,
        name: 'Settings',
        superAdminRoutes:[{title:'Dashboard',path:'settings/dashboard',id:'',icon:'bi bi-speedometer2'},],
        branchManagerRoutes:[],
        authorizerRoutes:[],
        marketerRoutes:[],
        generalScreens:[],
=======
        superAdminScreens: [],
        branchManagerScreens: [],
        authorizerScreens: [],
        marketerScreens: [],
        generalScreens: [],
>>>>>>> 4cec6425ad09e719e25b1b335ec7911e50b2b0a3
    },
    {
        id: 6,
        name: 'Settings',
        superAdminScreens: [],
        branchManagerScreens: [],
        authorizerScreens: [],
        marketerScreens: [],
        generalScreens: [],
    },

]