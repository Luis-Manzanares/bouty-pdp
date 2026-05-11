import { useState, useEffect } from 'react';
import { Heart, X, Minus, Plus, ShoppingBag, ShieldCheck, Lock, ArrowLeftRight, Search, Menu } from 'lucide-react';
import './index.css';

const IMAGES = [
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1320&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop"
];

const COLORS = [
  { id: 'black', name: 'Negro Medianoche', hex: '#1a1a1a' },
  { id: 'camel', name: 'Camel Claro', hex: '#c4a882' },
  { id: 'ivory', name: 'Marfil Crudo', hex: '#f0ece4', light: true },
  { id: 'slate', name: 'Gris Pizarra', hex: '#6b7280' }
];

const SIZES = [
  { id: 'xxs', name: 'XXS', disabled: false },
  { id: 'xs', name: 'XS', disabled: false },
  { id: 's', name: 'S', disabled: false },
  { id: 'm', name: 'M', disabled: false },
  { id: 'l', name: 'L', disabled: false },
  { id: 'xl', name: 'XL', disabled: true }
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('m');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartQty, setCartQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Efecto para scroll lock al abrir el carrito
  useEffect(() => {
    if (cartOpen) document.body.classList.add('cart-open');
    else document.body.classList.remove('cart-open');
  }, [cartOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setCartCount(prev => prev + 1);
      setCartOpen(true);
    }, 800);
  };

  const currentPrice = 450.00;
  const subtotal = (currentPrice * cartQty).toFixed(2);

  return (
    <>
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          <span>Envío Premium Gratuito</span><span className="marquee-dot">&middot;</span>
          <span>Confección Italiana</span><span className="marquee-dot">&middot;</span>
          <span>Edición Limitada</span><span className="marquee-dot">&middot;</span>
          <span>Devoluciones 30 días</span><span className="marquee-dot">&middot;</span>
          <span>Envío Premium Gratuito</span><span className="marquee-dot">&middot;</span>
          <span>Confección Italiana</span><span className="marquee-dot">&middot;</span>
          <span>Edición Limitada</span><span className="marquee-dot">&middot;</span>
          <span>Devoluciones 30 días</span><span className="marquee-dot">&middot;</span>
        </div>
      </div>

      <header className="site-header">
        <nav className="header-nav header-nav--left">
          <a href="#">Colecciones</a>
          <a href="#">Maison</a>
        </nav>
        <a href="#" className="logo" aria-label="L'ESSENTIEL - Inicio">L'ESSENTIEL</a>
        <nav className="header-nav header-nav--right">
          <a href="#" className="header-link--subtle">Búsqueda</a>
          <button className="cart-trigger" onClick={() => setCartOpen(true)}>
            <span className="cart-label">Bolsa</span>
            <span className={`cart-badge ${cartCount > 0 ? 'has-items' : ''}`}>{cartCount}</span>
          </button>
        </nav>
      </header>

      <nav className="breadcrumb">
        <a href="#">Inicio</a><span aria-hidden="true">/</span>
        <a href="#">Colección Invierno</a><span aria-hidden="true">/</span>
        <span aria-current="page">Abrigo Merino</span>
      </nav>

      <main className="pdp-container">
        <div className="gallery-column">
          <div className="thumbnails-rail" role="list">
            {IMAGES.map((img, idx) => (
              <button 
                key={idx}
                className={`thumb-btn ${selectedImage === idx ? 'thumb-btn--active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt={`Vista ${idx + 1}`} />
              </button>
            ))}
          </div>
          <div className="main-image-wrapper">
            <div className="image-zoom-container">
              <img src={IMAGES[selectedImage]} alt="Abrigo de Lana Merino" id="heroImage" />
            </div>
            <div className="image-counter"><span>{selectedImage + 1}</span> / 4</div>
            <div className="image-badge"><span>Últimas 3 unidades</span></div>
          </div>
        </div>

        <section className="info-column">
          <header className="product-header">
            <div className="product-meta-top">
              <span className="product-collection">Colección Invierno 2026</span>
              <button 
                className="wishlist-btn" 
                aria-pressed={isWishlisted}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} size={20} />
              </button>
            </div>
            <h1 className="product-title">Abrigo de Lana<br /><em>Merino Corte Estructural</em></h1>
            <div className="product-rating">
              <div className="stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span className="star-half">&#9733;</span></div>
              <span className="rating-count">(147 reseñas)</span>
            </div>
            <p className="product-price">
              <span className="price-amount">${currentPrice}<span className="price-decimal">.00</span></span>
              <span className="price-currency">USD</span>
            </p>
          </header>

          <p className="product-description">
            Una pieza atemporal confeccionada en pura lana merino italiana de 18.5 micrones. Diseñada con hombros caídos y una silueta fluida que redefine el minimalismo contemporáneo. El corte estructural moldea sin constreñir.
          </p>

          <div className="selector-group">
            <div className="selector-label-row">
              <span className="selector-title">Color</span>
              <span className="selector-selection">{selectedColor.name}</span>
            </div>
            <div className="radio-wrapper radio-wrapper--colors">
              {COLORS.map(c => (
                <div key={c.id}>
                  <input type="radio" name="color" id={`col-${c.id}`} checked={selectedColor.id === c.id} onChange={() => setSelectedColor(c)} />
                  <label htmlFor={`col-${c.id}`} className={`color-swatch ${c.light ? 'swatch--light' : ''}`} style={{ '--swatch-color': c.hex } as React.CSSProperties}></label>
                </div>
              ))}
            </div>
          </div>

          <div className="selector-group">
            <div className="selector-label-row">
              <span className="selector-title">Talla</span>
              <button className="size-guide-link">Guía de tallas &rarr;</button>
            </div>
            <div className="radio-wrapper radio-wrapper--sizes">
              {SIZES.map(s => (
                <div key={s.id}>
                  <input type="radio" name="size" id={`size-${s.id}`} disabled={s.disabled} checked={selectedSize === s.id} onChange={() => setSelectedSize(s.id)} />
                  <label htmlFor={`size-${s.id}`} className={s.disabled ? 'label-agotada' : ''}>{s.name}</label>
                </div>
              ))}
            </div>
            <p className="stock-notice">&#10022; Solo quedan 3 en <strong>Talla M</strong></p>
          </div>

          <div className="purchase-actions">
            <button className={`btn-add-to-cart ${isAdding ? 'is-loading' : ''}`} onClick={handleAddToCart}>
              <span className="btn-text">Añadir a la Bolsa &mdash; ${currentPrice.toFixed(2)} USD</span>
              <span className="btn-icon"><ShoppingBag size={18} /> Procesando...</span>
              <span className="btn-success">&#10003; Añadido</span>
            </button>
          </div>

          <div className="accordion">
            <details className="accordion-item" open>
              <summary className="accordion-trigger"><span>Detalles del producto</span><span className="accordion-icon"></span></summary>
              <div className="accordion-body">
                <ul className="detail-list">
                  <li>100% Lana Merino Italiana (18.5 micrones)</li>
                  <li>Forro interior en seda natural</li>
                  <li>Costuras reforzadas a mano en Florencia</li>
                  <li>Largo aproximado: 105 cm (talla M)</li>
                  <li>Botones en cuerno natural de búfalo</li>
                </ul>
              </div>
            </details>
            <details className="accordion-item">
              <summary className="accordion-trigger"><span>Envío y devoluciones</span><span className="accordion-icon"></span></summary>
              <div className="accordion-body">
                <ul className="detail-list">
                  <li>Envío express gratuito en 24–48h</li>
                  <li>Embalaje de lujo con caja rígida y bolsa de tela</li>
                  <li>Devoluciones gratuitas en 30 días</li>
                  <li>Atención personalizada vía WhatsApp</li>
                </ul>
              </div>
            </details>
            <details className="accordion-item">
              <summary className="accordion-trigger"><span>Cuidado de la prenda</span><span className="accordion-icon"></span></summary>
              <div className="accordion-body">
                <ul className="detail-list">
                  <li>Lavado a mano en agua fría</li>
                  <li>No usar secadora / No planchar directamente</li>
                  <li>Guardar doblado, nunca colgado</li>
                </ul>
              </div>
            </details>
          </div>

          <div className="trust-badges">
            <div className="trust-item"><ShieldCheck size={22} /><span>Envío Premium<br/>Gratuito</span></div>
            <div className="trust-item"><Lock size={22} /><span>Pago 100%<br/>Seguro</span></div>
            <div className="trust-item"><ArrowLeftRight size={22} /><span>Devolución<br/>30 Días</span></div>
            <div className="trust-item"><ShieldCheck size={22} /><span>Artesanía<br/>Italiana</span></div>
          </div>
        </section>
      </main>

      <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>
      <aside className="cart-drawer">
        <div className="cart-inner">
          <div className="cart-head">
            <div>
              <h2 className="cart-title">Tu Bolsa</h2>
              <p className="cart-subtitle">{cartCount > 0 ? `${cartCount} artículo(s)` : 'Bolsa vacía'}</p>
            </div>
            <button className="close-drawer" onClick={() => setCartOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <div className="cart-body">
            {cartCount > 0 ? (
              <article className="cart-item">
                <div className="cart-item-image"><img src={IMAGES[0]} alt="Abrigo" /></div>
                <div className="cart-item-details">
                  <p className="cart-item-brand">L'ESSENTIEL</p>
                  <p className="cart-item-name">Abrigo Lana Merino</p>
                  <p className="cart-item-variant">Talla: {selectedSize.toUpperCase()} &middot; {selectedColor.name}</p>
                  <div className="cart-item-footer">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => setCartQty(Math.max(1, cartQty - 1))}><Minus size={14}/></button>
                      <span className="qty-value">{cartQty}</span>
                      <button className="qty-btn" onClick={() => setCartQty(cartQty + 1)}><Plus size={14}/></button>
                    </div>
                    <p className="cart-item-price">${currentPrice.toFixed(2)} USD</p>
                  </div>
                </div>
              </article>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--stone)' }}>Tu bolsa está vacía.</p>
            )}
          </div>
          <div className="cart-foot">
            <div className="cart-promo">
              <input type="text" className="promo-input" placeholder="Código promocional" />
              <button className="promo-btn">Aplicar</button>
            </div>
            <div className="cart-totals">
              <div className="total-row"><span>Subtotal</span><span>${subtotal} USD</span></div>
              <div className="total-row total-row--shipping"><span>Envío Express</span><span className="shipping-free">Gratuito</span></div>
              <div className="total-row total-row--total"><span>Total</span><span>${subtotal} USD</span></div>
            </div>
            <button className="btn-checkout">
              <span>Finalizar Compra</span>
              <ShoppingBag size={16} />
            </button>
            <p className="cart-security-note"><Lock size={12} /> Pago seguro con cifrado SSL</p>
          </div>
        </div>
      </aside>

      {toastMessage && <div className="toast is-visible">{toastMessage}</div>}
    </>
  );
}
