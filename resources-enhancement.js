// Wait for the document to fully load
window.addEventListener('load', function() {
    console.log('Adding Resources Section');
    addResourcesSection();
    enhancePillarsWithRepository();
});

function addResourcesSection() {
    // First, check if the resources section already exists
    if (document.getElementById('resources')) {
        console.log('Resources section already exists');
        return;
    }

    // Create the new section element
    const resourcesSection = document.createElement('section');
    resourcesSection.id = 'resources';
    resourcesSection.className = 'section resources-section';

    // Create the HTML content for the section
    resourcesSection.innerHTML = `
        <h2>Knowledge Repository: Practical Insights & Resources</h2>
        
        <div class="resources-intro">
            <p>Drawing from over two decades of experience implementing community-centered early warning systems across Asia, Africa, and Latin America, this knowledge repository provides evidence-based approaches and practical tools to guide your implementation efforts.</p>
            <p>Explore case studies, best practices, and downloadable resources to help you develop effective, accessible, and sustainable early warning systems.</p>
        </div>
        
        <div class="resources-categories">
            <div class="resource-category" data-category="case-studies">
                <div class="category-icon">📋</div>
                <h3>Case Studies</h3>
                <p>Learn from successful implementations around the world</p>
                <div class="category-resources">
                    <div class="resource-item">
                        <h4>Bangladesh Cyclone Preparedness</h4>
                        <p>76,000 volunteers dramatically reduced cyclone fatalities from 300,000+ in a single 1970s event to minimal casualties today.</p>
                        <button class="resource-button">Download Case Study</button>
                    </div>
                    <div class="resource-item">
                        <h4>South Asia Flood Warning</h4>
                        <p>Simple wire sensors providing 1-2 hours lead time, costing $1,000 per unit but saving assets worth $3,300 in a single flood event.</p>
                        <button class="resource-button">Download Case Study</button>
                    </div>
                    <div class="resource-item">
                        <h4>Costa Rica Landslide Warning</h4>
                        <p>Community-based system that prevented casualties in a 2003 landslide of similar magnitude to one that killed 7 people in 2002.</p>
                        <button class="resource-button">Download Case Study</button>
                    </div>
                    <div class="resource-item">
                        <h4>Uganda Mt. Elgon Radio Warnings</h4>
                        <p>Solar-powered community radio with megaphones reaching remote communities at risk of mudslides.</p>
                        <button class="resource-button">Download Case Study</button>
                    </div>
                </div>
            </div>
            
            <div class="resource-category" data-category="implementation-guides">
                <div class="category-icon">📚</div>
                <h3>Implementation Guides</h3>
                <p>Step-by-step approaches to building effective warning systems</p>
                <div class="category-resources">
                    <div class="resource-item">
                        <h4>Community Risk Assessment Guide</h4>
                        <p>Participatory methods for mapping hazards, vulnerabilities, and capacities.</p>
                        <button class="resource-button">Download Guide</button>
                    </div>
                    <div class="resource-item">
                        <h4>Low-Cost Monitoring Technology Manual</h4>
                        <p>Technical specifications and installation guides for river gauges, rain meters, and alert systems.</p>
                        <button class="resource-button">Download Manual</button>
                    </div>
                    <div class="resource-item">
                        <h4>Warning Dissemination Strategy Toolkit</h4>
                        <p>Communication planning templates for ensuring warnings reach everyone.</p>
                        <button class="resource-button">Download Toolkit</button>
                    </div>
                    <div class="resource-item">
                        <h4>Community Response Planning Framework</h4>
                        <p>Templates for developing Standard Operating Procedures and conducting effective drills.</p>
                        <button class="resource-button">Download Framework</button>
                    </div>
                </div>
            </div>
            
            <div class="resource-category" data-category="specialized-guides">
                <div class="category-icon">📝</div>
                <h3>Specialized Guides</h3>
                <p>Focused resources for specific aspects of early warning systems</p>
                <div class="category-resources">
                    <div class="resource-item">
                        <h4>Gender-Inclusive Early Warning</h4>
                        <p>Practical approaches to ensure gender considerations are central to warning system design.</p>
                        <button class="resource-button">Download Guide</button>
                    </div>
                    <div class="resource-item">
                        <h4>Multi-Stakeholder Governance Models</h4>
                        <p>Frameworks for effective coordination between communities, local government, and national agencies.</p>
                        <button class="resource-button">Download Guide</button>
                    </div>
                    <div class="resource-item">
                        <h4>Emerging Technologies Integration</h4>
                        <p>Guidance on appropriately integrating new technologies while maintaining low-tech backups.</p>
                        <button class="resource-button">Download Guide</button>
                    </div>
                    <div class="resource-item">
                        <h4>Cost-Benefit Analysis Tool</h4>
                        <p>Spreadsheet and methodology for calculating return on investment for early warning systems.</p>
                        <button class="resource-button">Download Tool</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="resources-cta">
            <h3>The Compelling Case for Investment</h3>
            <p>Investing in community-centered early warning systems represents one of the most cost-effective approaches to disaster risk reduction, with returns as high as <strong>10:1 in averted losses</strong>. As climate change intensifies hydro-meteorological hazards worldwide, supporting these systems becomes increasingly urgent.</p>
            <p>The UN's "Early Warnings for All" initiative aims to ensure everyone on Earth is protected by early warning systems by 2027. Meeting this ambitious goal requires scaling up proven community-centered approaches.</p>
            <button class="generator-button" style="background-color: var(--blue);">Access Full Knowledge Repository</button>
        </div>
    `;
    
    // Find where to insert the new section (before footer)
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.parentNode.insertBefore(resourcesSection, footer);
        console.log('Resources section added to the page');
        
        // Add it to navigation
        addResourcesNavLink();
    } else {
        console.error('Footer not found, could not add resources section');
    }
    
    // Add event listeners to the buttons
    addResourceButtonListeners();
    
    // Add CSS for the resources section
    addResourcesCSS();
}

function addResourcesNavLink() {
    // Find the navigation container
    const nav = document.querySelector('.nav');
    if (!nav) {
        console.error('Navigation not found');
        return;
    }
    
    // Check if resources link already exists
    if (document.querySelector('a[href="#resources"]')) {
        console.log('Resources link already exists in navigation');
        return;
    }
    
    // Create new link
    const resourcesLink = document.createElement('a');
    resourcesLink.href = '#resources';
    resourcesLink.className = 'nav-link';
    resourcesLink.textContent = 'Resources';
    
    // Add it before the action link
    const actionLink = document.querySelector('a[href="#action"]');
    if (actionLink) {
        nav.insertBefore(resourcesLink, actionLink);
        console.log('Resources link added to navigation');
    } else {
        // Add it to the end if action link not found
        nav.appendChild(resourcesLink);
        console.log('Resources link added to the end of navigation');
    }
}

function addResourceButtonListeners() {
    const resourceButtons = document.querySelectorAll('.resource-button');
    resourceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceTitle = this.closest('.resource-item').querySelector('h4').textContent;
            alert(`The "${resourceTitle}" would be downloaded here. In the full implementation, this would provide a PDF or other resource document.`);
        });
    });
}

function enhancePillarsWithRepository() {
    // Add additional content to the pillars based on repository data
    const pillars = document.querySelectorAll('.pillar');
    if (pillars.length === 0) {
        console.error('No pillars found to enhance');
        return;
    }
    
    // Get each pillar by title and add repository content
    pillars.forEach(pillar => {
        const title = pillar.querySelector('.pillar-title')?.textContent;
        const details = pillar.querySelector('.pillar-details');
        
        if (!details) return;
        
        // Enhance Risk Knowledge pillar
        if (title === 'Risk Knowledge') {
            const additionalContent = document.createElement('div');
            additionalContent.className = 'pillar-repository-content';
            additionalContent.innerHTML = `
                <h5>Key Components from Knowledge Repository:</h5>
                <ul>
                    <li>Hazard identification and mapping</li>
                    <li>Exposure analysis of people and assets</li>
                    <li>Vulnerability assessment</li>
                    <li>Capacity mapping of existing resources</li>
                </ul>
                <p><em>Success example: Kathmandu Living Labs created comprehensive digital maps of flood-prone areas in Nepal, making critical information accessible online through OpenStreetMap.</em></p>
            `;
            details.appendChild(additionalContent);
        }
        
        // Enhance Monitoring pillar
        else if (title === 'Monitoring') {
            const additionalContent = document.createElement('div');
            additionalContent.className = 'pillar-repository-content';
            additionalContent.innerHTML = `
                <h5>Low-Tech Solutions with High Impact:</h5>
                <ul>
                    <li>Manual gauge readers (~$10-50)</li>
                    <li>Simple water level markers (~$20-100)</li>
                    <li>Open-wire sensors (~$100-800)</li>
                    <li>Community-managed rain gauges (~$30-200)</li>
                </ul>
                <p><em>In Nepal and India, low-cost river monitoring systems costing approximately $800 per unit provide 1-2 hours advance warning for downstream communities.</em></p>
            `;
            details.appendChild(additionalContent);
        }
        
        // Enhance Communication pillar
        else if (title === 'Communication') {
            const additionalContent = document.createElement('div');
            additionalContent.className = 'pillar-repository-content';
            additionalContent.innerHTML = `
                <h5>Ensuring the Last Mile:</h5>
                <ul>
                    <li>Multiple channels (traditional and modern)</li>
                    <li>Non-technical language in local dialects</li>
                    <li>Gender-specific communication networks</li>
                    <li>Pictorial messages for low-literacy populations</li>
                </ul>
                <p><em>In Bangladesh, push voice messages effectively reach communities with varying literacy levels. In Uganda, solar-powered community radio with megaphones reach a 300m radius in remote areas.</em></p>
            `;
            details.appendChild(additionalContent);
        }
        
        // Enhance Response Capability pillar
        else if (title === 'Response Capability') {
            const additionalContent = document.createElement('div');
            additionalContent.className = 'pillar-repository-content';
            additionalContent.innerHTML = `
                <h5>Turning Warning into Action:</h5>
                <ul>
                    <li>Evacuation routes and safe shelter identification</li>
                    <li>Regular community-wide drills</li>
                    <li>Standard operating procedures for different warning levels</li>
                    <li>First responder training for community members</li>
                </ul>
                <p><em>In Costa Rica, 200 community members were trained in disaster preparedness with 30 dedicated radio operators. In Bangladesh and Nepal, clear Standard Operating Procedures define actions at different warning levels.</em></p>
            `;
            details.appendChild(additionalContent);
        }
        
        console.log(`Enhanced ${title} pillar with repository content`);
    });
}

function addResourcesCSS() {
    // Only add CSS if it doesn't already exist
    if (!document.getElementById('resources-section-styles')) {
        const style = document.createElement('style');
        style.id = 'resources-section-styles';
        style.textContent = `
            /* Resources Section Styles */
            .resources-section {
                background-color: #f8f9fa;
                padding: 3rem 1.5rem;
            }
            
            .resources-intro {
                max-width: 800px;
                margin: 0 auto 2rem;
                text-align: center;
            }
            
            .resources-categories {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;
                justify-content: center;
                margin-bottom: 3rem;
            }
            
            .resource-category {
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                padding: 1.5rem;
                width: 100%;
                max-width: 350px;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .resource-category:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 16px rgba(0,0,0,0.15);
            }
            
            .category-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .resource-category h3 {
                margin-bottom: 0.5rem;
                color: var(--blue, #457b9d);
            }
            
            .resource-category p {
                text-align: center;
                margin-bottom: 1.5rem;
                color: #666;
            }
            
            .category-resources {
                width: 100%;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.5s ease;
            }
            
            .resource-category:hover .category-resources,
            .resource-category:focus-within .category-resources {
                max-height: 1000px;
            }
            
            .resource-item {
                border-top: 1px solid #eee;
                padding: 1rem 0;
            }
            
            .resource-item h4 {
                font-size: 1rem;
                margin-bottom: 0.5rem;
                color: #333;
            }
            
            .resource-item p {
                font-size: 0.9rem;
                margin-bottom: 0.75rem;
                text-align: left;
            }
            
            .resource-button {
                background-color: var(--blue, #457b9d);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .resource-button:hover {
                background-color: var(--red, #e63946);
            }
            
            .resources-cta {
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                padding: 2rem;
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
            }
            
            .resources-cta h3 {
                color: var(--green, #2a9d8f);
                margin-bottom: 1rem;
            }
            
            .resources-cta p {
                margin-bottom: 1.5rem;
            }
            
            .pillar-repository-content {
                margin-top: 12px;
                padding-top: 12px;
                border-top: 1px dashed #ccc;
            }
            
            .pillar-repository-content h5 {
                margin-top: 0;
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .pillar-repository-content ul {
                margin: 0;
                padding-left: 20px;
                font-size: 12px;
            }
            
            .pillar-repository-content p {
                font-size: 12px;
                font-style: italic;
                margin-top: 8px;
                margin-bottom: 0;
            }
            
            /* Media query for better mobile display */
            @media (max-width: 768px) {
                .resources-categories {
                    flex-direction: column;
                    align-items: center;
                }
                
                .resource-category {
                    max-width: 90%;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('Resources section styles added');
    }
}

// Fallback initialization in case the load event has already fired
if (document.readyState === "complete") {
    console.log('Document already loaded, initializing resources section');
    setTimeout(function() {
        addResourcesSection();
        enhancePillarsWithRepository();
    }, 500);
}
