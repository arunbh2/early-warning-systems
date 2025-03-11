document.addEventListener('DOMContentLoaded', function() {
    // Animation for the header background
    function setupHeaderAnimation() {
        const animatedBg = document.getElementById('animatedBackground');
        if (!animatedBg) return; // Exit if element not found
        
        // Clear any existing elements
        animatedBg.innerHTML = '';
        
        // Create clouds
        for (let i = 0; i < 8; i++) {
            createCloud(animatedBg, i);
        }
        
        // Create raindrops
        for (let i = 0; i < 40; i++) {
            createRaindrop(animatedBg, i);
        }
        
        // Create warning icons
        for (let i = 0; i < 5; i++) {
            createWarningIcon(animatedBg, i);
        }
    }
    
    function createCloud(container, index) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Randomize cloud size and position
        const size = Math.random() * 100 + 50;
        cloud.style.width = size + 'px';
        cloud.style.height = (size / 2) + 'px';
        cloud.style.top = (Math.random() * 60) + '%';
        cloud.style.left = (Math.random() * 100) + '%';
        cloud.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Add cloud shape with multiple circles
        for (let i = 0; i < 5; i++) {
            const cloudPart = document.createElement('div');
            cloudPart.style.position = 'absolute';
            cloudPart.style.backgroundColor = 'white';
            cloudPart.style.borderRadius = '50%';
            
            const partSize = size * (0.3 + Math.random() * 0.4);
            cloudPart.style.width = partSize + 'px';
            cloudPart.style.height = partSize + 'px';
            cloudPart.style.top = (Math.random() * 20) + '%';
            cloudPart.style.left = (Math.random() * 70) + '%';
            
            cloud.appendChild(cloudPart);
        }
        
        // Add animation
        cloud.style.animation = `float ${10 + Math.random() * 20}s linear infinite`;
        cloud.style.animationDelay = `-${Math.random() * 10}s`;
        
        container.appendChild(cloud);
    }
    
    function createRaindrop(container, index) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        
        // Position randomly
        drop.style.left = (Math.random() * 100) + '%';
        drop.style.top = (Math.random() * 100) + '%';
        
        // Size
        drop.style.width = '2px';
        drop.style.height = '10px';
        
        // Style
        drop.style.backgroundColor = '#0066CC'; // Blue
        drop.style.borderRadius = '50% 50% 0 0';
        
        // Animation
        const duration = 1 + Math.random() * 2;
        drop.style.animation = `raindrop ${duration}s linear infinite`;
        drop.style.animationDelay = `-${Math.random() * duration}s`;
        
        container.appendChild(drop);
    }
    
    function createWarningIcon(container, index) {
        const icon = document.createElement('div');
        icon.className = 'warning-icon';
        
        // Position
        icon.style.left = (Math.random() * 100) + '%';
        icon.style.top = (Math.random() * 100) + '%';
        
        // Size
        const size = 20 + Math.random() * 15;
        icon.style.width = size + 'px';
        icon.style.height = size + 'px';
        
        // Style - Triangle shape
        icon.style.backgroundColor = 'transparent';
        icon.style.borderLeft = (size/2) + 'px solid transparent';
        icon.style.borderRight = (size/2) + 'px solid transparent';
        icon.style.borderBottom = size + 'px solid #FF7F00'; // Orange
        
        // Text
        const exclamation = document.createElement('div');
        exclamation.style.position = 'absolute';
        exclamation.style.color = 'white';
        exclamation.style.fontSize = (size * 0.7) + 'px';
        exclamation.style.fontWeight = 'bold';
        exclamation.style.top = '20%';
        exclamation.style.left = '50%';
        exclamation.style.transform = 'translateX(-50%)';
        exclamation.textContent = '!';
        
        icon.appendChild(exclamation);
        
        // Animation
        icon.style.animation = `pulse ${3 + Math.random() * 2}s ease-in-out infinite`;
        icon.style.animationDelay = `-${Math.random() * 3}s`;
        
        container.appendChild(icon);
    }
    
    // Add animation keyframes to the document
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes raindrop {
                0% { transform: translateY(-20px); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(100px); opacity: 0; }
            }
            
            @keyframes float {
                0% { transform: translateX(-100px); }
                100% { transform: translateX(calc(100vw + 100px)); }
            }
            
            @keyframes pulse {
                0% { transform: scale(0.8); opacity: 0.3; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(0.8); opacity: 0.3; }
            }
            
            .header {
                position: relative;
                overflow: hidden;
            }
            
            .animated-bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
            }
            
            .header h1, .header p {
                position: relative;
                z-index: 2;
            }
            
            .cloud {
                position: absolute;
                z-index: 1;
            }
            
            .raindrop {
                position: absolute;
                z-index: 2;
            }
            
            .warning-icon {
                position: absolute;
                z-index: 3;
            }
        `;
        
        document.head.appendChild(style);
    }

    // After your existing animation functions, add these:

// Animation for the challenge section
function setupChallengeAnimation() {
    const challengeBg = document.getElementById('challengeAnimatedBackground');
    if (!challengeBg) return; // Exit if element not found
    
    // Clear any existing elements
    challengeBg.innerHTML = '';
    
    // Create flood waves
    for (let i = 0; i < 3; i++) {
        createFloodWave(challengeBg, i);
    }
    
    // Create landslides
    for (let i = 0; i < 2; i++) {
        createLandslide(challengeBg, i);
    }
    
    // Create storm clouds with lightning
    for (let i = 0; i < 4; i++) {
        createStormCloud(challengeBg, i);
    }
}

function createFloodWave(container, index) {
    const wave = document.createElement('div');
    wave.className = 'disaster-element flood-wave';
    
    // Size and position
    const width = 150 + Math.random() * 100;
    wave.style.width = width + 'px';
    wave.style.height = (width / 2) + 'px';
    wave.style.bottom = '-' + (width / 4) + 'px';
    wave.style.left = (Math.random() * 80) + '%';
    
    // Animation
    const duration = 15 + Math.random() * 10;
    wave.style.animation = `flood-wave ${duration}s ease-in-out infinite`;
    wave.style.animationDelay = `-${Math.random() * duration}s`;
    
    container.appendChild(wave);
}

function createLandslide(container, index) {
    const landslide = document.createElement('div');
    landslide.className = 'disaster-element landslide';
    
    // Size and position
    const size = 80 + Math.random() * 60;
    landslide.style.width = size + 'px';
    landslide.style.height = size + 'px';
    landslide.style.top = (20 + Math.random() * 50) + '%';
    landslide.style.left = (index * 50 + Math.random() * 20) + '%';
    
    // Animation
    landslide.style.animation = `landslide 20s ease-in-out infinite`;
    landslide.style.animationDelay = `-${Math.random() * 10}s`;
    
    container.appendChild(landslide);
}

function createStormCloud(container, index) {
    // Create cloud container
    const cloudGroup = document.createElement('div');
    cloudGroup.className = 'disaster-element';
    cloudGroup.style.position = 'absolute';
    cloudGroup.style.top = (Math.random() * 40) + '%';
    cloudGroup.style.left = (index * 25 + Math.random() * 10) + '%';
    
    // Create cloud
    const cloud = document.createElement('div');
    cloud.className = 'storm-cloud';
    const cloudSize = 40 + Math.random() * 30;
    cloud.style.width = cloudSize + 'px';
    cloud.style.height = cloudSize + 'px';
    
    // Add lightning to some clouds (randomly)
    if (Math.random() > 0.5) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.position = 'absolute';
        lightning.style.width = (cloudSize / 2) + 'px';
        lightning.style.height = (cloudSize) + 'px';
        lightning.style.bottom = '-' + (cloudSize * 0.8) + 'px';
        lightning.style.left = (cloudSize / 4) + 'px';
        
        // Lightning flash animation
        lightning.style.animation = 'lightning-flash 7s ease-in-out infinite';
        lightning.style.animationDelay = Math.random() * 7 + 's';
        lightning.style.opacity = 0;
        
        cloudGroup.appendChild(lightning);
    }
    
    // Animation for the cloud
    cloudGroup.style.animation = `float-slow ${30 + Math.random() * 20}s linear infinite`;
    cloudGroup.style.animationDelay = `-${Math.random() * 30}s`;
    
    cloudGroup.appendChild(cloud);
    container.appendChild(cloudGroup);
}

// Add new keyframes to the animation styles
function addChallengeAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flood-wave {
            0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.3; }
            50% { transform: translateY(-20px) scaleX(1.2); opacity: 0.7; }
        }
        
        @keyframes landslide {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
            50% { transform: translateY(30px) rotate(5deg); opacity: 0.5; }
        }
        
        @keyframes float-slow {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        @keyframes lightning-flash {
            0%, 15%, 17%, 19%, 100% { opacity: 0; }
            16%, 18% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}

// Update your initialization code at the bottom of the file
document.addEventListener('DOMContentLoaded', function() {
    // Run existing animations
    addAnimationStyles();
    setupHeaderAnimation();
    
    // Add and run challenge section animations
    addChallengeAnimationStyles();
    setupChallengeAnimation();
    
    // Rerun animations when window is resized
    window.addEventListener('resize', function() {
        setupHeaderAnimation();
        setupChallengeAnimation();
    });
});
    
    // Run everything
    addAnimationStyles();
    setupHeaderAnimation();
    
    // Rerun animation when window is resized
    window.addEventListener('resize', setupHeaderAnimation);
});
