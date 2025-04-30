const API_URL = 'http://localhost:8080/products';

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        const tableBody = document.getElementById('productTable');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>
                    <td>
                        <button class="edit-btn" onclick="populateForm(${product.id}, '${product.name}', '${product.description}', ${product.quantity}, ${product.price})">Edit</button>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        showMessage('❌ Error loading products.', 'error');
    }
}

async function addProduct() {
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    if (!name || !description || quantity === '' || price === '') {
        showMessage('⚠️ Please fill all fields.', 'error');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, description, quantity, price })
        });

        if (response.ok) {
            showMessage('✅ Product added successfully!', 'success');
            clearForm();
            fetchProducts();
        } else {
            showMessage('❌ Failed to add product.', 'error');
        }
    } catch (error) {
        showMessage('❌ Error adding product.', 'error');
    }
}

let selectedProductId = null;

function populateForm(id, name, description, quantity, price) {
    selectedProductId = id;
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('quantity').value = quantity;
    document.getElementById('price').value = price;
}

async function updateProduct() {
    if (!selectedProductId) {
        showMessage('⚠️ Select a product to update.', 'error');
        return;
    }

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    if (!name || !description || quantity === '' || price === '') {
        showMessage('⚠️ Please fill all fields.', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${selectedProductId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, description, quantity, price })
        });

        if (response.ok) {
            showMessage('✅ Product updated successfully!', 'success');
            clearForm();
            selectedProductId = null;
            fetchProducts();
        } else {
            showMessage('❌ Failed to update product.', 'error');
        }
    } catch (error) {
        showMessage('❌ Error updating product.', 'error');
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showMessage('✅ Product deleted successfully!', 'success');
            fetchProducts();
        } else {
            showMessage('❌ Failed to delete product.', 'error');
        }
    } catch (error) {
        showMessage('❌ Error deleting product.', 'error');
    }
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
}

// Initial Load
fetchProducts();

// Button Listeners
document.getElementById('addProductBtn').addEventListener('click', addProduct);
document.getElementById('updateBtn').addEventListener('click', updateProduct);

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.replace("login.html");
}

let chartInstance = null;

function generateAnalytics() {
    fetch(API_URL)
        .then(res => res.json())
        .then(products => {
            const lowStock = products.filter(p => p.quantity < 10);
            alert(`Low Stock Items:\n${lowStock.map(p => `${p.name} (Qty: ${p.quantity})`).join('\n')}`);

            const labels = products.map(p => p.name);
            const data = products.map(p => p.quantity);

            // Show the container
            const container = document.getElementById("analyticsContainer");
            container.style.display = "block";

            // Get canvas context
            const ctx = document.getElementById("analyticsChart").getContext("2d");

            // Destroy previous chart if it exists
            if (window.analyticsChartInstance) {
                window.analyticsChartInstance.destroy();
            }

            // Create new chart
            window.analyticsChartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels,
                    datasets: [{
                        label: 'Product Quantity',
                        data,
                        backgroundColor: labels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
}


function showMessage(message, isError = false) {
    const responseDiv = document.getElementById("responseMessage");
    responseDiv.textContent = message;
    responseDiv.style.color = isError ? "red" : "green";
    setTimeout(() => {
        responseDiv.textContent = '';
    }, 3000);
}

function hideChart() {
    document.getElementById("analyticsContainer").style.display = "none";
}
