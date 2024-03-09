import styles from "./ItemGallery.module.css";
import ItemCard from "../items/ItemCard";
import Search from "../searchInput/Search";
import { useEffect, useState } from "react";
import { unmountComponentAtNode } from "react-dom";
import Spinner from 'react-spinner-material';
export default function ItemsGallery(){
useEffect(()=>{
    fetchProducts();
},[])

const [isData,setIsData]=useState(false);
const [jsonData, setJsonData]=useState([]);
const [priceRange,setPriceRange]=useState(99);
const [search, setSearch]=useState("");
const [cateagory,setCatagory]=useState([]);


// useEffect(()=>{
//     console.log(cateagory);
// },[cateagory]);
   async function fetchProducts(){
    try {
        const response=await fetch('https://fakestoreapi.com/products')
        const json=await response.json();
        setJsonData([...json]);
        setIsData(true);
        
    } catch (error) {
        console.log(error);
    }
       
    }
    function updateValue(e) {
        setPriceRange(e.target.value);
        return;
      }

      function checkBoxValue(cate){
            const ind=cateagory.findIndex((item)=>item==cate)
            if(ind==-1){
                setCatagory([cate,...cateagory]);
            }else{
                cateagory.splice(ind,1);
                setCatagory([...cateagory]);

            }
      }

    return<>
    <Search setSearch={setSearch}/>
    <div className={styles.itemsContainer}>
        <aside className={styles.filterBox}>
            <form>
                <h2>Filter</h2>
                <span className={styles.priceRangeValue}>Value: {priceRange}</span>
                <input type="range" value={priceRange}  min="0" step="1"  max="999" onChange={(e)=>{updateValue(e)}} />
                <h2>Catagory</h2>
                <div>
                <input type="checkbox" name="Men's Clothing" id="mens" value="men's clothing" onChange={(e)=>{checkBoxValue(e.target.value)}}/>
                <label id="mens">Men's Clothing</label>
                </div>
                <div>
                <input type="checkbox" name="" id="women"  value="women's clothing" onChange={(e)=>{checkBoxValue(e.target.value)}}/>
                <label id="women">Women's Clothing</label>
                </div>
                <div>
                <input type="checkbox" name="" id="jewelery" value="jewelery" onChange={(e)=>{checkBoxValue(e.target.value)}} />
                <label id="jewelery">Jewelery</label>
                </div>
                <div>
                <input type="checkbox" name="" id="Electronics"  value="electronics" onChange={(e)=>{checkBoxValue(e.target.value)}}/>
                <label id="Electronics">Electronics</label>
                </div>

            </form>
        </aside>
        <div className={styles.itemsWrapper}>
            {isData? jsonData.filter((prd)=>{return search.toLocaleLowerCase() === ""? prd:
            prd.title.toLocaleLowerCase().includes(search);
        }).filter((pricebag)=> {
                
            return pricebag.price <= priceRange? pricebag:undefined
        }).filter((cate)=> {
            return cateagory.length==0?true:cateagory.includes(cate.category.toLowerCase());
        })
        .map((item,i)=><ItemCard item={item} key={i}/>)
            :
            <div className={styles.spinnerClass}>
                <Spinner radius={120} color={"#333"} stroke={4} visible={true} />
             </div>}
            
        </div>
    </div>
    </>
}