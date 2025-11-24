// ============================================
// ヘッダー・ハンバーガーメニュー
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const headerNav = document.getElementById('header-nav');
    
    if (hamburger && headerNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            headerNav.classList.toggle('active');
        });
        
        // メニューリンクをクリックしたらメニューを閉じる
        const navLinks = headerNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                headerNav.classList.remove('active');
            });
        });
        
        // メニュー外をクリックしたらメニューを閉じる
        document.addEventListener('click', function(e) {
            if (!headerNav.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    }
    
    // スクロール時のヘッダー背景変更
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(26, 35, 50, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.background = 'rgba(26, 35, 50, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});

// ============================================
// Swiper.js 初期化
// ============================================

// 利用者の声スライダー
const voicesSwiper = new Swiper('.voices-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.voices-swiper .swiper-button-next',
        prevEl: '.voices-swiper .swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// 比較実績スライダー
const resultsSwiper = new Swiper('.results-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.results-swiper .swiper-button-next',
        prevEl: '.results-swiper .swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// ============================================
// FAQ アコーディオン機能
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 他のFAQアイテムを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // クリックされたアイテムの開閉を切り替え
            item.classList.toggle('active');
        });
    });
});

// ============================================
// フォームバリデーション
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const telInput = document.getElementById('tel');
    const privacyCheckbox = document.getElementById('privacy');
    
    // エラーメッセージ表示関数
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        input.classList.add('error');
        errorMessage.textContent = message;
    }
    
    // エラーメッセージクリア関数
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        input.classList.remove('error');
        errorMessage.textContent = '';
    }
    
    // 氏名バリデーション
    nameInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value === '') {
            showError(this, '氏名を入力してください');
        } else if (value.length < 2) {
            showError(this, '氏名は2文字以上で入力してください');
        } else {
            clearError(this);
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });
    
    // メールアドレスバリデーション
    emailInput.addEventListener('blur', function() {
        const value = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(this, 'メールアドレスを入力してください');
        } else if (!emailRegex.test(value)) {
            showError(this, '正しいメールアドレスを入力してください');
        } else {
            clearError(this);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });
    
    // 電話番号バリデーション（任意項目）
    telInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value !== '') {
            const telRegex = /^[0-9-]+$/;
            if (!telRegex.test(value)) {
                showError(this, '正しい電話番号を入力してください（ハイフン含む）');
            } else {
                clearError(this);
            }
        } else {
            clearError(this);
        }
    });
    
    telInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearError(this);
        }
    });
    
    // 個人情報同意チェックボックスバリデーション
    privacyCheckbox.addEventListener('change', function() {
        const formGroup = this.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (!this.checked) {
            errorMessage.textContent = '個人情報の取り扱いに同意してください';
        } else {
            errorMessage.textContent = '';
        }
    });
    
    // フォーム送信時のバリデーション
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // 氏名チェック
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            showError(nameInput, '氏名を入力してください');
            isValid = false;
        } else if (nameValue.length < 2) {
            showError(nameInput, '氏名は2文字以上で入力してください');
            isValid = false;
        }
        
        // メールアドレスチェック
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            showError(emailInput, 'メールアドレスを入力してください');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, '正しいメールアドレスを入力してください');
            isValid = false;
        }
        
        // 電話番号チェック（任意項目）
        const telValue = telInput.value.trim();
        if (telValue !== '') {
            const telRegex = /^[0-9-]+$/;
            if (!telRegex.test(telValue)) {
                showError(telInput, '正しい電話番号を入力してください（ハイフン含む）');
                isValid = false;
            }
        }
        
        // 個人情報同意チェック
        if (!privacyCheckbox.checked) {
            const formGroup = privacyCheckbox.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            errorMessage.textContent = '個人情報の取り扱いに同意してください';
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
            // エラーがある最初のフィールドにスクロール
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});

// ============================================
// スムーススクロール（CTAボタン）
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('a[href="#contact"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ============================================
// 画像の遅延読み込み（Lazy Loading）
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    // ネイティブのlazy loadingをサポートしている場合
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // フォールバック：Intersection Observer APIを使用
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// スクロール時のアニメーション（オプション）
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.feature-card, .reason-item, .pricing-box');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

