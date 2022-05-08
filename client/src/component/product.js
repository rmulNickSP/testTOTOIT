import { Button, Modal, Form } from 'react-bootstrap';
import { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment';


function Product(props) {
    const [dataproducts, setDataproducts] = useState([]);
    document.addEventListener(
        "load",
        useEffect(() => {
            setDataproducts(props.test)
        }, [])
    )
    //ตัวแปรทั้งหมด
    const idProducts = dataproducts.id;
    const price = dataproducts.price_products;
    const stock = dataproducts.stock_products;
    const sell = dataproducts.sell_products;
    const [show, setShow] = useState(false);
    const [coin, setCoin] = useState(0);
    const [updatestock, setUpdatestock] = useState();
    const [updatesell, setUpdatesell] = useState();

    //ปิดModal
    const handleClose = () => {
        setShow(false)
        setCoin(0)
        dispatch({ type: "SUBCLOSE" })
    };
    //เปิดModal
    const handleShow = (aStock,aSell) => {
        setShow(true)
        //นำค่ามาเซ็ตเตรียมไว้ก่อนใช้ update
        let upstock = aStock - 1
        let upsell = aSell + 1
        setUpdatestock(upstock)
        setUpdatesell(upsell)
        // console.log("ค่าที่ต้องการ : ",aStock," และ ",aSell)
    };

    //เช็คค่าใน input
    const handChck = (value) => {
        setCoin(value)
    }
    // console.log("ค่าที่หยอดเข้าไป : ",coin);

    //ตัวสอบและทำงานในการหยดเหรียญ
    function calcoin(incoin) {
        if(updatestock!=null||updatesell!=null){
            console.log("จบกะ");
            if (incoin == price) {
                // alert("THANK YOU, GET THE PRODUCT BELOW")
                swal({
                    text: "THANK YOU, GET THE PRODUCT BELOW",
                    icon: "success",
                    dangerMode: false,
                  })
                  .then(willDelete => {
                    if (willDelete) {
                        window.location.href='/';
                    }
                  });
                setShow(false)
                setCoin(0)
                dispatch({ type: "SUBCLOSE" })
                updatetoStock(idProducts)
                // window.location.href='/';
            }
            if (incoin > price) {
                let change = incoin - price;
                // swal("THANK YOU, GET THE PRODUCT BELOW AND RECEIVE YOU WITHDRAWAL : " + change + " BATH")
                swal({
                    text: "THANK YOU, GET THE PRODUCT BELOW AND RECEIVE YOU WITHDRAWAL : " + change + " BATH",
                    icon: "success",
                    dangerMode: false,
                  })
                  .then(willDelete => {
                    if (willDelete) {
                        window.location.href='/';
                    }
                  });
                setShow(false)
                setCoin(0)
                dispatch({ type: "SUBCLOSE" })
                updatetoStock(idProducts)
                // window.location.href='/';
            }
            if (incoin < price) {
                let noenough = price - incoin
                swal("SO SORRY, NOT ENOUGH COIN. DROP COIN : " + noenough + " BATH");
                
            }
            
        }
        
        
    }
    //reducer
    const reducer = (state, action) => {
        switch (action.type) {
            case "DROP":
                setCoin(state + action.add)
                return (state + action.add)
            case "SUBCLOSE":
                return (state = 0)
        }
    }
    const [dropresult, dispatch] = useReducer(reducer, coin)
    // console.log("เหรียญที่หยอด",coin);
    // console.log("id ของสินค้านี้ : ",idProducts)
    // console.log("จำนวน updatestock ที่จะส่งไปอัพ : ",updatestock)
    // console.log("จำนวน updatesell ที่จะส่งไปอัพ : ",updatesell)
    // console.log("ข้อมูลที่ส่งมา : ",dataproducts)
    //update ข้อมูล stock และ sell

    const updatetoStock = (idProducts) => {
        axios.put('http://localhost:5000/update', { stock: updatestock, sell: updatesell, id: idProducts }).then((response) => {

        // setDataproducts(dataproducts.map((val)=>{return val.id==idProducts?{id:val.id,name_products:val.name_products,pic_products: val.pic_products,price_products: val.price_products,stock_products: updatestock,sell_products: updatesell,date_products: val.date_products,bbf_products: val.bbf_products}:val}));
        setDataproducts(
            dataproducts.map((val)=>{
                return val.id == idProducts ? {
                    id: val.id,
                    name_products: val.name_products,
                    pic_products: val.pic_products,
                    price_products: val.price_products,
                    stock_products: updatestock,
                    sell_products: updatesell,
                    date_products: val.date_products,
                    bbf_products: val.bbf_products
                } : val;
            })
        )
        })
    }

    return (
        <>
            <div className='container text-center'>
            <img src={dataproducts.pic_products} className='img-thumbnail' height={300} width={300}></img>
            <div>Name : {dataproducts.name_products}</div>
            <div>Price : {dataproducts.price_products}</div>
            <div>surplus : {dataproducts.stock_products}</div>
            <div>bbf : {moment(dataproducts.bbf_products).format("YYYY-MM-DD")}</div>
            <br /><br />
            <Button variant="primary" onClick={()=>handleShow(stock,sell)}>BUY</Button >
            <Link to='/' ><Button variant="danger">CANCEL</Button ></Link>
            </div>
            <Modal show={show} onHide={handleClose} keyboard={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Enter the amount of coins</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='h3'>{dataproducts.price_products}Baht a price of {dataproducts.name_products}</Form.Label>
                            <Form.Control type="number" placeholder="Enter number the amount of coins" value={coin} onChange={(e) => handChck(e.target.value)} />
                            {
                                !!coin ? <Form.Text>{coin >= dataproducts.price_products ? "PASS" : "Not enough"}</Form.Text> : <Form.Text >Please enter the amount of coins.</Form.Text>
                            }

                        </Form.Group>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <h4 className='text-center'>{dropresult} BATH</h4>
                            <Button variant="success" onClick={() => dispatch({ type: "DROP", add: 10 })}>
                                DROP COINS
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="primary" onClick={() => calcoin(coin)} type="submit">
                        BUY
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default Product