import {getCartNum} from"../../data/cart.js";

export function presentNav()        //生成導覽列。   下方透過呼叫getCartNum()，顯示目前購物車中的商品數量
{
    let navHTML=                        
    `
        <li class="home"> <a href="home.html"> <img class="nav_logo_img" src="images/logo.png" alt="logo圖片"> </a></li>
        <li class="menu"> <a href="menu.html"> Menu </a></li>
        <li class="concept"><a href="concept.html"> Concept </a></li>
        <li class="info"><a href="info.html"> Info </a></li>
        <li class="user_search_part">
            <p class="user_search_p">
                <input type="text" class="user_search" name="user_search">
                <img class="user_search_img" src="images/search.png" alt="搜尋圖片">
            </p>
        </li>
        <li class="nav_total_cart"><a href="checkout.html">
            <img class="total_cart" src="images/carts.png" alt="購物車圖片"> 
            <span class="cart_num">${getCartNum()}</span>
        </a></li>
    `;

    let phoneNavHTML=
    `
        <ul class="phone_top_nav">
            <p class="logo">
                <a href="home.html">
                <img class="logo_img" src="images/logo.png" alt="logo圖片">
                </a>
            </p>
            
            <li class="user_search_part">
                <p class="user_search_p">
                    <input type="text" class="user_search" name="user_search">
                    <img class="user_search_img" src="images/search.png" alt="搜尋圖片">
                </p>
            </li>
            <li class="nav_total_cart"><a href="checkout.html">
                <img class="total_cart" src="images/carts.png" alt="購物車圖片"> 
                <span class="cart_num">${getCartNum()}</span>
            </a></li>  
            <label for="side_nav_controller" class="side_nav_button">
                <span>選單</span>
            </label>
        </ul>
        <input type="checkbox" name="checkbox" id="side_nav_controller">
        <ul class="phone_side_nav">
            <a href="home.html"><li class="home">  Home </li></a>
            <a href="menu.html"><li class="menu">  Menu </li></a>
            <a href="concept.html"><li class="concept"> Concept </li></a>
            <a href="info.html"><li class="info"> Info </li></a>
        </ul>
    `;

    document.querySelector(".navigation_list").innerHTML = navHTML;
    document.querySelector(".phone_navigation_list").innerHTML = phoneNavHTML;
}