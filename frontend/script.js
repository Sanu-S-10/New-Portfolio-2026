document.addEventListener('DOMContentLoaded', () => {
    // Backend API URL
    const API_URL = 'http://localhost:5000/api';

    // Typewriter effect for hero heading
    const changingRoleEl = document.getElementById('changing-role');
    const rotatingWords = ['Developer', 'Programmer', 'CSE Student', 'Tech Enthusiast', 'Problem Solver'];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    if (changingRoleEl) {
        const typeEffect = () => {
            const currentWord = rotatingWords[currentWordIndex];

            if (isDeleting) {
                currentCharIndex -= 1;
            } else {
                currentCharIndex += 1;
            }

            changingRoleEl.textContent = currentWord.slice(0, currentCharIndex);

            let typingSpeed = isDeleting ? 60 : 110;

            if (!isDeleting && currentCharIndex === currentWord.length) {
                typingSpeed = 1300;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
                typingSpeed = 300;
            }

            setTimeout(typeEffect, typingSpeed);
        };

        changingRoleEl.textContent = '';
        typeEffect();
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Fetch and display projects
    const fetchProjects = async () => {
        const projectsContainer = document.getElementById('projects-container');
        
        try {
            const response = await fetch(`${API_URL}/projects`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const projects = await response.json();
            
            // Clear loading text
            projectsContainer.innerHTML = '';

            if (projects.length === 0) {
                projectsContainer.innerHTML = '<p>No projects found.</p>';
                return;
            }

            // Colors for mockup placeholders
            const cardColors = ['#f6c043', '#257463', '#e56845', '#7f56d9'];

            // Filter out unwanted projects and create HTML for each remaining project
            const visibleProjects = projects.filter(p => p.title !== 'Simple E-commerce Website');
            visibleProjects.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                // Assign a color based on index
                const color = cardColors[index % cardColors.length];

                // Generate tech tags HTML
                const techTagsHtml = project.technologies
                    .map(tech => `<span class="tech-tag">${tech}</span>`)
                    .join('');

                projectCard.innerHTML = `
                    <div class="project-img-placeholder" style="background-color: ${color}">
                        <div class="mockup-placeholder">
                            <span>${project.title.substring(0, 2).toUpperCase()}</span>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description.length > 70 ? project.description.substring(0, 70) + '...' : project.description}</p>
                        <div class="tech-stack">
                            ${techTagsHtml}
                        </div>
                        <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn-project">
                            View Project <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        } catch (error) {
            console.error('Error fetching projects:', error);
            projectsContainer.innerHTML = '<p class="error-msg">Failed to load projects. Please ensure the backend is running.</p>';
        }
    };

    // Handle Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'form-status success-msg';
                contactForm.reset();
            } else {
                formStatus.textContent = data.message || 'Failed to send message.';
                formStatus.className = 'form-status error-msg';
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            formStatus.textContent = 'An error occurred. Is the backend running?';
            formStatus.className = 'form-status error-msg';
        }

        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });

    // Initial fetch
    fetchProjects();
});
