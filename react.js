const { useState, useEffect } = React;

function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <span>{item.title} x {item.quantity}</span>
      <span>
        ${ (item.price * item.quantity).toFixed(2) }
        <button onClick={() => onRemove(item.id)}>x</button>
      </span>
    </div>
  );
}

function Cart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Добавление товара через глобальный event
  useEffect(() => {
    function handleAdd(event) {
      const product = event.detail;
      setCart(prev => {
        const exists = prev.find(item => item.id == product.id);
        if (exists) {
          return prev.map(item => item.id == product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });
    }

    window.addEventListener('add-to-cart', handleAdd);
    return () => window.removeEventListener('add-to-cart', handleAdd);
  }, []);

  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id != id));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {cart.length === 0 ? <p>Cart is empty</p> :
        cart.map(item => <CartItem key={item.id} item={item} onRemove={removeItem} />)
      }
      <hr />
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('cart-root')).render(<Cart />);
