
import styles from "./CartModal.module.css";
import { useUserValue } from "../../userInfoContext";
import CartItem from "../../components/cartItems/CartItem";
import { useEffect } from "react";

export default function CartModal(){
    const{cart, totalPrice,  handelPurchase, onstart}=useUserValue();
        useEffect(()=>{
            onstart();
        })
    return<>
    <div className={styles.cartOuterContainer}>
        <div className={styles.totalBox}>
            <h3>Total price &#8377; {totalPrice}</h3>
            <button className={styles.purchaseBtn} onClick={handelPurchase}>Purchase</button>
        </div>

    <div className={styles.itemsOuterContainer}>
        {cart.length>0? cart.map((item)=><CartItem item={item}/>):<><h1>Empty Cart</h1></>}
        
    </div>

    </div>


    </>
}