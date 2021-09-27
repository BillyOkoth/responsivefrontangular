interface NavAttributes {
    [propName: string]: any;
}
interface NavWrapper {
    attributes: NavAttributes;
    element: string;
}
interface NavBadge {
    text: string;
    variant: string;
}
interface NavLabel {
    class?: string;
    variant: string;
}export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
}
export const defaultNavItems: NavData[] = [
    {
        name: 'DashBoard',
        url: '/admin',
        icon: 'appstore'
    },
    {
        name: 'Billers',
        url: '/admin/billers',
        icon: 'bank',

    }, {
        name: 'Payers',
        url: '/admin/payers',
        icon: 'dollar',
    },
    {
        name: 'Maintain Accounts',
        url: '/admin/viewAccounts',
        icon: 'account-book',

    },
    {
        name: 'Eslip',
        url: '/admin/pay-on-behalf',
        icon: 'money-collect',

    },
    {
        name: 'Reports',
        url: '/admin/reports',
        icon: 'credit-card',

    },
    {
        name: 'Service Charge',
        url: '/admin/service-charge',
        icon: 'file',

    },
    {
        name: 'Exceptions',
        url: '/admin/exceptions',
        icon: 'pay-circle',

    },
    {
        name: 'My Team',
        url: '/admin/my-team',
        icon: 'user',

    },
    {
        name: 'User Groups',
        url: '/admin/user-tab',
        icon: 'team',

    },
    {
        name: 'Alerts and Logs',
        url: '/admin/alerts',
        icon: 'alert',

    }
];
