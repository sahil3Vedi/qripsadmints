import React from 'react'
import './navbar.css'
import { Avatar, Space, Popover, Button } from 'antd'
import { UserOutlined, BellOutlined } from '@ant-design/icons'
import * as actions from '../actions/auth'

function Navbar(props: {setLogin: Function}){
    const popover_content = (
        <Button danger onClick={()=>actions.logout(props.setLogin)}>Logout</Button>
    )
    return(
        <div className="navbar">
            <div>
                <img className="navbar-logo" src={require('../assets/qripstranspwhite.png').default} alt="qrips-logo"/>
            </div>
            <div></div>
            <div>
                <Space size="middle">
                    <Avatar className="navbar-avatar" size="large" icon={<BellOutlined />} style={{ color: '#008000', backgroundColor: '#fff' }}/>
                    <Popover placement="bottomRight" content={popover_content}><Avatar className="navbar-avatar" size="large" icon={<UserOutlined />} style={{ color: '#008000', backgroundColor: '#fff' }}/></Popover>
                </Space>
            </div>
        </div>
    )
}

export default Navbar
