document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:8000';

    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // Fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch(`${apiUrl}/products/`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            productList.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.className = 'p-2 border-b border-gray-200 flex justify-between items-center';
                li.innerHTML = `
                    <span>${product.name} (${product.type}) - $${product.price}</span>
                    <div>
                        <button class="bg-blue-500 text-white p-1 rounded add-to-cart" data-id="${product.id}">Agregar al carrito</button>
                        <button class="bg-yellow-500 text-white p-1 rounded mr-2 edit-product" data-id="${product.id}">Editar</button>
                        <button class="bg-red-500 text-white p-1 rounded delete-product" data-id="${product.id}">Eliminar</button>
                    </div>
                `;
                productList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Error fetching products. Please make sure the API server is running.');
        }
    }

    // Fetch and display cart
    async function fetchCart() {
        try {
            const response = await fetch(`${apiUrl}/cart/`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const cart = await response.json();
            cartList.innerHTML = '';
            cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'p-2 border-b border-gray-200 flex justify-between items-center';
                li.innerHTML = `
                    <span>${item.product ? item.product.name : 'Producto'} x ${item.quantity} - $${item.product ? (item.product.price * item.quantity).toFixed(2) : ''}</span>
                    <button class="bg-red-500 text-white p-1 rounded remove-from-cart" data-id="${item.id}">Quitar</button>
                `;
                cartList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
            alert('Error fetching cart.');
        }
    }

    // Create a product
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const type = document.getElementById('product-type').value;
        try {
            await fetch(`${apiUrl}/products/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price: parseFloat(price), type })
            });
            fetchProducts();
            productForm.reset();
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product.');
        }
    });

    // Handle product list clicks for add to cart, edit and delete
    productList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            try {
                await fetch(`${apiUrl}/cart/add`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id: parseInt(productId), quantity: 1 })
                });
                fetchCart();
            } catch (error) {
                alert('Error agregando al carrito.');
            }
        } else if (e.target.classList.contains('delete-product')) {
            const productId = e.target.dataset.id;
            try {
                await fetch(`${apiUrl}/products/${productId}`, { method: 'DELETE' });
                fetchProducts();
                fetchCart();
            } catch (error) {
                alert('Error eliminando producto.');
            }
        }
        // Editar producto: lógica igual que antes si lo deseas conservar
    });

    // Handle cart list clicks for remove
    cartList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const cartItemId = e.target.dataset.id;
            try {
                await fetch(`${apiUrl}/cart/${cartItemId}`, { method: 'DELETE' });
                fetchCart();
            } catch (error) {
                alert('Error quitando del carrito.');
            }
        }
    });

    // Limpiar carrito
    clearCartBtn.addEventListener('click', async () => {
        try {
            await fetch(`${apiUrl}/cart/clear`, { method: 'POST' });
            fetchCart();
        } catch (error) {
            alert('Error limpiando carrito.');
        }
    });

    // Finalizar compra (solo limpia el carrito)
    checkoutBtn.addEventListener('click', async () => {
        try {
            await fetch(`${apiUrl}/cart/clear`, { method: 'POST' });
            fetchCart();
            alert('¡Compra finalizada!');
        } catch (error) {
            alert('Error al finalizar la compra.');
        }
    });

    // Inicial
    fetchProducts();
    fetchCart();
});