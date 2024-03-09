import { NavLink, Outlet  } from "react-router-dom";
import styles from "./Nav.module.css";
import { useUserValue } from "../../userInfoContext";
export default function Nav (){

    const {userId, handelLogout}=useUserValue();


    return(
        <>
        <div className={styles.container}>
        <span >
            <NavLink className={styles.brand} to="/">Busy Buy</NavLink></span>
        <div className={styles.btnWarpper}>
            <div >
                <NavLink className={styles.btn} to="/"> 
                <img src="https://cdn-icons-png.flaticon.com/128/2544/2544056.png" alt="Home button" />
                <p>Home</p>
                </NavLink>
            </div>
            {userId?
            <>
            <div >
                <NavLink className={styles.btn} to="/orders"  > 
                <img src="https://cdn-icons-png.flaticon.com/128/3142/3142578.png" alt="Orders  button"  />
                <p>Orders</p>
                </NavLink>
            </div>
            <div >
                <NavLink className={styles.btn} to="/cart"  > 
                <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png" alt="Cart  button"  />
                <p>Cart</p>
                </NavLink>
            </div>
            </>
            : undefined 

            }
            <div >
                <NavLink className={styles.btn} to="/sign-in"  onClick={handelLogout}> 
                <img src="https://cdn-icons-png.flaticon.com/128/1176/1176390.png" alt="Sign In  button"  />
                <p>{userId?"logout":"Sign-In"}</p>
                </NavLink>
            </div>
           
        </div>
        </div>
        <Outlet/>
        </>
    )
}