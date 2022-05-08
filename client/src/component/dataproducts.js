import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { List, Card } from 'antd';




function Dataproducts(props) {
    //สร้าง state data
    const [data, setData] = useState([]);


    //ใช้ axios เพื่อเรียกข้อมูลจากหน้าที่อยู่ตามพอต แล้ว จัดเก็บค่าไว้ในตัวแปร state data
    useEffect(() => {
        axios.get('http://localhost:5000/products').then((response) => {
            setData(response.data);
        })
    }, [])
    // console.log(data);


    return (
        <>
            <div className='container text-center'>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 4,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            // console.log(page);
                        },
                        pageSize: 4
                    }}
                    dataSource={data}
                    renderItem={item => (
                        <Card className='col' key={item.id}>
                            <p>Name : {item.name_products}</p>
                            {
                                item.stock_products == '0' ?
                                    <img src={item.pic_products} className='img-thumbnail' height={300} width={300} style={{ border: "1px red solid" }}></img>
                                    : <Link to={'/products'} onClick={() => props.id(item)}><img src={item.pic_products} className='img-thumbnail' height={300} width={300}></img></Link>
                            }
                            <p>price : {item.price_products} Baht</p>
                            {
                                item.stock_products == '0' ?
                                    <button type="button" id={item.id} className="btn btn-outline-danger" disabled>OUT OF STOCK</button>
                                    : <Link to={'/products'}><button type="button" id={item.id} className="btn btn-outline-info" onClick={() => props.id(item)}>{item.name_products}</button></Link>
                            }


                        </Card>
                    )}
                />

            </div>
        </>
    );

}

export default Dataproducts