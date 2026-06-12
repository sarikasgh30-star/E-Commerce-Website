const products = [
{
id:1,
name:"Wireless Headphones",
price:1999,
image:"https://m.media-amazon.com/images/I/31Lxt7TkW2L._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:2,
name:"Smart Watch",
price:2999,
image:"https://m.media-amazon.com/images/I/41gLKCDrOvL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:3,
name:"Gaming Mouse",
price:999,
image:"https://m.media-amazon.com/images/I/31OIQLlojiL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:4,
name:"Bluetooth Speaker",
price:1499,
image:"https://m.media-amazon.com/images/I/41BfRlBG3qL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:5,
name:"Keyboard",
price:1299,
image:"https://m.media-amazon.com/images/I/41jklk8DdCL._SY300_SX300_QL70_FMwebp_.jpg"
},
{
id:6,
name:"Laptop Stand",
price:899,
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
    productContainer.innerHTML = "";

    items.forEach(product => {
        productContainer.innerHTML += `
        <div class="product">
            <img src="${product.image}" alt="">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
        `;
    });
}

function addToCart(id){
    const item = products.find(p => p.id === id);
    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

function updateCart(){
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price;

        cartItems.innerHTML += `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        </div>
        `;
    });

    totalElement.textContent = total;
    cartCount.textContent = cart.length;
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