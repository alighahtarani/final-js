const request = new XMLHttpRequest();
request.open("GET", "https://fakestoreapi.com/products");
request.send();
request.addEventListener("load", getProducts);

// dom nodes
const root = document.getElementById("root");
const span = document.querySelector("span");
const button = document.querySelectorAll("button");
const input = document.querySelector("#search > input");
let ALL_PRODUCTS = [];
const BASKET = [];

function getProducts() {
  const data = JSON.parse(request.responseText);
  ALL_PRODUCTS = data;
  render(data);
}

function render(list) {
  const template = list.map((item) => {
    return `
            <div class='product'>
                <img src='${item.image}' /> 
                <h3>${item.title}</h3>
                <h5>category: ${item.category}</h5>
                <p>price: ${item.price}$</p>
                ${
                  BASKET.includes(item.id)
                    ? `<button class="added" onclick="handleRemoveFromBasket(${item.id})">Remove From Basket</button>`
                    : `<button onclick="handleAddToBasket(${item.id})">ADD to Cart</button>`
                }
            </div>
        `;
  });
    root.innerHTML = template.join("");
    span.textContent = BASKET.length;
}

function handleAddToBasket(productId) {
  BASKET.push(productId);
  render(ALL_PRODUCTS);
}

function handleRemoveFromBasket(productId) {
  const index = BASKET.indexOf(productId);
  BASKET.splice(index, 1);
  render(ALL_PRODUCTS);
}
input.addEventListener("keyup", handleSearch);
function handleSearch(event) {
  const value = event.target.value;
  const result = ALL_PRODUCTS.filter((product) => {
    return product.title.search(value) >= 0;
  });
  render(result);
}
function hanldelFilter(event){
    const result = ALL_PRODUCTS.filter((product)=>{
        return product.category === event.target.textContent;
    })
    render(result)
}


for (const btn of button) {
    btn.addEventListener("click",hanldelFilter)
}
