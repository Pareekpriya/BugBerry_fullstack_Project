import {baseUrl} from "./baseUrl.js";

document.addEventListener("DOMContentLoaded", () => {
    const perfumeContainer = document.getElementById("perfume-container");

    if (!perfumeContainer) {
        console.error("Error: 'perfume-container' element not found.");
        return;
    }

    // Extract product data from the HTML
    const products = Array.from(perfumeContainer.querySelectorAll(".product")).map((productDiv) => {
        const img = productDiv.querySelector("img");
        const name = productDiv.querySelector("p:first-of-type").textContent.trim();
        const price = parseFloat(productDiv.querySelector("p:nth-of-type(2)").textContent.replace("$", "").trim());
        return {
            name,
            image: img.src,
            price,
        };
    });

    // Send product data to the backend to populate the perfumes array
    async function populateBackendPerfumes() {
        try {
            const response = await fetch(`${baseUrl}/perfumes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(products),
            });

            if (response.ok) {
                console.log("Perfumes successfully added to the backend.");
            } else {
                console.error("Failed to add perfumes to the backend.");
            }
        } catch (error) {
            console.error("Error while adding perfumes to the backend:", error);
        }
    }

    // Call the function to populate perfumes in the backend
    populateBackendPerfumes();

    // Add event listeners to "Add to Cart" buttons
    perfumeContainer.querySelectorAll(".product button").forEach((button, index) => {
        button.addEventListener("click", async () => {
            const product = products[index];
            await addToCart(product);
        });
    });

    // Add to Cart functionality
    async function addToCart(product) {
        try {
            const response = await fetch(`${baseUrl}/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                alert(`${product.name} added to the cart!`);
            } else {
                alert("Failed to add product to the cart.");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("An error occurred while adding the product to the cart.");
        }
    }
});
