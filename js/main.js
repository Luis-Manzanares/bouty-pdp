/**
 * main.js - L'ESSENTIEL PDP
 * Vanilla JS ES6+ - Sin dependencias - Mobile-First
 */

document.addEventListener('DOMContentLoaded', () => {

    const $ = (selector, ctx = document) => ctx.querySelector(selector);
    const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

    const UNIT_PRICE = 450;
    const CURRENCY   = 'USD';

    const formatPrice = (amount) => `$${amount.toFixed(2)} ${CURRENCY}`;

    const colorNames = {
        black: 'Negro Medianoche',
        camel: 'Camel Claro',
        ivory: 'Marfil Crudo',
        slate: 'Gris Pizarra',
    };

    /* ─────────────────────────────────────────────────
       1. HEADER SCROLL SHADOW
    ───────────────────────────────────────────────── */
    const header = $('.site-header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ─────────────────────────────────────────────────
       2. GALERIA INTERACTIVA
    ───────────────────────────────────────────────── */
    const hero      = $('#heroImage');
    const thumbBtns = $$('.thumb-btn');
    const counter   = $('#currentImageNum');
    let currentImageIndex = 0;

    const switchImage = (btn, index) => {
        if (index === currentImageIndex) return;
        hero.classList.add('is-transitioning');
        setTimeout(() => {
            hero.src = btn.dataset.src;
            hero.alt = btn.querySelector('img')?.alt || 'Producto';
            hero.classList.remove('is-transitioning');
        }, 200);
        thumbBtns.forEach(t => t.classList.remove('thumb-btn--active'));
        btn.classList.add('thumb-btn--active');
        if (counter) counter.textContent = index + 1;
        currentImageIndex = index;
    };

    thumbBtns.forEach((btn, i) => {
        btn.addEventListener('click', () => switchImage(btn, i));
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchImage(btn, i); }
        });
    });

    /* ─────────────────────────────────────────────────
       3. CARRITO OFF-CANVAS
    ───────────────────────────────────────────────── */
    const openCartBtn  = $('#openCart');
    const addToCartBtn = $('#addToCart');
    const closeCartBtn = $('#closeCart');
    const cartOverlay  = $('#cartOverlay');
    const cartBadge    = $('#cartBadge');
    const cartDrawer   = $('#cartDrawer');
    let cartCount = 0;

    const openCart = () => {
        document.body.classList.add('cart-open');
        cartDrawer?.setAttribute('aria-hidden', 'false');
        closeCartBtn?.focus();
    };
    const closeCart = () => {
        document.body.classList.remove('cart-open');
        cartDrawer?.setAttribute('aria-hidden', 'true');
        addToCartBtn?.focus();
    };

    openCartBtn?.addEventListener('click', openCart);
    closeCartBtn?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('cart-open')) closeCart();
    });

    const bumpBadge = () => {
        if (!cartBadge) return;
        cartBadge.classList.remove('bump');
        void cartBadge.offsetWidth;
        cartBadge.classList.add('bump');
        cartBadge.addEventListener('transitionend', () => cartBadge.classList.remove('bump'), { once: true });
    };

    const updateBadge = () => {
        if (!cartBadge) return;
        cartBadge.textContent = cartCount;
        cartBadge.classList.toggle('has-items', cartCount > 0);
        bumpBadge();
    };

    /* ─────────────────────────────────────────────────
       4. ANADIR A LA BOLSA - ESTADOS DEL BOTON
    ───────────────────────────────────────────────── */
    addToCartBtn?.addEventListener('click', () => {
        if (addToCartBtn.disabled) return;
        addToCartBtn.classList.add('is-loading');
        addToCartBtn.disabled = true;

        setTimeout(() => {
            addToCartBtn.classList.remove('is-loading');
            addToCartBtn.classList.add('is-success');
            cartCount++;
            updateBadge();
            updateCartTotal();
            syncCartVariant();
            showToast('Artículo añadido a tu bolsa');
            setTimeout(openCart, 500);
            setTimeout(() => {
                addToCartBtn.classList.remove('is-success');
                addToCartBtn.disabled = false;
            }, 2200);
        }, 900);
    });

    /* ─────────────────────────────────────────────────
       5. CONTROL DE CANTIDAD EN CARRITO
    ───────────────────────────────────────────────── */
    const qtyMinus       = $('#qtyMinus');
    const qtyPlus        = $('#qtyPlus');
    const qtyDisplay     = $('#qtyValue');
    const subtotalEl     = $('#cartSubtotal');
    const totalEl        = $('#cartTotal');
    const itemPriceEl    = $('#cartItemPrice');
    const cartItemCountEl = $('#cartItemCount');
    let qtyValue = 1;

    const updateCartTotal = () => {
        const total = UNIT_PRICE * qtyValue;
        if (qtyDisplay)     qtyDisplay.textContent     = qtyValue;
        if (subtotalEl)     subtotalEl.textContent     = formatPrice(total);
        if (totalEl)        totalEl.textContent        = formatPrice(total);
        if (itemPriceEl)    itemPriceEl.textContent    = formatPrice(total);
        if (cartItemCountEl) {
            cartItemCountEl.textContent = qtyValue === 1 ? '1 artículo' : `${qtyValue} artículos`;
        }
    };

    qtyMinus?.addEventListener('click', () => { if (qtyValue > 1)  { qtyValue--; updateCartTotal(); } });
    qtyPlus?.addEventListener('click',  () => { if (qtyValue < 10) { qtyValue++; updateCartTotal(); } });

    /* ─────────────────────────────────────────────────
       6. SINCRONIZACION DE VARIANTES
    ───────────────────────────────────────────────── */
    const cartVariantEl = $('#cartItemVariant');
    const colorNameEl   = $('#colorName');
    const stockNoticeEl = $('#stockNotice');

    const syncCartVariant = () => {
        const selectedSize  = $('input[name="size"]:checked');
        const selectedColor = $('input[name="color"]:checked');
        const sizeLabel  = selectedSize  ? selectedSize.value.toUpperCase() : '-';
        const colorLabel = selectedColor ? (colorNames[selectedColor.value] ?? selectedColor.value) : '-';
        if (cartVariantEl) cartVariantEl.textContent = `Talla: ${sizeLabel} - ${colorLabel}`;
        if (colorNameEl)   colorNameEl.textContent   = colorLabel;
        if (stockNoticeEl && selectedSize) {
            stockNoticeEl.innerHTML = `&#10022; Solo quedan 3 en <strong>Talla ${sizeLabel}</strong>`;
        }
    };

    syncCartVariant();
    $$('input[name="size"], input[name="color"]').forEach(r => r.addEventListener('change', syncCartVariant));

    /* ─────────────────────────────────────────────────
       7. WISHLIST
    ───────────────────────────────────────────────── */
    const wishlistBtn = $('#wishlistBtn');
    let isWishlisted = false;

    wishlistBtn?.addEventListener('click', () => {
        isWishlisted = !isWishlisted;
        wishlistBtn.setAttribute('aria-pressed', isWishlisted.toString());
        showToast(isWishlisted ? 'Añadido a favoritos' : 'Eliminado de favoritos');
    });

    /* ─────────────────────────────────────────────────
       8. TOAST NOTIFICATION
    ───────────────────────────────────────────────── */
    const toastEl = $('#toast');
    let toastTimer = null;

    const showToast = (message) => {
        if (!toastEl) return;
        clearTimeout(toastTimer);
        toastEl.textContent = message;
        toastEl.classList.add('is-visible');
        toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2800);
    };

    /* ─────────────────────────────────────────────────
       9. PROMO CODE
    ───────────────────────────────────────────────── */
    const promoBtn   = $('.promo-btn');
    const promoInput = $('.promo-input');
    const VALID_CODES = ['ESSENTIEL10', 'WELCOME', 'VIP20'];

    promoBtn?.addEventListener('click', () => {
        const code = promoInput?.value.trim().toUpperCase();
        if (!code) { showToast('Ingresa un código promocional'); return; }
        showToast(VALID_CODES.includes(code) ? `Código "${code}" aplicado` : `Código "${code}" no válido`);
    });
    promoInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') promoBtn?.click(); });

});
