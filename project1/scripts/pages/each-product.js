import {presentNav} from"../elements/navigation.js";
import {products} from"../../data/products-list.js";
import {addProductToCart} from"../../data/cart.js";
import {searchResult} from"../elements/menu-product-list.js";

presentNav();               //產生導覽列
 
let params = new URLSearchParams(location.search);              //在menu-product-list.js中，生成總商品列。而各商品能夠連到各自的商品介紹頁面(each-product.html?input=${product.id})
let urlProductId = params.get("input");

let productDetail;
products.forEach((product)=>
{
    if (urlProductId === product.id)
    {
        productDetail= product;
    }
})

let eachProductHTML=
`
<div class="each_product_detail">
    <img class="each_product_img" src="${productDetail.img}" alt="product_image">
    <div class="each_product_information">
        <h1 class="each_name">${productDetail.name}</h1> 
        <div class="each_review_part">
            <span class="each_stars">${productDetail.stars}</span>
            <img class="each_stars-img" src="./images/stars/${productDetail.stars}.png" alt="星星數">
            <span class="each_review">共${productDetail.review}則評論</span>
        </div>
        <div class="each_sell_information">
            <p class="each_sell_num">已售出${productDetail.sellNum}件</p>
            
        </div>
        <div class="each_price_part">
            ${productDetail.originPrice? '<p class="each_origin_price">$' + productDetail.originPrice + '</p>' : ""}
            <p class="each_discount_price"> $${productDetail.discountPrice}</p> &nbsp&nbsp&nbsp
            ${productDetail.discount ? '<p class="each_discount">' + productDetail.discount + '折</p>' : ""}
        </div>
        <div class="each_buy_num_part">
            <p class="each_num">數量
                <select name="each_product_num">
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="6"> 6 </option>
                </select>
            </p>
        </div>
        <button class="each_product_addToCartButton" data-product-name="${productDetail.name}" data-product-id="${productDetail.id}"  data-product-price="${productDetail.discountPrice}">加入購物車</button>
        <div class="add_success" hidden="hidden">
            <img class="check-icon" src="./images/check.png" alt="成功加入購物車圖示"> 
            <span class="add_success_word">成功加入購物車!</span>
        </div>
    </div>
</div>
<div class="each_product_introduction_part">
    <h4 class="each_product_introduction_title">商品簡述</h4>
    <p class="each_product_introduction">${productDetail.introduction}</p>
</div>
    `;
document.querySelector(".each_product_main").innerHTML= eachProductHTML;


//將商品加入購物車
let eachProductButton = document.querySelector(".each_product_addToCartButton");
eachProductButton.addEventListener("click",function()
{
    let eachBuyNum = Number(document.querySelector("select").value);        //取得使用者選擇的數量，但此value值是字串，因此透過Number()，轉成數字型態
    addProductToCart(productDetail.id, eachBuyNum);                         //addProductToCart()定義在cart.js中
    showSuccessAddMessage();                                                //showSuccessAddMessage()定義在下方
    presentNav();                                                           //presentNav()定義在navigation.js中
})

//商品加入購物車後的動畫(跳出"成功加入購物車"的訊息)
function showSuccessAddMessage()
{
    let addSuccess = document.querySelector(".add_success");
    let hideMessage= addSuccess.getAttribute("hidden");             
    if (hideMessage)
    {
        addSuccess.removeAttribute("hidden");                       
        setTimeout(()=>                                             
        {
            addSuccess.setAttribute("hidden","hidden");             
        },1000)
    }
}

searchResult();         //使用者搜尋後，跳轉到搜尋結果頁面
