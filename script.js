// Global variables
let currentRakhiColor = 'red';
let currentRakhiStyle = 'traditional';
let products = [];
let stories = [];
let videos = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProducts();
    loadStories();
    loadVideos();
    loadCulturalContent();
});

// Initialize app functionality
function initializeApp() {
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Initialize forms
    initializeForms();
    
    // Set default rakhi preview
    updateRakhiPreview();
}

// Navigation and section management
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`)?.classList.add('active');
}

// Virtual Rakhi Functions
function updateRakhiPreview() {
    const rakhiPreview = document.getElementById('rakhiPreview');
    const style = document.getElementById('rakhiStyle').value;
    
    // Update rakhi design based on style and color
    let designClass = `rakhi-${style}-${currentRakhiColor}`;
    rakhiPreview.className = `rakhi-design ${designClass}`;
    
    // Add animation based on style
    switch(style) {
        case 'traditional':
            rakhiPreview.style.background = `radial-gradient(circle, #${getColorHex(currentRakhiColor)}, #ffd700)`;
            break;
        case 'modern':
            rakhiPreview.style.background = `linear-gradient(45deg, #${getColorHex(currentRakhiColor)}, #ffffff)`;
            break;
        case 'floral':
            rakhiPreview.style.background = `radial-gradient(circle, #${getColorHex(currentRakhiColor)}, #98fb98)`;
            break;
        case 'jeweled':
            rakhiPreview.style.background = `radial-gradient(circle, #${getColorHex(currentRakhiColor)}, #ffd700, #ff69b4)`;
            break;
    }
}

function changeRakhiColor(color) {
    currentRakhiColor = color;
    
    // Update active color option
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-color="${color}"]`).classList.add('active');
    
    updateRakhiPreview();
}

function getColorHex(color) {
    const colors = {
        'red': 'ff6b6b',
        'gold': 'ffd700',
        'blue': '4dabf7',
        'pink': 'e91e63',
        'green': '6bcf7f'
    };
    return colors[color] || 'ff6b6b';
}

function addPhotoToRakhi() {
    const photoInput = document.getElementById('rakhiPhoto');
    const file = photoInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const rakhiCenter = document.querySelector('.rakhi-center');
            rakhiCenter.style.backgroundImage = `url(${e.target.result})`;
            rakhiCenter.style.backgroundSize = 'cover';
            rakhiCenter.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    }
}

function sendVirtualRakhi() {
    const message = document.getElementById('rakhiMessage').value;
    const photo = document.getElementById('rakhiPhoto').files[0];
    
    if (!message.trim()) {
        alert('Please add a personal message for your rakhi!');
        return;
    }
    
    // Simulate sending rakhi
    showNotification('Virtual Rakhi sent successfully! 🎀', 'success');
    
    // Reset form
    document.getElementById('rakhiMessage').value = '';
    document.getElementById('rakhiPhoto').value = '';
    document.querySelector('.rakhi-center').style.backgroundImage = '';
}

// Marketplace Functions
function loadProducts() {
    products = [
        {
            id: 1,
            name: 'Traditional Silk Rakhi Set',
            price: '₹299',
            category: 'rakhis',
            image: '🎀',
            description: 'Beautiful handcrafted silk rakhi with traditional designs'
        },
        {
            id: 2,
            name: 'Premium Sweet Box',
            price: '₹599',
            category: 'sweets',
            image: '🍬',
            description: 'Assorted traditional sweets in elegant packaging'
        },
        {
            id: 3,
            name: 'Rakhi Gift Hamper',
            price: '₹899',
            category: 'hampers',
            image: '🎁',
            description: 'Complete rakhi hamper with sweets, dry fruits, and rakhi'
        },
        {
            id: 4,
            name: 'Personalized Photo Rakhi',
            price: '₹199',
            category: 'personalized',
            image: '📸',
            description: 'Custom rakhi with your favorite photo'
        },
        {
            id: 5,
            name: 'Designer Kundan Rakhi',
            price: '₹399',
            category: 'rakhis',
            image: '💎',
            description: 'Elegant kundan work rakhi with pearls'
        },
        {
            id: 6,
            name: 'Chocolate Gift Box',
            price: '₹449',
            category: 'sweets',
            image: '🍫',
            description: 'Premium chocolates in beautiful gift box'
        }
    ];
    
    displayProducts(products);
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p>${product.description}</p>
                <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn-secondary" onclick="scheduleDelivery(${product.id})">Schedule Delivery</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function filterProducts(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    showNotification(`${product.name} added to cart! 🛒`, 'success');
}

function scheduleDelivery(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('deliveryModal').style.display = 'block';
    
    // Store product info for delivery
    document.getElementById('deliveryModal').dataset.productId = productId;
}

// Stories Functions
function loadStories() {
    stories = [
        {
            id: 1,
            title: 'My Brother, My Hero',
            author: 'Priya Sharma',
            content: 'Growing up, my brother was always my protector. Even when we fought over toys, he would stand up for me against anyone else. This Raksha Bandhaan, I want to tell him how much his protection means to me...',
            date: '2024-08-01',
            likes: 45
        },
        {
            id: 2,
            title: 'Distance Cannot Break Our Bond',
            author: 'Anjali Patel',
            content: 'My brother lives in another country now, but every Raksha Bandhaan, he makes sure to video call me. Last year, he even arranged for a rakhi to be delivered to his address so we could celebrate together virtually...',
            date: '2024-07-28',
            likes: 67
        },
        {
            id: 3,
            title: 'The Rakhi That Changed Everything',
            author: 'Meera Singh',
            content: 'It was during a difficult time in our family when my brother and I had stopped talking. But on Raksha Bandhaan, I decided to tie a rakhi anyway. That simple gesture brought us back together...',
            date: '2024-07-25',
            likes: 89
        }
    ];
    
    displayStories();
}

function displayStories() {
    const storiesGrid = document.getElementById('storiesGrid');
    storiesGrid.innerHTML = '';
    
    stories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.innerHTML = `
            <div class="story-header">
                <div class="story-avatar"></div>
                <div>
                    <h3 class="story-title">${story.title}</h3>
                    <p><small>by ${story.author} • ${formatDate(story.date)}</small></p>
                </div>
            </div>
            <div class="story-content">
                <p>${story.content}</p>
                <div style="margin-top: 1rem;">
                    <button class="btn-secondary" onclick="likeStory(${story.id})">
                        ❤️ ${story.likes} likes
                    </button>
                </div>
            </div>
        `;
        storiesGrid.appendChild(storyCard);
    });
}

function openStoryModal() {
    document.getElementById('storyModal').style.display = 'block';
}

function likeStory(storyId) {
    const story = stories.find(s => s.id === storyId);
    story.likes++;
    displayStories();
    showNotification('Story liked! ❤️', 'success');
}

// Video Wish Wall Functions
function loadVideos() {
    videos = [
        {
            id: 1,
            title: 'Happy Raksha Bandhaan Bhai!',
            author: 'Kavya',
            thumbnail: '🎥',
            duration: '0:45',
            isPublic: true
        },
        {
            id: 2,
            title: 'Missing You This Rakhi',
            author: 'Rohit',
            thumbnail: '📹',
            duration: '1:20',
            isPublic: true
        },
        {
            id: 3,
            title: 'Childhood Memories',
            author: 'Sneha',
            thumbnail: '🎬',
            duration: '2:15',
            isPublic: false
        }
    ];
    
    displayVideos();
}

function displayVideos() {
    const videoWall = document.getElementById('videoWall');
    videoWall.innerHTML = '';
    
    videos.filter(video => video.isPublic).forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                ${video.thumbnail}
                <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.8rem;">
                    ${video.duration}
                </div>
            </div>
            <div class="video-info">
                <h4>${video.title}</h4>
                <p>by ${video.author}</p>
                <button class="btn-primary" onclick="playVideo(${video.id})">Play Video</button>
            </div>
        `;
        videoWall.appendChild(videoCard);
    });
}

function recordVideo() {
    // Simulate video recording
    showNotification('Video recording started! 🎥', 'info');
    setTimeout(() => {
        showNotification('Video recorded successfully! 📹', 'success');
    }, 3000);
}

function uploadVideo() {
    // Create file input for video upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            showNotification(`Video "${file.name}" uploaded successfully! 🎬`, 'success');
        }
    };
    input.click();
}

function playVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    showNotification(`Playing: ${video.title} 🎥`, 'info');
}

// Cultural Corner Functions
function loadCulturalContent() {
    showCulturalTab('history');
}

function showCulturalTab(tabName) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showCulturalTab('${tabName}')"]`).classList.add('active');
    
    const content = document.getElementById('culturalContent');
    
    switch(tabName) {
        case 'history':
            content.innerHTML = `
                <h3>The History of Raksha Bandhaan</h3>
                <p>Raksha Bandhaan, also known as Rakhi, is an ancient Hindu festival that celebrates the bond between brothers and sisters. The festival has its roots in various historical and mythological stories.</p>
                
                <h4>Mythological Origins</h4>
                <p>One of the most famous stories is of Queen Draupadi and Lord Krishna. When Krishna injured his finger, Draupadi tore a piece of her sari and tied it around his wound. Touched by her gesture, Krishna promised to protect her always.</p>
                
                <h4>Historical Significance</h4>
                <p>The festival gained historical importance during medieval times when Rajput queens would send rakhis to neighboring rulers, seeking their protection against invasions.</p>
                
                <div style="margin-top: 2rem;">
                    <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%23ff6b6b'/><text x='50' y='60' text-anchor='middle' fill='white' font-size='30'>🎀</text></svg>" alt="Rakhi Symbol" style="width: 100px; height: 100px; margin: 0 auto; display: block;">
                </div>
            `;
            break;
            
        case 'customs':
            content.innerHTML = `
                <h3>Regional Customs and Traditions</h3>
                
                <h4>North India</h4>
                <p>In North India, sisters tie rakhi on their brothers' wrists and apply tilaka on their foreheads. Brothers give gifts and promise to protect their sisters.</p>
                
                <h4>West Bengal</h4>
                <p>Known as "Bhai Phonta," sisters apply sandalwood paste and rice on their brothers' foreheads and pray for their long life.</p>
                
                <h4>Maharashtra</h4>
                <p>Called "Narali Purnima," the festival coincides with the coconut festival and has special significance for fishing communities.</p>
                
                <h4>South India</h4>
                <p>In Karnataka, the festival is known as "Rakhi Habba," while in Andhra Pradesh, it's celebrated as "Raksha Bandhaan" with unique local customs.</p>
                
                <div style="background: #f0f8ff; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                    <strong>Did you know?</strong> In some regions, sisters also tie rakhis to trees, symbolizing their connection with nature!
                </div>
            `;
            break;
            
        case 'facts':
            content.innerHTML = `
                <h3>Fun Facts About Raksha Bandhaan</h3>
                
                <div style="display: grid; gap: 1rem;">
                    <div style="background: #fff3e0; padding: 1rem; border-radius: 10px;">
                        <h4>🌟 Fact 1</h4>
                        <p>Raksha Bandhaan is celebrated on the full moon day (Purnima) of the Hindu month of Shravana.</p>
                    </div>
                    
                    <div style="background: #f3e5f5; padding: 1rem; border-radius: 10px;">
                        <h4>🎨 Fact 2</h4>
                        <p>Modern rakhis come in hundreds of designs - from traditional thread to designer ones with precious stones!</p>
                    </div>
                    
                    <div style="background: #e8f5e8; padding: 1rem; border-radius: 10px;">
                        <h4>🌍 Fact 3</h4>
                        <p>The festival is not just limited to biological siblings - it celebrates all protective relationships.</p>
                    </div>
                    
                    <div style="background: #e3f2fd; padding: 1rem; border-radius: 10px;">
                        <h4>📱 Fact 4</h4>
                        <p>With technology, virtual rakhi celebrations have become popular, connecting siblings across the globe!</p>
                    </div>
                    
                    <div style="background: #fce4ec; padding: 1rem; border-radius: 10px;">
                        <h4>🎁 Fact 5</h4>
                        <p>The rakhi market in India is worth over ₹500 crores annually, showing the festival's economic significance!</p>
                    </div>
                </div>
            `;
            break;
    }
}

// E-Card Generator Functions
function changeEcardTemplate() {
    const template = document.getElementById('ecardTemplate').value;
    const canvas = document.getElementById('ecardCanvas');
    
    switch(template) {
        case 'classic':
            canvas.style.background = 'linear-gradient(135deg, #ff6b6b, #ffd93d)';
            break;
        case 'modern':
            canvas.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            break;
        case 'floral':
            canvas.style.background = 'linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)';
            break;
        case 'elegant':
            canvas.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
            break;
    }
}

function updateEcard() {
    const title = document.getElementById('ecardTitleInput').value;
    const message = document.getElementById('ecardMessageInput').value;
    
    document.getElementById('ecardTitle').textContent = title;
    document.getElementById('ecardMessage').textContent = message;
}

function downloadEcard() {
    // Simulate download
    showNotification('E-Card downloaded successfully! 📥', 'success');
}

function shareEcard() {
    // Simulate sharing
    if (navigator.share) {
        navigator.share({
            title: 'Raksha Bandhaan E-Card',
            text: 'Check out this beautiful Rakhi e-card!',
            url: window.location.href
        });
    } else {
        showNotification('E-Card link copied to clipboard! 📋', 'success');
    }
}

// Charity Functions
function sponsorRakhis() {
    showNotification('Thank you for sponsoring rakhis! Your kindness will bring joy to many children. 🎀❤️', 'success');
}

function donateToCharity() {
    showNotification('Thank you for your donation! Your contribution will help children in need. 🙏❤️', 'success');
}

// Form handling
function initializeForms() {
    // Delivery form
    document.getElementById('deliveryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const recipientName = document.getElementById('recipientName').value;
        const deliveryDate = document.getElementById('deliveryDate').value;
        
        showNotification(`Delivery scheduled for ${recipientName} on ${formatDate(deliveryDate)}! 📦`, 'success');
        closeModal('deliveryModal');
        this.reset();
    });
    
    // Story form
    document.getElementById('storyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('storyTitle').value;
        const content = document.getElementById('storyContent').value;
        
        // Add new story
        const newStory = {
            id: stories.length + 1,
            title: title,
            author: 'You',
            content: content,
            date: new Date().toISOString().split('T')[0],
            likes: 0
        };
        
        stories.unshift(newStory);
        displayStories();
        
        showNotification('Your story has been shared! 📖❤️', 'success');
        closeModal('storyModal');
        this.reset();
    });
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="background: ${getNotificationColor(type)}; color: white; padding: 1rem 2rem; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 1rem; position: fixed; top: 20px; right: 20px; z-index: 3000; animation: slideInRight 0.3s ease;">
            ${message}
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; margin-left: 1rem; cursor: pointer;">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationColor(type) {
    const colors = {
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196f3'
    };
    return colors[type] || colors.info;
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
    }
`;
document.head.appendChild(notificationStyles);

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Initialize sections visibility
document.addEventListener('DOMContentLoaded', function() {
    // Show only home section initially
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('home').style.display = 'block';
});
