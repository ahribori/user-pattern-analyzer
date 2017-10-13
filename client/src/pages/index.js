import asyncRoute from '../lib/asyncRoute';

const ClickAnalyze = asyncRoute(() => import('./ClickAnalyze'))
const Management = asyncRoute(() => import('./Management'))

export {
    ClickAnalyze,
    Management
}
