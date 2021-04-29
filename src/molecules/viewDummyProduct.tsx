import React from 'react'
import { Tag, Space } from 'antd'

interface compProp {
    'product': any
}

function ViewDummyProduct(props: compProp){
    return(
        <div>
            <div className="form-2">
                <div><p className="key-attribute">Company</p><p className="key-value">{props.product.company}</p></div>
                <div><p className="key-attribute">Name</p><p className="key-value">{props.product.name}</p></div>
                <div><p className="key-attribute">Unit Price</p><p className="key-value">{props.product.unit_price}</p></div>
                <div><p className="key-attribute">Unit Weight</p><p className="key-value">{props.product.unit_weight}</p></div>
            </div>
            <div><p className="key-attribute">Images</p><Space>{props.product.imgs.map((d: string)=><img className="product-image" alt="product-catalogue" src={d}/>)}</Space></div>
            <div className="form-2">
                <div><p className="key-attribute">Tags</p><div>{props.product.tags.map((d: string)=><Tag color="default">{d}</Tag>)}</div></div>
                <div style={{backgroundColor: props.product.color}}></div>
            </div>
        </div>
    )
}

export default ViewDummyProduct
