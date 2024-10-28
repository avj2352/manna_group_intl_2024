import { IMobileNavItem } from "@/common/interfaces";
import { 
    User, 
    ShoppingBag, 
    Building, 
    PhoneCall,    
    File,
    BaggageClaim,
    Ticket, 
} from "lucide-react";

export const publicMobileNavList: IMobileNavItem[] = [
    {
        link: '#/about/who-we-are',
        label: 'About',
        scrollId: '',
        category: 'mobile',
        icon: <User/>,
    },
    {
        link: '#/products/shop-products',
        label: 'Products',
        scrollId: '',
        category: 'mobile',
        icon: <ShoppingBag/>,
    },
    {
        link: '#/company/business-division',
        label: 'Company',
        scrollId: '',
        category: 'mobile',
        icon: <Building/>,
    },
    {
        link: '#/contact/contact-us-section',
        label: 'Contact Us',
        scrollId: '',
        category: 'mobile',
        icon: <PhoneCall/>,
    },    
];

export const adminMobileNavList: IMobileNavItem[] = [
    {
        link: '#/admin',
        label: 'Dashboard',
        scrollId: '',
        category: 'mobile',
        icon: <User/>,
    },
    {
        link: '#/admin/assets',
        label: 'Manage Assets',
        scrollId: '',
        category: 'mobile',
        icon: <File/>,
    },
    {
        link: '#/admin/products',
        label: 'Manage Products',
        scrollId: '',
        category: 'mobile',
        icon: <BaggageClaim/>,
    },
    {
        link: '#/admin/promotions',
        label: 'Manage Promotions',
        scrollId: '',
        category: 'mobile',
        icon: <Ticket/>,
    },
    {
        link: '#/admin/purchases',
        label: 'Manage Purchases',
        scrollId: '',
        category: 'mobile',
        icon: <ShoppingBag/>,
    }
];