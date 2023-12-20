document.getElementById('filter').addEventListener('change', function() {
    filterProducts();
});

document.getElementById('search').addEventListener('input', function() {
    filterProducts();
});

document.getElementById('sort').addEventListener('change', function() {
    sortProducts();
});

function filterProducts() {
    var selectedCategory = document.getElementById('filter').value.toLowerCase();
    var searchQuery = document.getElementById('search').value.toLowerCase();
    var products = document.getElementsByClassName('product');

    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var productCategory = product.classList[1].toLowerCase();
        var productName = product.innerText.toLowerCase();

        // Check if the product matches the selected category and search query
        var categoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;
        var searchMatch = productName.includes(searchQuery);

        if (categoryMatch && searchMatch) {
            product.style.display = 'inline-block';
        } else {
            product.style.display = 'none';
        }
    }

    // After filtering, also sort the products
    sortProducts();
}

function sortProducts() {
    var sortType = document.getElementById('sort').value;
    var productsContainer = document.getElementById('products');
    var products = Array.from(productsContainer.getElementsByClassName('product'));

    // Sort products based on the selected sorting option
    switch (sortType) {
        case 'asc':
            products.sort(function(a, b) {
                return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
            });
            break;
        case 'desc':
            products.sort(function(a, b) {
                return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
            });
            break;
        // 'default' case includes the original order
    }

    // Clear and append the sorted products to the container
    productsContainer.innerHTML = '';
    products.forEach(function(product) {
        productsContainer.appendChild(product);
    });
}