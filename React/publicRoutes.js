import { lazy } from 'react';
import PublicPage from '../components/public/PublicPage';
import { Login, ForgotPassword, ConfirmEmail, RegistrationSuccessful } from '../components/account/authRoutes';
const Landing = lazy(() => import('../pages/landing/'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const ServerError = lazy(() => import('../pages/error/ServerError'));
const Blogs = lazy(() => import('../components/blogs/Blog'));
const BlogDetails = lazy(() => import('../components/blogs/BlogDetails'));
const Register = lazy(() => import('../components/account/authRoutes'));
const ContactUs = lazy(() => import('../pages/contact/ContactUs'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('../pages/CookiePolicy'));
const BarChart = lazy(() => import('../components/charts/BarChart'));
const LineChart = lazy(() => import('../components/charts/LineChart'));
const DonutChart = lazy(() => import('../components/charts/DonutChart'));
const StackedBarChart = lazy(() => import('../components/charts/StackedBarChart'));
const DivergingBarChart = lazy(() => import('../components/charts/DivergingBarChart'));
const MultipleLineChart = lazy(() => import('../components/charts/MultipleLineChart'));
const FAQ = lazy(() => import('../components/faq/Faq'));

const routes = [
    {
        path: '/',
        name: 'Landing',
        exact: true,
        element: Landing,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        exact: true,
        element: PrivacyPolicy,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
    {
        path: '/cookie-policy',
        name: 'CookiePolicy',
        exact: true,
        element: CookiePolicy,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
];

const faqs = [
    {
        path: '/faqs',
        name: 'FAQ',
        exact: true,
        element: FAQ,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
];

const contactRoute = [
    {
        path: '/contactus',
        name: 'contactus',
        exact: true,
        element: ContactUs,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/public',
        name: 'PublicPage',
        exact: true,
        element: PublicPage,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
];

const errorRoutes = [
    {
        path: '/error-500',
        name: 'Error - 500',
        element: ServerError,
        roles: [],
        exact: true,
        isAnonymous: true,
        isSimple: false,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: true,
        isSimple: false,
    },
];

const authentication = [
    {
        path: '/register',
        name: 'Register',
        exact: true,
        element: Register,
        roles: [],
        isAnonymous: true,
        isSimple: true,
    },
    {
        path: '/login',
        name: 'Login',
        exact: true,
        element: Login,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
    {
        path: '/confirm',
        name: 'Confirm',
        exact: false,
        element: ConfirmEmail,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },

    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        exact: true,
        element: ForgotPassword,
        roles: [],
        isAnonymous: true,
        isSimple: true,
    },
    {
        path: '/register-success',
        name: 'RegistrationSuccessful',
        exact: true,
        element: RegistrationSuccessful,
        roles: [],
        isAnonymous: true,
        isSimple: true,
    },
];
const blogs = [
    {
        path: '/blogs',
        name: 'Blogs',
        exact: true,
        element: Blogs,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
    {
        path: '/blogs/:id',
        name: 'BlogDetails',
        exact: true,
        element: BlogDetails,
        roles: [],
        isAnonymous: true,
        isSimple: false,
    },
];

const chart = [
    {
        path: '/lineChart',
        name: 'LineChart',
        exact: true,
        element: LineChart,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/donutChart',
        name: 'DonutChart',
        exact: true,
        element: DonutChart,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/stackedBarChart',
        name: 'StackedBarChart',
        exact: true,
        element: StackedBarChart,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/divergingBarChart',
        name: 'DivergingBarChart',
        exact: true,
        element: DivergingBarChart,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/multipleLineChart',
        name: 'MultipleLineChart',
        exact: true,
        element: MultipleLineChart,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/barChart',
        name: 'BarChart',
        exact: true,
        element: BarChart,
        roles: [],
        isAnonymous: true,
    },
];

var allRoutes = [...routes, ...errorRoutes, ...authentication, ...contactRoute, ...chart, ...faqs, ...blogs];

export default allRoutes;
