// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        if (themeIcon) {
            themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        }
    });
}

// Projects Slider
const projectSlides = document.querySelectorAll('.project-slide');
const projectNavButtons = document.querySelectorAll('.project-nav-btn');
let currentSlide = 0;

function showSlide(index) {
    projectSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        slide.style.opacity = i === index ? '0' : '';
        if (i === index) {
            setTimeout(() => slide.style.opacity = '1', 10);
        }
    });

    projectNavButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    currentSlide = index;
}

if (projectNavButtons.length > 0 && projectSlides.length > 0) {
    projectNavButtons.forEach((button, index) => {
        button.addEventListener('click', () => showSlide(index));
    });

    setInterval(() => {
        showSlide((currentSlide + 1) % projectSlides.length);
    }, 5000);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;

        if (name && email && message) {
            console.log({ name, email, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
}

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter-text');

if (typewriterText) {
    const texts = [
        "Welcome to my Portfolio",
        "I am a Computer Engineer",
        "At UET Taxila"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (!isDeleting) {
            charIndex++;
        } else {
            charIndex--;
        }

        typewriterText.textContent = currentText.slice(0, charIndex);

        let typeSpeed = isDeleting ? 70 : 120;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 1500; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typeSpeed);
    }

    type(); // Start typing
}



// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Like Button
const likeBtn = document.getElementById('likeBtn');
if (likeBtn) {
    let liked = false;
    likeBtn.addEventListener('click', () => {
        if (!liked) {
            const likeCount = document.getElementById('likeCount');
            let count = parseInt(likeCount.textContent);
            count++;
            likeCount.textContent = count;
            likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${count} Likes`;
            likeBtn.style.color = '#e74c3c';
            liked = true;
        }
    });
}

// Comment Functionality
const postCommentBtn = document.getElementById('postComment');
if (postCommentBtn) {
    postCommentBtn.addEventListener('click', () => {
        const commentTextInput = document.getElementById('commentText');
        const commentText = commentTextInput?.value.trim();
        if (!commentText) return;

        const commentsList = document.querySelector('.comments-list');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <div class="comment-header">
                <strong>You</strong>
                <span>Just now</span>
            </div>
            <p>${commentText}</p>
        `;
        commentsList?.prepend(newComment);
        commentTextInput.value = '';
    });
}
