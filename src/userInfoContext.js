import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import { db } from "./firebaseInit";
import { serverTimestamp, doc , getDoc, updateDoc, arrayUnion, arrayRemove, setDoc,} from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  



const userInfoContext=createContext();

export function useUserValue(){
    const userValue=useContext(userInfoContext);
    return userValue;
}

export default function CustomUserInfoProvider({children}){
    const [userId,setUserId]=useState("");
    const [cart,setCart]=useState([]);
    const [totalPrice, setTotalPrice]=useState(0);
    const [orderHistory,setOrderHistory]=useState([]);
    const auth=getAuth();


    useEffect(()=>{
        onstart();

    },[])

    async function onstart(){
        const id=localStorage.getItem("busyBuyUser");
        // console.log(id);
        if(id){
         const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
         setUserId(docSnap.id);
         setCart(docSnap.data().cart);
         let total=0;
          await docSnap.data().cart.map((item)=>{
             return total+= (item.price*item.qty)
          })
          total=Math.round(total *100) /100;
          setTotalPrice(total);
          let order=await docSnap.data().order;
          setOrderHistory([order]);
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        // window.location.href('/sign-in');
        }
        }
        
    }

    async function handelCreateUser(user){


          try {
                const userCredential= await createUserWithEmailAndPassword(auth, user.email, user.password);
                const newUser = userCredential.user;
                  // console.log('User signed up successfully!');
                  toast.success("User signed up successfully!");
                  // console.log('New User ID:', newUser.uid);
                  await setDoc(doc(db, "users",newUser.uid), {
                      user,
                      cart:[],
                      order:[],
                      timestamp: serverTimestamp() 
                    });
                  return true;
          } catch (error) {
            // console.log(error);
            const errorMessage=error.message;
            const startIndex = errorMessage.indexOf("(") + 1;
            const lastIndex= errorMessage.indexOf(")");
            toast.error(errorMessage.substring(startIndex,lastIndex), {
              position: "top-right",
            },{ autoClose: 2000 });
            return false;
          }
    }

    async function handelCreateSession(signData){
        // let isauthticated=false;
        // const querySnapshot = await getDocs(collection(db, "users"));
        // // console.log(signData);
        //     querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     // console.log(doc.id, " => ", doc.data().user);
        //     let data=doc.data().user;
        //     let check=(data.email==signData.email && data.password==signData.password);
        //     if(check){
        //             localStorage.setItem('busyBuyUser',doc.id);
        //             setUserId(doc.id);
        //             isauthticated=true;
        //         }
        //     });
        //     return isauthticated;

        try {
          const userCredential = await signInWithEmailAndPassword(auth,signData.email, signData.password);
            
            const user = userCredential.user;
            // console.log('User signed in successfully!');
            // console.log('User ID:', user.uid);
            if(user){
              localStorage.setItem('busyBuyUser',user.uid);
              setUserId(user.uid);
          }
            return true;
          
        } catch (error) {
            const errorMessage=error.message;
            const startIndex = errorMessage.indexOf("(") + 1;
            const lastIndex= errorMessage.indexOf(")");
            toast.error(errorMessage.substring(startIndex,lastIndex), {
              position: "top-right",
            },{ autoClose: 2000 });
            return false;
        }
    }



    function handelLogout(){
        setUserId("");
        localStorage.clear();
    }

    async function handeladdToCart(item){

        const ind=cart.findIndex((prd)=>prd.id===item.id);
        if(ind===-1){
            setCart([item,...cart]);
            const docRef = doc(db, "users", userId);
            setTotalPrice((prev)=>prev+item.price);
            await updateDoc(docRef, {
                cart :arrayUnion(item)
              });
              toast.success("Added to cart!!", {
                position: "top-right"
              });
        }else{
            cart[ind].qty+=1;
            setCart([...cart]);
            setTotalPrice((prev)=>prev+item.price);
            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, {
                cart :arrayUnion(item)
              });
              toast.success("Added To cart !!", {
                position: "top-right"
              });
        }
        // console.log(cart);
    }

    async function handelRemoveToCart(id){
        const ind=cart.findIndex((prd)=>prd.id===id);
        if(ind!==-1){
            let item={...cart[ind]};
            if(cart[ind].qty<=1){
                cart.splice(ind,1);
            }else{
                cart[ind].qty-=1;
            }
            setCart([...cart]);
            setTotalPrice((prev)=>prev-item.price);
            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, {
                cart :arrayRemove(item)
              });
              toast.success("removed from cart !!", {
                position: "top-right"
              });
        }else{
            toast.error("Error Notification !", {
                position: "top-left"
              });
        }
     
    }

    async function handelRemoveItem(id){
        const ind=cart.findIndex((prd)=>prd.id===id);
        if(ind!==-1){
            let item={...cart[ind]};
                cart.splice(ind,1);
            setCart([...cart]);
            setTotalPrice((prev)=>prev-item.price*item.qty);
            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, {
                cart :arrayRemove(item)
              });
              toast.success("removed from cart !!", {
                position: "top-right"
              });
        }else{
            toast.error("Error Notification !", {
                position: "top-left"
              });
        }
    }


    async  function handelPurchase(){
        const docRef = doc(db, "users", userId);
        const timestampValue =  new Date();
        const orderObject = {
            timestamp: timestampValue,
            cart: cart,
            totalPrice: totalPrice
          };
            await updateDoc(docRef, {
                order:arrayUnion(orderObject),
                cart:[]
              });
              const docSnap=await getDoc(docRef);
               let order=await docSnap.data().order;
            setOrderHistory([order]);
              setCart([]);
              setTotalPrice(0);

    }

    return(
        <>
        
         <userInfoContext.Provider value={{handelCreateUser, handelCreateSession, userId,
             handelLogout,handeladdToCart, cart, totalPrice, handelRemoveToCart , 
             handelRemoveItem,
             handelPurchase,
             orderHistory,
             onstart}}>
           {children}
           <ToastContainer autoClose={800} />
       </userInfoContext.Provider>
        </>
       
    )
}