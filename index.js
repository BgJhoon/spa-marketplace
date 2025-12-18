const productListEl = document.getElementById('product-list');

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
      <div class="product-info">
      <img src="${product.image}" alt="${product.title}">
    <h4>${product.title}</h4>
    <p>$${product.price.toFixed(2)}</p>
    <button 
      data-id="${product.id}" 
      data-title="${product.title}" 
      data-price="${product.price}" 
      data-image="${product.image}"
    >Add to cart</button>
  </div>
      `;

      productListEl.appendChild(card);
    });

    // Добавление обработчиков кнопок
    document.querySelectorAll('.product-card button').forEach(btn => {
      btn.addEventListener('click', () => {
        const event = new CustomEvent('add-to-cart', {
          detail: {
            id: btn.dataset.id,
            title: btn.dataset.title,
            price: parseFloat(btn.dataset.price),
            image: btn.dataset.image,
          }
        });
        window.dispatchEvent(event);
      });
    });
  });
