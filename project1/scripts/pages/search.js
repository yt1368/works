import { products } from "../../data/products-list.js";
import {presentNav} from"../elements/navigation.js";
import {generateProductList} from"../elements/menu-product-list.js";
import {searchResult} from"../elements/menu-product-list.js";


presentNav();                                           //產生導覽列
                                                        
let params= new URLSearchParams(location.search);        
let userSearch = params.get("input");                   //透過get()取得網址中input值(使用者搜尋的內容)，並儲存在userSearch變數中


//產生符合"使用者搜尋內容"的新陣列
function searchProduct()                                
{                                                       
    return products.filter((item)=>                     //回傳此新陣列給searchProduct()函式
    {
        if(item.name.includes(userSearch)||item.introduction.includes(userSearch))      
        {
            return item;
        }
    })
}

let searchResultProduct = searchProduct();          
generateProductList(searchResultProduct);           //將searchResultProduct傳入generateProductList()，來生成符合"使用者搜尋內容"的商品列

searchResult();                                     //使用者搜尋後，跳轉到搜尋結果頁面
