import {presentCheckoutProductList} from"../elements/checkoout-product-list.js";
import {presentCheckoutAmountList} from"../elements/checkout-amount.js";
import {presentNav} from"../elements/navigation.js";
import {searchResult} from"../elements/menu-product-list.js";

presentNav();                               //產生導覽列
presentCheckoutProductList();               //生成結帳頁面左邊(加入購物車的商品列表、各商品數量修改/刪除、運送方式)
presentCheckoutAmountList();                //生成結帳頁面右邊(商品總數、商品總價、總運費、總額)
searchResult();                             //使用者搜尋後，跳轉到搜尋結果頁面
  


