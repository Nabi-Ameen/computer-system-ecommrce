import Typography from "./common/Typography";

// Dashboard Home Component
const DashboardHome = () => {
    return (
        <div>
            <Typography varient="h2" className="mb-6">Welcome to Dashboard</Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">Loading...</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
                    <p className="text-3xl font-bold">24</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">System Status</h3>
                    <p className="text-3xl font-bold">Online</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome