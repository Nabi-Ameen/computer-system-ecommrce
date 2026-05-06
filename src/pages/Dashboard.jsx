import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";
import * as Yup from 'yup';
import { MdModeEdit, MdDashboard, MdPeople, MdSettings, MdLogout } from "react-icons/md";
import { FaTrash, FaUserPlus, FaList } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";

import InputField from '../components/common/InputField';
import Typography from '../components/common/Typography';
import { useNavigate } from 'react-router';
import UserForm from '../components/UserForm';
import DashboardHome from '../components/DashboardHome';
import Category from '../components/Category';
import UsersList from '../components/UserList';









// Main Dashboard Component
const Dashboard = () => {
    const [loader, setLoader] = useState(false);
    const [users, setUsers] = useState([]);
    const [sigleUser, setSingleUser] = useState({});
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate()

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:9000/v1/users");
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:9000/v1/user/${id}`);
                getAllUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const getSigleUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9000/v1/user/${id}`);
            setSingleUser(response?.data?.data);
            setActiveMenu('users'); // Switch to users tab when editing
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const updateUser = async (id, values) => {
        try {
            await axios.put(`http://localhost:9000/v1/user/${id}`, values);
            setSingleUser({});
            getAllUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const createUser = async (values) => {
        setLoader(true);
        try {
            await axios.post("http://localhost:9000/v1/user", values);
            setLoader(false);
            getAllUsers();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error("Error creating user:", error);
            setLoader(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
        { id: "users", label: "Users", icon: <MdPeople size={22} /> },
        { id: "category", label: "Category", icon: <BiSolidCategoryAlt size={22} /> },
    ];



    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Menu */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
                <div className="p-6 border-b border-gray-700">
                    <Typography varient="h4" className="text-white">Admin Dashboard</Typography>
                    <p className="text-gray-400 text-sm mt-1">Manage your application</p>
                </div>

                <nav className="flex-1 mt-6">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveMenu(item.id);
                                setSingleUser({}); // Reset edit mode when changing menu
                            }}
                            className={`w-full flex items-center gap-3 px-6 py-3 transition ${activeMenu === item.id
                                ? 'bg-blue-600 text-white border-l-4 border-blue-400'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-gray-700">
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition">
                        <MdLogout size={22} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Typography varient="h1" className="text-3xl font-bold text-gray-800">
                            {activeMenu === 'dashboard' && 'Dashboard Overview'}
                            {activeMenu === 'users' && 'User Management'}
                            {activeMenu === 'settings' && 'System Settings'}
                        </Typography>
                        <p className="text-gray-600 mt-2">
                            {activeMenu === 'dashboard' && 'Welcome back! Here\'s what\'s happening with your application.'}
                            {activeMenu === 'users' && 'Manage your users, add new users, or edit existing ones.'}
                            {activeMenu === 'settings' && 'Configure your application settings and preferences.'}
                        </p>
                    </div>

                    {/* Content based on active menu */}
                    {activeMenu === 'dashboard' && <DashboardHome />}

                    {activeMenu === 'users' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - User Form */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <UserForm
                                    sigleUser={sigleUser}
                                    loader={loader}
                                    createUser={createUser}
                                    updateUser={updateUser}
                                    setSingleUser={setSingleUser}
                                />
                            </div>

                            {/* Right Column - Users List */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <UsersList
                                    users={users}
                                    getSigleUser={getSigleUser}
                                    deleteUser={deleteUser}
                                />
                            </div>
                        </div>
                    )}

                    {
                        activeMenu === "category" && (
                            <div className='w-full flex items-center justify-center'>
                                <Category />
                            </div>
                        )
                    }


                </div>
            </main>
        </div>
    );
};

export default Dashboard;