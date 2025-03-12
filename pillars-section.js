/ Wait for the document to fully load
window.addEventListener('load', function() {
    console.log('Initializing Four Pillars section enhancements');
    fixPillarsSectionInteractivity();
});

function fixPillarsSectionInteractivity() {
    // Find the pillars section
    const pillarsSection = document.getElementById('pillars');
    if (!pillarsSection) {
        console.error("Pillars section not found");
        return;
    }

    // Add the necessary CSS
    addPillarsCSS();
    
    // Find all pillars
    const pillars = pillarsSection.querySelectorAll('.pillar');
    if (pillars.length === 0) {
        console.error("No pillars found in the pillars section");
        return;
    }
    
    console.log(`Found ${pillars.length} pillars`);
    
    // Add click and hover behaviors to each pillar
    pillars.forEach((pillar, index) => {
        // Make sure pillar has position relative for absolute positioning of details
        pillar.style.position = 'relative';
        
        // Find the details element in this pillar
        const details = pillar.querySelector('.pillar-details');
        if (!details) {
            console.error(`Pillar details not found in pillar ${index + 1}`);
            return;
        }
        
        // Add initial styling to the details
        details.classList.add('pillar-details-enhanced');
        
        // Add hover behavior
        pillar.addEventListener('mouseenter', () => {
            // Hide any other visible details first
            document.querySelectorAll('.pillar-details-visible').forEach(el => {
                if (el !== details) {
                    el.classList.remove('pillar-details-visible');
                }
            });
            
            // Show this pillar's details
            details.classList.add('pillar-details-visible');
            
            // Add active class to pillar
            pillar.classList.add('pillar-active');
        });
        
        // Optional: Keep details open on click (toggle functionality)
        pillar.addEventListener('click', (e) => {
            // Stop propagation to prevent document click handler from immediately closing
            e.stopPropagation();
            
            // Toggle the pinned state
            details.classList.toggle('pillar-details-pinned');
            pillar.classList.toggle('pillar-pinned');
            
            // Close other pinned details
            document.querySelectorAll('.pillar-details-pinned').forEach(el => {
                if (el !== details) {
                    el.classList.remove('pillar-details-pinned');
                    el.closest('.pillar').classList.remove('pillar-pinned');
                }
            });
        });
        
        // Handle mouseleave (only hide if not pinned)
        pillar.addEventListener('mouseleave', () => {
            if (!details.classList.contains('pillar-details-pinned')) {
                details.classList.remove('pillar-details-visible');
                pillar.classList.remove('pillar-active');
            }
        });
    });
    
    // Close any open/pinned details when clicking elsewhere on the document
    document.addEventListener('click', (e) => {
        // Check if the click is outside any pillar
        if (!e.target.closest('.pillar')) {
            document.querySelectorAll('.pillar-details-pinned, .pillar-details-visible').forEach(el => {
                el.classList.remove('pillar-details-pinned', 'pillar-details-visible');
            });
            document.querySelectorAll('.pillar-active, .pillar-pinned').forEach(el => {
                el.classList.remove('pillar-active', 'pillar-pinned');
            });
        }
    });
    
    console.log('Pillars interactivity enhanced');
}

function addPillarsCSS() {
    // Only add the CSS if it doesn't already exist
    if (!document.getElementById('pillars-enhanced-styles')) {
        const style = document.createElement('style');
        style.id = 'pillars-enhanced-styles';
        style.textContent = `
            /* Base styles for the pillars container */
            .pillars-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                position: relative;
                z-index: 1;
            }
            
            /* Base styles for each pillar */
            .pillar {
                background-color: white;
                border-radius: 10px;
                padding: 20px;
                width: 200px;
                min-height: 180px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                overflow: visible;
            }
            
            /* Pillar icon styles */
            .pillar-icon {
                font-size: 32px;
                margin-bottom: 10px;
            }
            
            /* Pillar title styles */
            .pillar-title {
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 10px;
                text-align: center;
            }
            
            /* Pillar description styles */
            .pillar-description {
                color: #666;
                text-align: center;
                font-size: 14px;
            }
            
            /* Enhanced pillar details styles */
            .pillar-details-enhanced {
                position: absolute;
                top: 100%;
                left: 0;
                width: 250px;
                background-color: white;
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 6px 16px rgba(0,0,0,0.15);
                z-index: 100;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.3s ease;
                overflow: hidden;
                max-height: 0;
            }
            
            /* Visible state for pillar details */
            .pillar-details-visible, .pillar-details-pinned {
                opacity: 1;
                visibility: visible;
                transform: translateY(5px);
                max-height: 300px;
                overflow: auto;
                z-index: 101;
            }
            
            /* Active state for pillar */
            .pillar-active, .pillar-pinned {
                transform: translateY(-5px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.2);
                z-index: 100;
            }
            
            /* Pillar details heading styles */
            .pillar-details h4 {
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            /* Pillar details paragraph styles */
            .pillar-details p {
                margin-bottom: 10px;
                font-size: 14px;
            }
            
            /* Pillar details list styles */
            .pillar-details ul {
                margin: 0;
                padding-left: 20px;
            }
            
            .pillar-details li {
                margin-bottom: 5px;
                font-size: 13px;
            }
            
            /* Color-specific styles */
            .pillar-red .pillar-icon, .pillar-red .pillar-title {
                color: var(--red, #e63946);
            }
            
            .pillar-blue .pillar-icon, .pillar-blue .pillar-title {
                color: var(--blue, #457b9d);
            }
            
            .pillar-orange .pillar-icon, .pillar-orange .pillar-title {
                color: var(--orange, #e76f51);
            }
            
            .pillar-green .pillar-icon, .pillar-green .pillar-title {
                color: var(--green, #2a9d8f);
            }
            
            /* Pillar hover indicator */
            .pillar::after {
                content: '';
                position: absolute;
                bottom: 5px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid rgba(0,0,0,0.3);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .pillar:hover::after {
                opacity: 1;
            }
            
            /* Add media query for better mobile display */
            @media (max-width: 768px) {
                .pillars-container {
                    flex-direction: column;
                    align-items: center;
                }
                
                .pillar {
                    width: 90%;
                    max-width: 300px;
                }
                
                .pillar-details-enhanced {
                    width: 90%;
                    left: 5%;
                    right: 5%;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('Pillars enhanced styles added');
    }
}

// Fallback initialization in case the load event has already fired
if (document.readyState === "complete") {
    console.log('Document already loaded, initializing pillars section enhancements');
    setTimeout(fixPillarsSectionInteractivity, 500);
}
