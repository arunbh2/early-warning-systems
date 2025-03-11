// Animated background
        function createAnimatedBackground() {
            const bg = document.getElementById('animatedBackground');
            
            // Create clouds
            for (let i = 0; i < 10; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'cloud';
                cloud.style.width = (Math.random() * 100 + 50) + 'px';
                cloud.style.height = (Math.random() * 50 + 25) + 'px';
                cloud.style.top = (Math.random() * 100) + '%';
                cloud.style.left = (Math.random() * 100) + '%';
                cloud.style.opacity = Math.random() * 0.5 + 0.3;
                bg.appendChild(cloud);
            }
            
            // Create raindrops
            for (let i = 0; i < 50; i++) {
                const drop = document.createElement('div');
                drop.className = 'raindrop';
                drop.style.top = (Math.random() * 100) + '%';
                drop.style.left = (Math.random() * 100) + '%';
                drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
                drop.style.animationDelay = (Math.random() * 2) + 's';
                bg.appendChild(drop);
            }
            
            // Create warning icons
            for (let i = 0; i < 5; i++) {
                const icon = document.createElement('div');
                icon.className = 'warning-icon';
                icon.style.width = (Math.random() * 30 + 20) + 'px';
                icon.style.height = (Math.random() * 30 + 20) + 'px';
                icon.style.top = (Math.random() * 100) + '%';
                icon.style.left = (Math.random() * 100) + '%';
                icon.style.opacity = Math.random() * 0.5 + 0.3;
                bg.appendChild(icon);
            }
        }
        
        // Navigation highlighting
        function highlightNavigation() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            window.addEventListener('scroll', () => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
        }
        
        // Action plan generator
        function setupActionGenerator() {
            const generateButton = document.getElementById('generatePlan');
            const resultContainer = document.getElementById('resultContainer');
            const actionList = document.getElementById('actionList');
            
            generateButton.addEventListener('click', () => {
                // In a real implementation, this would analyze the form inputs
                // For demo purposes, we'll show some example actions
                
                actionList.innerHTML = '';
                
                const actions = [
                    "Organize a community meeting to form a diverse early warning committee with at least 40% women participation",
                    "Conduct a participatory mapping exercise to identify flood-prone areas and evacuation routes",
                    "Purchase and install 3-5 simple rain gauges at strategic upstream locations",
                    "Develop a color-coded flag system for different warning levels (green, yellow, red)",
                    "Create a phone tree with designated communicators for each neighborhood section",
                    "Schedule monthly drills during the high-risk season to practice evacuation procedures",
                    "Establish a partnership with local government for technical support and resources"
                ];
                
                actions.forEach(action => {
                    const li = document.createElement('li');
                    li.className = 'action-item';
                    li.textContent = action;
                    actionList.appendChild(li);
                });
                
                resultContainer.style.display = 'block';
                resultContainer.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Initialize all interactive elements
        document.addEventListener('DOMContentLoaded', () => {
            createAnimatedBackground();
            highlightNavigation();
            setupActionGenerator();
            
            // Add animation for raindrops
            const style = document.createElement('style');
            style.textContent = `
                @keyframes raindrop {
                    0% { transform: translateY(-10px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100px); opacity: 0; }
                }
                
                .raindrop {
                    animation: raindrop 2s linear infinite;
                }
            `;
            document.head.appendChild(style);
        });
