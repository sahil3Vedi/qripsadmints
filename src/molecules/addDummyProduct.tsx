import React, { Component } from 'react'
import { Form, Input, Button, Select, InputNumber, message, Upload } from 'antd'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const { TextArea } = Input
const { Option } = Select
const colors = ['#D2E7FF','#FFEDBB','#FFC6C6','#E8FFC6']

//add imgs interface
interface ImgFile{
    url: string,
    name: string,
    uid: string
}

interface CompState {
    initVals: Object,
    color: string,
    imgs: ImgFile[],
    uploadingImg: boolean,
    submittingProduct: boolean,
}

interface CompProp {
    setAddModal: Function
    reloadProducts: Function
}

class AddDummyProduct extends Component<CompProp,CompState> {
    constructor(props: CompProp){
        super(props)
        this.state={
            initVals: {unit_price: 100, unit_weight: 100},
            color: "",
            imgs: [],
            uploadingImg: false,
            submittingProduct: false,
        }
    }

    setColor = (color: string) => {
        this.setState({
            color
        })
    }

    submitProduct = (values: any) => {
        this.toggleSubmittingProduct()
        const {name, company, unit_price, unit_weight, description, tags, color} = values
        tags.push(company+" "+name)
        const imgs = this.state.imgs.map(d=>d.url)
        const payload = {name, company, unit_price, unit_weight, imgs, description, tags, color}
        const config = {headers:{'x-auth-token':localStorage.getItem('token')}}
        axios.post(`${process.env.REACT_APP_BACKEND}dummy/submit`,payload,config)
        .then(res=>{
            message.success(res.data.message)
            this.toggleSubmittingProduct()
            this.props.reloadProducts()
            this.props.setAddModal(false)
        })
        .catch(err=>{
            message.error(err.response ? err.response.data.message : "Server Error")
            this.toggleSubmittingProduct()
        })
    }

    toggleUploadingImg = () => {
        this.setState(prevState=>({
            uploadingImg: !prevState.uploadingImg
        }))
    }

    toggleSubmittingProduct = () => {
        this.setState(prevState=>({
            submittingProduct: !prevState.submittingProduct
        }))
    }

    onPreview = (file: any) => {
        for (var img in this.state.imgs){
            if (file.uid===this.state.imgs[img].uid){
                this.setViewUrl(this.state.imgs[img].url)
            }
        }
    }

    onRemove = (file: any) => {
        let temp_imgs = []
        for (var img in this.state.imgs){
            if (file.uid!==this.state.imgs[img].uid){
                temp_imgs.push(this.state.imgs[img])
            }
        }
        this.setState({imgs: temp_imgs})
    }

    setViewUrl = (url: string) => {
        console.log(url)
    }

    render(){
        // Image Upload Props
        let img_upload_props: any = {
            beforeUpload: (file: any) => {
                this.toggleUploadingImg()
                //validating file size
                const isLt3M = file.size / 1024 / 1024 < 3;
                if (!isLt3M) message.error('Image must smaller than 2MB!')
                else {
                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append("upload_preset", "msiuxpoc")
                    axios.post("https://api.cloudinary.com/v1_1/dxti6efrg/image/upload", formData)
                        .then(res => {
                            let imgs = this.state.imgs
                            imgs.push({
                                url: res.data.secure_url,
                                name: `${res.data.public_id.split('/')[1]}.${res.data.format}`,
                                uid: file.uid
                            })
                            this.setState({
                                    imgs
                            }, () => {
                                this.toggleUploadingImg()
                            })
                        })
                }
                return false;
            },
            loading:true,
            listType:"picture-card",
            multiple: true,
            showUploadList: true,
            accept: ".png",
            onPreview: this.onPreview,
            onRemove: this.onRemove,
            defaultFileList: [],
            valueProp: FileList
        }

        return(
            <div className="add-dummy-product">
                <Form name="add-dummy-product" initialValues={this.state.initVals} onFinish={this.submitProduct}>
                    <div className="form-2">
                        <div>
                            <p className="key-attribute">Company</p>
                            <Form.Item name="company" rules={[{required: true, message: ""}]}>
                                <Input placeholder="Enter Company" />
                            </Form.Item>
                        </div>
                        <div>
                            <p className="key-attribute">Name</p>
                            <Form.Item name="name" rules={[{required: true, message: ""}]}>
                                <Input placeholder="Enter Name" />
                            </Form.Item>
                        </div>
                    </div>
                    <div>
                        <p className="key-attribute">Images</p>
                        <Form.Item name="imgs" rules={[{ required: true, message: 'Please Upload an Image' }]}>
                            <Upload {...img_upload_props}>{this.state.uploadingImg ? <LoadingOutlined spin /> : <UploadOutlined/>}</Upload>
                        </Form.Item>
                    </div>
                    <div>
                        <p className="key-attribute">Description</p>
                        <Form.Item name="description" rules={[{required: true, message: ""}]}>
                            <TextArea rows={4} placeholder="Description"/>
                        </Form.Item>
                    </div>
                    <div className="form-2">
                        <div className="form-2">
                            <div>
                                <p className="key-attribute">Unit Price</p>
                                <Form.Item name="unit_price" rules={[{required: true, message: ""}]}>
                                    <InputNumber  precision={0} placeholder="Enter Unit Price" min={100} max={1500} formatter={value => `₹ ${value}`} step={10} parser={(value: any) => value.replace('₹ ', '')}/>
                                </Form.Item>
                            </div>
                            <div>
                                <p className="key-attribute">Unit Weight</p>
                                <Form.Item name="unit_weight" rules={[{required: true, message: ""}]}>
                                    <InputNumber precision={0} placeholder="Enter Unit Weight" min={50} max={1500} formatter={value => `${value} g`} step={10} parser={(value :any) => value.replace(' g', '')}/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="form-2">
                            <div>
                                <p className="key-attribute">Color</p>
                                <Form.Item name="color" rules={[{required: true, message: ""}]}>
                                    <Select placeholder="Select Color" onChange={this.setColor}>
                                        {colors.map(d=><Option value={d} key={d} style={{backgroundColor:d}}>{d}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{backgroundColor: this.state.color}}></div>
                        </div>
                    </div>
                    <div>
                        <p className="key-attribute">Tags</p>
                        <Form.Item name="tags" rules={[{required: true, message: ""}]}>
                            <Select mode="tags" placeholder="Enter Tags" style={{ width: '100%' }} open={false}></Select>
                        </Form.Item>
                    </div>
                    <Button htmlType="submit" type="primary" disabled={!this.state.imgs.length || this.state.uploadingImg}>Add Dummy Product</Button>
                </Form>
            </div>
        )
    }
}

export default AddDummyProduct
