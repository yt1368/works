import{cart} from"../../data/cart.js";
import {deliveryOptions} from "../../data/delivery-options.js";
import {products} from"../../data/products-list.js";

//生成結帳頁面右邊(商品總數、商品總價、總運費、總額)，在checkout.js呼叫此函式
export function presentCheckoutAmountList()         
{   
    let productDetail;
    let allProductNum= 0;
    let allProductPrice= 0;
    let allDeliveryFee= 0;
    let amount= 0;
    cart.forEach((product)=>
    {
        products.forEach((item)=>
        {
            if(product.id === item.id)
            {
                productDetail = item
            }
        })
        allProductNum += product.num;                                 //計算購物車內總商品數
        allProductPrice += (productDetail.discountPrice * product.num);       //計算購物車內商品總價。 從商品總細目表(products[])得到的某商品價格*某商品數量=商品總額。
        
        deliveryOptions.forEach((option)=>
        {
            if(product.deliveryId === option.id)                
            {
                allDeliveryFee += option.price;        //計算購物車內商品的總運費
            }
        })
        amount = allProductPrice + allDeliveryFee;      //計算購物車總額
    })
    document.querySelector(".checkout_account_list").innerHTML=
    `
    <h3>訂單總明細</h3>
    <p>總共 ${allProductNum} 件商品</p>
    <p>金額: ${allProductPrice} 元</p>
    <p>運費:  ${allDeliveryFee} 元</p>
    <p class="amount">總金額: ${amount} 元</p>
    <button class="checkout_button">結帳</button>
    `
}