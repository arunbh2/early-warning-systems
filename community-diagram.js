document.addEventListener('DOMContentLoaded', function() {
    // Community members data with their characteristics and communication channels
    const communityMembers = [
        { 
            id: "center", 
            type: "center", 
            x: 400, 
            y: 200, 
            label: "Warning Center",
            description: "Community warning committee that initiates alerts" 
        },
        { 
            id: "elderly", 
            type: "vulnerable", 
            x: 250, 
            y: 100, 
            label: "Elderly Residents",
            description: "May have mobility issues, hearing difficulties, and need assistance to evacuate",
            channels: ["buddy", "door-to-door", "radio"]
        },
        { 
            id: "women", 
            type: "vulnerable", 
            x: 550, 
            y: 100, 
            label: "Women at Home",
            description: "May be unreachable through standard channels, often responsible for children and elderly",
            channels: ["women-volunteers", "door-to-door", "religious"]
        },
        { 
            id: "remote", 
            type: "vulnerable", 
            x: 200, 
            y: 300, 
            label: "Remote Households",
            description: "Isolated locations, may lack phone coverage or electricity",
            channels: ["messenger", "radio", "flag"]
        },
        { 
            id: "literacy", 
            type: "vulnerable", 
            x: 600, 
            y: 300, 
            label: "Low Literacy Households",
            description: "Cannot read written warnings, need verbal or visual alerts",
            channels: ["audio", "pictorial", "door-to-door"]
        },
        { 
            id: "workers", 
            type: "standard", 
            x: 300, 
            y: 400, 
            label: "Field Workers",
            description: "Away from home during the day, may miss home-based warnings",
            channels: ["siren", "mobile", "messenger"]
        },
        { 
            id: "mainstream", 
            type: "standard", 
            x: 500, 
            y: 400, 
            label: "General Population",
            description: "Accessible through standard warning channels",
            channels: ["siren", "mobile", "radio", "flag"]
        }
    ];

    // Communication channels with their characteristics
    const channels = [
        { id: "siren", name: "Siren/Loudspeaker", color: "#FF7F00", icon: "📢" },
        { id: "radio", name: "Community Radio", color: "#FF7F00", icon: "📻" },
        { id: "mobile", name: "Mobile Phone", color: "#FF7F00", icon: "📱" },
        { id: "flag", name: "Flag System", color: "#FF7F00", icon: "🚩" },
        { id: "door-to-door", name: "Door-to-Door Visit", color: "#008800", icon: "🚶" },
        { id: "women-volunteers", name: "Women Volunteers", color: "#008800", icon: "👩" },
        { id: "buddy", name: "Buddy System", color: "#008800", icon: "👥" },
        { id: "messenger", name: "Runners/Messengers", color: "#008800", icon: "🏃" },
        { id: "pictorial", name: "Pictorial Warnings", color: "#0066CC", icon: "🖼️" },
        { id: "audio", name: "Audio Warnings", color: "#0066CC", icon: "🔊" },
        { id: "religious", name: "Religious Networks", color: "#0066CC", icon: "🏛️" }
    ];

    // Create connections based on channels
    const connections = [];
    communityMembers.forEach(member => {
        if (member.id !== "center" && member.channels) {
            member.channels.forEach(channelId => {
                connections.push({
                    source: "center",
                    target: member.id,
                    channel: channelId
                });
            });
        }
    });

    // Get container dimensions
    const container = document.getElementById('community-diagram');
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // Create SVG container
    const svg = d3.select("#community-diagram").append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add a background
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#f9f9f9");

    // Create a legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 180}, 20)`);

    legend.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text("Communication Channels")
        .style("font-weight", "bold")
        .style("font-size", "12px");

    const channelGroups = {
        "#FF7F00": "Alert Systems",
        "#008800": "Person-to-Person",
        "#0066CC": "Accessible Formats"
    };

    let legendY = 20;
    Object.entries(channelGroups).forEach(([color, groupName]) => {
        legend.append("text")
            .attr("x", 0)
            .attr("y", legendY)
            .text(groupName)
            .style("font-size", "11px")
            .style("fill", color);
        
        legendY += 15;
        
        const groupChannels = channels.filter(c => c.color === color);
        groupChannels.forEach(channel => {
            legend.append("text")
                .attr("x", 10)
                .attr("y", legendY)
                .text(`${channel.icon} ${channel.name}`)
                .style("font-size", "10px");
            
            legendY += 15;
        });
        
        legendY += 5;
    });

    // Add connections first (so they're behind nodes)
    const link = svg.append("g")
        .selectAll("line")
        .data(connections)
        .enter().append("line")
        .attr("x1", d => {
            const source = communityMembers.find(m => m.id === d.source);
            return source ? source.x : 0;
        })
        .attr("y1", d => {
            const source = communityMembers.find(m => m.id === d.source);
            return source ? source.y : 0;
        })
        .attr("x2", d => {
            const target = communityMembers.find(m => m.id === d.target);
            return target ? target.x : 0;
        })
        .attr("y2", d => {
            const target = communityMembers.find(m => m.id === d.target);
            return target ? target.y : 0;
        })
        .attr("stroke", d => {
            const channel = channels.find(c => c.id === d.channel);
            return channel ? channel.color : "#999";
        })
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .style("opacity", 0.6);

    // Add icons along the paths
    svg.append("g")
        .selectAll("text")
        .data(connections)
        .enter().append("text")
        .attr("x", d => {
            const source = communityMembers.find(m => m.id === d.source);
            const target = communityMembers.find(m => m.id === d.target);
            return source && target ? (source.x + target.x) / 2 : 0;
        })
        .attr("y", d => {
            const source = communityMembers.find(m => m.id === d.source);
            const target = communityMembers.find(m => m.id === d.target);
            return source && target ? (source.y + target.y) / 2 : 0;
        })
        .text(d => {
            const channel = channels.find(c => c.id === d.channel);
            return channel ? channel.icon : "";
        })
        .style("font-size", "16px")
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .style("pointer-events", "none");

    // Add nodes for community members
    const node = svg.append("g")
        .selectAll("circle")
        .data(communityMembers)
        .enter().append("circle")
        .attr("r", d => d.type === "center" ? 25 : 20)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", d => {
            if (d.type === "center") return "#0066CC";
            if (d.type === "vulnerable") return "#CC0000";
            return "#008800";
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("cursor", "pointer");

    // Add labels for the nodes
    const label = svg.append("g")
        .selectAll("text")
        .data(communityMembers)
        .enter().append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y + 35)
        .text(d => d.label)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("pointer-events", "none");

    // Create tooltip for detailed information
    const tooltip = d3.select("#community-diagram")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
        .style("max-width", "250px")
        .style("font-size", "12px");

    // Interactive hover and click behavior
    node.on("mouseover", function(event, d) {
        // Highlight this node
        d3.select(this)
            .attr("stroke", "#333")
            .attr("stroke-width", 3);
        
        // Find connections for this node
        const nodeConnections = connections.filter(c => 
            c.source === d.id || c.target === d.id);
        
        // Highlight those connections
        link.style("opacity", l => 
            nodeConnections.includes(l) ? 1 : 0.2);
        
        // Show tooltip
        tooltip
            .style("visibility", "visible")
            .html(`<strong>${d.label}</strong><br>${d.description}`);
    })
    .on("mousemove", function(event) {
        tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
        // Reset highlights
        node.attr("stroke", "#fff")
            .attr("stroke-width", 2);
        
        link.style("opacity", 0.6);
        
        // Hide tooltip
        tooltip.style("visibility", "hidden");
    })
    .on("click", function(event, d) {
        // Find connections for this node
        const nodeConnections = connections.filter(c => 
            c.source === d.id || c.target === d.id);
        
        // Create info panel content
        let html = `<h4>${d.label}</h4>`;
        html += `<p>${d.description}</p>`;
        
        if (d.type !== "center") {
            html += `<h5>Communication Channels:</h5><ul>`;
            d.channels.forEach(channelId => {
                const channel = channels.find(c => c.id === channelId);
                if (channel) {
                    html += `<li>${channel.icon} <strong>${channel.name}</strong></li>`;
                }
            });
            html += `</ul>`;
            
            if (d.type === "vulnerable") {
                html += `<p style="color: #CC0000;"><strong>This is a vulnerable group that requires special attention in warning systems.</strong></p>`;
            }
        } else {
            html += `<p>The community warning committee initiates and coordinates all warnings.</p>`;
        }
        
        // Display in the info panel
        const infoPanel = document.getElementById("community-info-panel");
        if (infoPanel) {
            infoPanel.innerHTML = html;
            infoPanel.style.display = "block";
        }
    });
    
    // Click on background to reset
    svg.on("click", function(event) {
        if (event.target === this) {
            link.style("opacity", 0.6);
            
            const infoPanel = document.getElementById("community-info-panel");
            if (infoPanel) {
                infoPanel.style.display = "none";
            }
        }
    });

    // Add title
    svg.append("text")
        .attr("x", 20)
        .attr("y", 30)
        .text("Warning Pathways to Different Community Members")
        .style("font-size", "16px")
        .style("font-weight", "bold");
    
    // Add subtitle
    svg.append("text")
        .attr("x", 20)
        .attr("y", 50)
        .text("Hover over nodes to see connections. Click for details.")
        .style("font-size", "12px")
        .style("font-style", "italic");
});
