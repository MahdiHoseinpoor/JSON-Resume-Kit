# JSON Resume Kit

### Stop editing HTML for your resume.

JSON Resume Kit is a client-side tool to visually manage your CV data and instantly preview it in a modern, responsive template. Everything happens in your browser. No files, no code, no hassle.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**[➡️ Go to the Live Editor](https://mahdihoseinpoor.github.io/JSON-Resume-Kit/editor/)**

![Showcase of the JSON Resume Kit Editor and Template](https://user-images.githubusercontent.com/6263435/208221808-73b39243-7f72-4d2d-9473-b3a1d402377a.png)
*(Feel free to replace this with your own updated screenshot)*

### The Problem

Keeping a resume updated often means digging through `divs`, `spans`, and CSS classes. It's slow, prone to layout-breaking errors, and mixes your professional history with presentation code.

### The Solution: An Instant, Live Editor

JSON Resume Kit provides a seamless, browser-based experience for resume management.

*   **Live Preview:** Fill out the editor form and click "Live Preview". Your formatted resume instantly opens in a new tab.
*   **No Accounts, No Files:** Your data is temporarily stored in your local browser storage. There's no need to download or upload files for a quick preview.
*   **Data-First Design:** Your content is cleanly separated from the presentation, making it easy to manage and update.
*   **Permanent & Shareable (Optional):** For a permanent, shareable link, you can fork the repository and host your own version.

---

### How to Use

There are two ways to use the JSON Resume Kit, depending on your needs.

#### Method 1: The Instant Preview (For Everyone)

This is the fastest way to create a beautiful resume for a one-time use (e.g., to save as a PDF).

1.  **[Open the Editor](https://mahdihoseinpoor.github.io/JSON-Resume-Kit/editor/)**.
2.  Fill in your professional information in the various sections.
3.  Click the **"Live Preview"** button.
4.  Your fully-rendered resume will open in a new browser tab. From there, you can print it or save it as a PDF (`Ctrl+P` or `Cmd+P`).

> **Note:** This method uses your browser's local storage. The preview is not a shareable link and will be lost if you clear your browser data.

#### Method 2: Create a Permanent, Shareable Resume (For Developers)

If you want a permanent link like `your-username.github.io/JSON-Resume-Kit/template/` to share with recruiters, follow these steps.

1.  **Fork the Repository:** Click the "Fork" button at the top-right of this page.
2.  **Enable GitHub Pages:** In your forked repository, go to `Settings` > `Pages`. Under "Build and deployment", select `Deploy from a branch` and choose the `main` branch with the `/root` folder. Save your changes.
3.  **Use Your Live Editor:** Open the editor on *your* new GitHub Pages URL: `https://your-username.github.io/JSON-Resume-Kit/editor/`.
4.  **Download Your Data:** After editing your content, click the **"Save and Download JSON"** button to get your `data.json` file.
5.  **Upload to Your Fork:** In your forked repository on GitHub, navigate to the `template/data/` directory. Use the "Add file" -> "Upload files" option to upload your `data.json`, replacing the existing one.
6.  **Done!** Your permanent resume link is now live at `https://your-username.github.io/JSON-Resume-Kit/template/`.

---

### 💻 Technologies Used

*   **HTML5** & **CSS3**
*   **Vanilla JavaScript (ES6+):** No frameworks, keeping it lightweight and fast.
*   **Browser `localStorage`:** For the seamless live preview functionality.

### 🙏 Acknowledgements

This project was conceived, structured, and developed with significant assistance from **Google's Gemini 2.5 Pro**. Its capabilities in code generation, refactoring, and documentation were instrumental in bringing this project to life quickly and cleanly.

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
