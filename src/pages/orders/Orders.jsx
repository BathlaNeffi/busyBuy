import { useEffect } from "react";
import { useUserValue } from "../../userInfoContext"
import styles from "./Orders.module.css";

export default function Orders(){
    const {orderHistory, onstart}=useUserValue();
    useEffect(()=>{
        onstart()
    },[])
    orderHistory.map((arr)=>arr.map((item)=>console.log(item.timestamp)))
    
    return<>
    <div className={styles.ordersConatiner}> 
        <h1 style={{fontSize:"2.3rem", fontWeight:"800"}}>Your Orders</h1>
        <div>
            {orderHistory.map((arr)=> arr.map((item)=>  
            <>
                <h2>Ordered On:- {
                (new Date(item.timestamp.seconds * 1000 + item.timestamp.nanoseconds / 1000000)).toLocaleString()
                }</h2>
                <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {item.cart.map((prd)=>
                <tr>
                    <td>{prd.title}</td>
                    <td>{prd.price}</td>
                    <td>{prd.qty}</td>
                    <td>{prd.qty*prd.price}</td>
                </tr>
                
                )}
                <tr >
                    <th className={styles.total}>&#8377; {item.totalPrice}</th>
                </tr>
                
            </tbody>
            </table>
            </>      
                
                ))}


        </div>
    </div>

    </>
}