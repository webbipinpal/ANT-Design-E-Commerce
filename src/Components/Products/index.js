import React, { useEffect, useState } from 'react';
import { addtoCart, getAllProducts, getProductsByCategory } from '../API';
import { Card, List, Image, Typography, Badge, Rate, Button, message, Spin, Select } from 'antd';
import { useParams } from 'react-router-dom';
import './Style.css'
const Products = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState('az');
    const params = useParams();
    useEffect(() => {
        setLoading(true);
        getProductsByCategory(params.categoryId).then(res => {
            setItems(res.products);
            setLoading(false);
        })
    }, [params]);
    const getShortedItems = () => {
        const shortedData = [...items];
        shortedData.sort((a, b) => {
            if(sortOrder === 'az'){
                return a.title > b.title ? 1 : a.title === b.title ? 0 : -1
            }else if(sortOrder === 'za'){
                return a.title < b.title ? 1 : a.title === b.title ? 0 : -1
            }else if(sortOrder === 'lowHigh'){
                return a.price > b.price ? 1 : a.price === b.price ? 0 : -1
            }else if(sortOrder === 'highLow'){
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1
            }
        });
        return shortedData;
        
    }
    // if(loading){
    //     return <Spin spinning />
    // }
    return(
        <>
            <div className='shortContainer'>
                <Typography.Text>View Items shored By: </Typography.Text>
                <Select 
                defaultValue={'az'}
                onChange={(value) => {
                    setSortOrder(value);
                }}
                    options={[
                        {
                            label: 'Alphabetically a-z',
                            value: 'az'
                        },
                        {
                            label: 'Alphabetically z-a',
                            value: 'za'
                        },
                        {
                            label: 'Price Low to High',
                            value: 'lowHigh'
                        },
                        {
                           label: 'Price High to Low',
                            value: 'highLow'
                        }
                    ]}
                />
            </div>
            <List 
            loading={loading}
            grid={{column: 3,  }}
            dataSource={getShortedItems()}
            renderItem={(product, index) => {
                return(
                    <Badge.Ribbon text={`off ${product.discountPercentage}%`} color='red' style={{marginRight: '11px', fontSize: '11px'}}>
                        <Card
                            title={product.title}
                            key={index}
                            style={{textAlign: 'center', margin: 10}}
                            cover={<Image src={product.thumbnail} className={'img-thumbnail'} />}
                            actions={[
                                <Rate value={product?.rating} allowHalf disabled />,
                                <AddtoCardButton item={product} />
                            ]}
                            >
                                <Card.Meta title={
                                    <Typography.Paragraph >Price: ${product.price} {" "}
                                        <Typography.Text delete type='danger'> ${parseFloat(product.price + (product.price * product.discountPercentage/100)).toFixed(2)}</Typography.Text>
                                    </Typography.Paragraph>
                                    }
                                    description={<Typography.Paragraph ellipsis={{rows: 2, expandable: true, symbol:'more'}}>{product.description}</Typography.Paragraph>}
                                    />

                            </Card>
                    </Badge.Ribbon>
                )
            }}
            />
        </>
    )
};

const AddtoCardButton = (item) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const AddProducttoCart = () =>{
        setLoading(true);
        addtoCart(item.id).then(res => {
            messageApi.open({
                type: 'success',
                content: `${item.item.title} has been added`,
                duration: 3,
              });
              setLoading(false);
        });
        
    }
    return(
        <>
        {contextHolder}
        <Button loading={loading} type='link' onClick={() => AddProducttoCart()}>Add to Cart</Button>
        </>
        
    )
}

export default Products;