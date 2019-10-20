var removeCartItemButtons = document.getElementsByClassName('btn-danger');
// Looping through all of the different buttons in the cart
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem); // When clicked, it calls the "removeCartItem" function
}

// Looping through all of the quantity inputs in the cart
var quantityInputs = document.getElementsByClassName('cart-quantity-input');
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged); // When the quantity input changes, it calls "quantityChanged" function
}

// Looping through the buttons for adding to cart
var addToCartButtons = document.getElementsByClassName('shop-item-button');
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
}

// Ensures that the entered number for quantity is an integer with the value of 1 or greater
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0 || input.value % 1 != 0) {
        input.value = 1;
    }
    updateCartSubtotal();
}

// When the button is clicked, it removes the whole row of items from the cart, and updates the cart subtotal
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartSubtotal();
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
// When the 'purchase button is pressed', it removes all the items from the cart, and resets the subtotal
function purchaseClicked() {
    alert('Thank you for purchasing the item(s). Have a great day!');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartSubtotal();
}

// Adds the title, price and the image of the selected item to the cart, and updates the subtotal
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartSubtotal();
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) { // To prevent repetition of the items in different cart rows
        if (cartItemNames[i].innerText == title) {
            alert('This item has already been added to the cart.');
            return // Stops the execution of the function
        }
    }

    // Generating the cart row by taking the HTML directly from the 'Shop' page
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow); // Adds the cartRow to very end of CartItems -- that is, the newly selected item is under the all others items in the cart
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

// Goes through every single row in the cart, to find the price and multiply that value by the quantity. The function then adds the value for every single row, to then display the subtotal, tax, and total at the bottom of the screen.
function updateCartSubtotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var subtotal = 0;
    var tax = 0;
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        subtotal += price * quantity;
        tax += 0.13 * subtotal; // Assuming the tax is 13% of the original price
        total = subtotal + tax;
    }
    document.getElementsByClassName('cart-subtotal-price')[0].innerText = '$' + subtotal.toFixed(2); // Rounding the values to two decimal places to 2 decimal places.
    document.getElementsByClassName('cart-tax-price')[0].innerText = '$' + tax.toFixed(2);
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2);
}

// End of cart.js