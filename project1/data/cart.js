//取得儲存在瀏覽器的購物車資料
export let cart= JSON.parse(localStorage.getItem("localStorageCart"));  

//若瀏覽器中沒有資料null(購物車是空的)，那麼將空陣列儲存給cart
if(cart===null)               
{
    cart=[];
};

//將購物車資訊儲存到瀏覽器
export function saveCartInLocalStorage()                             
{
    localStorage.setItem("localStorageCart",JSON.stringify(cart));   
}                                                                    


//將商品加入購物車
export function addProductToCart(productId, buyNum=1)                       
{
    let cartItem;                                                                                                   
    cart.forEach((item)=>                                   //在上方已建立了cart[]，用來裝加入購物車的商品之相關資訊。透過cart.forEach 跑過購物車內所有的商品。
    {   
        if(item.id=== productId)                            //判斷該商品是否已被加到購物車過(item.id指的是購物車中已有的商品的id，productId指的是正被加入購物車的商品的id)
        {                                                   //若為true，表示該商品在購物車中已有
            cartItem= item;                                                             
        };
    });

    if(cartItem)                                            
    {
        cartItem.num += buyNum;                              //若該商品在購物車中已有，就將cartItem.num(原本該商品在購物車中的數量) + buyNum(新加入購物車的該商品數量，若buyNum沒有特別設定=1)
    }
    else                                                    //else指的是cartItem還是undefined的狀態(也就是商品"沒有"被加入購物車過)
    {
        cart.push                                           
        ({                                                          
            id: productId,
            num: buyNum,
            deliveryId: "1"
        });
    };
    saveCartInLocalStorage();
};


//導覽列顯示購物車內商品總數量
export function getCartNum()                                            
{ 
    let cartTotalNum= 0;                                                
    cart.forEach((item)=>                                               
    {
        cartTotalNum += item.num;                                       
    });
    return cartTotalNum;       
};


//結帳頁面中，修改各商品的數量
export function updateProductNumToCart(productId,productNum)            
{                                                                       
    cart.forEach((item)=>
    {                                               
        if(item.id ===productId )                                       
        {
            item.num = productNum;
        }
    })
    saveCartInLocalStorage();                                           
}


//結帳頁面中，刪除商品
export function deleteProductFromCart(deleteProductButton)              
{
    let newCart=[];
    cart.forEach((cartProduct)=>
    {
        if (cartProduct.id !== deleteProductButton.dataset.productId)  
        {
            newCart.push(cartProduct);
        }
        cart= newCart;                                                  
    });
    saveCartInLocalStorage();                                           
};


//儲存各商品的運送方式
export function addDeliveryOptionToCart(itemId, deliveryOptionId)       
{
    cart.forEach((product)=>
    {
        if(product.id === itemId)                                       
        {
            product.deliveryId = deliveryOptionId;                      //將使用者選擇的運送方式儲存在購物車中(預設的運送方式是 自行取貨id="1")
        }
    })
    saveCartInLocalStorage();                                           
}

