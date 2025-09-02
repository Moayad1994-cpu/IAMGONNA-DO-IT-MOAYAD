// Global Variables
let currentLanguage = 'en';
let isDarkMode = false;
let isLoggedIn = false;
let currentUser = null;
let services = [];
let visitorCount = 1247;
let onlineUsers = 23;

// Translation Data
const translations = {
    en: {
        'Services': 'Services',
        'About': 'About',
        'Contact': 'Contact',
        'Login': 'Login',
        'Sign In': 'Sign In',
        'Sign Up': 'Sign Up',
        'Start Your Project Now': 'Start Your Project Now',
        'Chat with Us': 'Chat with Us',
        'Visitors': 'Visitors',
        'Online Now': 'Online Now',
        'Projects Done': 'Projects Done',
        'Our Services': 'Our Services',
        'About Us': 'About Us',
        'Contact Us': 'Contact Us',
        'Call Us': 'Call Us',
        'Email Us': 'Email Us',
        'Visit Us': 'Visit Us',
        'All rights reserved.': 'All rights reserved.',
        'Powered by AI': 'Powered by AI',
        'Location: Abu Dhabi, Yas Island': 'Location: Abu Dhabi, Yas Island',
        'Email:': 'Email:',
        'Mobile Number:': 'Mobile Number:',
        'AI Assistant': 'AI Assistant',
        'Type your message...': 'Type your message...',
        'Send': 'Send',
        'Service Request': 'Service Request',
        'Complete Payment': 'Complete Payment',
        'Configure API Key': 'Configure API Key'
    },
    ar: {
        'Services': 'الخدمات',
        'About': 'من نحن',
        'Contact': 'تواصل معنا',
        'Login': 'تسجيل الدخول',
        'Sign In': 'تسجيل الدخول',
        'Sign Up': 'إنشاء حساب',
        'Start Your Project Now': 'ابدأ مشروعك الآن',
        'Chat with Us': 'تحدث معنا',
        'Visitors': 'زائر',
        'Online Now': 'متصل الآن',
        'Projects Done': 'مشروع مكتمل',
        'Our Services': 'خدماتنا',
        'About Us': 'من نحن',
        'Contact Us': 'تواصل معنا',
        'Call Us': 'اتصل بنا',
        'Email Us': 'راسلنا',
        'Visit Us': 'موقعنا',
        'All rights reserved.': 'جميع الحقوق محفوظة.',
        'Powered by AI': 'مدعوم بالذكاء الاصطناعي',
        'Location: Abu Dhabi, Yas Island': 'الموقع: أبو ظبي، جزيرة ياس',
        'Email:': 'البريد الإلكتروني:',
        'Mobile Number:': 'رقم الهاتف:',
        'AI Assistant': 'المساعد الذكي',
        'Type your message...': 'اكتب رسالتك...',
        'Send': 'إرسال',
        'Service Request': 'طلب خدمة',
        'Complete Payment': 'إتمام الدفع',
        'Configure API Key': 'تكوين مفتاح API'
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    renderServices();
    initThreeJS();
    updateVisitorStats();
    
    // Check if API key is configured
    if (!apiKey) {
        setTimeout(() => {
            openApiKeyModal();
        }, 2000);
    }
});

// Initialize website
function initializeWebsite() {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    currentLanguage = savedLanguage;
    isDarkMode = savedTheme === 'dark';
    
    // Apply saved settings
    updateLanguage();
    updateTheme();
}

// Setup event listeners
function setupEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    // Mobile menu toggle
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    
    // Login button
    document.getElementById('loginBtn').addEventListener('click', openAuthModal);
    
    // Search button
    document.getElementById('searchBtn').addEventListener('click', toggleSearch);
    
    // Chat input
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Auth form
    document.getElementById('authForm').addEventListener('submit', handleAuth);
    
    // Service request form
    document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        proceedToPayment();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Language functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    const isArabic = currentLanguage === 'ar';
    
    // Update document direction
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update logo and title
    const logoImg = document.getElementById('logoImg');
    const logoText = document.getElementById('logoText');
    const footerLogo = document.getElementById('footerLogo');
    const footerTitle = document.getElementById('footerTitle');
    
    if (isArabic) {
        logoImg.src = 'https://i.postimg.cc/rsqptqBH/logo-english.png';
        logoText.textContent = 'انا استطيع فعل اي شي';
        footerLogo.src = 'https://i.postimg.cc/rsqptqBH/logo-english.png';
        footerTitle.textContent = 'انا استطيع فعل اي شي';
    } else {
        logoImg.src = 'https://i.postimg.cc/rsqptqBH/logo-english.png';
        logoText.textContent = 'I Am Gonna Do It';
        footerLogo.src = 'https://i.postimg.cc/rsqptqBH/logo-english.png';
        footerTitle.textContent = 'I Am Gonna Do It';
    }
    
    // Update hero content
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroOverlayText = document.getElementById('heroOverlayText');
    
    if (isArabic) {
        heroTitle.textContent = 'انا استطيع فعل اي شي';
        heroSubtitle.textContent = 'إذا أنت ما عندك وقت احنا وقتك - نحقق أحلامك الرقمية بأحدث التقنيات والحلول المبتكرة';
        heroOverlayText.textContent = 'إذا أنت ما عندك وقت احنا وقتك';
    } else {
        heroTitle.textContent = 'I Am Gonna Do It';
        heroSubtitle.textContent = 'If you don\'t have time, we are your time - We make your digital dreams come true with the latest technologies and innovative solutions';
        heroOverlayText.textContent = 'If you don\'t have time, we are your time';
    }
    
    // Update welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (isArabic) {
        welcomeMessage.textContent = 'مرحباً! أنا مساعدك الذكي من شركة "انا استطيع فعل اي شي". بادارة مؤيد دغمش كيف  يمكنني مساعدتك في التعرف على خدماتنا والأسعار وطرق الدفع وكيفية الحجز. نحن موجودون في أبو ظبي، جزيرة ياس. كيف يمكنني مساعدتك اليوم؟';
    } else {
        welcomeMessage.textContent = 'Hello! I\'m your AI assistant from \'I Am Gonna Do It\' company managed by moayad dughmosh. how I can help you learn more about our services, pricing, payment methods, and how to book. We\'re located in Abu Dhabi, Yas Island. How can I help you today?';
    }
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.getAttribute('data-en');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(element => {
        const key = element.getAttribute('data-en-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Re-render services with new language
    renderServices();
}

// Theme functions
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateTheme();
}

function updateTheme() {
    const icon = document.getElementById('darkModeIcon');
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    } else {
        document.documentElement.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
    }
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Search functions
function toggleSearch() {
    const searchTerm = prompt(currentLanguage === 'ar' ? 'ابحث عن خدمة...' : 'Search for a service...');
    if (searchTerm) {
        searchServices(searchTerm);
    }
}

function searchServices(term) {
    const filteredServices = services.filter(service => {
        const name = currentLanguage === 'ar' ? service.nameAr : service.nameEn;
        const description = currentLanguage === 'ar' ? service.descriptionAr : service.descriptionEn;
        return name.toLowerCase().includes(term.toLowerCase()) || 
               description.toLowerCase().includes(term.toLowerCase());
    });
    
    renderServices(filteredServices);
    
    // Scroll to services section
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

// Services functions
async function renderServices(servicesToRender) {
    if (!servicesToRender) {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            if (data.success) {
                services = data.services;
                renderServices(services);
            } else {
                console.error('Error fetching services:', data.error);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
        return;
    }

    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    
    servicesToRender.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesGrid.appendChild(serviceCard);
    });
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card fade-in';
    
    const name = currentLanguage === 'ar' ? service.nameAr : service.nameEn;
    const description = currentLanguage === 'ar' ? service.descriptionAr : service.descriptionEn;
    
    card.innerHTML = `
        <div class="service-image">
            <img src="${service.image}" alt="${name}" class="service-img">
            <div class="service-price-badge">$${service.price}</div>
        </div>
        <div class="service-content">
            <h3 class="service-title">${name}</h3>
            <p class="service-description">${description}</p>
            <button class="service-btn" onclick="openServiceRequestModal('${service.id}')">
                <span>${currentLanguage === 'ar' ? 'اطلب الآن' : 'Order Now'}</span>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Modal functions
function openServiceRequestModal(serviceId = null) {
    const modal = document.getElementById('serviceRequestModal');
    const serviceSelect = document.getElementById('serviceSelect');
    
    // Populate service options
    serviceSelect.innerHTML = `<option value="">${currentLanguage === 'ar' ? 'اختر خدمة' : 'Select a service'}</option>`;
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${currentLanguage === 'ar' ? service.nameAr : service.nameEn} - $${service.price}`;
        option.dataset.price = service.price;
        serviceSelect.appendChild(option);
    });
    
    // Pre-select service if provided
    if (serviceId) {
        serviceSelect.value = serviceId;
        updateServicePrice();
    }
    
    modal.classList.add('active');
}

function closeServiceRequestModal() {
    document.getElementById('serviceRequestModal').classList.remove('active');
}

function updateServicePrice() {
    const serviceSelect = document.getElementById('serviceSelect');
    const servicePriceElement = document.getElementById('servicePrice');
    const customAmountInput = document.getElementById('customAmount');
    
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const basePrice = selectedOption.dataset.price || 0;
    const customAmount = customAmountInput.value || 0;
    
    const finalPrice = customAmount > 0 ? customAmount : basePrice;
    servicePriceElement.textContent = `$${finalPrice}`;
}

function proceedToPayment() {
    const form = document.getElementById('serviceRequestForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'serviceSelect', 'projectDescription'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
        return;
    }
    
    // Get service and price information
    const serviceSelect = document.getElementById('serviceSelect');
    const selectedService = services.find(s => s.id === serviceSelect.value);
    const customAmount = document.getElementById('customAmount').value;
    const finalPrice = customAmount || selectedService.price;
    
    // Update payment modal
    document.getElementById('paymentService').textContent = currentLanguage === 'ar' ? selectedService.nameAr : selectedService.nameEn;
    document.getElementById('paymentClient').textContent = document.getElementById('fullName').value;
    document.getElementById('paymentTotal').textContent = `$${finalPrice}`;
    
    // Update all payment method prices
    document.getElementById('coffeePrice').textContent = `$${finalPrice}`;
    document.getElementById('applePayPrice').textContent = `$${finalPrice}`;
    document.getElementById('cardPrice').textContent = `$${finalPrice}`;
    document.getElementById('qrPrice').textContent = `$${finalPrice}`;
    
    // Close service request modal and open payment modal
    closeServiceRequestModal();
    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

// Payment functions
function payWithCoffee() {
    const amount = document.getElementById('paymentTotal').textContent.replace('$', '');
    const coffeeUrl = `https://coff.ee/moayad_dughmosh?amount=${amount}`;
    window.open(coffeeUrl, '_blank');
    
    // Show success message
    setTimeout(() => {
        alert(currentLanguage === 'ar' ? 'شكراً لك! سنتواصل معك قريباً.' : 'Thank you! We will contact you soon.');
        closePaymentModal();
    }, 1000);
}

function payWithApplePay() {
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
        // Apple Pay implementation would go here
        alert(currentLanguage === 'ar' ? 'Apple Pay غير متاح حالياً. يرجى استخدام طريقة دفع أخرى.' : 'Apple Pay is not available. Please use another payment method.');
    } else {
        alert(currentLanguage === 'ar' ? 'Apple Pay غير مدعوم على هذا الجهاز.' : 'Apple Pay is not supported on this device.');
    }
}

function payWithCard() {
    // Stripe implementation would go here
    alert(currentLanguage === 'ar' ? 'سيتم توجيهك إلى صفحة الدفع الآمنة.' : 'You will be redirected to the secure payment page.');
    
    // Simulate payment process
    setTimeout(() => {
        alert(currentLanguage === 'ar' ? 'تم الدفع بنجاح! شكراً لك.' : 'Payment successful! Thank you.');
        closePaymentModal();
    }, 2000);
}

// Auth functions
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function switchAuthTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const nameGroup = document.getElementById('nameGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const authModalTitle = document.getElementById('authModalTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
    
    if (tab === 'signup') {
        nameGroup.style.display = 'block';
        confirmPasswordGroup.style.display = 'block';
        authModalTitle.textContent = currentLanguage === 'ar' ? 'إنشاء حساب' : 'Sign Up';
        authSubmitBtn.textContent = currentLanguage === 'ar' ? 'إنشاء حساب' : 'Sign Up';
    } else {
        nameGroup.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        authModalTitle.textContent = currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Sign In';
        authSubmitBtn.textContent = currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Sign In';
    }
}

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const isSignUp = document.querySelector('.auth-tab.active').textContent.includes('Sign Up') || 
                     document.querySelector('.auth-tab.active').textContent.includes('إنشاء حساب');
    
    if (isSignUp) {
        const name = document.getElementById('authName').value;
        const confirmPassword = document.getElementById('authConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert(currentLanguage === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return;
        }
        
        // Simulate sign up
        currentUser = { name, email };
        isLoggedIn = true;
        alert(currentLanguage === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
    } else {
        // Simulate sign in
        currentUser = { email };
        isLoggedIn = true;
        alert(currentLanguage === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Signed in successfully!');
    }
    
    updateLoginStatus();
    closeAuthModal();
}

function updateLoginStatus() {
    const loginBtn = document.getElementById('loginBtn');
    
    if (isLoggedIn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user-check"></i>
            <span>${currentUser.name || currentUser.email}</span>
        `;
        loginBtn.onclick = logout;
    } else {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
        `;
        loginBtn.onclick = openAuthModal;
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    updateLoginStatus();
    alert(currentLanguage === 'ar' ? 'تم تسجيل الخروج بنجاح!' : 'Logged out successfully!');
}

// Chat functions
function openChatBot() {
    if (!apiKey) {
        openApiKeyModal();
        return;
    }
    document.getElementById('chatModal').classList.add('active');
}

function closeChatBot() {
    document.getElementById('chatModal').classList.remove('active');
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    if (!apiKey) {
        alert(currentLanguage === 'ar' ? 'يرجى تكوين مفتاح API أولاً' : 'Please configure API key first');
        openApiKeyModal();
        return;
    }
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    const typingIndicator = addMessage(currentLanguage === 'ar' ? 'يكتب...' : 'Typing...', 'bot');
    
    try {
        // Call Gemini API
        const response = await callGeminiAPI(message);
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add bot response
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Chat error:', error);
        typingIndicator.remove();
        addMessage(
            currentLanguage === 'ar' ? 
            'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة على التواصل مباشرة مع مدير الموقع مؤيد دغمش على الواتس  +971545489973' :
            'Sorry, there was a connection error. Please try again or contact us directly at moayad dughmosh on whatsapp +971545489973',
            'bot'
        );
    }
}

function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageDiv;
}

async function callGeminiAPI(message) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            language: currentLanguage
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    if (!data.success) {
        throw new Error(data.error || 'API request failed');
    }
    
    return data.response;
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function updateVisitorStats() {
    // Simulate real-time updates
    setInterval(() => {
        visitorCount += Math.floor(Math.random() * 3);
        onlineUsers = Math.floor(Math.random() * 10) + 20;
        
        document.getElementById('visitorCount').textContent = `${visitorCount.toLocaleString()}+`;
        document.getElementById('onlineUsers').textContent = onlineUsers;
    }, 30000); // Update every 30 seconds
}

// Three.js 3D Background
function initThreeJS() {
    const container = document.getElementById('threejs-container');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create floating particles
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 2,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Create floating cubes
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    
    const cubes = [];
    for (let i = 0; i < 10; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        cube.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        scene.add(cube);
        cubes.push(cube);
    }
    
    // Create floating spheres
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.4
    });
    
    const spheres = [];
    for (let i = 0; i < 15; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60
        );
        scene.add(sphere);
        spheres.push(sphere);
    }
    
    camera.position.z = 30;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        // Animate cubes
        cubes.forEach(cube => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.position.y += Math.sin(Date.now() * 0.001 + cube.position.x) * 0.01;
        });
        
        // Animate spheres
        spheres.forEach(sphere => {
            sphere.position.x += Math.sin(Date.now() * 0.001 + sphere.position.y) * 0.02;
            sphere.position.z += Math.cos(Date.now() * 0.001 + sphere.position.x) * 0.02;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Call functionality with proper phone dialing
function makePhoneCall() {
    const phoneNumber = '+971545489973';
    
    // Check if device supports tel: protocol
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
        // Mobile device - use tel: protocol
        window.location.href = `tel:${phoneNumber}`;
    } else {
        // Desktop - show phone number and copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                alert(currentLanguage === 'ar' ? 
                    `تم نسخ رقم الهاتف: ${phoneNumber}` : 
                    `Phone number copied: ${phoneNumber}`);
            });
        } else {
            alert(currentLanguage === 'ar' ? 
                `رقم الهاتف: ${phoneNumber}` : 
                `Phone number: ${phoneNumber}`);
        }
    }
}

// Add click event to all call buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            makePhoneCall();
        });
    });
});

// Export functions for global access
window.openServiceRequestModal = openServiceRequestModal;
window.closeServiceRequestModal = closeServiceRequestModal;
window.updateServicePrice = updateServicePrice;
window.proceedToPayment = proceedToPayment;
window.closePaymentModal = closePaymentModal;
window.payWithCoffee = payWithCoffee;
window.payWithApplePay = payWithApplePay;
window.payWithCard = payWithCard;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.openChatBot = openChatBot;
window.closeChatBot = closeChatBot;
window.sendMessage = sendMessage;
window.openApiKeyModal = openApiKeyModal;
window.closeApiKeyModal = closeApiKeyModal;
window.saveApiKey = saveApiKey;
window.scrollToTop = scrollToTop;
window.makePhoneCall = makePhoneCall;
// This new function sends data to the backend first, then proceeds to payment.
async function submitRequestAndProceed() {
    const form = document.getElementById('serviceRequestForm');
    const button = form.querySelector('button[type="button"]');

    // 1. Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'serviceSelect', 'projectDescription'];
    let isValid = true;
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });

    if (!isValid) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
        return;
    }

    // Show loading state
    button.disabled = true;
    button.innerHTML = `<div class="spinner"></div> ${currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}`;


    // 2. Gather data
    const serviceSelect = document.getElementById('serviceSelect');
    const selectedService = services.find(s => s.id === serviceSelect.value);
    const customAmount = document.getElementById('customAmount').value;

    const requestData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        serviceId: serviceSelect.value,
        projectDescription: document.getElementById('projectDescription').value,
        timeline: document.getElementById('timeline').value,
        customAmount: customAmount || null,
    };

    try {
        // 3. Send data to Python backend
        const response = await fetch('/api/service-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Failed to submit request.');
        }

        // 4. On success, proceed to payment modal
        closeServiceRequestModal();
        const finalPrice = result.final_price;

        // Update payment modal
        document.getElementById('paymentService').textContent = currentLanguage === 'ar' ? selectedService.nameAr : selectedService.nameEn;
        document.getElementById('paymentClient').textContent = requestData.fullName;
        document.getElementById('paymentTotal').textContent = `$${finalPrice}`;
        document.getElementById('coffeePrice').textContent = `$${finalPrice}`;
        document.getElementById('applePayPrice').textContent = `$${finalPrice}`;
        document.getElementById('cardPrice').textContent = `$${finalPrice}`;
        document.getElementById('qrPrice').textContent = `$${finalPrice}`;
        
        document.getElementById('paymentModal').classList.add('active');


    } catch (error) {
        console.error('Submission Error:', error);
        alert(`${currentLanguage === 'ar' ? 'حدث خطأ أثناء إرسال طلبك: ' : 'Error submitting your request: '}` + error.message);
    } finally {
        // Restore button
        button.disabled = false;
        button.innerHTML = `<span data-en="Proceed to Payment" data-ar="المتابعة للدفع">${currentLanguage === 'ar' ? 'المتابعة للدفع' : 'Proceed to Payment'}</span>`;
    }
}


// You still need this old function to be called by the other button.
// Keep it, but its main logic is now in submitRequestAndProceed()
function proceedToPayment() {
    // This function is now just an alias for the new, more complete function.
    submitRequestAndProceed();
}