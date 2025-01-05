import { baseUrl } from "./baseUrl.js";

async function loadProducts(sectionId, apiUrl) {
    const section = document.querySelector(`#${sectionId} .product-grid`);
    try {
        const response = await fetch(`${baseUrl}`);
        const products = await response.json();

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p>$${product.price}</p>
                <button>Add to Cart</button>
            `;
            section.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load Best Sellers
loadProducts('best-sellers', `${baseUrl}/Best Sellers`);

// Load New Arrivals
loadProducts('new-arrivals', `${baseUrl}/New Arrivals`);
