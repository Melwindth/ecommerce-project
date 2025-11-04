const products = [
  { id: 1, name: "Smartphone", price: 15000, category: "electronics", image: "https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/v/a/b/-original-imahggexextjawug.jpeg?q=90" },
  { id: 2, name: "Laptop", price: 55000, category: "electronics", image: "https://dlcdnwebimgs.asus.com/gain/B7F82858-38C0-4A42-B751-5DE480B0ABB6" },
  { id: 3, name: "T-Shirt", price: 800, category: "clothing", image: "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726716_1280.jpg" },
  { id: 4, name: "Watch", price: 2500, category: "accessories", image: "https://cdn.nguyenkimmall.com/images/detailed/835/10053739-apple-watch-ultra-lte-49mm-vien-titanium-day-midnight-ocean-band-mqfk3vn-a-1.jpg" },
  { id: 5, name: "Headphones", price: 2000, category: "electronics", image: "https://i5.walmartimages.com/asr/42d10ba1-e6f7-4008-85ec-6e1104a70fa7.1540323d4784b5ba36010be0ad8f51df.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff" },
  { id: 6, name: "Jacket", price: 3000, category: "clothing", image: "https://images.bonanzastatic.com/afu/images/3482/4696/77/s-l1600__32_.jpg" }
];

const productList = document.getElementById('product-list');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartContainer = document.getElementById('cart-container');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

let cart = [];

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    displayCart();
  }
}

function displayCart() {
  if (cart.length === 0) {
    cartContainer.classList.remove('active');
    cartContainer.style.display = "none";
    cartToggleBtn.style.display = "none";
    return;
  }
  cartContainer.style.display = "block";
  cartContainer.classList.add('active');
  cartToggleBtn.style.display = "none";
  
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price} `;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      displayCart();
    };
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
  cartTotal.textContent = "Total: ₹" + total;
}

// Clear Cart functionality
function clearCart() {
  cart = [];
  displayCart();
}

// Filters
function filterCategory(category) {
  if (category === 'all') {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

// Cart toggle button click, show cart
cartToggleBtn.onclick = function() {
  cartContainer.classList.add('active');
  cartToggleBtn.style.display = "none";
  cartContainer.style.display = "block";
};

// Hide cart if clicking outside
document.addEventListener('click', function(e) {
  if (cart.length === 0) return;
  // Ignore if cart or button is clicked
  if (!cartContainer.contains(e.target) && e.target !== cartToggleBtn && !e.target.classList.contains('product') && !e.target.classList.contains('product button')) {
    cartContainer.classList.remove('active');
    cartContainer.style.display = "none";
    cartToggleBtn.style.display = "block";
  }
});

// Always show cart toggle only if cart not active & cart not empty
function handleCartBtn() {
  if (cart.length > 0 && cartContainer.style.display !== "block") {
    cartToggleBtn.style.display = "block";
  }
}

// Observer for cart state change, auto show toggle button when items exist and cart not open
const cartObserver = new MutationObserver(handleCartBtn);
cartObserver.observe(cartList, { childList: true });

displayProducts(products);
window.clearCart = function() {
  cart = [];
  displayCart();
}
window.addEventListener('load', function() {
  document.getElementById('loader-overlay').style.opacity = '0';
  setTimeout(function() {
    document.getElementById('loader-overlay').style.display = 'none';
  }, 700);
});
