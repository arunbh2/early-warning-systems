// Wait for both the DOM and external resources to load
window.addEventListener('load', function() {
    // Check if D3 is available
    if (typeof d3 === 'undefined') {
        console.error('D3 library is not loaded. Please check the script inclusion in your HTML.');
        return;
    }
    
    console.log('Starting disaster visualization creation');
    createDisasterVisualization();
});

function createDisasterVisualization() {
    // Check if the challenge section exists
    const challengeSection = document.getElementById('challenge');
    if (!challengeSection) {
        console.error("Challenge section not found. Make sure there's an element with id='challenge'");
        return;
    }
    
    console.log('Challenge section found, creating visualization');
    
    // First, let's create a container for our visualization
    const vizContainer = document.createElement('div');
    vizContainer.id = 'disaster-visualization';
    vizContainer.style.width = '100%';
    vizContainer.style.height = '300px'; // Increased height for better visibility
    vizContainer.style.marginBottom = '20px';
    vizContainer.style.position = 'relative';
    
    // Add it after the animated background in the challenge section
    const animatedBg = document.getElementById('challengeAnimatedBackground');
    if (animatedBg) {
        challengeSection.insertBefore(vizContainer, animatedBg.nextSibling);
    } else {
        // Fallback to the beginning of the challenge section
        if (challengeSection.firstChild) {
            challengeSection.insertBefore(vizContainer, challengeSection.firstChild);
        } else {
            challengeSection.appendChild(vizContainer);
        }
    }
    
    // Set up SVG with D3
    // Use getBoundingClientRect for more accurate sizing
    const containerRect = vizContainer.getBoundingClientRect();
    const width = containerRect.width || vizContainer.clientWidth || 800;
    const height = containerRect.height || vizContainer.clientHeight || 300;
    
    console.log(`Creating SVG with dimensions: ${width}x${height}`);
    
    const svg = d3.select('#disaster-visualization')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('background-color', '#f5f5f5')
        .style('border-radius', '8px')
        .style('overflow', 'hidden');
    
    // Add a gradient background to represent changing climate
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
        .attr('id', 'climate-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');
    
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#b3d9ff')
        .attr('stop-opacity', 0.7);
    
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#ffcccc')
        .attr('stop-opacity', 0.7);
    
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'url(#climate-gradient)');
    
    // Create title for the visualization
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Increasing Hydro-Meteorological Hazards');
    
    // Create disaster data - mapping frequency over time (showing increase)
    const years = [1980, 1990, 2000, 2010, 2020];
    const disasterTypes = [
        { type: 'Floods', color: '#0066CC', baseSize: 5, growth: 2.5 },
        { type: 'Storms', color: '#666666', baseSize: 4, growth: 2.2 },
        { type: 'Landslides', color: '#8B4513', baseSize: 3, growth: 1.8 }
    ];
    
    // Create a group for each disaster type
    const disasterGroups = svg.selectAll('.disaster-group')
        .data(disasterTypes)
        .enter()
        .append('g')
        .attr('class', 'disaster-group')
        .attr('transform', (d, i) => `translate(0, ${60 + i * 45})`);
    
    // Add labels for each disaster type
    disasterGroups.append('text')
        .attr('x', 20)
        .attr('y', 0)
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', d => d.color)
        .text(d => d.type);
    
    // Create circles representing disasters for each time period
    disasterGroups.each(function(disasterData) {
        const group = d3.select(this);
        
        years.forEach((year, i) => {
            // Calculate size based on growth factor (representing increasing frequency)
            const circleSize = disasterData.baseSize * Math.pow(disasterData.growth, i * 0.25);
            
            // Create a circle for this disaster type and year
            const circle = group.append('circle')
                .attr('cx', 100 + i * (width - 150) / (years.length - 1))
                .attr('cy', 0)
                .attr('r', 0) // Start with size 0
                .attr('fill', disasterData.color)
                .attr('opacity', 0.7)
                .attr('stroke', '#fff')
                .attr('stroke-width', 1);
            
            // Animate the circle growing
            circle.transition()
                .duration(1000)
                .delay(i * 300)
                .attr('r', circleSize);
                
            // Add pulsing animation with a safer implementation
            function pulseCircle() {
                circle.transition()
                    .duration(2000)
                    .attr('r', circleSize * 1.2)
                    .attr('opacity', 0.9)
                    .transition()
                    .duration(2000)
                    .attr('r', circleSize)
                    .attr('opacity', 0.7)
                    .on('end', pulseCircle);
            }
            
            // Start pulsing after initial grow animation with a safer approach
            setTimeout(() => {
                // Check if element still exists in DOM before animating
                if (document.getElementById('disaster-visualization')) {
                    pulseCircle();
                }
            }, 1000 + i * 300);
            
            // Add year labels below the last row
            if (disasterData.type === disasterTypes[disasterTypes.length - 1].type) {
                group.append('text')
                    .attr('x', 100 + i * (width - 150) / (years.length - 1))
                    .attr('y', 25)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '12px')
                    .text(year)
                    .style('opacity', 0)
                    .transition()
                    .duration(1000)
                    .delay(i * 300)
                    .style('opacity', 1);
            }
        });
    });
    
    // Add an axis line at the bottom
    svg.append('line')
        .attr('x1', 100)
        .attr('y1', height - 35)
        .attr('x2', width - 50)
        .attr('y2', height - 35)
        .attr('stroke', '#333')
        .attr('stroke-width', 1);
    
    // Add explanation text
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-style', 'italic')
        .text('Circle size represents disaster frequency (increasing over time)');
    
    // Add vulnerable population icon at the right
    const iconGroup = svg.append('g')
        .attr('transform', `translate(${width - 35}, 70)`);
    
    // Simple person icon
    iconGroup.append('circle')
        .attr('r', 8)
        .attr('fill', '#CC0000');
    
    iconGroup.append('path')
        .attr('d', 'M0,8 L0,24')
        .attr('stroke', '#CC0000')
        .attr('stroke-width', 4);
    
    iconGroup.append('path')
        .attr('d', 'M-8,15 L8,15')
        .attr('stroke', '#CC0000')
        .attr('stroke-width', 4);
    
    iconGroup.append('path')
        .attr('d', 'M-5,30 L0,24 L5,30')
        .attr('stroke', '#CC0000')
        .attr('stroke-width', 4);
    
    // Add growing risk arrow
    const arrowGroup = svg.append('g')
        .attr('transform', `translate(${width - 35}, 120)`);
    
    arrowGroup.append('path')
        .attr('d', 'M-10,10 L0,0 L10,10')
        .attr('fill', 'none')
        .attr('stroke', '#CC0000')
        .attr('stroke-width', 3);
    
    // Add animation to the arrow indicating increasing risk with a safer implementation
    function animateArrow() {
        // Check if element still exists in DOM before animating
        if (!document.getElementById('disaster-visualization')) {
            return; // Stop animation if element no longer exists
        }
        
        arrowGroup.transition()
            .duration(1500)
            .attr('transform', `translate(${width - 35}, 100)`)
            .transition()
            .duration(1500)
            .attr('transform', `translate(${width - 35}, 120)`)
            .on('end', animateArrow);
    }
    
    animateArrow();
    
    // Add caption for the vulnerable population
    svg.append('text')
        .attr('x', width - 35)
        .attr('y', 150)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#CC0000')
        .text('Rising Risks');
    
    console.log('Disaster visualization created successfully');
}

// Fallback initialization in case the load event has already fired
if (document.readyState === "complete") {
    console.log('Document already loaded, initializing visualization');
    setTimeout(function() {
        if (typeof d3 !== 'undefined') {
            createDisasterVisualization();
        } else {
            console.error('D3 library not available for fallback initialization');
        }
    }, 500); // Short delay to ensure other resources are loaded
}
