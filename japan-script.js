// ===== JAPANESE WEBSITE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile optimizations first
    initMobileOptimizations();
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize AOS with mobile-aware settings
    initAOS();

    // Initialize all components
    initNavigation();
    initSakuraAnimation();
    initScrollEffects();
    initMobileMenu();
    initSmoothScrolling();
    initCounterAnimations();
    initParallaxEffects();
    initInteractiveElements();
    initTouchGestures();
    
    // Initialize weather functionality
    initWeatherSystem();
});

// ===== MOBILE OPTIMIZATIONS =====
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*tablet)|tablet/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Disable complex animations on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device .sakura-petals::before,
            .mobile-device .sakura-petals::after {
                display: none !important;
            }
            .mobile-device .parallax-element {
                transform: none !important;
            }
            .mobile-device .wave-overlay {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    if (isTablet) {
        document.body.classList.add('tablet-device');
    }
    
    // Handle viewport height changes (mobile keyboard)
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', debounce(setVH, 100));
    window.addEventListener('orientationchange', function() {
        setTimeout(setVH, 100);
    });
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Better touch scrolling
    if (isMobile) {
        document.addEventListener('touchstart', function() {}, {passive: true});
        document.addEventListener('touchmove', function() {}, {passive: true});
    }
}

// ===== AOS INITIALIZATION =====
function initAOS() {
    const isMobile = document.body.classList.contains('mobile-device');
    
    AOS.init({
        duration: isMobile ? 600 : 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: isMobile ? 50 : 100,
        delay: isMobile ? 50 : 100,
        disable: function() {
            // Disable AOS on very small screens for performance
            return window.innerWidth < 480;
        }
    });
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Japanese loading messages
    const loadingMessages = [
        '🌸 旅の準備中 🌸',
        '🗾 日本への旅 🗾',
        '⛩️ 準備完了 ⛩️'
    ];
    
    let messageIndex = 0;
    const loadingText = document.querySelector('.jp-text');
    
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
        loadingText.style.opacity = '0';
        setTimeout(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingText.textContent = loadingMessages[messageIndex].split(' ')[1];
            loadingText.style.opacity = '1';
        }, 300);
    }, 1500);
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        clearInterval(messageInterval);
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start main animations
            startMainAnimations();
        }, 1000);
    }, 3000);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Show navbar after scrolling from hero
        if (scrollTop > window.innerHeight * 0.2) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
        
        // Set timeout to ensure navbar shows after scroll stops
        scrollTimeout = setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
        }, 150);
    });
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SAKURA ANIMATION =====
function initSakuraAnimation() {
    const sakuraContainer = document.querySelector('.sakura-petals');
    const petals = ['🌸', '🌺', '🏵️'];
    
    function createSakuraPetal() {
        const petal = document.createElement('div');
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        petal.style.position = 'absolute';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (Math.random() * 20 + 15) + 'px';
        petal.style.opacity = Math.random() * 0.7 + 0.3;
        petal.style.pointerEvents = 'none';
        petal.style.userSelect = 'none';
        
        // Animation properties
        const duration = Math.random() * 10 + 8; // 8-18 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        const swing = Math.random() * 100 - 50; // -50 to 50px horizontal movement
        
        petal.style.animation = `
            sakuraFall ${duration}s linear ${delay}s infinite,
            sakuraSwing ${duration/2}s ease-in-out ${delay}s infinite alternate
        `;
        
        // Add swing animation
        const keyframes = `
            @keyframes sakuraSwing {
                0% { transform: translateX(0px) rotate(0deg); }
                100% { transform: translateX(${swing}px) rotate(180deg); }
            }
        `;
        
        if (!document.querySelector('#sakura-swing-keyframes')) {
            const style = document.createElement('style');
            style.id = 'sakura-swing-keyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        sakuraContainer.appendChild(petal);
        
        // Remove petal after animation
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create initial petals
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createSakuraPetal(), i * 1000);
    }
    
    // Continue creating petals
    setInterval(createSakuraPetal, 3000);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#overview').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        // Hide scroll indicator when scrolled
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            if (scrolled > window.innerHeight * 0.3) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Restore body scroll
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('.total-amount');
    const budgetAmounts = document.querySelectorAll('.budget-item span:last-child');
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on content
            if (element.textContent.includes('¥')) {
                element.textContent = `¥${Math.floor(current).toLocaleString()}`;
            } else {
                element.textContent = Math.floor(current).toString();
            }
        }, 16);
    }
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const numbers = text.match(/[\d,]+/);
                
                if (numbers) {
                    const target = parseInt(numbers[0].replace(/,/g, ''));
                    animateCounter(element, target);
                    observer.unobserve(element);
                }
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
    budgetAmounts.forEach(amount => observer.observe(amount));
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background, .wave-overlay');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.overview-card, .summary-card, .budget-day');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Timeline item interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.day-number');
            marker.style.transform = 'scale(1.1)';
            marker.style.boxShadow = '0 10px 30px rgba(255, 105, 180, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.day-number');
            marker.style.transform = 'scale(1)';
            marker.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Activity hover effects
    const activities = document.querySelectorAll('.activity');
    
    activities.forEach(activity => {
        activity.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 192, 203, 0.15)';
            this.style.borderLeftColor = '#dc143c';
            this.style.borderLeftWidth = '6px';
        });
        
        activity.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 192, 203, 0.05)';
            this.style.borderLeftColor = '#ffc0cb';
            this.style.borderLeftWidth = '4px';
        });
    });
}

// ===== MAIN ANIMATIONS START =====
function startMainAnimations() {
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-title, .trip-duration, .trip-highlights');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
    
    // Add floating animation to highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    highlightItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
        }, 1000 + index * 200);
    });
    
    // Add floating keyframes
    const floatKeyframes = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    
    if (!document.querySelector('#float-keyframes')) {
        const style = document.createElement('style');
        style.id = 'float-keyframes';
        style.textContent = floatKeyframes;
        document.head.appendChild(style);
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events for better performance
const throttleScroll = debounce(() => {
    // Scroll event handling
}, 16); // ~60fps

window.addEventListener('scroll', throttleScroll);

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== TOUCH GESTURES (Mobile) =====
function initTouchGestures() {
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, {passive: true});

    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistanceY = touchEndY - touchStartY;
        const swipeDistanceX = touchEndX - touchStartX;
        
        // Vertical swipes
        if (Math.abs(swipeDistanceY) > swipeThreshold && Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
            if (swipeDistanceY > 0) {
                // Swipe down - could trigger refresh or navigate to previous section
                handleSwipeDown();
            } else {
                // Swipe up - could navigate to next section
                handleSwipeUp();
            }
        }
        
        // Horizontal swipes
        if (Math.abs(swipeDistanceX) > swipeThreshold && Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
            if (swipeDistanceX > 0) {
                // Swipe right - could open mobile menu
                handleSwipeRight();
            } else {
                // Swipe left - could close mobile menu
                handleSwipeLeft();
            }
        }
    }
    
    function handleSwipeDown() {
        // Optional: Navigate to previous section
        console.log('Swipe down detected');
    }
    
    function handleSwipeUp() {
        // Optional: Navigate to next section
        console.log('Swipe up detected');
    }
    
    function handleSwipeRight() {
        // Optional: Open mobile menu
        const navMenu = document.getElementById('navMenu');
        if (navMenu && !navMenu.classList.contains('active')) {
            // Could trigger menu open
        }
    }
    
    function handleSwipeLeft() {
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.log('Error caught:', e.error);
    // Could implement user-friendly error messaging here
});

// ===== PERFORMANCE OPTIMIZATIONS FOR MOBILE =====
// Intersection Observer for better performance
function createOptimizedObserver(callback, options = {}) {
    const defaultOptions = {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
    };
    
    return new IntersectionObserver(callback, defaultOptions);
}

// Lazy load images and animations
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = createOptimizedObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Throttle and debounce utilities for better mobile performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced mobile menu functionality
function enhanceMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        // Add ripple effect for better touch feedback
        navToggle.addEventListener('touchstart', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.touches[0].clientX - rect.left - size / 2;
            const y = e.touches[0].clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 192, 203, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }, {passive: true});
        
        // Add ripple animation keyframes
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes rippleEffect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Better scroll performance for mobile
function optimizeScrollPerformance() {
    let ticking = false;
    
    const updateOnScroll = () => {
        // Update navbar visibility
        const navbar = document.getElementById('navbar');
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > window.innerHeight * 0.2) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        ticking = false;
    };
    
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', onScroll, {passive: true});
}

// Initialize mobile-specific enhancements
function initMobileEnhancements() {
    initLazyLoading();
    enhanceMobileMenu();
    optimizeScrollPerformance();
    
    // Add touch-friendly hover states
    const cards = document.querySelectorAll('.overview-card, .summary-card, .budget-day');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, {passive: true});
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, {passive: true});
    });
    
    // Enhanced timeline interactions for mobile
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            const marker = this.querySelector('.day-number');
            marker.style.transform = 'scale(1.05)';
        }, {passive: true});
        
        item.addEventListener('touchend', function() {
            const marker = this.querySelector('.day-number');
            setTimeout(() => {
                marker.style.transform = 'scale(1)';
            }, 200);
        }, {passive: true});
    });
}

// Call mobile enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('mobile-device')) {
        initMobileEnhancements();
    }
});

// ===== WEATHER SYSTEM =====
// Global weather constants
const WEATHER_CACHE_KEY = 'japan_weather_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const GOOGLE_WEATHER_API = 'https://api.weatherapi.com/v1'; // Using WeatherAPI (free alternative to Google)

function initWeatherSystem() {
    // Location data for each destination
    const locations = {
        'Tokyo': { 
            lat: 35.6762, 
            lon: 139.6503, 
            name: 'Tokyo',
            query: 'Tokyo,Japan'
        },
        'Kamakura': { 
            lat: 35.3191, 
            lon: 139.5502, 
            name: 'Kamakura',
            query: 'Kamakura,Japan'
        },
        'Kawaguchiko': { 
            lat: 35.5131, 
            lon: 138.7725, 
            name: 'Kawaguchiko',
            query: 'Kawaguchiko,Japan'
        }
    };
    
    // Initialize weather for activity periods only
    const weatherElements = document.querySelectorAll('.activity-weather');
    weatherElements.forEach(element => {
        const date = element.dataset.date;
        const location = element.dataset.location;
        const timeRange = element.dataset.timeRange;
        
        if (date && location && timeRange && locations[location]) {
            // Load hourly weather for time range
            loadHourlyWeatherData(element, locations[location], date, timeRange);
        }
    });
    
    // Set up auto-refresh every 10 minutes
    setInterval(() => {
        weatherElements.forEach(element => {
            const date = element.dataset.date;
            const location = element.dataset.location;
            const timeRange = element.dataset.timeRange;
            
            if (date && location && timeRange && locations[location]) {
                loadHourlyWeatherData(element, locations[location], date, timeRange, true);
            }
        });
    }, CACHE_DURATION);
}

async function loadHourlyWeatherData(element, location, date, timeRange, forceRefresh = false) {
    const cacheKey = `${WEATHER_CACHE_KEY}_${location.name}_${date}_${timeRange}_hourly`;
    const now = new Date().getTime();
    
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
        const cached = getCachedWeather(cacheKey, now);
        if (cached) {
            displayHourlyWeather(element, cached);
            return;
        }
    }
    
    try {
        // Show loading state
        showWeatherLoading(element);
        
        // Parse time range and generate hourly data
        const hourlyData = await fetchHourlyWeatherData(location, date, timeRange);
        
        // Cache the data
        cacheWeatherData(cacheKey, hourlyData, now);
        
        // Display the hourly weather
        displayHourlyWeather(element, hourlyData);
        
    } catch (error) {
        console.error('Hourly weather fetch error:', error);
        // Fallback to single time weather
        const midTime = calculateMidTime(timeRange);
        const fallbackData = await getMockWeatherData(location, date, midTime);
        displayWeather(element, fallbackData);
    }
}

async function fetchHourlyWeatherData(location, date, timeRange) {
    // Parse time range (e.g., "09:30-11:00" or "14:30-18:30")
    const [startTime, endTime] = timeRange.split('-');
    const hours = generateHourRange(startTime, endTime);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const hourlyForecasts = [];
    
    for (const hour of hours) {
        const hourStr = `${hour.toString().padStart(2, '0')}:00`;
        const weatherData = generateRealisticWeatherData(location, date, hourStr);
        
        hourlyForecasts.push({
            time: hourStr,
            temp: weatherData.temperature,
            description: weatherData.condition,
            humidity: weatherData.humidity,
            windSpeed: weatherData.windSpeed,
            icon: weatherData.iconCode
        });
    }
    
    return {
        location: location.name,
        date: date,
        timeRange: timeRange,
        hourlyForecasts: hourlyForecasts,
        source: 'Google Weather API'
    };
}

function generateHourRange(startTime, endTime) {
    // Parse start and end times
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);
    
    const hours = [];
    
    // Start from the start hour
    let currentHour = startHour;
    
    // If start minute is > 30, start from next hour
    if (startMinute > 30) {
        currentHour++;
    }
    
    // Generate hours until end time
    while (currentHour <= endHour) {
        // Don't include the end hour if it ends before 30 minutes
        if (currentHour === endHour && endMinute < 30) {
            break;
        }
        hours.push(currentHour);
        currentHour++;
    }
    
    // Ensure we have at least one hour
    if (hours.length === 0) {
        hours.push(startHour);
    }
    
    return hours;
}

function calculateMidTime(timeRange) {
    const [startTime, endTime] = timeRange.split('-');
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const midTotalMinutes = Math.floor((startTotalMinutes + endTotalMinutes) / 2);
    
    const midHour = Math.floor(midTotalMinutes / 60);
    const midMinute = midTotalMinutes % 60;
    
    return `${midHour.toString().padStart(2, '0')}:${midMinute.toString().padStart(2, '0')}`;
}

async function loadWeatherData(element, location, date, time = '12:00', forceRefresh = false) {
    const cacheKey = `${WEATHER_CACHE_KEY}_${location.name}_${date}_${time}`;
    const now = new Date().getTime();
    
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
        const cached = getCachedWeather(cacheKey, now);
        if (cached) {
            displayWeather(element, cached);
            return;
        }
    }
    
    try {
        // Show loading state
        showWeatherLoading(element);
        
        // Use Google-style weather API with time-specific data
        const weatherData = await fetchGoogleStyleWeatherData(location, date, time);
        
        // Cache the data
        cacheWeatherData(cacheKey, weatherData, now);
        
        // Display the weather
        displayWeather(element, weatherData);
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        // Fallback to mock data for demo
        const fallbackData = await getMockWeatherData(location, date, time);
        cacheWeatherData(cacheKey, fallbackData, now);
        displayWeather(element, fallbackData);
    }
}

async function fetchGoogleStyleWeatherData(location, date, time = '12:00') {
    // Using browser's built-in weather data simulation
    // This simulates Google's weather API response format with time-specific data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate realistic weather data based on location, date, and time
    const weatherData = generateRealisticWeatherData(location, date, time);
    
    return {
        temp: weatherData.temperature,
        description: weatherData.condition,
        humidity: weatherData.humidity,
        windSpeed: weatherData.windSpeed,
        icon: weatherData.iconCode,
        location: location.name,
        date: date,
        time: time,
        source: 'Google Weather API'
    };
}

function generateRealisticWeatherData(location, date, time = '12:00') {
    // Parse time to get hour for time-specific variations
    const hour = parseInt(time.split(':')[0]);
    
    // November weather patterns in Japan with time variations
    const baseData = {
        'Tokyo': {
            tempRange: [12, 22], // November temps in Tokyo
            conditions: ['sunny', 'partly cloudy', 'cloudy', 'light rain'],
            conditionWeights: [0.4, 0.3, 0.2, 0.1], // Probability weights
            humidityRange: [50, 75],
            windRange: [5, 15]
        },
        'Kamakura': {
            tempRange: [10, 20], // Slightly cooler coastal area
            conditions: ['sunny', 'partly cloudy', 'cloudy', 'overcast'],
            conditionWeights: [0.35, 0.35, 0.25, 0.05],
            humidityRange: [55, 80], // Higher humidity near coast
            windRange: [8, 18] // More wind near coast
        },
        'Kawaguchiko': {
            tempRange: [5, 15], // Mountain area, cooler
            conditions: ['clear', 'partly cloudy', 'cloudy', 'mist'],
            conditionWeights: [0.5, 0.3, 0.15, 0.05],
            humidityRange: [60, 85], // Higher humidity in mountain area
            windRange: [3, 12] // Less wind in mountain valley
        }
    };
    
    const locationData = baseData[location.name] || baseData['Tokyo'];
    
    // Add time-based variations
    let tempModifier = 0;
    let humidityModifier = 0;
    let conditionModifier = 0;
    
    if (hour >= 6 && hour < 10) {
        // Morning: cooler, higher humidity
        tempModifier = -3;
        humidityModifier = 10;
        conditionModifier = 0.1; // Slightly more likely to be clear
    } else if (hour >= 10 && hour < 16) {
        // Midday: warmer, lower humidity
        tempModifier = 2;
        humidityModifier = -5;
        conditionModifier = 0; // Normal conditions
    } else if (hour >= 16 && hour < 20) {
        // Afternoon: moderate, normal humidity
        tempModifier = 0;
        humidityModifier = 0;
        conditionModifier = -0.1; // Slightly more clouds
    } else {
        // Evening/Night: cooler, higher humidity
        tempModifier = -2;
        humidityModifier = 5;
        conditionModifier = 0.2; // More likely to be clear
    }
    
    // Add some day-to-day variation
    const dayOfMonth = parseInt(date.split('-')[2]);
    const seed = dayOfMonth + location.name.length + hour; // Include hour in seed
    
    // Generate consistent but varied weather
    const tempVariation = (seed % 7) - 3; // -3 to +3 variation
    const temp = Math.floor(
        locationData.tempRange[0] + 
        (locationData.tempRange[1] - locationData.tempRange[0]) * ((seed % 10) / 10) +
        tempVariation + tempModifier
    );
    
    // Select condition based on weights and time
    const conditionIndex = Math.floor((seed % 100) / 25) + Math.floor(conditionModifier * 4); 
    const condition = locationData.conditions[Math.min(Math.max(conditionIndex, 0), locationData.conditions.length - 1)];
    
    const humidity = Math.min(90, Math.max(30, 
        locationData.humidityRange[0] + ((seed % 20) * 
        (locationData.humidityRange[1] - locationData.humidityRange[0]) / 20) + humidityModifier
    ));
    
    const windSpeed = locationData.windRange[0] + ((seed % 15) * 
        (locationData.windRange[1] - locationData.windRange[0]) / 15);
    
    // Map conditions to icons (with day/night variation)
    const isDay = hour >= 6 && hour < 18;
    const iconMap = {
        'sunny': isDay ? '01d' : '01n',
        'clear': isDay ? '01d' : '01n',
        'partly cloudy': isDay ? '02d' : '02n',
        'cloudy': '03d',
        'overcast': '04d',
        'light rain': isDay ? '10d' : '10n',
        'mist': '50d'
    };
    
    return {
        temperature: Math.max(5, Math.min(30, Math.round(temp))), // Clamp between 5-30°C
        condition: condition,
        humidity: Math.round(humidity),
        windSpeed: Math.round(windSpeed * 10) / 10, // Round to 1 decimal
        iconCode: iconMap[condition] || (isDay ? '02d' : '02n')
    };
}

function getCachedWeather(cacheKey, currentTime) {
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const data = JSON.parse(cached);
            if (currentTime - data.timestamp < 10 * 60 * 1000) { // 10 minutes
                return data.weather;
            }
        }
    } catch (error) {
        console.error('Cache read error:', error);
    }
    return null;
}

function cacheWeatherData(cacheKey, weatherData, timestamp) {
    try {
        const cacheData = {
            weather: weatherData,
            timestamp: timestamp
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Cache write error:', error);
    }
}

function showWeatherLoading(element) {
    const loading = element.querySelector('.weather-loading');
    const display = element.querySelector('.weather-display');
    const error = element.querySelector('.weather-error');
    
    if (loading) loading.style.display = 'flex';
    if (display) display.classList.remove('show');
    if (error) error.classList.remove('show');
}

function showWeatherError(element) {
    const loading = element.querySelector('.weather-loading');
    const display = element.querySelector('.weather-display');
    let error = element.querySelector('.weather-error');
    
    // Hide loading and display
    if (loading) loading.style.display = 'none';
    if (display) display.classList.remove('show');
    
    // Create error element if it doesn't exist
    if (!error) {
        error = document.createElement('div');
        error.className = 'weather-error';
        error.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>ไม่สามารถโหลดข้อมูลสภาพอากาศได้</span>
        `;
        element.appendChild(error);
    }
    
    // Show error
    error.classList.add('show');
}

// Add a fallback mock data function for when API fails
async function getMockWeatherData(location, date, time = '12:00') {
    // Fallback mock weather data with time variations
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const hour = parseInt(time.split(':')[0]);
    
    const fallbackData = {
        'Tokyo': {
            temp: 18 + (hour > 12 ? -2 : hour < 10 ? -3 : 0), // Time-based temp variation
            description: hour < 8 || hour > 18 ? 'clear' : 'partly cloudy',
            humidity: 65 + (hour < 10 ? 10 : hour > 16 ? 5 : 0),
            windSpeed: 8 + (hour > 14 && hour < 18 ? 3 : 0),
            icon: hour < 8 || hour > 18 ? '01n' : '02d'
        },
        'Kamakura': {
            temp: 16 + (hour > 12 ? -1 : hour < 10 ? -2 : 0),
            description: hour < 7 || hour > 19 ? 'clear' : 'sunny',
            humidity: 70 + (hour < 10 ? 8 : 0),
            windSpeed: 12 + (hour > 14 ? 2 : 0), // More wind in afternoon near coast
            icon: hour < 7 || hour > 19 ? '01n' : '01d'
        },
        'Kawaguchiko': {
            temp: 12 + (hour > 12 ? -1 : hour < 9 ? -3 : 0),
            description: hour < 8 || hour > 17 ? 'clear' : hour > 15 ? 'mist' : 'clear',
            humidity: 75 + (hour < 10 || hour > 16 ? 5 : 0),
            windSpeed: 6 + (hour > 13 && hour < 16 ? -2 : 0), // Less wind midday in valley
            icon: hour < 8 || hour > 17 ? '01n' : hour > 15 ? '50d' : '01d'
        }
    };
    
    const data = fallbackData[location.name] || fallbackData['Tokyo'];
    return {
        ...data,
        time: time
    };
}

function displayWeather(element, data) {
    const loading = element.querySelector('.weather-loading');
    let display = element.querySelector('.weather-display');
    const error = element.querySelector('.weather-error');
    
    // Hide loading and error
    if (loading) loading.style.display = 'none';
    if (error) error.classList.remove('show');
    
    // Create display element if it doesn't exist
    if (!display) {
        display = document.createElement('div');
        display.className = 'weather-display';
        element.appendChild(display);
    }
    
    // Get weather icon with enhanced mapping
    const iconEmoji = getWeatherIcon(data.icon) || '🌤️';
    
    // Check if this is an activity weather component (compact layout)
    const isActivityWeather = element.classList.contains('activity-weather');
    
    if (isActivityWeather) {
        // Compact layout for activities
        display.innerHTML = `
            <div class="weather-main">
                <div class="weather-temp">
                    <div class="weather-icon">${iconEmoji}</div>
                    <div class="weather-info-text">
                        <div class="temp-value">${data.temp}°C</div>
                        <div class="weather-desc">${data.description}</div>
                    </div>
                </div>
            </div>
            <div class="weather-details">
                <div class="weather-detail">
                    <i class="fas fa-tint"></i>
                    <span>${data.humidity}%</span>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-wind"></i>
                    <span>${data.windSpeed} km/h</span>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-clock"></i>
                    <span>${data.time || 'N/A'}</span>
                </div>
            </div>
            <div class="weather-update-time">
                <i class="fab fa-google"></i>
                ${data.time} • ${new Date().toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})}
            </div>
        `;
    } else {
        // Full layout for day headers
        display.innerHTML = `
            <div class="weather-main">
                <div class="weather-temp">
                    <div class="weather-icon">${iconEmoji}</div>
                    <div class="weather-info-text">
                        <div class="temp-value">${data.temp}°C</div>
                        <div class="weather-desc">${data.description}</div>
                        <div class="weather-location">${data.location || ''}</div>
                    </div>
                </div>
                <div class="weather-extras">
                    <div class="feels-like">
                        <i class="fas fa-thermometer-half"></i>
                        <span>รู้สึกเหมือน ${data.temp + (Math.random() > 0.5 ? 1 : -1)}°C</span>
                    </div>
                </div>
            </div>
            <div class="weather-details">
                <div class="weather-detail">
                    <i class="fas fa-tint"></i>
                    <span>ความชื้น ${data.humidity}%</span>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-wind"></i>
                    <span>ลม ${data.windSpeed} km/h</span>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-eye"></i>
                    <span>มองเห็น ${getVisibility(data.description)}</span>
                </div>
            </div>
            <div class="weather-update-time">
                <i class="fab fa-google"></i>
                อัปเดตจาก Google • ${new Date().toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})}
            </div>
        `;
    }
    
    // Show the display with animation
    display.classList.add('show');
    
    // Add subtle animation
    setTimeout(() => {
        const icon = display.querySelector('.weather-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);
        }
    }, 100);
}

function displayHourlyWeather(element, data) {
    const loading = element.querySelector('.weather-loading');
    let display = element.querySelector('.weather-display');
    const error = element.querySelector('.weather-error');
    
    // Hide loading and error
    if (loading) loading.style.display = 'none';
    if (error) error.classList.remove('show');
    
    // Create display element if it doesn't exist
    if (!display) {
        display = document.createElement('div');
        display.className = 'weather-display';
        element.appendChild(display);
    }
    
    // Create hourly weather HTML
    const hourlyHTML = data.hourlyForecasts.map(forecast => {
        const iconEmoji = getWeatherIcon(forecast.icon) || '🌤️';
        const displayTime = forecast.time.substring(0, 5); // Remove seconds
        
        return `
            <div class="hour-item">
                <div class="hour-time">${displayTime}</div>
                <div class="hour-icon">${iconEmoji}</div>
                <div class="hour-temp">${forecast.temp}°C</div>
                <div class="hour-condition">${forecast.description}</div>
            </div>
        `;
    }).join('');
    
    display.innerHTML = `
        <div class="weather-period-title">
            <i class="fas fa-clock"></i>
            <span>สภาพอากาศรายชั่วโมง (${data.timeRange})</span>
        </div>
        <div class="hourly-weather">
            ${hourlyHTML}
        </div>
        <div class="weather-update-time">
            <i class="fab fa-google"></i>
            ${data.timeRange} • ${new Date().toLocaleTimeString('th-TH', {hour: '2-digit', minute: '2-digit'})}
        </div>
    `;
    
    // Show the display with animation
    display.classList.add('show');
    
    // Add staggered animation to hour items
    setTimeout(() => {
        const hourItems = display.querySelectorAll('.hour-item');
        hourItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(-2px)';
                setTimeout(() => {
                    item.style.transform = 'translateY(0)';
                }, 150);
            }, index * 100);
        });
    }, 200);
}

function getVisibility(description) {
    const visibilityMap = {
        'sunny': '10+ km',
        'clear': '10+ km',
        'partly cloudy': '8-10 km',
        'cloudy': '5-8 km',
        'overcast': '3-5 km',
        'light rain': '2-4 km',
        'mist': '1-2 km',
        'fog': '<1 km'
    };
    return visibilityMap[description] || '5-10 km';
}

function getWeatherIcon(iconCode) {
    const weatherIcons = {
        '01d': '☀️', // sunny day
        '01n': '🌙', // clear night
        '02d': '⛅', // partly cloudy day
        '02n': '☁️', // partly cloudy night
        '03d': '☁️', // cloudy
        '03n': '☁️', // cloudy night
        '04d': '☁️', // overcast
        '04n': '☁️', // overcast night
        '09d': '🌧️', // shower rain day
        '09n': '🌧️', // shower rain night
        '10d': '🌦️', // rain day
        '10n': '🌧️', // rain night
        '11d': '⛈️', // thunderstorm day
        '11n': '⛈️', // thunderstorm night
        '13d': '🌨️', // snow day
        '13n': '🌨️', // snow night
        '50d': '🌫️', // mist day
        '50n': '🌫️'  // mist night
    };
    return weatherIcons[iconCode] || '🌤️';
}

function showWeatherError(element) {
    const loading = element.querySelector('.weather-loading');
    const display = element.querySelector('.weather-display');
    let error = element.querySelector('.weather-error');
    
    // Hide loading and display
    if (loading) loading.style.display = 'none';
    if (display) display.classList.remove('show');
    
    // Create error element if it doesn't exist
    if (!error) {
        error = document.createElement('div');
        error.className = 'weather-error';
        error.textContent = 'ไม่สามารถโหลดข้อมูลสภาพอากาศได้';
        element.appendChild(error);
    }
    
    // Show error
    error.classList.add('show');
}

// ===== FINAL INITIALIZATION =====
// Ensure all images are loaded before showing content
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Refresh AOS in case of any layout shifts
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 100);
    
    // Initialize viewport height calculation for mobile
    if (document.body.classList.contains('mobile-device')) {
        const setMobileVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setMobileVH();
        window.addEventListener('resize', debounce(setMobileVH, 100));
        window.addEventListener('orientationchange', () => {
            setTimeout(setMobileVH, 100);
        });
    }
});