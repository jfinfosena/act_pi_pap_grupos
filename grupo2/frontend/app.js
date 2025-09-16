document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:8000';

    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const reviewForm = document.getElementById('review-form');
    const reviewList = document.getElementById('review-list');
    const reviewUserSelect = document.getElementById('review-user');
    const reviewProductSelect = document.getElementById('review-product');

    const modal = document.getElementById('edit-modal');
    const editProductId = document.getElementById('edit-product-id');
    const editProductName = document.getElementById('edit-product-name');
    const editProductPrice = document.getElementById('edit-product-price');

    // Fetch and display users
    async function fetchUsers() {
        try {
            const response = await fetch(`${apiUrl}/users/`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            userList.innerHTML = '';
            reviewUserSelect.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                li.className = 'p-2 border-b border-gray-200';
                userList.appendChild(li);

                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                reviewUserSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Error fetching users. Please make sure the API server is running.');
        }
    }

    // Fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch(`${apiUrl}/products/`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            productList.innerHTML = '';
            reviewProductSelect.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.className = 'p-2 border-b border-gray-200 flex justify-between items-center';
                li.innerHTML = `
                    <span>${product.name} - $${product.price}</span>
                    <div>
                        <button class="bg-yellow-500 text-white p-1 rounded mr-2 edit-product" data-id="${product.id}">Edit</button>
                        <button class="bg-red-500 text-white p-1 rounded delete-product" data-id="${product.id}">Delete</button>
                    </div>
                `;
                productList.appendChild(li);

                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                reviewProductSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Error fetching products. Please make sure the API server is running.');
        }
    }

    // Fetch and display reviews
    async function fetchReviews() {
        try {
            const response = await fetch(`${apiUrl}/reviews/`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const reviews = await response.json();
            reviewList.innerHTML = '';
            reviews.forEach(review => {
                const li = document.createElement('li');
                li.className = 'p-2 border-b border-gray-200';
                li.textContent = `User ${review.user_id} rated Product ${review.product_id} with ${review.rating}: ${review.comment}`;
                reviewList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching reviews:', error);
            alert('Error fetching reviews. Please make sure the API server is running.');
        }
    }

    // Create a user
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        try {
            await fetch(`${apiUrl}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });
            fetchUsers();
            userForm.reset();
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user. Please make sure the API server is running.');
        }
    });

    // Create a product
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        try {
            await fetch(`${apiUrl}/products/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price: parseFloat(price) })
            });
            fetchProducts();
            productForm.reset();
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product. Please make sure the API server is running.');
        }
    });

    // Create a review
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user_id = document.getElementById('review-user').value;
        const product_id = document.getElementById('review-product').value;
        const rating = document.getElementById('review-rating').value;
        const comment = document.getElementById('review-comment').value;
        try {
            await fetch(`${apiUrl}/reviews/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: parseInt(user_id), product_id: parseInt(product_id), rating: parseInt(rating), comment })
            });
            fetchReviews();
            reviewForm.reset();
        } catch (error) {
            console.error('Error creating review:', error);
            alert('Error creating review. Please make sure the API server is running.');
        }
    });

    // Handle product list clicks for edit and delete
    productList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-product')) {
            const productId = e.target.dataset.id;
            try {
                await fetch(`${apiUrl}/products/${productId}`, { method: 'DELETE' });
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product. Please make sure the API server is running.');
            }
        } else if (e.target.classList.contains('edit-product')) {
            const productId = e.target.dataset.id;
            try {
                const response = await fetch(`${apiUrl}/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const product = await response.json();
                openEditModal(product);
            } catch (error) {
                console.error('Error fetching product details:', error);
                alert('Error fetching product details. Please make sure the API server is running.');
            }
        }
    });

    function openEditModal(product) {
        editProductId.value = product.id;
        editProductName.value = product.name;
        editProductPrice.value = product.price;
        modal.classList.remove('hidden');
    }

    document.getElementById('cancel-edit').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    document.getElementById('save-edit').addEventListener('click', async () => {
        const productId = editProductId.value;
        const name = editProductName.value;
        const price = editProductPrice.value;
        try {
            await fetch(`${apiUrl}/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price: parseFloat(price) })
            });
            fetchProducts();
            modal.classList.add('hidden');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product. Please make sure the API server is running.');
        }
    });

    // Initial fetch
    fetchUsers();
    fetchProducts();
    fetchReviews();
});