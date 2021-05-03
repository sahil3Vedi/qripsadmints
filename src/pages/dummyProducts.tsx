import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddDummyProduct from '../molecules/addDummyProduct'
import ViewDummyProduct from '../molecules/viewDummyProduct'
import { Button, Modal, Table, Spin, Space, message } from 'antd'
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import './products.css'


function DummyProducts() {
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [addModal, setAddModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [viewProduct, setViewProduct] = useState<any|Function>({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [dummyDeleting, setDummyDeleting] = useState(false)
    const dummyTableColumns = [
        {title: 'Company', dataIndex: 'company', key: 'company'},
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Unit Price', dataIndex: 'unit_price', key: 'unit_price', render: (text: string) => (`₹ ${text}`)},
        {title: 'Unit Weight', dataIndex: 'unit_weight', key: 'unit_weight', render: (text: string) => (`${text} g`)},
        {title: '', dataIndex: '', key: '', render: (text: string,record: Object) => (<Space><Button icon={<EyeOutlined/>} onClick={()=>{peekProduct(record)}}/><Button danger icon={<DeleteOutlined/>} onClick={()=>{confirmDeletion(record)}}/></Space>)}
    ]

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}dummy/fetchDummies`)
        .then(res=>{
            setProducts(res.data.message)
            setLoadingProducts(false)
        })
    }, [])

    function reloadProducts(){
        setLoadingProducts(true)
        axios.get(`${process.env.REACT_APP_BACKEND}dummy/fetchDummies`)
        .then(res=>{
            setProducts(res.data.message)
            setLoadingProducts(false)
        })
    }

    function peekProduct(record: Object){
        setViewProduct(record)
        setViewModal(true)
    }

    function confirmDeletion(record: Object){
        setViewProduct(record)
        setDeleteModal(true)
    }

    function deleteProduct(){
        setDummyDeleting(true)
        const productId = viewProduct._id
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.delete(`${process.env.REACT_APP_BACKEND}dummy/deleteDummy/${productId}`,config)
        .then(res=>{
            setDummyDeleting(false)
            setDeleteModal(false)
            message.success("Dummy Product Deleted")
            reloadProducts()
        })
    }

    let addDummyProductModal = (
        <Modal destroyOnClose centered footer={null} title="Add Dummy Product" visible={addModal} onCancel={()=>setAddModal(false)} width="50%">
            <AddDummyProduct setAddModal={setAddModal} reloadProducts={reloadProducts}/>
        </Modal>
    )

    let viewDummyProductModal = (
        <Modal destroyOnClose centered footer={null} title="View Dummy Product" visible={viewModal} onCancel={()=>setViewModal(false)} width="50%">
            <ViewDummyProduct product={viewProduct}/>
        </Modal>
    )

    let deleteDummyProductModal = (
        <Modal destroyOnClose centered title="Delete Dummy Product" visible={deleteModal} onCancel={()=>setDeleteModal(false)} width="30%" okText="Delete Product" onOk={deleteProduct} okButtonProps={{loading: dummyDeleting}}>
            <p> Are You Sure You Want to Delete <b>{viewProduct.company}</b> - <b>{viewProduct.name}</b> ? </p>
        </Modal>
    )

    return (
        <div>
            {addDummyProductModal}
            {viewDummyProductModal}
            {deleteDummyProductModal}
            <p className="page-title">Dummy Products View</p>
            <div className="page-action">
                <div><p className="page-subtitle">{loadingProducts ? "Loading..." : `Total Dummy Products:${products.length}` }</p></div>
                <div></div>
                <div><Button type="primary" icon={<PlusOutlined/>} onClick={()=>setAddModal(true)}>Add Dummy Product</Button></div>
            </div>
            {
                loadingProducts ?
                <div className="div-spinner"><Spin/></div>
                :
                <Table dataSource={products} columns={dummyTableColumns} rowKey={'_id'}/>
            }
        </div>
    )
}

export default DummyProducts
