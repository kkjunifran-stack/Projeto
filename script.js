// =============================================================================
// KKJ DELIVERY — script.js — Versão Completa e Funcional
// =============================================================================

// --- DATA MOCKS ---
const mockCategories = [
    { id: 1, name: 'Lanches', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Pizzas', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop' },
    { id: 3, name: 'Japonesa', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=200&auto=format&fit=crop' },
    { id: 4, name: 'Brasileira', img: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?q=80&w=200&auto=format&fit=crop' },
    { id: 5, name: 'Doces', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200&auto=format&fit=crop' },
    { id: 6, name: 'Saudável', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop' }
];

const mockRestaurants = [
    { id: 101, name: 'Burger Queen', category: 'Lanches', rating: 4.8, time: '30-40 min', fee: 'Grátis', dist: '1.2 km', img: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=500&auto=format&fit=crop' },
    { id: 102, name: 'Pizza Nostra', category: 'Pizzas', rating: 4.9, time: '40-55 min', fee: 'R$ 5,00', dist: '2.5 km', img: 'https://images.unsplash.com/photo-1604381536171-8eb784ff0d64?q=80&w=500&auto=format&fit=crop' },
    { id: 103, name: 'Sushi House', category: 'Japonesa', rating: 4.7, time: '35-50 min', fee: 'R$ 8,00', dist: '3.1 km', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=500&auto=format&fit=crop' }
];

let mockProducts = JSON.parse(localStorage.getItem('kkj_products')) || [
    { id: 201, name: 'X-Bacon Premium', desc: 'Pão brioche, blend 180g, duplo bacon, queijo cheddar e molho especial.', price: 35.90, rating: 4.9, time: '30 min', category: 'Lanches', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500&auto=format&fit=crop' },
    { id: 202, name: 'Pizza Margherita', desc: 'Massa artesanal, molho de tomate fresco, mussarela de búfala e manjericão.', price: 55.00, rating: 4.8, time: '45 min', category: 'Pizzas', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop' },
    { id: 203, name: 'Combo Sushi 30 Peças', desc: 'Seleção especial do chef com salmão, atum, peixe branco e rolls variados.', price: 89.90, rating: 4.9, time: '50 min', category: 'Japonesa', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=500&auto=format&fit=crop' },
    { id: 204, name: 'Açaí Tradicional 500ml', desc: 'Açaí puro com granola, banana, leite condensado e morango fresco.', price: 22.50, rating: 4.7, time: '20 min', category: 'Doces', img: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=500&auto=format&fit=crop' },
    { id: 205, name: 'Suco de Laranja Natural', desc: 'Suco 100% natural, sem açúcar adicionado. Copo de 500ml geladinho.', price: 12.00, rating: 4.8, time: '10 min', category: 'Sucos', img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=500&auto=format&fit=crop' }
];

const mockCourierOrders = [
    { id: 301, rest: 'Burger Queen', dist: '50m', dest: 'Rua das Flores, 123 — Condomínio Flores', status: 'Pronto para retirar', statusClass: 'status-ready', valor: 'R$ 8,00' },
    { id: 302, rest: 'Sushi House', dist: '120m', dest: 'Av. Paulista, 900 — Apto 42', status: 'Em preparo', statusClass: 'status-prep', valor: 'R$ 12,00' },
    { id: 303, rest: 'Pizza Nostra', dist: '145m', dest: 'Rua Augusta, 1500', status: 'Finalizando', statusClass: 'status-finishing', valor: 'R$ 9,50' }
];

// --- RESPOSTAS AUTOMÁTICAS DO CLIENTE ---
const clienteRespostas = [
    'Tá bom, obrigado pela atenção! 😊',
    'Certo! Aguardo o pedido então.',
    'Ok, pode confirmar o endereço? É Rua das Flores, 123.',
    'Quanto tempo ainda vai demorar?',
    'Tudo bem, entendido! 👍',
    'Perfeito! Estou aguardando.',
    'Ótimo, muito obrigado!'
];

// --- STATE MANAGEMENT ---
let state = {
    cart: JSON.parse(localStorage.getItem('kkj_cart')) || [],
    favorites: JSON.parse(localStorage.getItem('kkj_favorites')) || [],
    theme: localStorage.getItem('kkj_theme') || 'light',
    user: JSON.parse(localStorage.getItem('kkj_user')) || null,
    location: localStorage.getItem('kkj_location') || 'Av. Paulista, 1000 - São Paulo, SP',
    isLoading: true,
    authMode: 'login',
    authRole: 'buyer',
    salesReport: JSON.parse(localStorage.getItem('kkj_sales')) || [],
    courierConfig: JSON.parse(localStorage.getItem('kkj_courier_config')) || {},
    orders: JSON.parse(localStorage.getItem('kkj_orders')) || [],
    restChatTimer: null,
    restChatTimeLeft: 3600,
    salesChart: null,
    ganhosChart: null,
    buyerCards: JSON.parse(localStorage.getItem('kkj_buyer_cards')) || [],
    buyerAddresses: JSON.parse(localStorage.getItem('kkj_buyer_addresses')) || [],
    activeCoupon: JSON.parse(localStorage.getItem('kkj_active_coupon')) || null,
    activeChatChannel: 'rest',
    activeOrderProgressInterval: null,
    activeOrderProgressStep: 0
};

// --- DOM ELEMENTS ---
let elements = {};

function initElements() {
    elements = {
        loader: document.getElementById('initial-loader'),
        themeToggle: document.getElementById('theme-toggle'),
        html: document.documentElement,
        categoriesContainer: document.getElementById('categories-container'),
        restaurantsContainer: document.getElementById('restaurants-container'),
        productsContainer: document.getElementById('products-container'),
        cartDrawer: document.getElementById('cart-drawer'),
        cartOverlay: document.getElementById('cart-overlay'),
        profileDrawer: document.getElementById('profile-drawer'),
        profileOverlay: document.getElementById('profile-overlay'),
        cartToggle: document.getElementById('cart-toggle'),
        profileToggle: document.getElementById('profile-toggle'),
        closeCart: document.getElementById('close-cart'),
        closeProfile: document.getElementById('close-profile'),
        cartItemsContainer: document.getElementById('cart-items-container'),
        cartTotal: document.getElementById('cart-total'),
        cartCount: document.getElementById('cart-count'),
        toastContainer: document.getElementById('toast-container'),
        searchInput: document.getElementById('search-input'),
        checkoutBtn: document.getElementById('checkout-btn'),
        paymentMethod: document.getElementById('payment-method'),
        addressDisplay: document.getElementById('address-display'),
        modalOverlay: document.getElementById('modal-overlay'),
        locationModal: document.getElementById('location-modal'),
        authModal: document.getElementById('auth-modal'),
        paymentModal: document.getElementById('payment-modal'),
        paymentBody: document.getElementById('payment-body'),
        paymentTitle: document.getElementById('payment-title'),
        addDishModal: document.getElementById('add-dish-modal'),
        dishModalTitle: document.getElementById('dish-modal-title'),
        dishImageInput: document.getElementById('dish-image-input'),
        dishImagePreview: document.getElementById('dish-image-preview'),
        dishImagePlaceholder: document.getElementById('dish-image-placeholder'),
        dashboardModal: document.getElementById('dashboard-modal'),
        dashboardDishesList: document.getElementById('dashboard-dishes-list'),
        productDetailsModal: document.getElementById('product-details-modal'),
        dishName: document.getElementById('dish-name'),
        dishCategory: document.getElementById('dish-category'),
        dishDesc: document.getElementById('dish-desc'),
        dishPrice: document.getElementById('dish-price'),
        locationInput: document.getElementById('location-input'),
        authTitle: document.getElementById('auth-title'),
        registerFields: document.getElementById('register-fields'),
        tabLogin: document.getElementById('tab-login'),
        tabRegister: document.getElementById('tab-register'),
        roleBuyer: document.getElementById('role-buyer'),
        roleSeller: document.getElementById('role-seller'),
        roleCourier: document.getElementById('role-courier'),
        authSubmitBtn: document.getElementById('auth-submit-btn'),
        courierModal: document.getElementById('courier-modal'),
        favoritesModal: document.getElementById('favorites-modal'),
        authName: document.getElementById('auth-name'),
        authEmail: document.getElementById('auth-email'),
        authPassword: document.getElementById('auth-password'),
        profileUser: document.querySelector('.profile-user'),
        profileMenu: document.querySelector('.profile-menu'),
        passwordStrength: document.getElementById('password-strength')
    };
}

// =============================================================================
// INITIALIZATION
// =============================================================================
function init() {
    try {
        initElements();
        applyTheme(state.theme);
        if (elements.addressDisplay) {
            elements.addressDisplay.textContent = state.location;
        }
        updateProfileUI();
        setupEventListeners();

        // Simulate Loading
        setTimeout(() => {
            elements.loader.style.opacity = '0';
            setTimeout(() => {
                elements.loader.style.visibility = 'hidden';
                state.isLoading = false;
                renderAll();
                updateCartUI();
            }, 500);
        }, 1500);

        // Initial render with skeletons
        renderSkeletons();
    } catch (error) {
        console.error('Erro ao inicializar a aplicação:', error);
    }
}

// =============================================================================
// THEMING
// =============================================================================
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('kkj_theme', state.theme);
    applyTheme(state.theme);
    showToast(`Modo ${state.theme === 'light' ? 'Claro' : 'Escuro'} ativado`, 'ph-moon');
}

function applyTheme(theme) {
    elements.html.setAttribute('data-theme', theme);
    const icon = elements.themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'ph ph-moon' : 'ph ph-sun';
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================
function setupEventListeners() {
    elements.themeToggle.addEventListener('click', toggleTheme);

    elements.cartToggle.addEventListener('click', () => openDrawer('cart'));
    elements.closeCart.addEventListener('click', () => closeDrawer('cart'));
    elements.cartOverlay.addEventListener('click', () => closeDrawer('cart'));

    elements.profileToggle.addEventListener('click', () => {
        if (state.user) {
            openDrawer('profile');
        } else {
            openModal('auth');
        }
    });
    elements.closeProfile.addEventListener('click', () => closeDrawer('profile'));
    elements.profileOverlay.addEventListener('click', () => closeDrawer('profile'));

    elements.searchInput.addEventListener('input', (e) => handleSearch(e.target.value));

    elements.checkoutBtn.addEventListener('click', () => {
        if (!state.user) {
            closeDrawer('cart');
            openModal('auth');
            showToast('Faça login para finalizar o pedido', 'ph-user');
            return;
        }
        if (state.cart.length === 0) {
            showToast('Sua sacola está vazia!', 'ph-warning');
            return;
        }
        const payment = elements.paymentMethod.value;
        closeDrawer('cart');
        openPaymentModal(payment);
    });

    // Validação de senha em tempo real
    if (elements.authPassword) {
        elements.authPassword.addEventListener('input', () => {
            const pw = elements.authPassword.value;
            const el = elements.passwordStrength;
            if (state.authMode !== 'register' || !pw) {
                el.style.display = 'none';
                return;
            }
            el.style.display = 'block';
            if (pw.length < 6) {
                el.className = 'pw-weak';
                el.textContent = '🔴 Senha fraca — muito curta';
            } else if (pw.length < 8) {
                el.className = 'pw-medium';
                el.textContent = '🟡 Quase lá — mínimo 8 caracteres obrigatório';
            } else if (pw.length < 12) {
                el.className = 'pw-strong';
                el.textContent = '🟢 Senha forte!';
            } else {
                el.className = 'pw-strong';
                el.textContent = '🟢 Senha muito forte!';
            }
        });
    }

    // ESC fecha modais
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModals();
    });
}

// =============================================================================
// DRAWERS
// =============================================================================
function openDrawer(type) {
    if (type === 'cart') {
        elements.cartDrawer.classList.add('active');
        elements.cartOverlay.classList.add('active');
    } else {
        elements.profileDrawer.classList.add('active');
        elements.profileOverlay.classList.add('active');
    }
}

function closeDrawer(type) {
    if (type === 'cart') {
        elements.cartDrawer.classList.remove('active');
        elements.cartOverlay.classList.remove('active');
    } else {
        elements.profileDrawer.classList.remove('active');
        elements.profileOverlay.classList.remove('active');
    }
}

// =============================================================================
// MODALS
// =============================================================================
function openModal(type) {
    closeModals();
    elements.modalOverlay.classList.add('active');

    const map = {
        'location': elements.locationModal,
        'auth': elements.authModal,
        'add-dish': elements.addDishModal,
        'product-details': elements.productDetailsModal,
        'favorites': elements.favoritesModal,
        'payment': elements.paymentModal
    };

    if (map[type]) {
        map[type].classList.add('active');
        if (type === 'location' && elements.locationInput) {
            elements.locationInput.value = state.location;
            setTimeout(() => elements.locationInput.focus(), 100);
        }
        if (type === 'favorites') renderFavoritesModal();
    } else if (type === 'dashboard') {
        elements.modalOverlay.classList.remove('active');
        elements.dashboardModal.classList.add('active');
        closeDrawer('profile');
        renderDashboardOverview();
        renderDashboardDishes();
        renderSalesTable();
    } else if (type === 'courier') {
        elements.modalOverlay.classList.remove('active');
        elements.courierModal.classList.add('active');
        closeDrawer('profile');
        renderCourierOrders();
        loadCourierConfig();
    } else if (type === 'buyer') {
        elements.modalOverlay.classList.remove('active');
        const buyerModal = document.getElementById('buyer-modal');
        if (buyerModal) buyerModal.classList.add('active');
        closeDrawer('profile');
        initBuyerPanel();
    }
}

function closeModals() {
    elements.modalOverlay.classList.remove('active');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// =============================================================================
// LOCATION
// =============================================================================
function saveLocation() {
    const newLoc = elements.locationInput.value.trim();
    if (newLoc) {
        state.location = newLoc;
        localStorage.setItem('kkj_location', newLoc);
        elements.addressDisplay.textContent = newLoc;
        showToast('Localização atualizada!', 'ph-map-pin');
        closeModals();
    } else {
        showToast('Digite um endereço válido', 'ph-warning');
    }
}

function useCurrentLocation() {
    if (!elements.locationInput) return;
    elements.locationInput.value = 'Buscando localização via GPS...';

    if (!navigator.geolocation) {
        showToast('Seu navegador não suporta geolocalização.', 'ph-warning');
        elements.locationInput.value = '';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.address) {
                        const road = data.address.road || 'Rua Localizada';
                        const city = data.address.city || data.address.town || data.address.village || 'Sua Cidade';
                        const stateNode = data.address.state || 'Estado';
                        elements.locationInput.value = `${road} - ${city}, ${stateNode}`;
                    } else {
                        elements.locationInput.value = 'Localização encontrada (GPS)';
                    }
                    saveLocation();
                })
                .catch(() => {
                    elements.locationInput.value = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
                    saveLocation();
                });
        },
        () => {
            showToast('Não foi possível obter sua localização.', 'ph-warning');
            elements.locationInput.value = '';
        },
        { enableHighAccuracy: true, timeout: 5000 }
    );
}

// =============================================================================
// AUTH — VALIDAÇÃO COMPLETA (mínimo 8 dígitos de senha)
// =============================================================================
function switchAuthTab(tab) {
    state.authMode = tab;
    if (tab === 'login') {
        elements.tabLogin.classList.add('active');
        elements.tabRegister.classList.remove('active');
        elements.registerFields.style.display = 'none';
        elements.authTitle.textContent = 'Entrar';
        elements.authSubmitBtn.textContent = 'Entrar';
        if (elements.passwordStrength) elements.passwordStrength.style.display = 'none';
    } else {
        elements.tabRegister.classList.add('active');
        elements.tabLogin.classList.remove('active');
        elements.registerFields.style.display = 'block';
        elements.authTitle.textContent = 'Criar Conta';
        elements.authSubmitBtn.textContent = 'Criar Conta';
    }
}

function selectRole(role) {
    state.authRole = role;
    ['roleBuyer', 'roleSeller', 'roleCourier'].forEach(key => {
        if (elements[key]) elements[key].classList.remove('active');
    });
    const roleMap = { buyer: 'roleBuyer', seller: 'roleSeller', courier: 'roleCourier' };
    if (elements[roleMap[role]]) elements[roleMap[role]].classList.add('active');
}

function handleAuth(e) {
    e.preventDefault();
    try {
        const email = elements.authEmail.value.trim();
        const password = elements.authPassword.value.trim();

        // Validação de e-mail
        if (!email || !email.includes('@') || !email.includes('.')) {
            showToast('Por favor, insira um e-mail válido.', 'ph-warning');
            return;
        }

        // ⚠️ REQUISITO GLOBAL DE SEGURANÇA: mínimo 8 dígitos
        if (password.length < 8) {
            showToast('A senha deve ter no mínimo 8 caracteres!', 'ph-warning');
            if (elements.passwordStrength) {
                elements.passwordStrength.style.display = 'block';
                elements.passwordStrength.className = 'pw-weak';
                elements.passwordStrength.textContent = '🔴 Senha muito curta — mínimo 8 caracteres!';
            }
            return;
        }

        if (state.authMode === 'register') {
            const name = elements.authName ? elements.authName.value.trim() : '';
            if (!name) {
                showToast('Por favor, insira seu nome completo.', 'ph-warning');
                return;
            }
            state.user = { name, email, role: state.authRole, password };
            showToast(`Conta criada com sucesso! Bem-vindo(a), ${name}! 🎉`, 'ph-check-circle', true);
        } else {
            // Login mock: recupera do localStorage se houver
            const saved = localStorage.getItem('kkj_user');
            let userData = saved ? JSON.parse(saved) : null;
            if (userData && userData.email === email) {
                state.user = userData;
            } else {
                // Demo: login padrão
                state.user = { name: 'Iago Matos', email, role: 'buyer' };
            }
            showToast(`Bem-vindo(a) de volta, ${state.user.name}! 👋`, 'ph-check-circle', true);
        }

        localStorage.setItem('kkj_user', JSON.stringify(state.user));
        updateProfileUI();
        closeModals();

        elements.authEmail.value = '';
        elements.authPassword.value = '';
        if (elements.authName) elements.authName.value = '';
        if (elements.passwordStrength) elements.passwordStrength.style.display = 'none';

    } catch (error) {
        console.error('Erro na autenticação:', error);
        showToast('Ocorreu um erro ao tentar acessar a conta.', 'ph-warning');
    }
}

// =============================================================================
// PROFILE UI
// =============================================================================
function updateProfileUI() {
    if (!state.user) return;

    const isSeller = state.user.role === 'seller';
    const isCourier = state.user.role === 'courier';

    elements.profileUser.innerHTML = `
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Avatar" class="profile-avatar">
        <div>
            <h4 class="profile-name">${state.user.name}</h4>
            <span class="profile-email">${isSeller ? '🍽️ Restaurante' : isCourier ? '🛵 Entregador' : '🛒 Comprador'} • ${state.user.email}</span>
        </div>
    `;

    if (isSeller) {
        elements.profileMenu.innerHTML = `
            <div class="profile-menu-item" onclick="openModal('dashboard')">
                <i class="ph ph-storefront"></i><span>Painel do Restaurante</span>
            </div>
            <div class="profile-menu-item" onclick="openModal('favorites')">
                <i class="ph ph-heart"></i><span>Favoritos</span>
            </div>
            <div class="profile-menu-item" style="color:var(--accent); margin-top:20px;" onclick="logout()">
                <i class="ph ph-sign-out" style="color:var(--accent);"></i><span>Sair da conta</span>
            </div>
        `;
    } else if (isCourier) {
        elements.profileMenu.innerHTML = `
            <div class="profile-menu-item" onclick="openModal('courier')">
                <i class="ph ph-moped"></i><span>Painel do Entregador</span>
            </div>
            <div class="profile-menu-item" style="color:var(--accent); margin-top:20px;" onclick="logout()">
                <i class="ph ph-sign-out" style="color:var(--accent);"></i><span>Sair da conta</span>
            </div>
        `;
    } else {
        elements.profileMenu.innerHTML = `
            <div class="profile-menu-item" onclick="openModal('buyer')">
                <i class="ph ph-user-circle"></i><span>Painel do Cliente</span>
            </div>
            <div class="profile-menu-item" onclick="openModal('buyer'); switchPanelTab('buyer', 'tab-buyer-orders', document.querySelectorAll('#buyer-modal .panel-nav-item')[0])">
                <i class="ph ph-clock-counter-clockwise"></i><span>Meus Pedidos</span>
            </div>
            <div class="profile-menu-item" onclick="openModal('favorites')">
                <i class="ph ph-heart"></i><span>Favoritos</span>
            </div>
            <div class="profile-menu-item" onclick="openModal('buyer'); switchPanelTab('buyer', 'tab-buyer-settings', document.querySelectorAll('#buyer-modal .panel-nav-item')[3])">
                <i class="ph ph-map-pin"></i><span>Endereços</span>
            </div>
            <div class="profile-menu-item" onclick="openModal('buyer'); switchPanelTab('buyer', 'tab-buyer-wallet', document.querySelectorAll('#buyer-modal .panel-nav-item')[2])">
                <i class="ph ph-credit-card"></i><span>Formas de Pagamento</span>
            </div>
            <div class="profile-menu-item" style="color:var(--accent); margin-top:20px;" onclick="logout()">
                <i class="ph ph-sign-out" style="color:var(--accent);"></i><span>Sair da conta</span>
            </div>
        `;
    }
}

function logout() {
    state.user = null;
    localStorage.removeItem('kkj_user');
    closeDrawer('profile');
    closeModals();
    showToast('Você saiu da conta. Até logo! 👋', 'ph-sign-out');
}

function openOrdersModal() {
    const orders = state.orders;
    if (orders.length === 0) {
        showToast('Você ainda não fez nenhum pedido.', 'ph-receipt');
        return;
    }
    closeDrawer('profile');
    showToast(`Você tem ${orders.length} pedido(s) registrado(s).`, 'ph-receipt', true);
}

// =============================================================================
// PAYMENT
// =============================================================================
function openPaymentModal(payment) {
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalFormatted = formatCurrency(total);

    if (payment === 'PIX') {
        elements.paymentTitle.textContent = 'Pagamento via PIX';
        elements.paymentBody.innerHTML = `
            <div class="qr-code-box">
                <i class="ph ph-qr-code"></i>
                <p style="margin-top:12px; font-weight:600; font-size:18px;">${totalFormatted}</p>
                <p style="font-size:13px; color:var(--text-secondary); margin-top:4px;">Escaneie o QR Code ou copie o código abaixo</p>
            </div>
            <div class="input-group">
                <input type="text" value="00020126580014br.gov.bcb.pix0136${Date.now()}kkj-delivery" readonly style="color:var(--text-secondary); font-size:12px;">
                <button class="btn-outline" style="width:auto; padding:8px 12px; margin-left:8px; white-space:nowrap;" onclick="copyPixCode(this)">Copiar</button>
            </div>
            <button class="btn-full" onclick="finishOrder()" style="margin-top:16px;">Já paguei o PIX ✓</button>
        `;
    } else if (payment === 'Cartão de Crédito' || payment === 'Cartão de Débito') {
        elements.paymentTitle.textContent = `Pagamento — ${payment}`;
        elements.paymentBody.innerHTML = `
            <p style="margin-bottom:16px; font-weight:600;">Total a pagar: <span style="color:var(--accent);">${totalFormatted}</span></p>
            <div class="input-group"><i class="ph ph-credit-card"></i><input type="text" placeholder="0000 0000 0000 0000" maxlength="19" oninput="formatCardNumber(this)"></div>
            <div style="display:flex; gap:12px;">
                <div class="input-group" style="flex:1;"><input type="text" placeholder="MM/AA" maxlength="5" oninput="formatCardExpiry(this)"></div>
                <div class="input-group" style="flex:1;"><input type="text" placeholder="CVV" maxlength="4"></div>
            </div>
            <div class="input-group"><i class="ph ph-user"></i><input type="text" placeholder="Nome no cartão" style="text-transform:uppercase;"></div>
            <button class="btn-full" onclick="finishOrder()" style="margin-top:16px;">Pagar ${totalFormatted}</button>
        `;
    } else {
        elements.paymentTitle.textContent = 'Pagamento na Entrega';
        elements.paymentBody.innerHTML = `
            <p style="margin-bottom:16px;">Você escolheu pagar com <strong>Dinheiro</strong> no momento da entrega.</p>
            <p style="margin-bottom:16px; font-weight:600;">Total a pagar: <span style="color:var(--accent);">${totalFormatted}</span></p>
            <div class="input-group"><i class="ph ph-money"></i><input type="text" placeholder="Precisa de troco para quanto? (Opcional)"></div>
            <button class="btn-full" onclick="finishOrder()" style="margin-top:16px;">Confirmar Pedido</button>
        `;
    }

    elements.paymentModal.classList.add('active');
    elements.modalOverlay.classList.add('active');
}

function copyPixCode(btn) {
    const input = btn.previousElementSibling;
    navigator.clipboard.writeText(input.value).then(() => {
        showToast('Código PIX copiado!', 'ph-copy', true);
    }).catch(() => {
        input.select();
        document.execCommand('copy');
        showToast('Código PIX copiado!', 'ph-copy', true);
    });
}

function formatCardNumber(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatCardExpiry(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
    input.value = v;
}

function finishOrder() {
    let total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let originalTotal = total;
    let discount = 0;

    // Lógica do cupom real DESCONTO10
    if (state.activeCoupon === 'DESCONTO10') {
        discount = total * 0.10;
        total = total - discount;
    }

    // Calcular Despesa de Preparo (40% do valor do prato + R$ 2,00 da embalagem por unidade)
    let despesaPreparo = state.cart.reduce((sum, item) => {
        const custoPreparo = item.price * 0.40;
        const custoEmbalagem = 2.00;
        return sum + ((custoPreparo + custoEmbalagem) * item.qty);
    }, 0);

    const orderId = Date.now();
    const order = {
        id: orderId,
        items: [...state.cart],
        originalTotal,
        discount,
        total,
        despesaPreparo,
        date: new Date().toLocaleString('pt-BR'),
        status: 'Pendente'
    };
    state.orders.push(order);
    localStorage.setItem('kkj_orders', JSON.stringify(state.orders));
    localStorage.setItem('statusPedido', JSON.stringify({ id: orderId, status: 'Pendente' }));

    closeModals();
    showToast(`Pedido #${String(orderId).slice(-5)} realizado com sucesso! 🎉`, 'ph-check-circle', true);
    
    // Iniciar monitoramento do status em tempo real
    startActiveOrderSimulation(orderId);

    state.cart = [];
    saveCart();
    updateCartUI();
}

// =============================================================================
// PANEL TAB SWITCHING
// =============================================================================
function switchPanelTab(panelId, tabId, btn) {
    let panel;
    if (panelId === 'dashboard') panel = document.getElementById('dashboard-modal');
    else if (panelId === 'courier') panel = document.getElementById('courier-modal');
    else if (panelId === 'buyer') panel = document.getElementById('buyer-modal');

    if (!panel) return;

    // Remove active de todas as tabs
    panel.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
    panel.querySelectorAll('.panel-nav-item').forEach(b => b.classList.remove('active'));

    // Ativa a tab e o botão
    const tab = document.getElementById(tabId);
    if (tab) tab.classList.add('active');
    if (btn) btn.classList.add('active');

    // Ações específicas por tab
    if (tabId === 'tab-vendas') renderDashboardOverview();
    if (tabId === 'tab-pratos') renderDashboardDishes();
    if (tabId === 'tab-relatorio') { renderSalesTable(); buildSalesChart(); }
    if (tabId === 'tab-chat-rest') initRestChat();
    if (tabId === 'tab-corridas') renderCourierOrders();
    if (tabId === 'tab-chat-courier') initCourierChat();
    if (tabId === 'tab-ganhos') { calcularGanhos(); buildGanhosChart(); }
    if (tabId === 'tab-config-courier') loadCourierConfig();
    if (tabId === 'tab-feedbacks') initFeedbacksTab();

    // Ações específicas do comprador
    if (tabId === 'tab-buyer-orders') renderBuyerOrders();
    if (tabId === 'tab-buyer-chats') renderBuyerChats();
    if (tabId === 'tab-buyer-wallet') renderBuyerWallet();
    if (tabId === 'tab-buyer-settings') renderBuyerSettings();
}

// =============================================================================
// DASHBOARD — RESTAURANTE
// =============================================================================
function renderDashboardOverview() {
    const vendasEl = document.getElementById('dash-vendas-hoje');
    const fatEl = document.getElementById('dash-faturamento');
    const pratosEl = document.getElementById('dash-pratos-ativos');
    const recentEl = document.getElementById('dash-pedidos-recentes');
    
    const activeCard = document.getElementById('dash-pedido-ativo-card');
    const activeContent = document.getElementById('dash-pedido-ativo-content');

    // Elementos do Fluxo de Caixa
    const finFatBrutoEl = document.getElementById('fin-fat-bruto');
    const finTaxaSiteEl = document.getElementById('fin-taxa-site');
    const finMotoboyEl = document.getElementById('fin-motoboy');
    const finDespesasEl = document.getElementById('fin-despesas');
    const finFatLiquidoEl = document.getElementById('fin-fat-liquido');
    const dashRatingEl = document.getElementById('dash-feedback-avg');

    const orders = state.orders;

    // Estatísticas básicas
    const vendas = orders.length;
    
    // Cálculos Financeiros Acumulados
    let fatBruto = 0;
    let despesasPreparo = 0;
    let totalMotoboy = 0;

    orders.forEach(o => {
        fatBruto += o.total;
        totalMotoboy += 5.00; // Taxa de motoboy R$ 5,00 fixo por pedido
        
        let despesaPedido = o.despesaPreparo;
        if (despesaPedido === undefined) {
            // Fallback robusto se o pedido não tiver a propriedade despesaPreparo
            despesaPedido = o.items.reduce((sum, item) => {
                const custoPreparo = item.price * 0.40;
                const custoEmbalagem = 2.00;
                return sum + ((custoPreparo + custoEmbalagem) * item.qty);
            }, 0);
        }
        despesasPreparo += despesaPedido;
    });

    const taxaSite = fatBruto * 0.10;
    const fatLiquido = fatBruto - taxaSite - despesasPreparo - totalMotoboy;

    // Atualização de elementos gerais
    if (vendasEl) vendasEl.textContent = vendas;
    if (fatEl) fatEl.textContent = formatCurrency(fatBruto);
    if (pratosEl) pratosEl.textContent = mockProducts.length;

    // Atualizar Média Geral de Avaliação na Visão Geral
    const feedbackList = JSON.parse(localStorage.getItem('kkj_feedbacks')) || [];
    if (feedbackList.length > 0 && dashRatingEl) {
        const sumRest = feedbackList.reduce((sum, f) => sum + f.restaurantRating, 0);
        const avgRest = (sumRest / feedbackList.length).toFixed(1);
        dashRatingEl.textContent = `${avgRest} ⭐`;
    } else if (dashRatingEl) {
        dashRatingEl.textContent = '0.0 ⭐';
    }

    // Atualização dos Cards de Fluxo de Caixa
    if (finFatBrutoEl) finFatBrutoEl.textContent = formatCurrency(fatBruto);
    if (finTaxaSiteEl) finTaxaSiteEl.textContent = formatCurrency(taxaSite);
    if (finMotoboyEl) finMotoboyEl.textContent = formatCurrency(totalMotoboy);
    if (finDespesasEl) finDespesasEl.textContent = formatCurrency(despesasPreparo);
    if (finFatLiquidoEl) finFatLiquidoEl.textContent = formatCurrency(fatLiquido);

    // Renderizar Pedido Ativo no Painel do Restaurante se houver
    const activeOrder = orders.find(o => o.status !== 'Entregue');
    if (activeOrder && activeCard && activeContent) {
        activeCard.style.display = 'block';
        const status = activeOrder.status;
        const itemsList = activeOrder.items.map(i => `${i.qty}x ${i.name}`).join(', ');
        
        const isBtnReceivedDisabled = status !== 'Pendente';
        const isBtnPrepDisabled = status !== 'Recebido';
        const isBtnRouteDisabled = status !== 'Em preparo' && status !== 'Em Preparo';
        const isBtnDeliveredDisabled = status !== 'Em Rota';

        activeContent.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                <div>
                    <strong>Pedido #${String(activeOrder.id).slice(-5)}</strong>
                    <span style="font-size:12px; color:var(--text-secondary); margin-left:8px;">${activeOrder.date}</span>
                    <p style="font-size:13px; margin-top:4px; color:var(--text-secondary);">Itens: ${itemsList}</p>
                </div>
                <div style="text-align:right;">
                    <span class="status-badge ${status === 'Pendente' ? 'status-prep' : status === 'Recebido' ? 'status-prep' : status === 'Em preparo' ? 'status-prep' : status === 'Em Rota' ? 'status-ready' : 'status-delivered'}" style="display:inline-block; margin-bottom:4px;">
                        ${status}
                    </span>
                    <p style="font-weight:700; color:var(--accent);">${formatCurrency(activeOrder.total)}</p>
                </div>
            </div>
            <div class="status-btn-group">
                <button class="btn-status btn-status-received" ${isBtnReceivedDisabled ? 'disabled' : ''} onclick="updateOrderStatusRest(${activeOrder.id}, 'Recebido')">
                    <i class="ph ph-handshake"></i> Aceitar Pedido
                </button>
                <button class="btn-status btn-status-prep" ${isBtnPrepDisabled ? 'disabled' : ''} onclick="updateOrderStatusRest(${activeOrder.id}, 'Em preparo')">
                    <i class="ph ph-hamburger"></i> Iniciar Preparo
                </button>
                <button class="btn-status btn-status-route" ${isBtnRouteDisabled ? 'disabled' : ''} onclick="updateOrderStatusRest(${activeOrder.id}, 'Em Rota')">
                    <i class="ph ph-moped"></i> Despachar Pedido
                </button>
                <button class="btn-status btn-status-delivered" ${isBtnDeliveredDisabled ? 'disabled' : ''} onclick="updateOrderStatusRest(${activeOrder.id}, 'Entregue')">
                    <i class="ph ph-check-circle"></i> Finalizar Pedido
                </button>
            </div>
        `;
    } else if (activeCard) {
        activeCard.style.display = 'none';
    }

    if (recentEl) {
        const recentOrders = orders.slice(-5).reverse();
        if (recentOrders.length === 0) {
            recentEl.innerHTML = '<p style="color:var(--text-secondary); font-size:14px;">Nenhum pedido ainda.</p>';
        } else {
            recentEl.innerHTML = recentOrders.map(o => `
                <div class="recent-order-row">
                    <div>
                        <strong>Pedido #${String(o.id).slice(-5)}</strong>
                        <span style="font-size:12px; color:var(--text-secondary); margin-left:8px;">${o.date}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-weight:700; color:var(--accent);">${formatCurrency(o.total)}</span>
                        <span style="font-size:12px; background:rgba(16,185,129,0.1); color:#10b981; padding:2px 8px; border-radius:9999px;">${o.status}</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

function updateOrderStatusRest(orderId, newStatus) {
    const oIdx = state.orders.findIndex(o => o.id === orderId);
    if (oIdx !== -1) {
        state.orders[oIdx].status = newStatus;
        localStorage.setItem('kkj_orders', JSON.stringify(state.orders));
    }
    localStorage.setItem('statusPedido', JSON.stringify({ id: orderId, status: newStatus }));
    showToast(`Pedido #${String(orderId).slice(-5)} atualizado para "${newStatus}"!`, 'ph-check-circle', true);
    renderDashboardOverview();
}

function simulateNewOrder() {
    if (mockProducts.length === 0) {
        showToast('Nenhum prato disponível no cardápio para simular.', 'ph-warning', false);
        return;
    }

    const itemsCount = Math.floor(Math.random() * 2) + 1; // 1 ou 2 itens diferentes
    const selectedItems = [];
    let subtotal = 0;
    let despesaPreparo = 0;

    for (let i = 0; i < itemsCount; i++) {
        const randProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        const qty = Math.floor(Math.random() * 2) + 1; // Qtd 1 ou 2

        selectedItems.push({
            id: randProduct.id,
            name: randProduct.name,
            price: randProduct.price,
            qty: qty,
            img: randProduct.img
        });

        subtotal += randProduct.price * qty;
        
        // Custos por item: preparar = 40%, embalagem = R$ 2,00
        const custoPreparo = randProduct.price * 0.40;
        const custoEmbalagem = 2.00;
        despesaPreparo += (custoPreparo + custoEmbalagem) * qty;
    }

    const orderId = Date.now();
    const simulatedOrder = {
        id: orderId,
        items: selectedItems,
        originalTotal: subtotal,
        discount: 0,
        total: subtotal,
        despesaPreparo: despesaPreparo,
        date: new Date().toLocaleString('pt-BR'),
        status: 'Pendente'
    };

    state.orders.push(simulatedOrder);
    localStorage.setItem('kkj_orders', JSON.stringify(state.orders));
    
    // Definir como pedido ativo no LocalStorage para sincronizar com cliente
    localStorage.setItem('statusPedido', JSON.stringify({ id: orderId, status: 'Pendente' }));

    showToast(`Pedido Simulado #${String(orderId).slice(-5)} adicionado!`, 'ph-check-circle', true);
    renderDashboardOverview();
}

// =============================================================================
// GERENCIAR PRATOS
// =============================================================================
let currentEditDishId = null;
let currentDishImageBase64 = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop';

function renderDashboardDishes() {
    const el = elements.dashboardDishesList;
    if (!el) return;

    if (mockProducts.length === 0) {
        el.innerHTML = '<p style="color:var(--text-secondary);">Nenhum prato cadastrado.</p>';
        return;
    }

    el.innerHTML = mockProducts.map(prod => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-secondary); padding:12px 16px; border-radius:var(--radius-md); border:1px solid var(--border); transition: all 0.3s ease;">
            <div style="display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="openProductDetails(${prod.id})">
                <img src="${prod.img}" style="width:48px; height:48px; border-radius:10px; object-fit:cover;">
                <div>
                    <p style="font-weight:600; font-size:14px; margin-bottom:2px;">${prod.name}</p>
                    <p style="font-size:12px; color:var(--text-secondary);">${prod.category} • ${formatCurrency(prod.price)}</p>
                </div>
            </div>
            <div style="display:flex; gap:8px;">
                <button onclick="editDish(${prod.id}, event)" style="background:var(--bg-card); border:1px solid var(--border); color:var(--text-primary); cursor:pointer; padding:8px; border-radius:8px; transition:all 0.2s;" title="Editar">
                    <i class="ph ph-pencil-simple" style="font-size:16px;"></i>
                </button>
                <button onclick="deleteDish(${prod.id}, event)" style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); color:#ef4444; cursor:pointer; padding:8px; border-radius:8px; transition:all 0.2s;" title="Excluir">
                    <i class="ph ph-trash" style="font-size:16px;"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function previewDishImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentDishImageBase64 = e.target.result;
            elements.dishImagePreview.src = currentDishImageBase64;
            elements.dishImagePreview.style.display = 'block';
            elements.dishImagePlaceholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function openAddDish() {
    currentEditDishId = null;
    elements.dishModalTitle.textContent = 'Adicionar Novo Prato';
    elements.dishName.value = '';
    elements.dishDesc.value = '';
    elements.dishPrice.value = '';
    elements.dishCategory.value = 'Lanches';
    currentDishImageBase64 = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop';
    elements.dishImagePreview.style.display = 'none';
    elements.dishImagePlaceholder.style.display = 'block';
    elements.dishImageInput.value = '';
    openModal('add-dish');
}

function editDish(id, event) {
    if (event) event.stopPropagation();
    const dish = mockProducts.find(p => p.id === id);
    if (!dish) return;

    currentEditDishId = id;
    elements.dishModalTitle.textContent = 'Editar Item';
    elements.dishName.value = dish.name;
    elements.dishDesc.value = dish.desc;
    elements.dishPrice.value = dish.price;
    elements.dishCategory.value = dish.category || 'Lanches';
    currentDishImageBase64 = dish.img;
    elements.dishImagePreview.src = currentDishImageBase64;
    elements.dishImagePreview.style.display = 'block';
    elements.dishImagePlaceholder.style.display = 'none';
    elements.dishImageInput.value = '';
    openModal('add-dish');
}

function addNewDish() {
    const name = elements.dishName.value.trim();
    const cat = elements.dishCategory.value;
    const desc = elements.dishDesc.value.trim();
    const price = parseFloat(elements.dishPrice.value);

    if (!name || !desc || isNaN(price) || price <= 0) {
        showToast('Preencha todos os campos corretamente!', 'ph-warning');
        return;
    }

    if (currentEditDishId) {
        const index = mockProducts.findIndex(p => p.id === currentEditDishId);
        if (index > -1) {
            mockProducts[index] = { ...mockProducts[index], name, desc, price, category: cat, img: currentDishImageBase64 };
            showToast(`${name} atualizado!`, 'ph-check-circle', true);
        }
    } else {
        mockProducts.unshift({
            id: Date.now(), name, desc, price, category: cat,
            rating: 5.0, time: 'Novo!', img: currentDishImageBase64
        });
        showToast(`${name} adicionado com sucesso!`, 'ph-check-circle', true);
    }

    localStorage.setItem('kkj_products', JSON.stringify(mockProducts));
    renderProducts(mockProducts);
    renderDashboardDishes();
    renderDashboardOverview();
    closeModals();
    openModal('dashboard');
}

function deleteDish(id, event) {
    if (event) event.stopPropagation();
    if (!confirm('Tem certeza que deseja excluir este prato?')) return;

    const idx = mockProducts.findIndex(p => p.id === id);
    if (idx > -1) {
        const name = mockProducts[idx].name;
        mockProducts.splice(idx, 1);
        localStorage.setItem('kkj_products', JSON.stringify(mockProducts));
        showToast(`${name} excluído!`, 'ph-trash');
        renderDashboardDishes();
        renderProducts(mockProducts);
        renderDashboardOverview();
    }
}

// =============================================================================
// RELATÓRIO DE VENDAS — com cálculos reais e Chart.js
// =============================================================================
function addSalesReport() {
    const prato = document.getElementById('report-prato').value.trim();
    const custo = parseFloat(document.getElementById('report-custo').value);
    const venda = parseFloat(document.getElementById('report-venda').value);
    const qtd = parseInt(document.getElementById('report-qtd').value);

    if (!prato || isNaN(custo) || isNaN(venda) || isNaN(qtd) || qtd <= 0) {
        showToast('Preencha todos os campos do relatório corretamente!', 'ph-warning');
        return;
    }
    if (custo < 0 || venda < 0) {
        showToast('Os valores não podem ser negativos!', 'ph-warning');
        return;
    }

    const fatBruto = qtd * venda;
    const despesas = qtd * custo;
    const liquido = fatBruto - despesas;

    const entry = { id: Date.now(), prato, custo, venda, qtd, fatBruto, despesas, liquido };
    state.salesReport.push(entry);
    localStorage.setItem('kkj_sales', JSON.stringify(state.salesReport));

    // Limpar campos
    document.getElementById('report-prato').value = '';
    document.getElementById('report-custo').value = '';
    document.getElementById('report-venda').value = '';
    document.getElementById('report-qtd').value = '';

    showToast(`Venda de "${prato}" registrada!`, 'ph-check-circle', true);
    renderSalesTable();
    buildSalesChart();
    renderDashboardOverview();
}

function renderSalesTable() {
    const tbody = document.getElementById('sales-table-body');
    const empty = document.getElementById('sales-table-empty');
    const table = document.getElementById('sales-table');
    if (!tbody) return;

    if (state.salesReport.length === 0) {
        if (table) table.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
    }

    if (table) table.style.display = 'table';
    if (empty) empty.style.display = 'none';

    // Totais
    const totFat = state.salesReport.reduce((a, r) => a + r.fatBruto, 0);
    const totDesp = state.salesReport.reduce((a, r) => a + r.despesas, 0);
    const totLiq = state.salesReport.reduce((a, r) => a + r.liquido, 0);
    const totQtd = state.salesReport.reduce((a, r) => a + r.qtd, 0);

    tbody.innerHTML = state.salesReport.map(r => `
        <tr>
            <td style="font-weight:600;">${r.prato}</td>
            <td style="text-align:center;">${r.qtd}</td>
            <td class="fat-neutro">${formatCurrency(r.fatBruto)}</td>
            <td class="fat-negativo">${formatCurrency(r.despesas)}</td>
            <td class="${r.liquido >= 0 ? 'fat-positivo' : 'fat-negativo'}">${formatCurrency(r.liquido)}</td>
            <td>
                <button onclick="deleteSalesEntry(${r.id})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:16px;" title="Remover">
                    <i class="ph ph-trash"></i>
                </button>
            </td>
        </tr>
    `).join('') + `
        <tr style="font-weight:700; background:var(--bg-secondary);">
            <td>TOTAIS</td>
            <td style="text-align:center;">${totQtd}</td>
            <td class="fat-neutro">${formatCurrency(totFat)}</td>
            <td class="fat-negativo">${formatCurrency(totDesp)}</td>
            <td class="${totLiq >= 0 ? 'fat-positivo' : 'fat-negativo'}">${formatCurrency(totLiq)}</td>
            <td></td>
        </tr>
    `;
}

function deleteSalesEntry(id) {
    state.salesReport = state.salesReport.filter(r => r.id !== id);
    localStorage.setItem('kkj_sales', JSON.stringify(state.salesReport));
    renderSalesTable();
    buildSalesChart();
    renderDashboardOverview();
    showToast('Registro removido.', 'ph-trash');
}

function buildSalesChart() {
    const canvas = document.getElementById('salesChart');
    const container = document.getElementById('chart-container');
    if (!canvas || !container) return;

    if (state.salesReport.length === 0) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'block';

    const labels = state.salesReport.map(r => r.prato);
    const fatBruto = state.salesReport.map(r => r.fatBruto);
    const liquido = state.salesReport.map(r => r.liquido);
    const despesas = state.salesReport.map(r => r.despesas);

    if (state.salesChart) state.salesChart.destroy();

    state.salesChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Faturamento Bruto',
                    data: fatBruto,
                    backgroundColor: 'rgba(234, 88, 12, 0.7)',
                    borderColor: '#ea580c',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: 'Despesas',
                    data: despesas,
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    borderColor: '#ef4444',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: 'Lucro Líquido',
                    data: liquido,
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: '#10b981',
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: v => formatCurrency(v)
                    }
                }
            }
        }
    });
}

// =============================================================================
// CHAT DO RESTAURANTE — com timer de 60 min e resposta automática
// =============================================================================
let restChatInitialized = false;
let restChatInterval = null;
let restChatTimeLeft = 3600;

function initRestChat() {
    const timerEl = document.getElementById('rest-chat-timer');
    const messagesEl = document.getElementById('rest-chat-messages');
    const inputEl = document.getElementById('rest-chat-input');

    if (!messagesEl) return;

    // Restaurar mensagens salvas
    const savedMessages = JSON.parse(localStorage.getItem('kkj_rest_chat')) || [];

    if (!restChatInitialized) {
        restChatInitialized = true;

        // Mensagem inicial do cliente
        if (savedMessages.length === 0) {
            appendChatMessage(messagesEl, 'other', 'Olá! Meu pedido já saiu para entrega?', 'Cliente', localStorage);
        } else {
            savedMessages.forEach(m => {
                const bubble = createBubble(m.side, m.text, m.author);
                messagesEl.appendChild(bubble);
            });
        }

        // Timer
        if (restChatInterval) clearInterval(restChatInterval);
        restChatInterval = setInterval(() => {
            if (restChatTimeLeft <= 0) {
                clearInterval(restChatInterval);
                if (timerEl) timerEl.textContent = '00:00 ⛔';
                if (inputEl) { inputEl.disabled = true; inputEl.placeholder = 'Chat encerrado.'; }
                showToast('O chat com o cliente foi encerrado.', 'ph-warning');
                return;
            }
            restChatTimeLeft--;
            if (timerEl) {
                const m = Math.floor(restChatTimeLeft / 60).toString().padStart(2, '0');
                const s = (restChatTimeLeft % 60).toString().padStart(2, '0');
                timerEl.textContent = `${m}:${s}`;
            }
        }, 1000);
    }

    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function sendRestChat() {
    if (restChatTimeLeft <= 0) { showToast('O chat foi encerrado.', 'ph-warning'); return; }

    const inputEl = document.getElementById('rest-chat-input');
    const messagesEl = document.getElementById('rest-chat-messages');
    const msg = inputEl ? inputEl.value.trim() : '';
    if (!msg || !messagesEl) return;

    appendChatMessage(messagesEl, 'self', msg, 'Você');
    inputEl.value = '';

    // Salva no localStorage
    saveRestChatMessage('self', msg, 'Você');

    // Resposta automática do cliente após 3s
    setTimeout(() => {
        const resposta = clienteRespostas[Math.floor(Math.random() * clienteRespostas.length)];
        appendChatMessage(messagesEl, 'other', resposta, 'Cliente');
        saveRestChatMessage('other', resposta, 'Cliente');
    }, 3000);
}

function saveRestChatMessage(side, text, author) {
    const saved = JSON.parse(localStorage.getItem('kkj_rest_chat')) || [];
    saved.push({ side, text, author, time: getChatTime() });
    localStorage.setItem('kkj_rest_chat', JSON.stringify(saved));
}

function appendChatMessage(container, side, text, author) {
    const bubble = createBubble(side, text, author);
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

function createBubble(side, text, author) {
    const div = document.createElement('div');
    div.className = side === 'self' ? 'chat-bubble-self' : 'chat-bubble-other';
    div.innerHTML = `
        <p>${escapeHtml(text)}</p>
        <span class="chat-time">${author} • ${getChatTime()}</span>
    `;
    return div;
}

function getChatTime() {
    return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// =============================================================================
// PAINEL DO ENTREGADOR — CORRIDAS
// =============================================================================
function renderCourierOrders() {
    const container = document.getElementById('courier-orders-list');
    if (!container) return;

    if (mockCourierOrders.length === 0) {
        container.innerHTML = '<p style="color:var(--text-secondary); text-align:center; padding:32px;">Nenhum pedido próximo no momento.</p>';
        return;
    }

    container.innerHTML = mockCourierOrders.map(order => `
        <div class="courier-order-card">
            <div class="order-header">
                <strong style="font-size:15px;">Pedido #${order.id}</strong>
                <span class="order-status ${order.statusClass}">${order.status}</span>
            </div>
            <p style="font-size:13px; color:var(--text-secondary); margin-bottom:4px;">
                <i class="ph ph-storefront"></i> <strong>${order.rest}</strong> — ${order.dist}
            </p>
            <p style="font-size:13px; color:var(--text-secondary); margin-bottom:4px;">
                <i class="ph ph-house"></i> ${order.dest}
            </p>
            <p style="font-size:13px; color:var(--accent); font-weight:700;">
                <i class="ph ph-currency-dollar"></i> Ganho estimado: ${order.valor}
            </p>
            <div class="order-actions">
                <button class="btn-full" style="padding:10px; font-size:13px;" onclick="acceptCourierOrder(${order.id}, this)">
                    <i class="ph ph-check"></i> Aceitar Corrida
                </button>
                <button style="padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border); font-size:13px; background:var(--bg-card); color:var(--text-primary); cursor:pointer; transition:all 0.3s ease;" onclick="switchPanelTab('courier', 'tab-chat-courier', null)">
                    <i class="ph ph-chat-circle-dots"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function acceptCourierOrder(id, btn) {
    const order = mockCourierOrders.find(o => o.id === id);
    if (!order) return;

    btn.innerHTML = '<i class="ph ph-check-circle"></i> Corrida Aceita!';
    btn.style.background = '#10b981';
    btn.disabled = true;
    order.status = 'Aceita por você';
    order.statusClass = 'status-ready';

    showToast(`Corrida #${id} aceita! Vá até ${order.rest}. 🛵`, 'ph-moped', true);
}

// =============================================================================
// CHAT DO ENTREGADOR — com resposta automática do cliente
// =============================================================================
let courierChatInitialized = false;

function initCourierChat() {
    const messagesEl = document.getElementById('courier-chat-messages');
    if (!messagesEl || courierChatInitialized) return;
    courierChatInitialized = true;

    const saved = JSON.parse(localStorage.getItem('kkj_courier_chat')) || [];
    if (saved.length === 0) {
        appendChatMessage(messagesEl, 'other', 'Oi! Quanto tempo ainda vai demorar?', 'Maria Silva');
    } else {
        saved.forEach(m => {
            const bubble = createBubble(m.side, m.text, m.author);
            messagesEl.appendChild(bubble);
        });
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function sendCourierChat() {
    const inputEl = document.getElementById('courier-chat-input');
    const messagesEl = document.getElementById('courier-chat-messages');
    const msg = inputEl ? inputEl.value.trim() : '';
    if (!msg || !messagesEl) return;

    appendChatMessage(messagesEl, 'self', msg, 'Você');
    inputEl.value = '';

    const saved = JSON.parse(localStorage.getItem('kkj_courier_chat')) || [];
    saved.push({ side: 'self', text: msg, author: 'Você', time: getChatTime() });
    localStorage.setItem('kkj_courier_chat', JSON.stringify(saved));

    // Resposta automática após 3s
    setTimeout(() => {
        const resposta = clienteRespostas[Math.floor(Math.random() * clienteRespostas.length)];
        appendChatMessage(messagesEl, 'other', resposta, 'Maria Silva');
        const s2 = JSON.parse(localStorage.getItem('kkj_courier_chat')) || [];
        s2.push({ side: 'other', text: resposta, author: 'Maria Silva', time: getChatTime() });
        localStorage.setItem('kkj_courier_chat', JSON.stringify(s2));
    }, 3000);
}

// =============================================================================
// MEUS GANHOS — ENTREGADOR
// =============================================================================
function calcularGanhos() {
    const corridasEl = document.getElementById('ganhos-corridas');
    const combustivelEl = document.getElementById('ganhos-combustivel');
    const resultsEl = document.getElementById('ganhos-results');

    if (!corridasEl || !combustivelEl) return;

    const corridas = parseFloat(corridasEl.value) || 0;
    const combustivel = parseFloat(combustivelEl.value) || 0;

    if (corridas <= 0 && combustivel <= 0) {
        if (resultsEl) resultsEl.style.display = 'none';
        return;
    }

    const taxa = corridas * 0.10;
    const liquido = corridas - taxa - combustivel;

    document.getElementById('res-bruto').textContent = formatCurrency(corridas);
    document.getElementById('res-taxa').textContent = `- ${formatCurrency(taxa)}`;
    document.getElementById('res-combustivel').textContent = `- ${formatCurrency(combustivel)}`;
    const liqEl = document.getElementById('res-liquido');
    liqEl.textContent = formatCurrency(liquido);
    liqEl.style.color = liquido >= 0 ? 'var(--accent)' : '#ef4444';

    if (resultsEl) resultsEl.style.display = 'flex';

    buildGanhosChart(corridas, taxa, combustivel, liquido);
}

function buildGanhosChart(corridas, taxa, combustivel, liquido) {
    const canvas = document.getElementById('ganhosChart');
    if (!canvas) return;

    // Usa valores dos inputs se não passados
    if (corridas === undefined) {
        corridas = parseFloat(document.getElementById('ganhos-corridas')?.value) || 0;
        taxa = corridas * 0.10;
        combustivel = parseFloat(document.getElementById('ganhos-combustivel')?.value) || 0;
        liquido = corridas - taxa - combustivel;
    }

    if (corridas <= 0) return;

    if (state.ganhosChart) state.ganhosChart.destroy();

    state.ganhosChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Taxa do Sistema (10%)', 'Combustível', 'Ganho Líquido'],
            datasets: [{
                data: [taxa, combustivel, Math.max(liquido, 0)],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.label}: ${formatCurrency(ctx.raw)}`
                    }
                }
            }
        }
    });
}

// =============================================================================
// CONFIGURAÇÕES DO ENTREGADOR
// =============================================================================
function loadCourierConfig() {
    const cfg = state.courierConfig;
    const fields = ['cfg-nome', 'cfg-email', 'cfg-tel', 'cfg-veiculo', 'cfg-placa'];
    const keys = ['nome', 'email', 'tel', 'veiculo', 'placa'];
    fields.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && cfg[keys[i]]) el.value = cfg[keys[i]];
    });
}

function salvarConfigCourier() {
    const nome = document.getElementById('cfg-nome')?.value.trim();
    const email = document.getElementById('cfg-email')?.value.trim();
    const tel = document.getElementById('cfg-tel')?.value.trim();
    const veiculo = document.getElementById('cfg-veiculo')?.value.trim();
    const placa = document.getElementById('cfg-placa')?.value.trim().toUpperCase();

    if (!nome) { showToast('Por favor, insira seu nome.', 'ph-warning'); return; }

    state.courierConfig = { nome, email, tel, veiculo, placa };
    localStorage.setItem('kkj_courier_config', JSON.stringify(state.courierConfig));
    showToast('Perfil atualizado com sucesso! ✅', 'ph-check-circle', true);

    // Atualiza dados do usuário logado
    if (state.user) {
        state.user.name = nome;
        if (email) state.user.email = email;
        localStorage.setItem('kkj_user', JSON.stringify(state.user));
        updateProfileUI();
    }

    if (document.getElementById('cfg-placa')) {
        document.getElementById('cfg-placa').value = placa;
    }
}

function alterarSenhaCourier() {
    const senhaAtual = document.getElementById('cfg-senha-atual')?.value;
    const senhaNova = document.getElementById('cfg-senha-nova')?.value;
    const feedbackEl = document.getElementById('cfg-senha-feedback');

    if (!senhaAtual || !senhaNova) {
        showToast('Preencha os campos de senha.', 'ph-warning');
        return;
    }

    // Validação: mínimo 8 dígitos (REQUISITO GLOBAL)
    if (senhaNova.length < 8) {
        if (feedbackEl) {
            feedbackEl.style.display = 'block';
            feedbackEl.className = 'pw-weak';
            feedbackEl.textContent = '🔴 A nova senha deve ter no mínimo 8 caracteres!';
        }
        showToast('A senha deve ter no mínimo 8 caracteres!', 'ph-warning');
        return;
    }

    if (feedbackEl) feedbackEl.style.display = 'none';

    // Salva nova senha
    if (state.user) {
        state.user.password = senhaNova;
        localStorage.setItem('kkj_user', JSON.stringify(state.user));
    }

    document.getElementById('cfg-senha-atual').value = '';
    document.getElementById('cfg-senha-nova').value = '';
    showToast('Senha alterada com sucesso! 🔐', 'ph-check-circle', true);
}

// =============================================================================
// RENDERIZAÇÃO PRINCIPAL
// =============================================================================
function renderSkeletons() {
    elements.categoriesContainer.innerHTML = Array(6).fill().map(() => `
        <div class="category-card skeleton" style="min-width:100px; height:110px; border-radius:var(--radius-md);"></div>
    `).join('');

    const cardSkeleton = `<div class="card skeleton" style="height:320px;"></div>`;
    elements.restaurantsContainer.innerHTML = Array(3).fill(cardSkeleton).join('');
    elements.productsContainer.innerHTML = Array(4).fill(cardSkeleton).join('');
}

function renderAll() {
    renderCategories(mockCategories);
    renderRestaurants(mockRestaurants);
    renderProducts(mockProducts);
}

function renderCategories(data) {
    elements.categoriesContainer.innerHTML = data.map(cat => `
        <div class="category-card" onclick="filterByCategory('${cat.name}')">
            <div class="category-img">
                <img src="${cat.img}" alt="${cat.name}" loading="lazy">
            </div>
            <span class="category-name">${cat.name}</span>
        </div>
    `).join('');
}

function filterByCategory(category) {
    if (!category) { renderAll(); return; }
    const filteredRestaurants = mockRestaurants.filter(r => r.category === category || r.category.includes(category));
    const filteredProducts = mockProducts.filter(p => p.category === category || (p.category && p.category.includes(category)));
    renderRestaurants(filteredRestaurants);
    renderProducts(filteredProducts);
    if (elements.searchInput) elements.searchInput.value = category;
    if (elements.productsContainer) elements.productsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderRestaurants(data) {
    if (data.length === 0) {
        elements.restaurantsContainer.innerHTML = '<p style="color:var(--text-secondary); width:100%;">Nenhum restaurante encontrado.</p>';
        return;
    }
    elements.restaurantsContainer.innerHTML = data.map(rest => {
        const isFav = state.favorites.includes(`rest_${rest.id}`);
        return `
        <div class="card">
            <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('rest', ${rest.id}, event)">
                <i class="${isFav ? 'ph-fill' : 'ph'} ph-heart"></i>
            </button>
            <div class="card-img-wrapper">
                <img src="${rest.img}" alt="${rest.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-content">
                <h4 class="card-title">${rest.name}</h4>
                <div class="card-meta">
                    <span class="meta-item rating"><i class="ph-fill ph-star"></i> ${rest.rating}</span>
                    <span class="meta-item"><i class="ph ph-clock"></i> ${rest.time}</span>
                </div>
                <div class="card-meta" style="margin-bottom:0;">
                    <span class="meta-item">${rest.category} • ${rest.dist}</span>
                </div>
                <div style="margin-top:16px;">
                    <span style="font-size:13px; font-weight:600; color:${rest.fee === 'Grátis' ? 'var(--accent)' : 'var(--text-secondary)'};">
                        Entrega: ${rest.fee}
                    </span>
                </div>
            </div>
        </div>`;
    }).join('');
}

function renderProducts(data) {
    if (data.length === 0) {
        elements.productsContainer.innerHTML = '<p style="color:var(--text-secondary); width:100%;">Nenhum produto encontrado.</p>';
        return;
    }

    const isSeller = state.user && state.user.role === 'seller';

    elements.productsContainer.innerHTML = data.map(prod => {
        const isFav = state.favorites.includes(`prod_${prod.id}`);
        const sellerBtns = isSeller ? `
            <button class="favorite-btn" style="top:12px; left:12px; color:white; background:rgba(0,0,0,0.5); font-size:14px;" onclick="editDish(${prod.id}, event)" title="Editar">
                <i class="ph ph-pencil-simple"></i>
            </button>
        ` : '';

        return `
        <div class="card" style="cursor:pointer;" onclick="openProductDetails(${prod.id})">
            ${sellerBtns}
            <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('prod', ${prod.id}, event)">
                <i class="${isFav ? 'ph-fill' : 'ph'} ph-heart"></i>
            </button>
            <div class="card-img-wrapper">
                <img src="${prod.img}" alt="${prod.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-content">
                <h4 class="card-title">${prod.name}</h4>
                <p class="card-desc">${prod.desc}</p>
                <div class="card-meta">
                    <span class="meta-item rating"><i class="ph-fill ph-star"></i> ${prod.rating}</span>
                    <span class="meta-item"><i class="ph ph-clock"></i> ${prod.time}</span>
                </div>
                <div class="card-footer">
                    <span class="card-price">${formatCurrency(prod.price)}</span>
                    <button class="btn-add" onclick="addToCart(${prod.id}, event)" aria-label="Adicionar ao carrinho">
                        <i class="ph ph-plus"></i>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// =============================================================================
// PRODUCT DETAILS
// =============================================================================
function openProductDetails(id) {
    const prod = mockProducts.find(p => p.id === id);
    if (!prod) return;

    document.getElementById('pd-img').src = prod.img;
    document.getElementById('pd-name').textContent = prod.name;
    document.getElementById('pd-desc').textContent = prod.desc;
    document.getElementById('pd-price').textContent = formatCurrency(prod.price);
    document.getElementById('pd-time').innerHTML = `<i class="ph ph-clock"></i> ${prod.time}`;

    const addBtn = document.getElementById('pd-add-btn');
    addBtn.onclick = () => { addToCart(prod.id); closeModals(); };

    openModal('product-details');
}

// =============================================================================
// CART LOGIC
// =============================================================================
function addToCart(productId, event) {
    if (event) event.stopPropagation();
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = state.cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        state.cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} adicionado! 🛒`, 'ph-shopping-cart');
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQty(productId, delta) {
    const item = state.cart.find(item => item.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('kkj_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    elements.cartCount.textContent = totalItems;

    if (totalItems === 0) {
        elements.cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="ph ph-shopping-bag"></i>
                <h3>Sua sacola está vazia</h3>
                <p>Adicione itens para fazer seu pedido.</p>
            </div>`;
        elements.cartTotal.textContent = 'R$ 0,00';
        return;
    }

    elements.cartItemsContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <span class="cart-item-title">${item.name}</span>
                <span class="cart-item-price">${formatCurrency(item.price * item.qty)}</span>
                <div class="cart-item-actions">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                        <span style="font-size:14px; font-weight:600; width:20px; text-align:center;">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    elements.cartTotal.textContent = formatCurrency(total);
}

// =============================================================================
// FAVORITES
// =============================================================================
function toggleFavorite(type, id, event) {
    event.stopPropagation();
    const key = `${type}_${id}`;
    const index = state.favorites.indexOf(key);

    if (index > -1) {
        state.favorites.splice(index, 1);
        showToast('Removido dos favoritos', 'ph-heart-break');
    } else {
        state.favorites.push(key);
        showToast('Adicionado aos favoritos! ❤️', 'ph-heart', true);
    }

    localStorage.setItem('kkj_favorites', JSON.stringify(state.favorites));

    const btn = event.currentTarget;
    const icon = btn.querySelector('i');
    if (index > -1) {
        btn.classList.remove('active');
        icon.className = 'ph ph-heart';
    } else {
        btn.classList.add('active');
        icon.className = 'ph-fill ph-heart';
    }

    if (elements.favoritesModal && elements.favoritesModal.classList.contains('active')) {
        renderFavoritesModal();
    }
}

function renderFavoritesModal() {
    const pList = document.getElementById('fav-products-list');
    const rList = document.getElementById('fav-restaurants-list');
    if (!pList || !rList) return;

    const favProds = mockProducts.filter(p => state.favorites.includes(`prod_${p.id}`));
    const favRests = mockRestaurants.filter(r => state.favorites.includes(`rest_${r.id}`));

    pList.innerHTML = favProds.length === 0
        ? '<p style="color:var(--text-secondary); font-size:14px;">Você não tem pratos favoritos ainda.</p>'
        : favProds.map(prod => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-secondary); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border); cursor:pointer;" onclick="openProductDetails(${prod.id})">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${prod.img}" style="width:40px; height:40px; border-radius:8px; object-fit:cover;">
                    <div>
                        <p style="font-weight:600; font-size:14px;">${prod.name}</p>
                        <p style="font-size:12px; color:var(--text-secondary);">${formatCurrency(prod.price)}</p>
                    </div>
                </div>
                <button onclick="toggleFavorite('prod', ${prod.id}, event)" style="background:transparent; border:none; color:var(--accent); cursor:pointer; padding:4px;">
                    <i class="ph-fill ph-heart" style="font-size:20px;"></i>
                </button>
            </div>`).join('');

    rList.innerHTML = favRests.length === 0
        ? '<p style="color:var(--text-secondary); font-size:14px;">Você não tem restaurantes favoritos ainda.</p>'
        : favRests.map(rest => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-secondary); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border);">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${rest.img}" style="width:40px; height:40px; border-radius:8px; object-fit:cover;">
                    <div>
                        <p style="font-weight:600; font-size:14px;">${rest.name}</p>
                        <p style="font-size:12px; color:var(--text-secondary);"><i class="ph-fill ph-star"></i> ${rest.rating}</p>
                    </div>
                </div>
                <button onclick="toggleFavorite('rest', ${rest.id}, event)" style="background:transparent; border:none; color:var(--accent); cursor:pointer; padding:4px;">
                    <i class="ph-fill ph-heart" style="font-size:20px;"></i>
                </button>
            </div>`).join('');
}

// =============================================================================
// PAINEL DO COMPRADOR / CLIENTE (NOVO)
// =============================================================================
let editingAddressIndex = -1;

function initBuyerPanel() {
    try {
        // ✅ Validação de integridade dos dados do comprador no state
        if (!Array.isArray(state.orders)) {
            console.warn('state.orders corrompido, reinicializando...');
            state.orders = [];
            localStorage.setItem('kkj_orders', '[]');
        }
        if (!Array.isArray(state.buyerAddresses)) {
            console.warn('state.buyerAddresses corrompido, reinicializando...');
            state.buyerAddresses = [];
            localStorage.setItem('kkj_buyer_addresses', '[]');
        }
        if (!Array.isArray(state.buyerCards)) {
            console.warn('state.buyerCards corrompido, reinicializando...');
            state.buyerCards = [];
            localStorage.setItem('kkj_buyer_cards', '[]');
        }

        // Seletor corrigido: buscar apenas os botões na nav lateral, não nos canais de chat
        const navButtons = document.querySelectorAll('#buyer-modal > .panel-sidebar .panel-nav-item');
        switchPanelTab('buyer', 'tab-buyer-orders', navButtons[0] || null);
        
        // Mock inicial caso não existam dados
        if (state.buyerAddresses.length === 0) {
            state.buyerAddresses = [
                { street: 'Rua das Flores', number: '123', neighborhood: 'Jardim Primavera', complement: 'Condomínio Flores, Bloco A' },
                { street: 'Av. Paulista', number: '900', neighborhood: 'Bela Vista', complement: 'Apto 42' }
            ];
            localStorage.setItem('kkj_buyer_addresses', JSON.stringify(state.buyerAddresses));
        }
        
        if (state.buyerCards.length === 0) {
            state.buyerCards = [
                { number: '**** **** **** 1234', holder: 'IAGO MATOS', expiry: '12/29', type: 'Visa' }
            ];
            localStorage.setItem('kkj_buyer_cards', JSON.stringify(state.buyerCards));
        }
        
        renderBuyerOrders();
        renderBuyerWallet();
        renderBuyerSettings();

        const activeOrder = state.orders.find(o => o && o.status !== 'Entregue');
        if (activeOrder) {
            startActiveOrderSimulation(activeOrder.id);
        }
    } catch (error) {
        console.error('Erro ao inicializar o painel do comprador:', error);
        showToast('Erro ao carregar dados do painel. Tente novamente.', 'ph-warning');
    }
}

function renderBuyerOrders() {
    const tableBody = document.getElementById('buyer-orders-table-body');
    const emptyMsg = document.getElementById('buyer-orders-empty');
    const activeOrderCard = document.getElementById('active-order-card');
    
    if (!tableBody) return;
    
    // Garantir que orders é um array válido
    if (!Array.isArray(state.orders)) {
        state.orders = [];
    }
    
    const orders = state.orders;
    
    if (orders.length === 0) {
        tableBody.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        if (activeOrderCard) activeOrderCard.style.display = 'none';
        return;
    }
    
    if (emptyMsg) emptyMsg.style.display = 'none';
    
    try {
        tableBody.innerHTML = orders.map(order => {
            if (!order || typeof order !== 'object') return '';
            
            // Fallbacks seguros para cada propriedade
            const items = Array.isArray(order.items) ? order.items : [];
            const itemsText = items.map(i => i ? `${i.qty || 1}x ${escapeHtml(i.name || 'Item')}` : 'Item').join(', ') || 'Sem itens';
            const totalText = formatCurrency(typeof order.total === 'number' ? order.total : 0);
            const orderDate = typeof order.date === 'string' ? order.date.split(',')[0] : 'Data indisponível';
            const orderStatus = order.status || 'Pendente';
            const orderId = order.id || 0;
            
            let statusBadgeClass = 'status-prep';
            
            if (orderStatus === 'Recebido') statusBadgeClass = 'status-prep';
            else if (orderStatus === 'Em preparo') statusBadgeClass = 'status-prep';
            else if (orderStatus === 'Saiu para entrega' || orderStatus === 'Saiu para Entrega') statusBadgeClass = 'status-ready';
            else if (orderStatus === 'Entregue') statusBadgeClass = 'status-delivered';
            
            return `
                <tr>
                    <td><strong>#${String(orderId).slice(-5)}</strong></td>
                    <td>${escapeHtml(orderDate)}</td>
                    <td>KKJ Delivery Rest.</td>
                    <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${itemsText}</td>
                    <td>${totalText}</td>
                    <td><span class="status-badge ${statusBadgeClass}">${escapeHtml(orderStatus)}</span></td>
                </tr>
            `;
        }).reverse().join('');
    } catch (e) {
        console.error('Erro ao renderizar pedidos do comprador:', e);
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-secondary);">Erro ao carregar pedidos.</td></tr>';
    }
    
    try {
        const activeOrder = orders.find(o => o && o.status && o.status !== 'Entregue');
        if (activeOrder && activeOrderCard) {
            activeOrderCard.style.display = 'block';
            const activeOrderIdEl = document.getElementById('active-order-id');
            const activeOrderStatusEl = document.getElementById('active-order-status-text');
            if (activeOrderIdEl) activeOrderIdEl.textContent = `#${String(activeOrder.id || 0).slice(-5)}`;
            if (activeOrderStatusEl) activeOrderStatusEl.textContent = activeOrder.status || 'Pendente';
            updateActiveOrderProgressUI(activeOrder.status || 'Pendente');
        } else if (activeOrderCard) {
            activeOrderCard.style.display = 'none';
        }
    } catch (e) {
        console.error('Erro ao renderizar pedido ativo:', e);
        if (activeOrderCard) activeOrderCard.style.display = 'none';
    }
}

function updateActiveOrderProgressUI(status) {
    const steps = ['recebido', 'preparo', 'entrega', 'entregue'];
    let currentStepIndex = 0;
    
    if (status === 'Recebido') currentStepIndex = 0;
    else if (status === 'Em preparo') currentStepIndex = 1;
    else if (status === 'Saiu para entrega' || status === 'Saiu para Entrega' || status === 'Em Rota') currentStepIndex = 2;
    else if (status === 'Entregue') currentStepIndex = 3;
    
    steps.forEach((step, idx) => {
        const stepEl = document.getElementById(`step-${step}`);
        if (!stepEl) return;
        
        stepEl.classList.remove('active', 'completed');
        if (idx < currentStepIndex) {
            stepEl.classList.add('completed');
        } else if (idx === currentStepIndex) {
            stepEl.classList.add('active');
        }
    });

    const btnChatCourier = document.getElementById('btn-chat-courier-active');
    const courierLockedBadge = document.getElementById('chat-courier-locked-badge');
    
    if (currentStepIndex >= 2) {
        if (btnChatCourier) btnChatCourier.style.display = 'inline-flex';
        if (courierLockedBadge) courierLockedBadge.style.display = 'none';
    } else {
        if (btnChatCourier) btnChatCourier.style.display = 'none';
        if (courierLockedBadge) courierLockedBadge.style.display = 'inline-block';
    }
}

function startActiveOrderSimulation(orderId) {
    if (state.activeOrderProgressInterval) {
        clearInterval(state.activeOrderProgressInterval);
    }

    state.activeOrderProgressInterval = setInterval(() => {
        const statusDataRaw = localStorage.getItem('statusPedido');
        if (statusDataRaw) {
            try {
                const statusData = JSON.parse(statusDataRaw);
                if (statusData && statusData.id === orderId) {
                    const localStatus = statusData.status;
                    
                    const oIdx = state.orders.findIndex(o => o.id === orderId);
                    if (oIdx !== -1 && state.orders[oIdx].status !== localStatus) {
                        state.orders[oIdx].status = localStatus;
                        localStorage.setItem('kkj_orders', JSON.stringify(state.orders));
                        
                        const buyerModal = document.getElementById('buyer-modal');
                        if (buyerModal && buyerModal.classList.contains('active')) {
                            renderBuyerOrders();
                        }
                        
                        showToast(`Status do Pedido atualizado: "${localStatus}"!`, 'ph-info', true);
                        
                        if (localStatus === 'Entregue') {
                            clearInterval(state.activeOrderProgressInterval);
                            state.activeOrderProgressInterval = null;
                            
                            // Verificar se o pedido já foi avaliado
                            const feedbackList = JSON.parse(localStorage.getItem('kkj_feedbacks')) || [];
                            const alreadyEvaluated = feedbackList.some(fb => fb.orderId === orderId);
                            if (!alreadyEvaluated) {
                                setTimeout(() => {
                                    openFeedbackModal(orderId);
                                }, 1500);
                            }
                        }
                    }
                }
            } catch (e) {
                console.error('Erro ao ler status do localStorage:', e);
            }
        }
    }, 1000);
}

function renderBuyerChats() {
    const container = document.getElementById('buyer-chat-messages');
    const headerTitle = document.getElementById('buyer-chat-title');
    const headerIcon = document.querySelector('#buyer-chat-header i');
    const channelRestBtn = document.getElementById('chat-channel-rest-btn');
    const channelCourierBtn = document.getElementById('chat-channel-courier-btn');
    
    if (!container) return;
    
    const channel = state.activeChatChannel;
    
    if (channel === 'rest') {
        if (channelRestBtn) channelRestBtn.classList.add('active');
        if (channelCourierBtn) channelCourierBtn.classList.remove('active');
        if (headerTitle) headerTitle.textContent = 'Chat com o Restaurante';
        if (headerIcon) headerIcon.className = 'ph ph-storefront';
    } else {
        const activeOrder = Array.isArray(state.orders) ? state.orders.find(o => o && o.status !== 'Entregue') : null;
        const isEnRoute = activeOrder && (activeOrder.status === 'Saiu para entrega' || activeOrder.status === 'Saiu para Entrega');
        
        if (!isEnRoute) {
            showToast('O chat com o entregador só fica disponível quando o pedido sai para entrega! 🔒', 'ph-lock');
            state.activeChatChannel = 'rest';
            renderBuyerChats();
            return;
        }
        
        if (channelCourierBtn) channelCourierBtn.classList.add('active');
        if (channelRestBtn) channelRestBtn.classList.remove('active');
        if (headerTitle) headerTitle.textContent = 'Chat com o Entregador';
        if (headerIcon) headerIcon.className = 'ph ph-moped';
    }
    
    const storageKey = `kkj_chat_buyer_${channel}`;
    let chatData = [];
    try {
        chatData = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (!Array.isArray(chatData)) chatData = [];
    } catch (e) {
        console.warn('Dados do chat corrompidos, reinicializando:', e);
        chatData = [];
        localStorage.removeItem(storageKey);
    }
    
    if (chatData.length === 0) {
        if (channel === 'rest') {
            chatData = [
                { sender: 'other', text: 'Olá! Obrigado por comprar conosco. Como posso te ajudar?', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
            ];
        } else {
            chatData = [
                { sender: 'other', text: 'Olá! Sou seu entregador. Já estou a caminho da sua localização.', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
            ];
        }
        localStorage.setItem(storageKey, JSON.stringify(chatData));
    }
    
    container.innerHTML = chatData.map(msg => {
        if (!msg || typeof msg !== 'object') return '';
        return `
        <div class="message-bubble ${msg.sender === 'user' ? 'sent' : 'received'}">
            <p class="msg-text">${escapeHtml(msg.text || '')}</p>
            <span class="msg-time">${escapeHtml(msg.time || '')}</span>
        </div>
    `;
    }).join('');
    
    container.scrollTop = container.scrollHeight;
}

function switchBuyerChatChannel(channel) {
    state.activeChatChannel = channel;
    renderBuyerChats();
}

function sendBuyerChat() {
    const input = document.getElementById('buyer-chat-input');
    if (!input) return;
    
    const text = input.value.trim();
    if (!text) return;
    
    const channel = state.activeChatChannel;
    const storageKey = `kkj_chat_buyer_${channel}`;
    let chatData = [];
    try {
        chatData = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (!Array.isArray(chatData)) chatData = [];
    } catch (e) {
        chatData = [];
    }
    
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    chatData.push({ sender: 'user', text, time });
    localStorage.setItem(storageKey, JSON.stringify(chatData));
    
    input.value = '';
    renderBuyerChats();
    
    setTimeout(() => {
        let reply = '';
        if (channel === 'rest') {
            const replies = [
                'Seu pedido está sendo preparado com muito carinho! ❤️',
                'Estaremos enviando o mais breve possível.',
                'Qualquer alteração ou ingrediente especial pode nos avisar!',
                'Ok, anotado! 👍',
                'Obrigado pelo retorno!'
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
        } else {
            const replies = [
                'Vou deixar na portaria conforme solicitado.',
                'Chego em 5 minutos! 🛵',
                'Pode descer, já cheguei no endereço.',
                'Ok, sem problemas! Até já.'
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
        }
        
        let autoChatData = [];
        try {
            autoChatData = JSON.parse(localStorage.getItem(storageKey)) || [];
            if (!Array.isArray(autoChatData)) autoChatData = [];
        } catch (e) {
            autoChatData = [];
        }
        const replyTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        autoChatData.push({ sender: 'other', text: reply, time: replyTime });
        localStorage.setItem(storageKey, JSON.stringify(autoChatData));
        
        const buyerModal = document.getElementById('buyer-modal');
        const chatTab = document.getElementById('tab-buyer-chats');
        if (buyerModal && buyerModal.classList.contains('active') && chatTab && chatTab.classList.contains('active')) {
            renderBuyerChats();
            showToast('Nova mensagem recebida!', 'ph-chat-circle-text');
        }
    }, 3000);
}

function renderBuyerWallet() {
    const couponInfo = document.getElementById('active-coupon-info');
    const couponNameText = document.getElementById('active-coupon-name');
    
    if (state.activeCoupon) {
        if (couponInfo) couponInfo.style.display = 'flex';
        if (couponNameText) couponNameText.textContent = state.activeCoupon;
    } else {
        if (couponInfo) couponInfo.style.display = 'none';
    }
    
    renderBuyerCards();
}

function applyCoupon() {
    const input = document.getElementById('coupon-input');
    if (!input) return;
    
    const coupon = input.value.trim().toUpperCase();
    if (coupon === 'DESCONTO10') {
        state.activeCoupon = coupon;
        localStorage.setItem('kkj_active_coupon', JSON.stringify(coupon));
        showToast('Cupom "DESCONTO10" aplicado com sucesso! 10% de desconto.', 'ph-tag', true);
        input.value = '';
        renderBuyerWallet();
    } else {
        showToast('Cupom inválido ou expirado!', 'ph-warning');
    }
}

function removeCoupon() {
    state.activeCoupon = null;
    localStorage.removeItem('kkj_active_coupon');
    showToast('Cupom removido.', 'ph-trash');
    renderBuyerWallet();
}

function renderBuyerCards() {
    const list = document.getElementById('buyer-cards-list');
    if (!list) return;
    
    if (!Array.isArray(state.buyerCards)) {
        state.buyerCards = [];
    }
    
    list.innerHTML = state.buyerCards.map((card, idx) => {
        if (!card || typeof card !== 'object') return '';
        return `
        <div class="buyer-card-item">
            <i class="ph ph-credit-card"></i>
            <div class="card-info-text">
                <p>${escapeHtml(card.holder || 'Titular')}</p>
                <span>${escapeHtml(card.number || '****')} • Exp: ${escapeHtml(card.expiry || 'N/A')} (${escapeHtml(card.type || 'Cartão')})</span>
            </div>
            <button class="btn-delete-item" onclick="deleteBuyerCard(${idx})">
                <i class="ph ph-trash"></i>
            </button>
        </div>`;
    }).join('');
}

function addBuyerCard() {
    const numberEl = document.getElementById('card-number-input');
    const expiryEl = document.getElementById('card-expiry-input');
    const cvvEl = document.getElementById('card-cvv-input');
    const holderEl = document.getElementById('card-holder-input');
    
    const number = numberEl.value.trim();
    const expiry = expiryEl.value.trim();
    const cvv = cvvEl.value.trim();
    const holder = holderEl.value.trim().toUpperCase();
    
    if (number.length < 15 || expiry.length < 5 || cvv.length < 3 || !holder) {
        showToast('Preencha os dados do cartão corretamente.', 'ph-warning');
        return;
    }
    
    const type = number.startsWith('4') ? 'Visa' : number.startsWith('5') ? 'Mastercard' : 'Elo';
    const maskedNumber = '**** **** **** ' + number.slice(-4);
    
    state.buyerCards.push({ number: maskedNumber, holder, expiry, type });
    localStorage.setItem('kkj_buyer_cards', JSON.stringify(state.buyerCards));
    
    numberEl.value = '';
    expiryEl.value = '';
    cvvEl.value = '';
    holderEl.value = '';
    
    showToast('Cartão cadastrado com sucesso!', 'ph-check-circle', true);
    renderBuyerCards();
}

function deleteBuyerCard(index) {
    state.buyerCards.splice(index, 1);
    localStorage.setItem('kkj_buyer_cards', JSON.stringify(state.buyerCards));
    showToast('Cartão removido.', 'ph-trash');
    renderBuyerCards();
}

function renderBuyerSettings() {
    const nameInput = document.getElementById('buyer-cfg-name');
    const emailInput = document.getElementById('buyer-cfg-email');
    const telInput = document.getElementById('buyer-cfg-tel');
    
    if (nameInput && state.user) {
        nameInput.value = state.user.name;
        emailInput.value = state.user.email;
        telInput.value = state.user.tel || '11 99999-9999';
    }
    
    renderBuyerAddresses();
}

function saveBuyerProfile() {
    const nameInput = document.getElementById('buyer-cfg-name');
    const telInput = document.getElementById('buyer-cfg-tel');
    const currentPwInput = document.getElementById('buyer-cfg-password-current');
    const newPwInput = document.getElementById('buyer-cfg-password-new');
    
    const name = nameInput.value.trim();
    const tel = telInput.value.trim();
    const currentPw = currentPwInput.value.trim();
    const newPw = newPwInput.value.trim();
    
    if (!name) {
        showToast('Por favor, preencha seu nome.', 'ph-warning');
        return;
    }
    
    state.user.name = name;
    state.user.tel = tel;
    
    if (newPw) {
        if (!currentPw) {
            showToast('Por favor, informe a senha atual para alterá-la.', 'ph-warning');
            return;
        }
        if (currentPw !== state.user.password) {
            showToast('A senha atual inserida está incorreta.', 'ph-warning');
            return;
        }
        
        // ⚠️ REQUISITO GLOBAL DE SEGURANÇA: mínimo 8 dígitos
        if (newPw.length < 8) {
            const feedback = document.getElementById('buyer-senha-feedback');
            if (feedback) {
                feedback.style.display = 'block';
                feedback.style.background = '#fef2f2';
                feedback.style.border = '1px solid #fca5a5';
                feedback.style.color = '#ef4444';
                feedback.textContent = '🔴 A nova senha precisa de no mínimo 8 caracteres!';
            }
            showToast('A nova senha deve ter no mínimo 8 caracteres!', 'ph-warning');
            return;
        } else {
            const feedback = document.getElementById('buyer-senha-feedback');
            if (feedback) {
                feedback.style.display = 'none';
            }
        }
        
        state.user.password = newPw;
        showToast('Dados e senha atualizados com sucesso!', 'ph-check-circle', true);
    } else {
        showToast('Perfil atualizado com sucesso!', 'ph-check-circle', true);
    }
    
    currentPwInput.value = '';
    newPwInput.value = '';
    
    localStorage.setItem('kkj_user', JSON.stringify(state.user));
    updateProfileUI();
}

function renderBuyerAddresses() {
    const list = document.getElementById('buyer-addresses-list');
    if (!list) return;
    
    if (!Array.isArray(state.buyerAddresses)) {
        state.buyerAddresses = [];
    }
    
    list.innerHTML = state.buyerAddresses.map((addr, idx) => {
        if (!addr || typeof addr !== 'object') return '';
        return `
        <div class="address-item">
            <i class="ph ph-map-pin"></i>
            <div class="address-info-text">
                <p>${escapeHtml(addr.street || '')}, ${escapeHtml(addr.number || '')}</p>
                <span>${escapeHtml(addr.neighborhood || '')} ${addr.complement ? '— ' + escapeHtml(addr.complement) : ''}</span>
            </div>
            <div style="display:flex;">
                <button class="btn-edit-item" onclick="editBuyerAddress(${idx})">
                    <i class="ph ph-pencil"></i>
                </button>
                <button class="btn-delete-item" onclick="deleteBuyerAddress(${idx})">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
        </div>`;
    }).join('');
}

function editBuyerAddress(index) {
    const addr = state.buyerAddresses[index];
    if (!addr) return;
    
    document.getElementById('addr-street').value = addr.street;
    document.getElementById('addr-number').value = addr.number;
    document.getElementById('addr-neighborhood').value = addr.neighborhood;
    document.getElementById('addr-complement').value = addr.complement || '';
    
    editingAddressIndex = index;
    
    const btn = document.getElementById('btn-save-address');
    if (btn) btn.textContent = 'Atualizar Endereço';
}

function saveBuyerAddress() {
    const streetEl = document.getElementById('addr-street');
    const numberEl = document.getElementById('addr-number');
    const neighborhoodEl = document.getElementById('addr-neighborhood');
    const complementEl = document.getElementById('addr-complement');
    
    const street = streetEl.value.trim();
    const number = numberEl.value.trim();
    const neighborhood = neighborhoodEl.value.trim();
    const complement = complementEl.value.trim();
    
    if (!street || !number || !neighborhood) {
        showToast('Preencha todos os campos obrigatórios do endereço.', 'ph-warning');
        return;
    }
    
    const addressData = { street, number, neighborhood, complement };
    
    if (editingAddressIndex >= 0) {
        state.buyerAddresses[editingAddressIndex] = addressData;
        showToast('Endereço atualizado com sucesso!', 'ph-check-circle', true);
        editingAddressIndex = -1;
        const btn = document.getElementById('btn-save-address');
        if (btn) btn.textContent = 'Salvar Endereço';
    } else {
        state.buyerAddresses.push(addressData);
        showToast('Endereço adicionado com sucesso!', 'ph-check-circle', true);
    }
    
    localStorage.setItem('kkj_buyer_addresses', JSON.stringify(state.buyerAddresses));
    
    streetEl.value = '';
    numberEl.value = '';
    neighborhoodEl.value = '';
    complementEl.value = '';
    
    renderBuyerAddresses();
}

function deleteBuyerAddress(index) {
    state.buyerAddresses.splice(index, 1);
    localStorage.setItem('kkj_buyer_addresses', JSON.stringify(state.buyerAddresses));
    showToast('Endereço removido.', 'ph-trash');
    renderBuyerAddresses();
}

// =============================================================================
// SEARCH
// =============================================================================
function handleSearch(query) {
    if (state.isLoading) return;
    const q = query.toLowerCase().trim();
    if (!q) { renderAll(); return; }

    const filteredRestaurants = mockRestaurants.filter(r =>
        r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
    const filteredProducts = mockProducts.filter(p =>
        p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    renderRestaurants(filteredRestaurants);
    renderProducts(filteredProducts);
}

// =============================================================================
// TOAST NOTIFICATIONS
// =============================================================================
function showToast(message, iconClass, isFill = false) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="${isFill ? 'ph-fill' : 'ph'} ${iconClass}"></i>
        <span>${message}</span>
    `;

    elements.toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// =============================================================================
// UTILS
// =============================================================================
function formatCurrency(value) {
    return `R$ ${(value || 0).toFixed(2).replace('.', ',')}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// =============================================================================
// SISTEMA DE FEEDBACKS E AVALIAÇÕES (COMPRADOR E RESTAURANTE)
// =============================================================================
let currentRestaurantRating = 0;
let currentDishRating = 0;
let feedbackOrderId = null;

function openFeedbackModal(orderId) {
    feedbackOrderId = orderId;
    currentRestaurantRating = 0;
    currentDishRating = 0;
    
    // Limpar estrelas do restaurante
    const restStars = document.querySelectorAll('#rating-restaurant i');
    restStars.forEach(star => {
        star.className = 'ph ph-star';
        star.style.color = 'var(--border)';
    });
    
    // Limpar estrelas do prato
    const dishStars = document.querySelectorAll('#rating-dish i');
    dishStars.forEach(star => {
        star.className = 'ph ph-star';
        star.style.color = 'var(--border)';
    });
    
    // Limpar comentário
    const commentEl = document.getElementById('feedback-comment');
    if (commentEl) commentEl.value = '';
    
    openModal('feedback-modal');
}

function setRatingStars(type, value) {
    if (type === 'restaurant') {
        currentRestaurantRating = value;
        const stars = document.querySelectorAll('#rating-restaurant i');
        stars.forEach((star, idx) => {
            if (idx < value) {
                star.className = 'ph-fill ph-star';
                star.style.color = '#f59e0b';
            } else {
                star.className = 'ph ph-star';
                star.style.color = 'var(--border)';
            }
        });
    } else {
        currentDishRating = value;
        const stars = document.querySelectorAll('#rating-dish i');
        stars.forEach((star, idx) => {
            if (idx < value) {
                star.className = 'ph-fill ph-star';
                star.style.color = '#f59e0b';
            } else {
                star.className = 'ph ph-star';
                star.style.color = 'var(--border)';
            }
        });
    }
}

function submitFeedback() {
    if (currentRestaurantRating === 0 || currentDishRating === 0) {
        showToast('Por favor, dê uma nota de estrelas para o restaurante e para o prato.', 'ph-warning', false);
        return;
    }
    
    const commentEl = document.getElementById('feedback-comment');
    const comment = commentEl ? commentEl.value.trim() : '';
    
    const order = state.orders.find(o => o.id === feedbackOrderId);
    if (!order) {
        showToast('Erro ao identificar o pedido.', 'ph-warning', false);
        return;
    }
    
    const feedbackList = JSON.parse(localStorage.getItem('kkj_feedbacks')) || [];
    
    // Pegar nome dos pratos avaliados
    const pratosNomes = order.items.map(i => `${i.qty}x ${i.name}`).join(', ');
    
    const feedbackData = {
        id: Date.now(),
        orderId: feedbackOrderId,
        restaurantRating: currentRestaurantRating,
        dishRating: currentDishRating,
        comment: comment,
        dishes: pratosNomes,
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    feedbackList.push(feedbackData);
    localStorage.setItem('kkj_feedbacks', JSON.stringify(feedbackList));
    
    showToast('Muito obrigado por sua avaliação! ❤️', 'ph-check-circle', true);
    closeModals();
    
    // Re-renderizar se a aba de feedbacks estiver ativa ou na visão geral
    renderDashboardOverview();
}

function initFeedbacksTab() {
    const listContainer = document.getElementById('feedback-list');
    const avgRestEl = document.getElementById('feedback-avg-rest');
    const avgDishesEl = document.getElementById('feedback-avg-dishes');
    const totalCountEl = document.getElementById('feedback-total-count');
    
    if (!listContainer) return;
    
    const feedbackList = JSON.parse(localStorage.getItem('kkj_feedbacks')) || [];
    
    if (feedbackList.length === 0) {
        listContainer.innerHTML = '<p style="color:var(--text-secondary); text-align:center; padding:24px;">Nenhuma avaliação recebida ainda.</p>';
        if (avgRestEl) avgRestEl.textContent = '0.0 ⭐';
        if (avgDishesEl) avgDishesEl.textContent = '0.0 ⭐';
        if (totalCountEl) totalCountEl.textContent = '0';
        return;
    }
    
    // Média Geral
    const sumRest = feedbackList.reduce((sum, f) => sum + f.restaurantRating, 0);
    const sumDishes = feedbackList.reduce((sum, f) => sum + f.dishRating, 0);
    
    const avgRest = (sumRest / feedbackList.length).toFixed(1);
    const avgDishes = (sumDishes / feedbackList.length).toFixed(1);
    
    if (avgRestEl) avgRestEl.textContent = `${avgRest} ⭐`;
    if (avgDishesEl) avgDishesEl.textContent = `${avgDishes} ⭐`;
    if (totalCountEl) totalCountEl.textContent = feedbackList.length;
    
    listContainer.innerHTML = feedbackList.map(f => {
        // Estrelas Restaurante
        const restStarsHtml = Array.from({ length: 5 }, (_, i) => 
            `<i class="${i < f.restaurantRating ? 'ph-fill' : 'ph'} ph-star"></i>`
        ).join('');
        
        // Estrelas Prato
        const dishStarsHtml = Array.from({ length: 5 }, (_, i) => 
            `<i class="${i < f.dishRating ? 'ph-fill' : 'ph'} ph-star"></i>`
        ).join('');
        
        return `
            <div class="feedback-card">
                <div class="feedback-header">
                    <div>
                        <strong>Cliente Anônimo</strong>
                        <p class="feedback-item-info" style="margin-top: 2px;">
                            Itens: ${f.dishes}
                        </p>
                    </div>
                    <span class="feedback-date">${f.date}</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px; margin: 4px 0;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:12px; color:var(--text-secondary); width:80px;">Restaurante:</span>
                        <div class="feedback-stars">${restStarsHtml}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:12px; color:var(--text-secondary); width:80px;">Prato(s):</span>
                        <div class="feedback-stars" style="color:var(--accent);">${dishStarsHtml}</div>
                    </div>
                </div>
                ${f.comment ? `<p class="feedback-comment-text">"${f.comment}"</p>` : '<p class="feedback-comment-text" style="color:var(--text-secondary); font-style:italic;">Sem comentários adicionais.</p>'}
            </div>
        `;
    }).reverse().join('');
}

// =============================================================================
// INICIAR APLICAÇÃO
// =============================================================================
window.addEventListener('DOMContentLoaded', init);
