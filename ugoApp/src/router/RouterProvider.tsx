import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomePage from '../components/Home/HomePage'
import DashboardAdd from '../components/common/Dashboard/DashboardAdd'
import DashboardList from '../components/common/Dashboard/DashboardList'

export const routes: RouteObject[] = 
[
    {
        path: "/",
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'list', element: <DashboardList />},
            {path: 'add', element: <DashboardAdd />}
        ]
    }
]

export const router = createBrowserRouter(routes)