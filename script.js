const products = [
{
id:1,
name:"Wireless Headphones",
price:1999,
category:"Electronics",
image:"https://m.media-amazon.com/images/I/31Lxt7TkW2L._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:2,
name:"Smart Watch",
price:2999,
category:"Electronics",
image:"https://m.media-amazon.com/images/I/41gLKCDrOvL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:3,
name:"Gaming Mouse",
price:999,
category:"Gaming",
image:"https://m.media-amazon.com/images/I/31OIQLlojiL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:4,
name:"Bluetooth Speaker",
price:1499,
category:"Electronics",
image:"https://m.media-amazon.com/images/I/41BfRlBG3qL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:5,
name:"Keyboard",
price:1299,
category:"Gaming",
image:"https://m.media-amazon.com/images/I/41jklk8DdCL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:6,
name:"Laptop Stand",
price:899,
category:"Accessories",
image:"https://m.media-amazon.com/images/I/41GPpJmNuAL._SY300_SX300_QL70_FMwebp_.jpg"
}
];

const productContainer = document.getElementById("product-container");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(items){
   productContainer.innerHTML += `
<div class="product">
    <img src="${product.image}" alt="">
    <h3>${product.name}</h3>
    <p class="category">${product.category}</p>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${product.id})">
        Add to Cart
    </button>
</div>
`;
    };
function filterProducts(category){
    if(category === "All"){
        displayProducts(products);
        return;
    }

    const filtered = products.filter(
        product => product.category === category
    );

    displayProducts(filtered);
}
function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const product = products.find(p => p.id === id);

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}
function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>

            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
        </div>
        `;
    });

    totalElement.textContent = total;
    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    localStorage.setItem("cart", JSON.stringify(cart));
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});

displayProducts(products);
updateCart();