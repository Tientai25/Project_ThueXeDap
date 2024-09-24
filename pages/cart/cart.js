let container = document.querySelector('.container');
let cartContainer = document.querySelector('.cart-container');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const renderCartItem = async () => {
    const response = await fetch('../../data.json');

    const data = await response.json();

    if (cart.length !== 0) {

        reutrn(cartContainer.innerHTML = cart.map(itemCart => {
            let search = data.find(itemData => itemData.id === itemCart.id) || [];
            return ` 
            <div class="cart-part">
                <div class="cart-image">
                    <img src="../../${search.img}" alt="${search.title}">
                </div>
                <div class="cart-desc">
                    <h3> ${search.title} </h3>
                </div>
                <div class="cart-quantity">
                    <input type="number" id="quantity" min="0">
                </div>
                <div class="cart-price">
                    <h4>${search.price}</h4>
                </div>
                <div class="cart-total">
                    <h4>${search.price * itemCart.count}</h4>
                </div>
                <div class="cart-remove">
                    <button>remove</button>
                </div>
            </div>
            `;
        }).join("")
        )
    } else {
        return container.innerHTML = `
    <div class="cart-empty">
        <h2>cart is empty</h2>
        <a href="../../index.html">
            <button class="HomeBtn">quay ve TRang chu</button>
        </a>
    </div>

        `
    }
}
renderCartItem();