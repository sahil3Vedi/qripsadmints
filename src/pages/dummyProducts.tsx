import React, { useState } from 'react'
import AddDummyProduct from '../molecules/addDummyProduct'
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './products.css'

function DummyProducts() {
    const [addModal,setAddModal] = useState(false)
    let addDummyProductModal = (
        <Modal destroyOnClose footer={null} title="Add Dummy Product" visible={addModal} onCancel={()=>setAddModal(false)} width="50%" okText="Add Product">
            <AddDummyProduct setAddModal={setAddModal}/>
        </Modal>
    )
    return (
        <div>
            {addDummyProductModal}
            <p className="page-title">Dummy Products View</p>
            <div className="page-action">
                <div><p className="page-subtitle">Total Dummy Products: 25</p></div>
                <div></div>
                <div><Button type="primary" icon={<PlusOutlined/>} onClick={()=>setAddModal(true)}>Add Dummy Product</Button></div>
            </div>
        </div>
    )
}

export default DummyProducts
