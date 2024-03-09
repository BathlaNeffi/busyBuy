import{ useNavigate} from "react-router-dom";
import styles from "./SignUp.module.css";
import { useUserValue } from "../../userInfoContext";
import { useState } from "react";



export default function SignUp(){
    const {handelCreateUser}=useUserValue();
    const [user,setUser]=useState({name:"", email:"",password:""});
    const navigate=useNavigate();
    let redirect=false;

    async function createUser(e){
        e.preventDefault();
        redirect= await handelCreateUser({...user});
        console.log(redirect);
        if(redirect){
            navigate("/sign-in")
        }
    }


    return(
        <>
        <div className={styles.formWrapper}>
            <form onSubmit={(e)=>{createUser(e)}}>
                <h2 className={styles.formHeading}>Sign Up</h2>
                <input className={styles.formInput} type="text" name="name" placeholder="Enter Name" required value={user.name} onChange={(e)=>{setUser({...user,name:e.target.value})}}  />
                <input className={styles.formInput} type="text" name="email"placeholder="Enter Email"required value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}} />
                <input className={styles.formInput} type="password" name="password" placeholder="Enter Password"  required value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} />
                <input className={styles.btn} type="submit" value="Sign Up" />
            </form>
        </div>
        </>
    )
}