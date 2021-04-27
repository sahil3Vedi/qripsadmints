import React, { useState } from 'react'
import Navbar from '../molecules/navbar'
import Dashboard from './dashboard'
import DummyProducts from './dummyProducts'
import Products from './products'
import Suppliers from './suppliers'
import { Menu } from 'antd'
import './admin.css'

function Admin(props: {setLogin: Function}) {

    const [view, setView] = useState("1")

    let current_view = <Dashboard/>
    switch(view){
        case "1":
            current_view = <Dashboard/>
            break
        case "2":
            current_view = <DummyProducts/>
            break
        case "3":
            current_view = <Products/>
            break
        case "4":
            current_view = <Suppliers/>
            break
        default:
            current_view = <Dashboard/>
            break
    }

    return (
        <div>
            <Navbar setLogin={props.setLogin}/>
            <div className="admin-layout">
            <div>
                <Menu onClick={(e)=>setView(e.key.toString())} style={{ width: 256 }} defaultSelectedKeys={[view]} mode="inline">
                    <Menu.Item key="1">Dashboard</Menu.Item>
                    <Menu.Item key="2">Dummy Products</Menu.Item>
                    <Menu.Item key="3">Products</Menu.Item>
                    <Menu.Item key="4">Suppliers</Menu.Item>
                </Menu>
            </div>
                <div className="work-area">
                    {current_view}
                </div>
            </div>
        </div>
    )
}

export default Admin
