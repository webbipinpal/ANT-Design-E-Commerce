import React, { useEffect, useState } from "react";
import './Style.css'
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, message, Table, Typography } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { getCart } from "../API";
const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [selectedKey, setSelectedKey] = useState('/');
  
    useEffect(() => {
      setSelectedKey(location.pathname)
    }, [location.pathname]);

    const onMenuClick = (key) => {
        navigate(`/${key.key}`)
    }
    return(
        <div className="header">
            <div className="home-page appHeader">
              <Menu
                mode="horizontal"
                onClick={onMenuClick}
                selectedKeys={[selectedKey]}
                className="topMenu"
                items={[
                    {
                       label: <HomeFilled /> ,
                       key: '' 
                    },
                    {
                        label: 'Men',
                        key: 'men',
                        children: [
                            {
                                label: "Men's Shirts",
                                key: 'mens-shirts'
                            },
                            {
                                label: "Men's Shoes",
                                key: 'mens-shoes'
                            },
                            {
                                label: "Men's Watches",
                                key: 'mens-watches'
                            },
                        ]
                     },
                     {
                        label: 'Women',
                        key: 'women',
                        children: [
                            {
                                label: "Women's Bags",
                                key: 'womens-bags'
                            },
                            {
                                label: "Women's Shoes",
                                key: 'womens-shoes'
                            },
                            {
                                label: "Women's Watches",
                                key: 'womens-watches'
                            },
                            {
                                label: "Women's Jewellery",
                                key: 'womens-jewellery'
                            },
                            {
                                label: "Women's Dresses",
                                key: 'womens-dresses'
                            },
                        ]
                     },
                     {
                        label: 'Fragrances',
                        key: 'fragrances'
                     }
                ]}
              />
              <Typography.Title level={4} className="storeName" style={{color: '#fff', padding: 0, margin: 0}}>Company Store</Typography.Title>
              <AppCart />
            </div>
        </div>
    )
}

const AppCart = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [form] = Form.useForm()
    useEffect(() => {
        getCart().then(res => {
            setCartItem(res.products)
        })
    }, []);

    const formSubmit = (value) => {
        console.log(value, 'Form Value');
        form.resetFields();
        setCheckoutDrawerOpen(false);
        setOpenDrawer(false);
        message.success('your order has been placed successfully')
    }

    return(
        <>
        <Badge count={cartItem.length}>
        <div className="appCard">
            <ShoppingCartOutlined className="appCardIcon" onClick={() => setOpenDrawer(true)} />
        </div>
        </Badge>
        <Drawer title={'Your Cart'} contentWrapperStyle={{width: 450}} open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Table
            pagination={false}
            columns={[
                {
                    title: 'Title',
                    dataIndex: 'title'
                },
                
                {
                    title: "Price",
                    dataIndex: "price",
                    render: (value) => {
                        return <span>$ {Math.trunc(value)}</span>
                    }
                },
                {
                    title: "Quantity",
                    dataIndex: "quantity",
                    render: (value, record) => {
                        return(
                            <InputNumber 
                            min={0}
                            defaultValue={value} 
                            onChange={(value) => {
                                setCartItem((pre) => pre.map((cart) => {
                                    if(record.id === cart.id){
                                        cart.total = cart.price * value
                                    }
                                    return cart;
                                })
                            )
                            }}
                            ></InputNumber>
                        )
                    }
                },
                {
                    title: "Total",
                    dataIndex: "total",
                    render: (value) => {
                        return <span>$ {Math.trunc(value)}</span>
                    }
                },
            ]}
            dataSource={cartItem}
            summary={(data) => {
                const total = data.reduce((prev, current) => {
                    return prev + current.total
                }, 0)
                return <div>Total: {Math.trunc(total)}</div>
            }}
            />
            <Button type="primary" onClick={() => setCheckoutDrawerOpen(true)}>Checkout Your Cart</Button>
        </Drawer>
        <Drawer open={checkoutDrawerOpen} title="Checkout Cart" onClose={() => setCheckoutDrawerOpen(false)}>
            <Form onFinish={formSubmit} form={form}>
                <Form.Item 
                label="Name"
                name={'name'}
                rules={[
                    {
                        required: true,
                        message: 'Enter your name'
                    }
                ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item 
                label="Email"
                name={'email'}
                rules={[
                    {
                        required: true,
                        message: 'Enter your email'
                    },
                    {
                        type: 'email',
                        message: 'Enter correct email'
                    }
                ]}
                >
                    <Input placeholder="Email ID" />
                </Form.Item>
                <Form.Item 
                label="Address"
                name={'address'}
                rules={[
                    {
                        required: true,
                        message: 'Enter your Address'
                    }
                ]}
                >
                    <Input.TextArea rows={5} placeholder="Address" />
                </Form.Item>
                <Form.Item>
                    <Checkbox disabled checked>Case on delivery</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Typography.Text type="secondary" disabled>More methods coming soon</Typography.Text>
                </Form.Item>
                <Form.Item>
                <Button htmlType="submit" type="primary">Primary Button</Button>
                </Form.Item>
            </Form>
        </Drawer>
        </>
    )
}

export default AppHeader;