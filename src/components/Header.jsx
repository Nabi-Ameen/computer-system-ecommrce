import React from 'react'
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { menus } from '../assets/constants/navebar';
import { Link, useLocation } from "react-router"

const Header = () => {
    const location = useLocation();
    return (
        <div>
            <div className='h-8 border-b-2 px-20'></div>
            <div className='px-20 py-10 flex items-center justify-between'>
                <div>LOGO HERE</div>
                <div >
                    <div className='border'>
                        <input type="text" className='w-96' />
                        <button className='bg-[#2196F3] p-3 rounded-md'><IoSearch /></button>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <FiShoppingCart size={32} />
                    <RxAvatar size={32} />
                </div>
            </div>

            <div className='bg-[#2196F3] p-6 text-center  flex items-center justify-center gap-20'>
                {menus?.map((menu) => {
                    return (
                        <Link to={menu.pathName} key={menu.id} className={`${location?.pathname === menu.pathName ? "underline text-white" : ""}`}>{menu?.pathValue}</Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Header