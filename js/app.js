
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
     fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product m-2" style = "height : 650px;" >
      <div>
    <img class="img-fluid product-image" src=${image}></img>
      </div>
      <h3 class="text">${product.title.slice(0,65)}</h3>
      <p class="text">Category: ${product.category}</p>
      <h4 class="text">Rating: <span>${product.rating.rate}</span></h4>     
      <h6 class="text">(Rated By <span>${product.rating.count}</span> People)</h6>
      <h2 class="text">Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-dark">add to cart</button>
      <button onclick="loadDetails('${product.id}')" id="details-btn" class="btn btn-info">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  document.getElementById('details').textContent = '';
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};
//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
// fetching single product details
const loadDetails = id =>{
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then((res) => res.json())
  .then((data) => showDetails(data));
};
// showing details on top
const showDetails = data =>{
  document.getElementById('details').textContent = '';
 const div = document.createElement("div");
 div.innerHTML=`<div class=" mx-auto card mb-3 shadow cart-2" style="max-width: 740px; background-color: lightcyan;">
 <div class="row g-0">
   <div class="col-md-4">
     <img src="${data.image}" class="img-fluid rounded-start" alt="...">
   </div>
   <div class="col-md-8">
     <div class="card-body">
       <h5 class="card-title">${data.title}</h5>
       <p class="card-text">${data.description.slice(0,400)}</p>
       <p class="card-text"><small class="text-muted">Rating: ${data.rating.rate}</small></p>
     </div>
   </div>
 </div>
</div>`;
 document.getElementById("details").appendChild(div);
};

const buyNow = () => {
  const res = prompt("Please Enter Your Credit Card Number");

  if (res) {
    return window.location.assign("./success.html");
  }
};