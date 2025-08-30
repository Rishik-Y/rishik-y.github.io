// Main JavaScript functionality for GSoC Documentation Website

class GSoCDocumentation {
    constructor() {
        this.currentSection = 'overview';
        this.isMobile = window.innerWidth <= 768;
        this.contentCache = new Map();
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeHighlighting();
        this.handleInitialLoad();
        this.setupResponsive();
    }
    
    bindEvents() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.navigateToSection(section);
            });
        });
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.navigateToSection(e.state.section, false);
            }
        });

        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                // Save preference
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    localStorage.setItem('darkMode', 'disabled');
                }
            });
        }
    }
    
    initializeHighlighting() {
        // Highlighting will be handled in simple markdown conversion
    }
    
    handleInitialLoad() {
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            this.navigateToSection(hash, false);
        } else {
            // Set initial state
            history.replaceState({section: 'overview'}, '', '#overview');
        }
        // Set dark mode as default, only switch to light mode if explicitly disabled
        if (localStorage.getItem('darkMode') !== 'disabled') {
            document.body.classList.add('dark-mode');
        }
    }
    
    setupResponsive() {
        this.isMobile = window.innerWidth <= 768;
        
        if (this.isMobile) {
            this.closeMobileMenu();
        }
    }
    
    async navigateToSection(sectionId, pushState = true) {
        // Update URL and history
        if (pushState) {
            history.pushState({section: sectionId}, '', `#${sectionId}`);
        }
        
        // Update active states
        this.updateActiveNavigation(sectionId);
        
        // Load and display content
        await this.loadSectionContent(sectionId);
        
        // Close mobile menu if open
        if (this.isMobile) {
            this.closeMobileMenu();
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        this.currentSection = sectionId;
    }
    
    updateActiveNavigation(sectionId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current nav link
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show current content section
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }
    
    async loadSectionContent(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        // If content is already loaded and not overview (which is now dynamic), skip
        if (this.contentCache.has(sectionId)) {
            return;
        }
        
        // Show loading state
        section.innerHTML = '<div class="loading">Loading content...</div>';
        
        try {
            let content = '';
            
            switch (sectionId) {
                case 'overview':
                    content = await this.loadMarkdownFile('GSoC/GSoC.md');
                    break;
                case 'end-changes':
                    content = await this.loadMarkdownFile('GSoC/End_Changes.md');
                    break;
                case 'resources':
                    content = await this.loadMarkdownFile('GSoC/Resources.md');
                    break;
                case 'what-is-linux':
                    content = await this.loadMarkdownFile('GSoC/Though_Process/What_is_linux.md');
                    break;
                case 'what-is-wayland-compositor':
                    content = await this.loadMarkdownFile('GSoC/Though_Process/What_is_wayland_compositor.md');
                    break;
                case 'blooper':
                    content = await this.loadMarkdownFile('GSoC/Though_Process/Blooper.md');
                    break;
                default:
                    // Handle thought process files
                    if (sectionId.startsWith('thought-')) {
                        const thoughtNumber = sectionId.split('-')[1];
                        content = await this.loadMarkdownFile(`GSoC/Though_Process/Thought_Process_${thoughtNumber}.md`);
                    }
                    break;
            }
            
            if (content) {
                const htmlContent = this.convertMarkdownToHTML(content);
                const wrappedContent = this.wrapContentWithHeader(htmlContent, sectionId);
                section.innerHTML = wrappedContent;
                
                // Cache the content
                this.contentCache.set(sectionId, wrappedContent);
                
                // No need to re-highlight as we use simple markdown conversion
                
                // Process navigation links within content
                this.processInternalLinks(section);
            } else {
                section.innerHTML = '<div class="content-body"><p>Content not found.</p></div>';
            }
        } catch (error) {
            console.error('Error loading content:', error);
            section.innerHTML = '<div class="content-body"><p>Error loading content. Please try again.</p></div>';
        }
    }
    
    async loadMarkdownFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                // If file not found, try alternative paths
                if (response.status === 404 && filePath.includes('Though_Process/')) {
                    const altPath = filePath.replace('Though_Process/', '');
                    const altResponse = await fetch(`GSoC/${altPath}`);
                    if (altResponse.ok) {
                        return await altResponse.text();
                    }
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error loading ${filePath}:`, error);
            return null;
        }
    }
    
    convertMarkdownToHTML(markdown) {
        // Always use simple markdown conversion since external CDN is blocked
        return this.simpleMarkdownToHTML(markdown);
    }
    
    simpleMarkdownToHTML(markdown) {
        // Enhanced markdown conversion
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            // Bold and italic
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Links [text](url)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            // Line breaks and paragraphs
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            // Lists
            .replace(/^\* (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            // Horizontal rules
            .replace(/^---$/gm, '<hr>');
            
        // Wrap in paragraphs if not already wrapped
        if (!html.startsWith('<')) {
            html = '<p>' + html + '</p>';
        }
        
        return html;
    }
    
    wrapContentWithHeader(content, sectionId) {
        const titles = {
            'overview': 'Google Summer of Code 2025 with Waycrate',
            'end-changes': 'Final Project Changes',
            'resources': 'Resources & References',
            'what-is-linux': 'Understanding Linux & Wayland',
            'what-is-wayland-compositor': 'What is a Wayland Compositor?',
            'thought-1': 'Introduction to Wayland Protocols',
            'thought-2': 'Understanding Wayshot',
            'thought-3': 'Setting Up Development Environment',
            'thought-4': 'Protocol Implementation Begin',
            'thought-5': 'First Success with Output Capture',
            'thought-6': 'Working on Area Capture',
            'thought-7': 'Adding Pixel Color Feature',
            'thought-8': 'Merging Backends',
            'thought-9': 'Testing and Refinement',
            'thought-10': 'Fixing COSMIC Compositor',
            'thought-11': 'Toplevel Application Capture',
            'thought-12': 'Final Integration',
            'thought-13': 'Documentation and Testing',
            'thought-14': 'Project Conclusion',
            'blooper': 'Bloopers and Funky Glitches'
        };
        
        const title = titles[sectionId] || 'Documentation';
        
        return `
            <div class="section-header">
                <h1>${title}</h1>
            </div>
            <div class="content-body">
                ${content}
            </div>
        `;
    }
    
    processInternalLinks(container) {
        const links = container.querySelectorAll('a[href^="#"], a[href$=".md"]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                // Handle hash links
                const sectionId = href.slice(1);
                if (document.getElementById(sectionId)) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.navigateToSection(sectionId);
                    });
                }
            } else if (href.endsWith('.md')) {
                // Handle markdown file links
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const sectionId = this.mapFileToSection(href);
                    if (sectionId) {
                        this.navigateToSection(sectionId);
                    }
                });
            }
        });
    }
    
    mapFileToSection(filePath) {
        const mapping = {
            'End_Changes.md': 'end-changes',
            'Resources.md': 'resources',
            'What_is_linux.md': 'what-is-linux',
            'What_is_wayland_compositor.md': 'what-is-wayland-compositor',
            'Thought_Process_1.md': 'thought-1',
            'Thought_Process_2.md': 'thought-2',
            'Thought_Process_3.md': 'thought-3',
            'Thought_Process_4.md': 'thought-4',
            'Thought_Process_5.md': 'thought-5',
            'Thought_Process_6.md': 'thought-6',
            'Thought_Process_7.md': 'thought-7',
            'Thought_Process_8.md': 'thought-8',
            'Thought_Process_9.md': 'thought-9',
            'Thought_Process_10.md': 'thought-10',
            'Thought_Process_11.md': 'thought-11',
            'Thought_Process_12.md': 'thought-12',
            'Thought_Process_13.md': 'thought-13',
            'Thought_Process_14.md': 'thought-14',
            'Blooper.md': 'blooper'
        };
        
        const fileName = filePath.split('/').pop();
        return mapping[fileName] || null;
    }
    
    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (sidebar && overlay && mobileMenuBtn) {
            const isOpen = sidebar.classList.contains('active');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }
    
    openMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (sidebar && overlay && mobileMenuBtn) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (sidebar && overlay && mobileMenuBtn) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        if (wasMobile && !this.isMobile) {
            // Switched from mobile to desktop
            this.closeMobileMenu();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GSoCDocumentation();
});

// Handle service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}