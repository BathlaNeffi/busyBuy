
import styles from "./CartItem.module.css";
import { useUserValue } from "../../userInfoContext";

export default function CartItem({item}){

    const {id,title,price,description,category,image, qty}=item;
    const{handeladdToCart, handelRemoveToCart ,handelRemoveItem}=useUserValue();

    function addToCart(){
        const item={
            id,title,price,description,category,image,qty:1
        }
        handeladdToCart(item);
    }

    function removeFromCart(){

        handelRemoveToCart(id)
    }

    function removeItem(){
        handelRemoveItem(id);
    }
    return<>
    <div className={styles.containerItem}>
        <div className={styles.imgWrapper}>
            <img src={image} alt="item" />
        </div>
        <span>{title.substring(0,20)}...</span>
        <div className={styles.priceDiv}>
        <p className={styles.para}>&#8377; {price} </p>
        <span>
        <img className={styles.imgBtn} onClick={removeFromCart} src="https://cdn-icons-png.flaticon.com/128/4572/4572882.png" alt=" remove qty" /> <span>{qty}</span> <img className={styles.imgBtn} onClick={addToCart} src="https://cdn-icons-png.flaticon.com/128/561/561169.png" alt="Add qty" />
        </span>
        </div>
        
        <button className={styles.btn} onClick={removeItem}>Remove</button>
    </div>
    </>
}