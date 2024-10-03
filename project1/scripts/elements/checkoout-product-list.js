import {cart, updateProductNumToCart, deleteProductFromCart, addDeliveryOptionToCart} from"../../data/cart.js";
import {products} from"../../data/products-list.js";
import {deliveryOptions } from"../../data/delivery-options.js";
import {presentCheckoutAmountList} from"./checkout-amount.js";
import {presentNav} from"./navigation.js";

//生成結帳頁面左邊(加入購物車的商品列表、各商品數量修改/刪除、運送方式)。在checkout.js呼叫此函式
export function presentCheckoutProductList()        
{
    let cartItem;
    let html="";
    cart.forEach((item)=>                           //生成結帳頁面的商品列(顯示加到購物車內的商品資訊(圖片、名稱、數量...))
    {                                               //使用forEach先跑過購物車(cart[])內有的商品，不過購物車內的商品資訊不完整(僅有商品id和數量)，因此透過比對id，補齊商品的完整資訊。
        products.forEach((product)=>                //使用forEach跑過商品的總細目表(products[])
        {
            if(item.id===product.id)                
            {
                cartItem= product;
            }
        });             

        html= html+     //結帳頁面的html
        `
        <li class="product_row js-product-row-${cartItem.id}">    
            <div class="checkout_image">
                <a href="each-product.html?input=${cartItem.id}">
                    <img class="checkout_product_img" src="${cartItem.img}" alt="product_image">
                </a>    
            </div>
            <div class="checkout_product_description">
                <div class="checkout_product_name_price">
                    <a href="each-product.html?input=${cartItem.id}">  
                        <p class="checkout_product_name">${cartItem.name}</p>
                    </a>
                    <div class="checkout_discount_price">
                        ${cartItem.originPrice? "<p class='checkout_origin_price'>"+"$"+cartItem.originPrice+"</p>" : ""}
                        <p>
                            ${cartItem.discountPrice? "$"+cartItem.discountPrice : ""}
                        </p>
                    </div>
                    <p class="checkout_num">
                        數量
                        <input  class="checkout_buy_num" data-product-id=${cartItem.id} name="checkout_${cartItem.id}_buy_num" type="text" value="${item.num}">
                    </p>
                    <button class="delete_product" data-product-id=${cartItem.id}>刪除此商品</button>
                </div>
                <div class="delivery_options"> 
                    <p class="delivery_options_p">
                        <h3>運送方式</h3>
                        ${generateDeliveryOptions(cartItem.id, item.deliveryId)}    
                    </p>
                </div>
            </div>
        </li>
        `;
    })
    document.querySelector(".checkout_product").innerHTML= html;


    let checkoutBuyNum= document.querySelectorAll(".checkout_buy_num");         //在結帳頁面中，修改各商品的購買數量
    checkoutBuyNum.forEach((productNum)=>
    {
        productNum.addEventListener("change", function()                        
        {
            updateProductNumToCart(productNum.dataset.productId, Number(productNum.value));      //updateProductNumToCart()函式定義在cart.js中
            presentNav();                           //presentNav()函式定義在navigation.js中。用來產生導覽列 (購物車中某商品的數量修改時，除了購物車內的商品總數量需更新外，導覽列的"購物車內商品數量"也需更新)
            presentCheckoutAmountList();
        })                      // updateProductNumToCart()，()中第一個值指的是商品的id，()中第二個值指的是使用者輸入的商品數量(但因為productNum.value的資料型態是字串，因此要先轉換成"數字"的資料型態)
    })                          // 一開始的value="${item.num}"(上面生成結帳頁面html的設定)，而這邊productNum.value指的是 change事件監聽器後執行的函式，也就是使用者在輸入框修改後的值



    let deleteProduct= document.querySelectorAll(".delete_product");        //在結帳頁面，刪除商品 (也就是將商品從"購物車(cart[])"中刪除
    deleteProduct.forEach(function(deleteProductButton)
    {
        deleteProductButton.addEventListener("click",function()
        {
            deleteProductFromCart(deleteProductButton);           //deleteProductFromCart()函式定義在cart.js中
            console.log(cart);
            
            document.querySelector(`.js-product-row-${deleteProductButton.dataset.productId}`).remove();  //將取得到的li標籤刪除。刪除了li標籤，整個商品的相關資訊因此會被刪除  
            presentNav();                                                                                   //函式定義在navigation.js中
            presentCheckoutAmountList();                                                                    
            })                                                                                             //上面幫html class命名時所寫的: ${cartItem.id}和 這邊所寫的${deleteProductButton.dataset.productId}是相同的值。皆是指向某商品的id。
    })



    function generateDeliveryOptions(productId,deliveryId)    //在結帳頁面中，生成運送方式的HTML  ()中的productId指的是上面在呼叫此函式時，所回傳的cartItem.id(商品id)，而deliveryId指的是item.deliveryId(商品預設的運送方式)
    {
        let deliveryHTML="";
        deliveryOptions.forEach((option)=>                  
        {
            deliveryHTML= deliveryHTML+                     
                        `
                        <div class="delivery_choice">
                            <input
                                ${option.id === deliveryId ? "checked" : ""}       
                                class="delivery_option_button" 
                                type="radio" 
                                name="delivery_option_${productId}"
                                value="${option.id}"
                                data-item-id=${productId}          
                            >
                            <p class="delivery_option_detail">${option.name} $${option.price}</p>
                        </div>`;
        });
        return deliveryHTML;                                    //為了使"門店取貨(id="1")"的運送方式成為預設值，因此以三元運算子做判斷。若option的id等於deliveryId，就在input標籤加上"ckecked"(設為預設);反之，就顯示為空字串("")
                                                                // deliveryId指的是上方在呼叫函式時，所回傳的item.deliveryId。也就是，商品加入購物車時，商品預設的運送方式(門市取貨 id="1")(在cart.js addProductToCart()做的設定)
    }                                                           



    let deliveryOptionButton= document.querySelectorAll(".delivery_option_button");        
    deliveryOptionButton.forEach((deliveryButton)=>                                        
    {
        deliveryButton.addEventListener("click",function()                                  
        {   
            addDeliveryOptionToCart(deliveryButton.dataset.itemId, deliveryButton.value);   
            presentCheckoutAmountList();
        })    // 在上方的input標籤先加上data屬性，這樣就能知道按下的"運送方式"按鈕，指的是哪一件商品的(data-item-id)、選的又是哪一個運送方式(value)
    })        // addDeliveryOptionToCart()函式定義在cart.js中。()中第一個值指的是按下運送方式的該商品id，第二個值指的是選擇的運送方式的id

}