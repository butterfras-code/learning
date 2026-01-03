// imports
import { menuArray as menuItems } from "./data.js";

// DOM elements
const menuSection = document.getElementById("menu-section");
const orderSection = document.getElementById
    ("order-section");
const completeOrderButton = document.getElementById("complete-order-button");
const paymentModal = document.getElementById("payment-modal");



//Global variables
let cart = []; //refactor to be array of indices with quantity
// let cart = [
//     {itemID: 0, quantity: 2},
//     {itemID: 1, quantity: 1}

//event listeners
document.addEventListener("click", function (e) {
    if (e.target.dataset.itemId) {
        console.log("adding to cart");
        addToCart(parseInt(e.target.dataset.itemId));
    } else if (e.target.dataset.removeId) {
        console.log("removing from cart");
        removeFromCart(parseInt(e.target.dataset.removeId));
    } else if (e.target.id === "complete-order-button") {
        console.log("completing order");
        completeOrder();
    }
    renderOrder();
});
// functions

renderPage();

function renderPage() {
    renderMenu()
    // renderOrder()
}

function renderMenu() {
    let menuHTML = "";
    menuItems.forEach(function (item) {

        menuHTML += `
        <li class="menu-item">
            <div class="menu-item-emoji">
                <h2>${item.emoji}</h2>
            </div>
            <div class="menu-item-details">
                <h2>${item.name}</h2>
                <p>Ingredients: ${item.ingredients.join(", ")}</p>
                <p>Price: $${item.price}</p>
            </div>
            <div class="menu-item-add">
                <button class="add-button" data-item-id="${item.id}">+</button>
            </div>
        </li>
        `;
    });
    menuSection.innerHTML = menuHTML;


}
function addToCart(itemID) {

    const itemtoAdd = menuItems.find(function (item) {
        return item.id === itemID
    });
    cart.push(itemtoAdd)

}
function removeFromCart(itemID) {
    const index = cart.findIndex(function (item) { return item.id === itemID });
    if (index > -1) {
        cart.splice(index, 1);
    }
    renderOrder();
}

function renderOrder() {
    console.log(cart);
    let orderTotal = 0;
    cart.forEach(function (item) {
        orderTotal += item.price;
    });
    let orderHTML = "";
    cart.forEach(function(item) {
        orderHTML += `
        <li class="order-item">
            <div class="order-item-name">${item.name}</div>
            <button class="remove-button" data-remove-id="${item.id}">Remove</button>
            <div class="order-item-price">$${item.price}</div>
        </li>
        `;
    });
    orderHTML += `<ul class="order-total">
        <li>Total price:</li>
        <li>$${orderTotal}</li>
    </ul>
    <button id="complete-order-button">Complete order</button>
    
    `
    orderSection.innerHTML = orderHTML; 
}

function completeOrder() {
    renderPaymentModal();
}

function renderPaymentModal() {
    const modalHTML = `
    <div class="modal-cover">
        <div class="modal-content">
            <h2>Enter card details</h2>
            <form id="payment-form">
                <div>
                    <label for="card-name"></label>
                    <input type="text" id="card-name" required placeholder="Enter your name"/>
                </div>
                <div>
                    <label for="card-number"></label>
                    <input type="text" id="card-number" required placeholder="Enter card number"/>
                </div>
                <div>
                    <label for="card-CVV"></label>
                    <input type="text" id="card-CVV" required placeholder="Enter CVV"/>
            </form>
        </div>
    </div>
    `;
    paymentModal.classList.toggle("display");
    paymentModal.innerHTML = modalHTML;
}
