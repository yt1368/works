import {products} from"../../data/products-list.js";
import {presentNav} from"../elements/navigation.js";
import {generateProductList} from"../elements/menu-product-list.js";
import {searchResult} from"../elements/menu-product-list.js";

presentNav();                       //產生導覽列
generateProductList(products);      //(1)生成商品列、(2)商品加入購物車的事件監聽、(3)商品加入購物車後跳出"成功加入購物車"的訊息
searchResult();                     //使用者搜尋後，跳轉到搜尋結果頁面
