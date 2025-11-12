import { Outlet } from "react-router-dom"
import AdminTabs from "../components/AdminTabs"

export default function SuperAdmin() {

    return (
        <div>
            <AdminTabs />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}