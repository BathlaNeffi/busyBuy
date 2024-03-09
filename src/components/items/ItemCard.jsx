
import styles from "./ItemCard.module.css";
import { useUserValue } from "../../userInfoContext";

export default function ItemCard({item}){

    const {id,title,price,description,category,image}=item;
    const{handeladdToCart}=useUserValue();

    function addToCart(){
        const item={
            id,title,price,description,category,image,qty:1
        }
        handeladdToCart(item);
    }
    return<>
    <div className={styles.containerItem}>
        <div className={styles.imgWrapper}>
            <img src={image} alt="item" />
        </div>
        <span>{title.substring(0,20)}...</span>
        <p>	&#8377; {price} </p>
        <button className={styles.btn} onClick={addToCart}>Add To Cart</button>
    </div>
    </>
}