// Wait for the document to fully load
window.addEventListener('load', function() {
    console.log('Initializing success stories map animations');
    initializeSuccessStoriesMap();
});

function initializeSuccessStoriesMap() {
    // Get the success stories section
    const successSection = document.getElementById('success');
    if (!successSection) {
        console.error("Success stories section not found");
        return;
    }

    // Find the map container and map pins
    const mapContainer = successSection.querySelector('.map-container');
    const worldMap = successSection.querySelector('.world-map');
    const mapPins = successSection.querySelectorAll('.map-pin');
    
    if (!mapContainer || !worldMap) {
        console.error("Map container or world map not found in success stories section");
        return;
    }
    
    console.log(`Found ${mapPins.length} map pins in the success stories section`);
    
    // Add a background world map SVG if not already present
    if (!worldMap.querySelector('svg')) {
        createWorldMapBackground(worldMap);
    }
    
    // Animate the map pins
    animateMapPins(mapPins);
    
    // Make pins interactive
    makeMapPinsInteractive(mapPins);
}

function createWorldMapBackground(worldMap) {
    // Set styles for the map container
    worldMap.style.position = 'relative';
    worldMap.style.height = '300px';
    worldMap.style.backgroundColor = '#e6f7ff';
    worldMap.style.borderRadius = '10px';
    worldMap.style.overflow = 'hidden';
    
    // Create a simple world map SVG representation
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1000 500');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    
    // Add a blue background for oceans
    const ocean = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    ocean.setAttribute('width', '1000');
    ocean.setAttribute('height', '500');
    ocean.setAttribute('fill', '#a8d5ff');
    svg.appendChild(ocean);
    
    // Add simplified continent shapes
    const continents = [
        // North America
        'M 150,120 L 220,100 L 280,140 L 230,200 L 170,230 L 120,180 Z',
        // South America
        'M 230,230 L 250,300 L 210,380 L 180,320 L 200,250 Z',
        // Europe
        'M 420,120 L 480,100 L 520,130 L 490,170 L 430,160 Z',
        // Africa
        'M 430,180 L 480,170 L 520,200 L 500,280 L 450,310 L 420,260 L 410,210 Z',
        // Asia
        'M 520,130 L 650,100 L 750,150 L 780,200 L 700,250 L 600,230 L 530,190 L 490,170 Z',
        // Australia
        'M 750,280 L 820,270 L 830,320 L 780,340 L 740,320 Z'
    ];
    
    // Add each continent to the SVG
    continents.forEach(path => {
        const continent = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        continent.setAttribute('d', path);
        continent.setAttribute('fill', '#d4d4d4');
        continent.setAttribute('stroke', '#ffffff');
        continent.setAttribute('stroke-width', '2');
        svg.appendChild(continent);
    });
    
    // Add the SVG to the world map container
    worldMap.appendChild(svg);
    
    console.log('World map background created');
}

function animateMapPins(mapPins) {
    // Initially hide all pins
    mapPins.forEach(pin => {
        pin.style.opacity = '0';
        pin.style.transform = 'translateY(20px) scale(0.8)';
        pin.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Create staggered animation for pins appearing
    mapPins.forEach((pin, index) => {
        setTimeout(() => {
            pin.style.opacity = '1';
            pin.style.transform = 'translateY(0) scale(1)';
            
            // Add a subtle pulse animation after appearing
            setTimeout(() => {
                pin.style.animation = 'pulse 2s infinite';
            }, 500);
        }, 300 * (index + 1));
    });
    
    // Add the pulse animation to the document if it doesn't exist
    if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Map pins animation initialized');
}

function makeMapPinsInteractive(mapPins) {
    // Select the success stories elements
    const successStories = document.querySelectorAll('.success-story');
    
    // Create a map of success story titles to elements for quick lookup
    const storyMap = {};
    successStories.forEach(story => {
        const title = story.querySelector('.success-title')?.textContent;
        if (title) {
            storyMap[title.trim()] = story;
        }
    });
    
    // Make each pin interactive
    mapPins.forEach(pin => {
        // Style the pin for interactivity
        pin.style.cursor = 'pointer';
        
        // Handle hover effects
        pin.addEventListener('mouseenter', () => {
            pin.style.transform = 'scale(1.1)';
            pin.style.zIndex = '100';
            
            // Find associated story
            const pinTitle = pin.querySelector('h4')?.textContent;
            if (pinTitle && storyMap[pinTitle]) {
                storyMap[pinTitle].style.backgroundColor = 'rgba(255, 248, 220, 0.9)';
                storyMap[pinTitle].style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
                storyMap[pinTitle].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        pin.addEventListener('mouseleave', () => {
            pin.style.transform = 'scale(1)';
            pin.style.zIndex = '1';
            
            // Reset associated story
            const pinTitle = pin.querySelector('h4')?.textContent;
            if (pinTitle && storyMap[pinTitle]) {
                storyMap[pinTitle].style.backgroundColor = '';
                storyMap[pinTitle].style.boxShadow = '';
            }
        });
        
        // Handle click to scroll to associated story
        pin.addEventListener('click', () => {
            const pinTitle = pin.querySelector('h4')?.textContent;
            if (pinTitle && storyMap[pinTitle]) {
                storyMap[pinTitle].scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Add highlight effect
                storyMap[pinTitle].style.backgroundColor = 'rgba(255, 248, 220, 0.9)';
                storyMap[pinTitle].style.boxShadow = '0 0 15px rgba(0,0,0,0.3)';
                
                // Remove highlight after a delay
                setTimeout(() => {
                    storyMap[pinTitle].style.backgroundColor = '';
                    storyMap[pinTitle].style.boxShadow = '';
                }, 2000);
            }
        });
    });
    
    // Style the success stories for better visibility
    successStories.forEach(story => {
        story.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        story.style.padding = '15px';
        story.style.borderRadius = '8px';
        story.style.marginBottom = '15px';
    });
    
    console.log('Map pins interactivity added');
}

// Add CSS for the map pins if needed
function addMapPinStyles() {
    if (!document.getElementById('map-pin-styles')) {
        const style = document.createElement('style');
        style.id = 'map-pin-styles';
        style.textContent = `
            .map-pin {
                position: absolute;
                background-color: white;
                border-radius: 8px;
                padding: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                max-width: 200px;
                z-index: 10;
                transition: all 0.3s ease;
            }
            
            .map-pin:before {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 10px 10px 0;
                border-style: solid;
                border-color: white transparent transparent;
            }
            
            .map-pin.success:before {
                border-top-color: #e8f5e9;
            }
            
            .map-pin.success {
                background-color: #e8f5e9;
                border-left: 4px solid #4caf50;
            }
            
            .map-pin h4 {
                margin: 0 0 5px;
                font-size: 14px;
                color: #333;
            }
            
            .map-pin p {
                margin: 0;
                font-size: 12px;
                color: #666;
            }
        `;
        document.head.appendChild(style);
        console.log('Map pin styles added');
    }
}

// Call this function to add the styles
addMapPinStyles();

// Fallback initialization in case the load event has already fired
if (document.readyState === "complete") {
    console.log('Document already loaded, initializing success stories map');
    setTimeout(initializeSuccessStoriesMap, 500);
}
