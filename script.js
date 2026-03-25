// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Dropdown Menu Toggle for Desktop
const dropdownContainers = document.querySelectorAll('.dropdown-container');

const openDropdown = (button, menu) => {
    menu.style.opacity = '1';
    menu.style.visibility = 'visible';
    menu.style.transform = 'translateY(0)';
    menu.style.pointerEvents = 'auto';
    button.setAttribute('aria-expanded', 'true');
};

const closeDropdown = (button, menu) => {
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'translateY(-8px)';
    menu.style.pointerEvents = 'none';
    button.setAttribute('aria-expanded', 'false');
};

const closeAllDropdowns = (exceptMenu = null) => {
    dropdownContainers.forEach(container => {
        const containerButton = container.querySelector('button');
        const containerMenu = container.querySelector('.dropdown-menu');
        if (!containerButton || !containerMenu || containerMenu === exceptMenu) return;
        closeDropdown(containerButton, containerMenu);
    });
};

dropdownContainers.forEach(container => {
    const button = container.querySelector('button');
    const menu = container.querySelector('.dropdown-menu');

    if (!button || !menu) return;

    closeDropdown(button, menu);
    button.setAttribute('aria-expanded', 'false');

    // Show menu on hover for desktop
    container.addEventListener('mouseenter', () => {
        openDropdown(button, menu);
    });

    container.addEventListener('mouseleave', () => {
        closeDropdown(button, menu);
    });

    // Toggle on click for mobile
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menu.style.opacity === '0' || menu.style.opacity === '';

        closeAllDropdowns(menu);

        // Toggle current dropdown
        if (isHidden) {
            openDropdown(button, menu);
        } else {
            closeDropdown(button, menu);
        }
    });

    // Keyboard support: Enter/Space/ArrowDown to open, Escape to close.
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isHidden = menu.style.opacity === '0' || menu.style.opacity === '';
            closeAllDropdowns(menu);
            if (isHidden) {
                openDropdown(button, menu);
                const firstLink = menu.querySelector('a');
                if (firstLink) firstLink.focus();
            } else {
                closeDropdown(button, menu);
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            closeAllDropdowns(menu);
            openDropdown(button, menu);
            const firstLink = menu.querySelector('a');
            if (firstLink) firstLink.focus();
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown(button, menu);
            button.focus();
        }
    });

    menu.addEventListener('keydown', (e) => {
        const links = Array.from(menu.querySelectorAll('a'));
        if (!links.length) return;
        const currentIndex = links.indexOf(document.activeElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % links.length;
            links[nextIndex].focus();
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex <= 0 ? links.length - 1 : currentIndex - 1;
            links[prevIndex].focus();
        }

        if (e.key === 'Home') {
            e.preventDefault();
            links[0].focus();
        }

        if (e.key === 'End') {
            e.preventDefault();
            links[links.length - 1].focus();
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown(button, menu);
            button.focus();
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
        closeAllDropdowns();
    }
});

// Close dropdowns on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllDropdowns();
    }
});

// Close dropdown when a division link is clicked
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        closeAllDropdowns();
    });
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerText;
        
        // Show success message
        submitButton.innerText = 'Message Sent Successfully!';
        submitButton.disabled = true;
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitButton.innerText = originalText;
            submitButton.disabled = false;
        }, 3000);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all major sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0.9';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add smooth scroll behavior on page load
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto';
}

