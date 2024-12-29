import React, { useEffect, useState } from 'react';
import { getAllCategory } from '../../API';
import { Card, List, Image, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import './Style.css'
const HomePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        getAllCategory().then(res => {
            setItems(res);
            setLoading(false);
        })
    }, [params]);
    
    if(loading){
        return <Spin spinning />
    }
    return(
        <>
            <List 
            grid={{column: 3,  }}
            dataSource={items}
            renderItem={(product, index) => {
                return(
                    <Card
                      title={product.name}
                      key={index}
                      style={{textAlign: 'center', margin: 10}}
                      cover={<Image src={'https://dummyimage.com/800x600/cfb4cf/fff'} className={'img-thumbnail'} />}
                      onClick = { () => navigate(product.slug)}
                      >
                    </Card>
                )
            }}
            />
        </>
    )
};

export default HomePage;