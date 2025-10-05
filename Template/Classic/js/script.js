document.addEventListener('DOMContentLoaded', () => {

    async function loadCvData() {
        const previewDataKey = 'jsonResumeKitPreviewData';
        const previewDataString = localStorage.getItem(previewDataKey);

        try {
            let data;

            if (previewDataString) {
                data = JSON.parse(previewDataString);
                localStorage.removeItem(previewDataKey);
            } else {
                const response = await fetch('data/data.json');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                data = await response.json();
            }

            populateProfile(data.profile);
            populateSummary(data.profile.summary);
            populateExperiences(data.experiences);
            populateProjects(data.projects);
            populateSkills(data.skills);
            populateEducation(data.education);

        } catch (error) {
            console.error("Could not load CV data:", error);
            document.body.innerHTML = `<div style="padding: 2rem; text-align:center;"><h2>Error loading data.</h2><p>${error.message}</p></div>`;
        }
    }

    function populateProfile(profile) {
        document.title = `رزومه - ${profile.name}`;
        const header = document.getElementById('profile-header');
        header.innerHTML = `
            <h1>${profile.name}</h1>
            <p class="profile-title">${profile.title}</p>
            <ul class="contact-info">
                ${profile.links.map(link => `<li><a href="${link.url}" target="_blank">${link.name}</a></li>`).join('')}
            </ul>
        `;
    }

    function populateSummary(summary) {
        document.querySelector('#summary-section .summary-content').textContent = summary;
    }

    function populateExperiences(experiences) {
        const container = document.querySelector('#experiences-section .experiences-list');
        container.innerHTML = experiences.map(exp => `
            <div class="item">
                <div class="item-header">
                    <h3>${exp.company}</h3>
                    <span class="item-date">${exp.date}</span>
                </div>
                <p class="item-subtitle">${exp.role}</p>
                <div class="item-content">
                    <ul>
                        ${exp.responsibilities.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    function populateProjects(projects) {
        const container = document.querySelector('#projects-section .projects-list');
        container.innerHTML = projects.map(proj => `
             <div class="item">
                <div class="item-header">
                     <h3>${proj.title}</h3>
                </div>
                <div class="item-content">
                    <p>${proj.description}</p>
                    <p class="project-technologies"><strong>تکنولوژی‌ها:</strong> ${proj.technologies.join(', ')}</p>
                </div>
            </div>
        `).join('');
    }
    
    function populateSkills(skills) {
        const container = document.querySelector('#skills-section .skills-list');
        container.innerHTML = skills.map(skillCat => `
            <div class="skill-category">
                <span class="skill-category-title">${skillCat.category}:</span>
                <div class="skill-items">${skillCat.items.join(' &bull; ')}</div>
            </div>
        `).join('');
    }

    function populateEducation(education) {
        const container = document.querySelector('#education-section .education-list');
        container.innerHTML = education.map(edu => `
            <div class="item">
                <div class="item-header">
                    <h3>${edu.institution}</h3>
                    <span class="item-date">${edu.date}</span>
                </div>
                <p class="item-subtitle">${edu.degree}</p>
            </div>
        `).join('');
    }

    loadCvData();
});