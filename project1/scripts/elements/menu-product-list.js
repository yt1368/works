import {addProductToCart} from "../../data/cart.js";
import {presentNav} from"./navigation.js";

export function generateProductList(products)   //(1)生成商品列、(2)商品加入購物車的事件監聽、(3)商品加入購物車後跳出"成功加入購物車"的訊息
{
    let html="";                                             
    products.forEach( product=>               
    {   
        html=html+
        `
        <li>
            <a href="each-product.html?input=${product.id}">
                <p class="image"><img class="product_img" src="${product.img}" alt="product_image"></p>
                <p class="product_name">${product.name}</p>
            </a>
             ${product.discount ?  "<p class='discount'>" +product.discount+ "折</p>" :""}            
            <p class="discount_price">
                ${product.discountPrice? "$"+product.discountPrice : ""}
            </p>
            <p class="origin_price">
                ${product.originPrice? "$"+product.originPrice : ""}
            </p>
            <p><img class="add_cart" data-product-name=${product.name} data-product-id=${product.id} data-product-price=${product.discountPrice}  src="images/carts.png"></p>
            <div class="add_success_js-${product.id} menu" hidden="hidden">
                <img class="check-icon" src="./images/check.png" alt="成功加入購物車圖示"> 
                <span class="add_success_word">成功加入購物車!</span>
            </div>
        </li>
        `;                                                          //<div class="add_success_js-${product.id}"> 在class標籤加上 js商品id，以辨別是哪一個商品要跳出"成功加入購物車"訊息
    });
    let productList= document.querySelector(".product_list");
    productList.innerHTML= html;


    //商品加入購物車的事件監聽
    let addProduct= document.querySelectorAll(".add_cart");                
    addProduct.forEach((addToCartButton)=>                                 
        {                                
            addToCartButton.addEventListener("click",function(value)    
            {
                let productId = addToCartButton.dataset.productId;
                value.preventDefault();                                 //preventDefault()阻止預設行為(連結到各商品的介紹頁面)
                addProductToCart(productId,1);                            //addProductToCart()定義在cart.js中
                                                                        
                showSuccessAddMessage(productId);                       //showSuccessAddMessage()定義在下方
                presentNav();                                           //presentNav()定義在navigation.js中                                          
            });
        });


    //商品加入購物車，跳出"成功加入購物車"的訊息
    function showSuccessAddMessage(productId)
    {
        let addSuccess = document.querySelector(`.add_success_js-${productId}`);        //取得"add_success_js-${product.id}"的class標籤，但因為不是單純的字串，裡面包含js值，因此使用"模板字串"
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
}
    
//使用者搜尋後，跳轉到搜尋結果頁面(search.html)(生成搜尋結果頁面的程式碼在search.js中)
export function searchResult(){
    let searchButton = document.querySelector(".user_search_img");      
    searchButton.addEventListener("click", function()                       
    {
        let userSearch = document.querySelector(".user_search").value;      //將使用者輸入的內容儲存在userSearch的變數中
        location.href=`search.html?input=${userSearch}`;                   //將網頁連到/search.html?input=${使用者輸入的內容}
    })
}