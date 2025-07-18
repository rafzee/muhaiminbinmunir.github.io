// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.research-card, .publication-item, .timeline-item, .course-item, .skill-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Add scroll-triggered animations
    function addScrollAnimations() {
        const cards = document.querySelectorAll('.research-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }

    addScrollAnimations();

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // CV download functionality
    const cvDownloadBtn = document.getElementById('cv-download');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Create a simple CV content
            const cvContent = generateCVContent();
            downloadCV(cvContent);
        });
    }

    // Generate CV content
    function generateCVContent() {
        return `
MUHAIMIN BIN MUNIR
PhD Student in Computer Science
The University of Texas at Dallas

Contact Information:
Email: muhaimin.binmunir@utdallas.edu
Phone: (214) 308-8039
Location: Richardson, TX 75080
LinkedIn: https://www.linkedin.com/in/muhaimin-bin-munir/
Google Scholar: https://scholar.google.com/citations?user=TG6nlJsAAAAJ&hl=en

EDUCATION
PhD in Computer Science (Fall 2022 - Spring 2027)
The University of Texas at Dallas, Richardson, TX
GPA: 3.60
Relevant Coursework: Natural Language Processing, Artificial Intelligence, Machine Learning, Computer Vision

BSc in Computer Science and Engineering (Feb 2016 - Jan 2020)
Military Institute of Science and Technology, Dhaka, Bangladesh
GPA: 3.88
Relevant Coursework: Artificial Intelligence, Data Structure, Algorithm, Object Oriented Programming

PROFESSIONAL EXPERIENCE
Graduate Research Assistant (Aug 2024 - Present)
The University of Texas at Dallas, Richardson, TX
• Conducted advanced research in Large Language Models (LLMs)
• Developed RAG approaches for cyber attack detection in transit systems
• Published peer-reviewed research at IEEE TPS Conference

Graduate Teaching Assistant (Aug 2022 - Jul 2024)
The University of Texas at Dallas, Richardson, TX
• Supported courses in Database Systems, Operating Systems, and Secure Cloud Edge & IoT
• Helped students solve complex problems and provided research guidance

Lecturer (Jan 2020 - Aug 2022)
Military Institute of Science and Technology, Dhaka, Bangladesh
• Supervised research projects in NLP and machine learning
• Delivered coursework to over 400 students
• Resulted in five publications at IEEE and ACM conferences

SELECTED PUBLICATIONS
• Bin Munir, Muhaimin, et al. "Leveraging Multimodal Retrieval-Augmented Generation for Cyber Attack Detection in Transit Systems." IEEE TPS 2024.
• Ishrak, Shadman, Muhaimin Bin Munir, and Md Hasanul Kabir. "Dynamic hand gesture recognition using sequence of human joint relative angles." ECCE 2023. (Best Paper Award)
• Multiple additional publications in IEEE and ACM conferences

SKILLS
Programming Languages: C, C++, Python, Java
ML/DL Frameworks: PyTorch, TensorFlow, Keras, HuggingFace Transformers, JAX
NLP Techniques: Tokenization, Embedding Techniques, Zero-shot, Few-shot, Transfer Learning
Development Tools: ONNX, NumPy, Scipy, Scikit-Learn, Pandas, OpenCV

AWARDS
• Best Paper Award - ECCE 2023
• MIST Dean's List of Honor - 2020
• Best Team MIST - Inter-University Programming Contest 2019
• Best Competitive Programmer Award - MIST 2016
        `;
    }

    // Download CV as text file
    function downloadCV(content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Muhaimin_Bin_Munir_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.research-card, .course-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #319795;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(49, 151, 149, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .loaded .hero-title .title-line {
            animation: fadeInUp 0.8s ease forwards;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

