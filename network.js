document.addEventListener('DOMContentLoaded', function() {
    // Network data - stakeholders and their connections
    const nodes = [
        { id: "community", name: "Community", group: 1, size: 15 },
        { id: "localGov", name: "Local Government", group: 2, size: 15 },
        { id: "natAgency", name: "National Agency", group: 3, size: 15 },
        { id: "ngo", name: "NGOs", group: 4, size: 15 },
        { id: "volunteers", name: "Volunteers", group: 1, size: 10 },
        { id: "meteorological", name: "Meteorological Service", group: 3, size: 12 },
        { id: "schools", name: "Schools", group: 2, size: 8 },
        { id: "religious", name: "Religious Institutions", group: 1, size: 8 },
        { id: "media", name: "Local Media", group: 2, size: 10 }
    ];
    
    const links = [
        { source: "community", target: "volunteers", value: 5 },
        { source: "community", target: "localGov", value: 3 },
        { source: "community", target: "religious", value: 4 },
        { source: "community", target: "schools", value: 2 },
        { source: "volunteers", target: "ngo", value: 4 },
        { source: "localGov", target: "natAgency", value: 3 },
        { source: "natAgency", target: "meteorological", value: 5 },
        { source: "meteorological", target: "localGov", value: 3 },
        { source: "localGov", target: "media", value: 2 },
        { source: "media", target: "community", value: 3 },
        { source: "ngo", target: "localGov", value: 2 },
        { source: "ngo", target: "schools", value: 2 },
        { source: "religious", target: "volunteers", value: 1 }
    ];
    
    // Get container dimensions
    const container = document.getElementById('network-container');
    const width = container.clientWidth;
    const height = container.clientHeight || 400;
    
    // Color scale based on group
    const color = d3.scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range(["#FF7F00", "#008800", "#0066CC", "#CC0000"]);
    
    // Create SVG container
    const svg = d3.select("#network-container").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // Create simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
    
    // Add links
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", d => Math.sqrt(d.value));
    
    // Add nodes
    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", d => d.size)
        .attr("fill", d => color(d.group))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // Add labels
    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => d.name)
        .style("font-size", "10px")
        .style("fill", "#333")
        .style("pointer-events", "none");
    
    // Add tooltips
    node.append("title")
        .text(d => d.name);
    
    // Update positions on each tick
    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        
        label
            .attr("x", d => d.x)
            .attr("y", d => d.y + d.size + 8);
    }
    
    // Drag functions for interactive nodes
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // Add interaction for showing relationship details
    node.on("click", function(event, d) {
        // Find all links connected to this node
        const connectedLinks = links.filter(link => 
            link.source.id === d.id || link.target.id === d.id);
        
        // Highlight those links
        link.attr("stroke", l => 
            connectedLinks.includes(l) ? "#333" : "#999")
            .attr("stroke-width", l => 
                connectedLinks.includes(l) ? Math.sqrt(l.value) * 2 : Math.sqrt(l.value));
        
        // Highlight connected nodes
        const connectedNodeIds = new Set();
        connectedLinks.forEach(l => {
            connectedNodeIds.add(l.source.id);
            connectedNodeIds.add(l.target.id);
        });
        
        node.attr("stroke", n => 
            connectedNodeIds.has(n.id) ? "#333" : "#fff")
            .attr("stroke-width", n => 
                connectedNodeIds.has(n.id) ? 3 : 1.5);
        
        // Show information about the relationships
        const infoBox = document.getElementById("relationship-info");
        if (infoBox) {
            let html = `<h4>${d.name} Connections</h4><ul>`;
            
            connectedLinks.forEach(l => {
                const otherNode = l.source.id === d.id ? l.target : l.source;
                const direction = l.source.id === d.id ? "→" : "←";
                html += `<li>${otherNode.name} ${direction} Relationship strength: ${l.value}</li>`;
            });
            
            html += `</ul>`;
            infoBox.innerHTML = html;
            infoBox.style.display = "block";
        }
    });
    
    // Reset highlights when clicking elsewhere
    svg.on("click", function(event) {
        if (event.target === this) {
            link.attr("stroke", "#999")
                .attr("stroke-width", d => Math.sqrt(d.value));
            
            node.attr("stroke", "#fff")
                .attr("stroke-width", 1.5);
            
            const infoBox = document.getElementById("relationship-info");
            if (infoBox) {
                infoBox.style.display = "none";
            }
        }
    });
});
