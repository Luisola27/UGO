import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import DashboardAdd from '../pages/Dashboard/DashboardAdd'
import DashboardList from '../pages/Dashboard/DashboardList'
import HomePage from '../pages/Home/HomePage'

export const routes: RouteObject[] = 
[
    {
        path: "/",
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'list', element: <DashboardList />},
            {path: 'update', element: <DashboardAdd />}
        ]
    }
]

export const router = createBrowserRouter(routes);