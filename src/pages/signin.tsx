import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import * as actions from '../actions/auth'
import './signin.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

function SignIn(props: {setLogin: Function}) {

    const [signinLoading,setLoading] = useState(false)

    const onFinish = (values: any) => {
        setLoading(true)
        actions.authLogin(values, setLoading, props.setLogin)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Fel")
    }

    return (
        <div className="signinPage">
            <div className="signinPicture">
                <div className="signinOverlay"></div>
            </div>
            <div className="signinForm">
                <img className="qripsLogo" src={require('../assets/qripstransp.png').default} alt=""/>
                <p className="singinTitle">Admin Login</p>
                <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input style={{maxWidth:"300px"}}/>
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password style={{maxWidth:"300px"}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button loading={signinLoading} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
