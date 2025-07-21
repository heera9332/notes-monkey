// Initialize Lucide icons
lucide.createIcons();

// Data for dynamic content
const features = [
    {
        icon: "pen-tool",
        title: "Smart Note Taking",
        description: "Create rich, formatted notes with our intuitive editor. Support for markdown, lists, and multimedia content."
    },
    {
        icon: "search",
        title: "Powerful Search",
        description: "Find any note instantly with our advanced search that indexes all your content including handwritten notes."
    },
    {
        icon: "tag",
        title: "Smart Organization",
        description: "Organize notes with tags, folders, and smart collections. AI-powered categorization makes organization effortless."
    },
    {
        icon: "cloud",
        title: "Cloud Sync",
        description: "Access your notes anywhere, anytime. Seamless synchronization across all your devices with offline support."
    },
    {
        icon: "users",
        title: "Team Collaboration",
        description: "Share notes and collaborate in real-time. Perfect for teams, students, and project management."
    },
    {
        icon: "shield",
        title: "Enterprise Security",
        description: "Bank-level encryption keeps your notes secure. Advanced permissions and access controls for teams."
    }
];

const howItWorksSteps = [
    {
        icon: "upload",
        title: "Capture Your Ideas",
        description: "Start by creating notes with our intuitive editor. Add text, images, links, and format them beautifully with markdown support."
    },
    {
        icon: "tag",
        title: "Organize Intelligently",
        description: "Use tags, folders, and our AI-powered categorization to keep everything organized. Let smart collections do the work for you."
    },
    {
        icon: "share-2",
        title: "Collaborate Seamlessly",
        description: "Share notes with your team, collaborate in real-time, and manage permissions to keep sensitive information secure."
    },
    {
        icon: "search",
        title: "Find Instantly",
        description: "Use our powerful search to find any note, even handwritten content. Advanced filters help you locate exactly what you need."
    }
];

const securityFeatures = [
    {
        icon: "shield",
        title: "End-to-End Encryption",
        description: "Your notes are encrypted before they leave your device. Only you have the keys to decrypt your data."
    },
    {
        icon: "lock",
        title: "Zero-Knowledge Architecture",
        description: "We can't read your notes even if we wanted to. Your privacy is built into our system architecture."
    },
    {
        icon: "database",
        title: "Secure Data Centers",
        description: "Your encrypted data is stored in ISO 27001 certified data centers with 24/7 monitoring and redundancy."
    },
    {
        icon: "eye",
        title: "Privacy by Design",
        description: "We collect minimal data, never sell your information, and give you full control over your data at all times."
    }
];

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Product Manager",
        company: "Tech Innovations",
        content: "This platform has revolutionized how our team manages project notes. The collaboration features are outstanding!",
        rating: 5
    },
    {
        name: "Rahul Gupta",
        role: "Student",
        company: "IIT Delhi",
        content: "Perfect for organizing study materials. The search functionality helps me find information instantly during exams.",
        rating: 5
    },
    {
        name: "Anita Patel",
        role: "Researcher",
        company: "ISRO",
        content: "The security features and organization tools make this ideal for managing sensitive research data.",
        rating: 5
    }
];

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
    }
    
    // Reinitialize icons after DOM change
    lucide.createIcons();
});

// Populate features section
function populateFeatures() {
    const featuresGrid = document.getElementById('features-grid');
    
    features.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'group p-8 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-white card-hover';
        
        featureCard.innerHTML = `
            <div class="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-6 group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 icon-hover">
                <i data-lucide="${feature.icon}" class="w-7 h-7 text-orange-600"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">${feature.title}</h3>
            <p class="text-gray-600 leading-relaxed">${feature.description}</p>
        `;
        
        featuresGrid.appendChild(featureCard);
    });
}

// Populate how it works section
function populateHowItWorks() {
    const howItWorksGrid = document.getElementById('how-it-works-grid');
    
    howItWorksSteps.forEach((step, index) => {
        const stepCard = document.createElement('div');
        stepCard.className = 'text-center group';
        
        stepCard.innerHTML = `
            <div class="relative mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <i data-lucide="${step.icon}" class="w-8 h-8 text-white"></i>
                </div>
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ${index + 1}
                </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">${step.title}</h3>
            <p class="text-gray-600 leading-relaxed">${step.description}</p>
        `;
        
        howItWorksGrid.appendChild(stepCard);
    });
}

// Populate security section
function populateSecurity() {
    const securityGrid = document.getElementById('security-grid');
    
    securityFeatures.forEach(feature => {
        const securityCard = document.createElement('div');
        securityCard.className = 'text-center group';
        
        securityCard.innerHTML = `
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i data-lucide="${feature.icon}" class="w-8 h-8 text-white"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">${feature.title}</h3>
            <p class="text-gray-300 leading-relaxed">${feature.description}</p>
        `;
        
        securityGrid.appendChild(securityCard);
    });
}

// Populate testimonials section
function populateTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 card-hover';
        
        const stars = Array(testimonial.rating).fill().map(() => 
            '<i data-lucide="star" class="w-5 h-5 text-yellow-400 fill-current"></i>'
        ).join('');
        
        testimonialCard.innerHTML = `
            <div class="flex items-center mb-4">
                ${stars}
            </div>
            <p class="text-gray-600 mb-6 leading-relaxed">"${testimonial.content}"</p>
            <div>
                <div class="font-semibold text-gray-900">${testimonial.name}</div>
                <div class="text-sm text-gray-500">${testimonial.role}, ${testimonial.company}</div>
            </div>
        `;
        
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    isMenuOpen = false;
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                    lucide.createIcons();
                }
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateFeatures();
    populateHowItWorks();
    populateSecurity();
    populateTestimonials();
    initSmoothScrolling();
    
    // Initialize all Lucide icons
    lucide.createIcons();
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});