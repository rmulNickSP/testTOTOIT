import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';


function Admin() {
    //สร้าง state data
    const [data, setData] = useState([]);


    //ใช้ axios เพื่อเรียกข้อมูลจากหน้าที่อยู่ตามพอต แล้ว จัดเก็บค่าไว้ในตัวแปร state data
    useEffect(() => {
        axios.get('http://localhost:5000/products').then((response) => {
            setData(response.data);
        })
    }, [])
    // console.log(data);

    const columns = [
        {
            title: 'NameProduct',
            dataIndex: 'NameProduct',
            key: 'NameProduct',
            render: text => <a>{text}</a>,
        },
        {
            title: 'StockProduct',
            dataIndex: 'StockProduct',
            key: 'StockProduct',
        }
    ];

    const datashow = data.map((val) => {
        return (
                {
                    key: val.id,
                    NameProduct: val.name_products,
                    StockProduct: val.stock_products,
                }
        )
    })

    const updateStockAll = () => {
        axios.put('http://localhost:5000/restock',{stockall:20}).then((response) => {

        setData(
                data.map((val)=>{
                return data!=null ? {
                    id: val.id,
                    name_products: val.name_products,
                    pic_products: val.pic_products,
                    price_products: val.price_products,
                    stock_products: 20,
                    sell_products: val.sell_products,
                    date_products: val.date_products,
                    bbf_products: val.bbf_products
                } : val;
            })
        )
        })
    }

    return (
        <>
           <Table columns={columns} dataSource={datashow} />
           <hr></hr>
           <div className='container text-center'>
           <button type="button" className="btn btn-secondary" onClick={()=>updateStockAll()}>Restock</button>
           <Link to='/' ><button type="button" className="btn btn-warning">Back</button></Link>
           </div>
        </>
    );
}

export default Admin 