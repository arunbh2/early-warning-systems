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
    
    // Run everything
    addAnimationStyles();
    setupHeaderAnimation();
    
    // Rerun animation when window is resized
    window.addEventListener('resize', setupHeaderAnimation);
});
