/**
 * ポートフォリオサイト JavaScript
 * 作成者: 鈴木太郎
 */

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // モバイルメニューの表示状態をコンソールに出力（デバッグ用）
            console.log('ハンバーガーメニュークリック: navLinks.active =', navLinks.classList.contains('active'));
        });
    }
    
    // 画面サイズが変わったときにモバイルメニューの状態をリセット
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // スクロール時のヘッダー制御
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // プロジェクトフィルター機能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const blogItems = document.querySelectorAll('.blog-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // プロジェクトのフィルタリング
            if (projectItems.length > 0) {
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
            
            // ブログ記事のフィルタリング
            if (blogItems.length > 0) {
                blogItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // プロジェクトデモの表示切り替え
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const demoId = this.getAttribute('data-demo');
            const demoElement = document.getElementById(demoId);
            
            if (demoElement) {
                if (demoElement.style.display === 'block') {
                    demoElement.style.display = 'none';
                    this.textContent = this.textContent.replace('閉じる', 'デモを見る');
                } else {
                    demoElement.style.display = 'block';
                    this.textContent = this.textContent.replace('デモを見る', '閉じる');
                    
                    // スムーズスクロール
                    demoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // FAQの開閉
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                item.classList.toggle('active');
                
                // アイコンの切り替え
                const icon = this.querySelector('i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        }
    });
    
    // スキルバーのアニメーション
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillLevels.forEach(level => {
            const width = level.getAttribute('style').match(/width:\s*(\d+)%/)[1];
            level.style.width = '0%';
            
            setTimeout(() => {
                level.style.transition = 'width 1s ease-in-out';
                level.style.width = width + '%';
            }, 200);
        });
    }
    
    // Intersection Observerを使用して、要素が表示されたときにアニメーションを開始
    if ('IntersectionObserver' in window && skillLevels.length > 0) {
        const skillSection = document.querySelector('.skills');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        if (skillSection) {
            observer.observe(skillSection);
        }
    } else if (skillLevels.length > 0) {
        // Intersection Observerがサポートされていない場合
        animateSkillBars();
    }
    
    // コンタクトフォームの送信処理
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 実際のプロジェクトでは、ここでAPIを呼び出してデータを送信
            console.log('送信データ:', { name, email, subject, message });
            
            // 送信成功メッセージ（実際のプロジェクトではAPIレスポンスに基づいて表示）
            alert('お問い合わせありがとうございます。メッセージが送信されました。');
            
            // フォームのリセット
            contactForm.reset();
        });
    }
    
    // ニュースレターフォームの送信処理
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // 実際のプロジェクトでは、ここでAPIを呼び出してデータを送信
            console.log('ニュースレター登録:', email);
            
            // 送信成功メッセージ
            alert('ニュースレターに登録していただきありがとうございます。');
            
            // フォームのリセット
            this.reset();
        });
    }
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // URLにハッシュを追加
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // ページ読み込み時にURLハッシュがある場合、該当要素にスクロール
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}); 