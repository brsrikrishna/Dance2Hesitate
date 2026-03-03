/**
 * Main application logic for Dance2Hesitate Dataset Website
 */

document.addEventListener('DOMContentLoaded', () => {
    initVideoShowcase();
    initDocsTabs();
});

/**
 * Video Showcase Component
 * Manages the interactive video gallery. We use placeholders here which point to 
 * expected paths in `assets/videos/`. These can be easily replaced by the author.
 */
const categories = {
    kinesthetic: [
        { id: 'robot-slight', label: 'Slight', src: 'assets/videos/slightly_hesitant_robot.mp4', type: 'video/mp4' },
        { id: 'robot-significant', label: 'Significant', src: 'assets/videos/significantly_hesitant_robot.mp4', type: 'video/mp4' },
        { id: 'robot-extreme', label: 'Extreme', src: 'assets/videos/extremely_hesitant_robot.mp4', type: 'video/mp4' }
    ],
    upperLimb: [
        { id: 'human-arm-slight-front', label: 'Slight (Front)', src: 'assets/videos/slightly_hesitant_limb_front.mp4', type: 'video/mp4' },
        { id: 'human-arm-slight-side', label: 'Slight (Side)', src: 'assets/videos/slightly_hesitant_limb_side.mp4', type: 'video/mp4' },
        { id: 'human-arm-significant-front', label: 'Significant (Front)', src: 'assets/videos/significant_hesitant_limb_front.mp4', type: 'video/mp4' },
        { id: 'human-arm-significant-side', label: 'Significant (Side)', src: 'assets/videos/significant_hesitant_limb_side.mp4', type: 'video/mp4' },
        { id: 'human-arm-extreme-front', label: 'Extreme (Front)', src: 'assets/videos/extremely_hesitant_limb_front.mp4', type: 'video/mp4' },
        { id: 'human-arm-extreme-side', label: 'Extreme (Side)', src: 'assets/videos/extremely_hesitant_limb_side.mp4', type: 'video/mp4' }
    ],
    wholeBody: [
        { id: 'human-whole-front', label: 'Extreme (Front)', src: 'assets/videos/whole_body_front.mp4', type: 'video/mp4' },
        { id: 'human-whole-side', label: 'Extreme (Side)', src: 'assets/videos/whole_body_side.mp4', type: 'video/mp4' }
    ]
};

function initVideoShowcase() {
    setupColumn('kinesthetic', categories.kinesthetic);
    setupColumn('upper', categories.upperLimb);
    setupColumn('body', categories.wholeBody);
}

function setupColumn(colId, videos) {
    const container = document.getElementById(`video-${colId}`);
    const controls = document.getElementById(`btn-${colId}`);

    if (!container || !controls) return;

    videos.forEach((vid, index) => {
        const btn = document.createElement('button');
        btn.className = 'video-btn';
        if (index === 0) btn.classList.add('active');
        btn.textContent = vid.label;

        btn.onclick = () => {
            Array.from(controls.children).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderVideo(container, vid);
        };

        controls.appendChild(btn);
    });

    if (videos.length > 0) {
        renderVideo(container, videos[0]);
    }
}

function renderVideo(container, video) {
    container.innerHTML = `
        <video controls autoplay muted playsinline loop>
            <source src="${video.src}" type="${video.type}">
            <!-- Fallback text -->
            <div class="video-placeholder flex-center" style="height: 100%; color: white;">
                <span class="placeholder-text">Video format unsupported natively. <a href="${video.src}" download style="color:var(--primary-color)">Download video</a></span>
            </div>
        </video>
    `;
}

/**
 * Documentation Tab Switching Logic
 */
function initDocsTabs() {
    const navItems = document.querySelectorAll('.docs-nav li');
    const panes = document.querySelectorAll('.doc-pane');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            navItems.forEach(n => n.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active to clicked nav and target pane
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}
