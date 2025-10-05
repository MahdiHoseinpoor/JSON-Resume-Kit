document.addEventListener('DOMContentLoaded', () => {

    /**
     * -----------------------------------------------------------------
     * TEMPLATE GENERATOR FUNCTIONS
     * These functions create HTML strings for different editable items.
     * -----------------------------------------------------------------
     */

    const createKeyInfoCard = (i = { title: "", value: "" }) => `
        <div class="item-card" data-type="keyInfo">
            <div class="form-group"><label>عنوان</label><input type="text" data-key="title" value="${i.title}" placeholder="نقش اصلی"></div>
            <div class="form-group"><label>مقدار</label><input type="text" data-key="value" value="${i.value}" placeholder="توسعه‌دهنده بک‌اند"></div>
            <button class="remove-btn">حذف</button>
        </div>`;

    const createLinkCard = (i = { name: "", url: "" }) => `
        <div class="item-card" data-type="link">
            <div class="form-group"><label>نام</label><input type="text" data-key="name" value="${i.name}" placeholder="GitHub"></div>
            <div class="form-group"><label>URL</label><input type="url" data-key="url" value="${i.url}" placeholder="https://github.com/user"></div>
            <button class="remove-btn">حذف</button>
        </div>`;

    const createProjectCard = (i = { title: "", imageUrl: "", description: "", technologies: [] }) => `
        <div class="item-card" data-type="project">
            <div class="item-card-header"><h3>پروژه</h3><button class="remove-btn">حذف</button></div>
            <div class="form-group"><label>عنوان</label><input type="text" data-key="title" value="${i.title}"></div>
            <div class="form-group"><label>URL تصویر</label><input type="url" data-key="imageUrl" value="${i.imageUrl}"></div>
            <div class="form-group"><label>توضیحات</label><textarea data-key="description" rows="3">${i.description}</textarea></div>
            <div class="form-group"><label>تکنولوژی‌ها</label>${createTagEditor(i.technologies, "technologies")}</div>
        </div>`;

    const createExperienceCard = (i = { company: "", role: "", date: "", responsibilities: [] }) => `
        <div class="item-card" data-type="experience">
            <div class="item-card-header"><h3>سابقه شغلی</h3><button class="remove-btn">حذف</button></div>
            <div class="form-group"><label>شرکت</label><input type="text" data-key="company" value="${i.company}"></div>
            <div class="form-group"><label>نقش</label><input type="text" data-key="role" value="${i.role}"></div>
            <div class="form-group"><label>تاریخ</label><input type="text" data-key="date" value="${i.date}"></div>
            <div class="form-group"><label>مسئولیت‌ها</label><div class="dynamic-list" data-key="responsibilities">${i.responsibilities.map(t => createDynamicListItem(t)).join("")}</div><button class="add-dynamic-list-item-btn">+ افزودن مسئولیت</button></div>
        </div>`;

    const createSkillCard = (i = { category: "", items: [] }) => `
        <div class="item-card" data-type="skill">
            <div class="item-card-header"><h3>دسته مهارت</h3><button class="remove-btn">حذف</button></div>
            <div class="form-group"><label>دسته‌بندی</label><input type="text" data-key="category" value="${i.category}"></div>
            <div class="form-group"><label>آیتم‌ها</label>${createTagEditor(i.items, "items")}</div>
        </div>`;

    const createEducationCard = (i = { institution: "", degree: "", date: "" }) => `
        <div class="item-card" data-type="education">
            <div class="item-card-header"><h3>تحصیلات</h3><button class="remove-btn">حذف</button></div>
            <div class="form-group"><label>موسسه</label><input type="text" data-key="institution" value="${i.institution}"></div>
            <div class="form-group"><label>مدرک</label><input type="text" data-key="degree" value="${i.degree}"></div>
            <div class="form-group"><label>تاریخ</label><input type="text" data-key="date" value="${i.date}"></div>
        </div>`;

    const createTagEditor = (tags, key) => `
        <div class="tag-editor" data-key="${key}">
            ${tags.map(tag => `<span class="tag">${tag}<button class="remove-btn">&times;</button></span>`).join("")}
            <input type="text" placeholder="مورد جدید را وارد و Enter بزنید...">
        </div>`;

    const createDynamicListItem = (value = "") => `
        <div class="dynamic-list-item">
            <input type="text" value="${value}">
            <button class="remove-btn">&times;</button>
        </div>`;

    /**
     * -----------------------------------------------------------------
     * RENDER & DATA GATHERING FUNCTIONS
     * -----------------------------------------------------------------
     */

    const renderData = (data) => {
        document.getElementById("profile-name").value = data.profile.name;
        document.getElementById("profile-title").value = data.profile.title;
        document.getElementById("profile-imageUrl").value = data.profile.imageUrl;
        document.getElementById("profile-summary").value = data.profile.summary;
        document.getElementById("profile-keyinfo-list").innerHTML = data.profile.keyInfo.map(createKeyInfoCard).join("");
        document.getElementById("profile-links-list").innerHTML = data.profile.links.map(createLinkCard).join("");
        document.getElementById("projects-list").innerHTML = data.projects.map(createProjectCard).join("");
        document.getElementById("experiences-list").innerHTML = data.experiences.map(createExperienceCard).join("");
        document.getElementById("skills-list").innerHTML = data.skills.map(createSkillCard).join("");
        document.getElementById("education-list").innerHTML = data.education.map(createEducationCard).join("");
    };

    const collectData = () => {
        const getTags = (element) => Array.from(element.querySelectorAll(".tag-editor .tag")).map(tag => tag.firstChild.textContent);
        const getDynamicListItems = (element) => Array.from(element.querySelectorAll(".dynamic-list-item input")).map(input => input.value);

        const data = { profile: {}, projects: [], experiences: [], skills: [], education: [] };

        data.profile.name = document.getElementById("profile-name").value;
        data.profile.title = document.getElementById("profile-title").value;
        data.profile.imageUrl = document.getElementById("profile-imageUrl").value;
        data.profile.summary = document.getElementById("profile-summary").value;

        data.profile.keyInfo = Array.from(document.querySelectorAll("#profile-keyinfo-list .item-card")).map(card => ({
            title: card.querySelector('[data-key="title"]').value,
            value: card.querySelector('[data-key="value"]').value,
        }));
        data.profile.links = Array.from(document.querySelectorAll("#profile-links-list .item-card")).map(card => ({
            name: card.querySelector('[data-key="name"]').value,
            url: card.querySelector('[data-key="url"]').value,
        }));

        data.projects = Array.from(document.querySelectorAll("#projects-list .item-card")).map(card => ({
            title: card.querySelector('[data-key="title"]').value,
            imageUrl: card.querySelector('[data-key="imageUrl"]').value,
            description: card.querySelector('[data-key="description"]').value,
            technologies: getTags(card),
        }));

        data.experiences = Array.from(document.querySelectorAll("#experiences-list .item-card")).map(card => ({
            company: card.querySelector('[data-key="company"]').value,
            role: card.querySelector('[data-key="role"]').value,
            date: card.querySelector('[data-key="date"]').value,
            responsibilities: getDynamicListItems(card),
        }));

        data.skills = Array.from(document.querySelectorAll("#skills-list .item-card")).map(card => ({
            category: card.querySelector('[data-key="category"]').value,
            items: getTags(card),
        }));

        data.education = Array.from(document.querySelectorAll("#education-list .item-card")).map(card => ({
            institution: card.querySelector('[data-key="institution"]').value,
            degree: card.querySelector('[data-key="degree"]').value,
            date: card.querySelector('[data-key="date"]').value,
        }));

        return data;
    };

    /**
     * -----------------------------------------------------------------
     * EVENT LISTENERS & HANDLERS
     * -----------------------------------------------------------------
     */

    const processAndRenderJson = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            renderData(data);
            alert('داده‌ها با موفقیت بارگذاری شد!');
        } catch (error) {
            console.error('Invalid JSON:', error);
            alert('خطا: متن وارد شده یک فایل JSON معتبر نیست.');
        }
    };
    
    // Tab switching for data loader
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // File input handler
    const fileInput = document.getElementById('file-input');
    const fileNameSpan = document.getElementById('file-name');
    fileInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) {
            fileNameSpan.textContent = 'فایلی انتخاب نشده است';
            return;
        }
        fileNameSpan.textContent = `فایل انتخاب شده: ${file.name}`;
        const reader = new FileReader();
        reader.onload = () => processAndRenderJson(reader.result);
        reader.onerror = () => alert('خطا در خواندن فایل.');
        reader.readAsText(file);
    });

    // Paste button handler
    const pasteBtn = document.getElementById('paste-btn');
    const pasteArea = document.getElementById('paste-area');
    pasteBtn.addEventListener('click', () => {
        const text = pasteArea.value.trim();
        text ? processAndRenderJson(text) : alert('لطفا متنی را در کادر بچسبانید.');
    });

    // Editor Navigation
    document.querySelectorAll('.editor-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.editor-nav-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(e.target.dataset.target).classList.add('active');
        });
    });

    // Main content event delegation (for adding/removing items)
    document.querySelector('.main-content').addEventListener('click', (e) => {
        if (e.target.matches('.add-item-btn')) {
            const type = e.target.dataset.type;
            const cardCreators = {
                keyInfo: createKeyInfoCard,
                link: createLinkCard,
                project: createProjectCard,
                experience: createExperienceCard,
                skill: createSkillCard,
                education: createEducationCard,
            };
            if (cardCreators[type]) {
                e.target.previousElementSibling.insertAdjacentHTML("beforeend", cardCreators[type]());
            }
        }
        if (e.target.matches('.add-dynamic-list-item-btn')) {
            e.target.previousElementSibling.insertAdjacentHTML('beforeend', createDynamicListItem());
        }
        if (e.target.matches('.remove-btn')) {
            e.target.closest('.item-card, .tag, .dynamic-list-item').remove();
        }
    });

    // Tag Editor functionality
    document.querySelector('.main-content').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.matches('.tag-editor input')) {
            e.preventDefault();
            const inputValue = e.target.value.trim();
            if (inputValue) {
                const newTag = document.createElement('span');
                newTag.className = 'tag';
                newTag.innerHTML = `${inputValue}<button class="remove-btn">&times;</button>`;
                e.target.parentNode.insertBefore(newTag, e.target);
                e.target.value = '';
            }
        }
    });

    // Live Preview Button
    document.getElementById('live-preview-btn').addEventListener('click', () => {
        try {
            const previewData = collectData();
            localStorage.setItem('jsonResumeKitPreviewData', JSON.stringify(previewData));
            
            // NEW: Get selected template and construct the correct URL
            const selectedTemplate = document.getElementById('template-selector').value;
            if (!selectedTemplate) {
                alert('لطفا یک قالب را برای پیش‌نمایش انتخاب کنید.');
                return;
            }
            const previewUrl = `Template/${selectedTemplate}/index.html`;

            window.open(previewUrl, '_blank');
        } catch (error) {
            console.error('Error generating live preview:', error);
            alert('خطا در ایجاد پیش‌نمایش زنده. لطفا کنسول را بررسی کنید.');
        }
    });

    // Save Button
    document.getElementById('save-json-btn').addEventListener('click', () => {
        try {
            const dataToSave = collectData();
            const jsonString = JSON.stringify(dataToSave, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            document.body.appendChild(a);
a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert('فایل data.json با موفقیت ایجاد شد!');
        } catch (error) {
            console.error('Error saving JSON:', error);
            alert('خطا در ذخیره‌سازی فایل. لطفا کنسول را بررسی کنید.');
        }
    });

    /**
     * -----------------------------------------------------------------
     * INITIALIZATION
     * -----------------------------------------------------------------
     */
    const init = async () => {
        try {
            const response = await fetch('Template/Neumorphism/data/data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            renderData(data);
        } catch (error) {
            console.error("Could not load default data.json:", error);
            alert("توجه: فایل data.json پیش‌فرض یافت نشد. می‌توانید یک فایل جدید بارگذاری کرده یا فرم را از ابتدا پر کنید.");
        }
    };

    init();
});