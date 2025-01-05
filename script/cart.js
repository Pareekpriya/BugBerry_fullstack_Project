import { baseUrl } from "./baseUrl.js";

// Check which page is currently loaded
if (document.body.id === "index-page") {
    const cartButton = document.getElementById("cart-button");

    // Add items to cart
    document.querySelectorAll(".product button").forEach((button) => {
        button.addEventListener("click", async (e) => {
            const productElement = e.target.closest(".product");
            const name = productElement.querySelector("p:nth-child(2)").textContent;
            const price = parseFloat(
                productElement.querySelector("p:nth-child(3)").textContent.replace("$", "")
            );
            const image = productElement.querySelector("img").src;

            const product = { id: Date.now(), name, price, image };

            try {
                const response = await fetch(`${baseUrl}/cart`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product),
                });

                if (response.ok) {
                    alert(`${name} added to the cart!`);
                } else {
                    alert("Failed to add product to the cart.");
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
                alert("An error occurred while adding the product to the cart.");
            }
        });
    });

    cartButton.addEventListener("click", () => {
        window.location.href = "cart.html";
    });
} else if (document.body.id === "cart-page") {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    async function fetchCartItems() {
        try {
            const response = await fetch(`${baseUrl}/cart`);
            if (!response.ok) throw new Error("Failed to fetch cart items");
    
            const cart = await response.json();
            console.log("Fetched cart items:", cart);
            renderCart(cart); 
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    }
    
    function renderCart(cart) {
        cartItems.innerHTML = ""; 
        let totalPrice = 0;
    
        const validCartItems = cart.filter((item) => {
            const isValid = item.name && item.price && item.image;
            if (!isValid) console.log("Invalid cart item:", item);
            return isValid;
        });
    
        if (validCartItems.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty!</p>";
            totalPriceElement.textContent = "Total: $0.00";
            return;
        }
    
        validCartItems.forEach((item) => {
            totalPrice += parseFloat(item.price) || 0;
    
            const li = document.createElement("li");
            li.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <button data-id="${item.id}" class="remove-button">Remove</button>
                </div>
            `;
            cartItems.appendChild(li);
        });
    
        console.log("Total price:", totalPrice); 
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
    
    

    cartItems.addEventListener("click", async (e) => {
        if (e.target.classList.contains("remove-button")) {
            const itemId = e.target.dataset.id;

            try {
                const response = await fetch(`${baseUrl}/cart/${itemId}`, { method: "DELETE" });
                if (response.ok) {
                    fetchCartItems();
                } else {
                    alert("Failed to remove item from the cart.");
                }
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    });

    fetchCartItems();
}
