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
const videoData = [
    {
        id: 'robot-extreme',
        title: 'Franka Panda (Extreme Hesitancy)',
        badge: 'Kinesthetic',
        description: 'The manipulator reaches the Jenga tower while exhibiting significant start-stop motions and retractions, characteristic of extreme uncertainty.',
        src: 'assets/videos/robot_extreme.mp4',
        thumb: '#21262d' // Placeholder color, typically an image path natively: 'assets/images/thumb1.jpg'
    },
    {
        id: 'robot-slight',
        title: 'Franka Panda (Slight Hesitancy)',
        badge: 'Kinesthetic',
        description: 'A smooth approach with only a minor deceleration or micro-pause before proceeding to the target.',
        src: 'assets/videos/robot_slight.mp4',
        thumb: '#30363d'
    },
    {
        id: 'human-extreme',
        title: 'Full Body Dancer (Extreme Hesitancy)',
        badge: 'RGB-D Keypoints',
        description: 'Dancer expresses profound uncertainty using stepping behaviors, torso retraction, and hesitant arm extension.',
        src: 'assets/videos/human_extreme.mp4',
        thumb: '#161b22'
    },
    {
        id: 'human-arm-significant',
        title: 'Upper Limb Dancer (Significant Hesitancy)',
        badge: 'RGB-D Keypoints',
        description: 'Dancer demonstrates moderate pausing and slower velocity profiles when extending the arm.',
        src: 'assets/videos/human_arm_significant.mp4',
        thumb: '#0d1117'
    }
];

function initVideoShowcase() {
    const gridEl = document.getElementById('video-grid');
    const playerWrapper = document.getElementById('main-video-player');
    const infoEl = document.getElementById('video-info');

    if (!gridEl || !playerWrapper || !infoEl) return;

    // Render Thumbnails
    let activeCard = null;

    videoData.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = 'thumbnail-card';
        card.innerHTML = `
            <div class="thumb-img" style="background: ${video.thumb}"></div>
            <div class="thumb-info">
                <div class="thumb-title">${video.title}</div>
                <div class="thumb-badge">${video.badge}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            // Update active state
            if (activeCard) activeCard.classList.remove('active');
            card.classList.add('active');
            activeCard = card;

            // Load Video
            loadVideo(video, playerWrapper, infoEl);
        });

        gridEl.appendChild(card);

        // Click first item by default
        if (index === 0) {
            card.click();
        }
    });
}

function loadVideo(video, playerWrapper, infoEl) {
    // We add an HTML5 video tag. If the file is missing, it will show standard browser behavior,
    // but we can make it look nice. Since these files aren't in the repo natively, we'll configure
    // it to be visually robust even without the source immediately present.
    playerWrapper.innerHTML = `
        <video class="actual-video" controls autoplay muted playsinline loop>
            <source src="${video.src}" type="video/mp4">
            <!-- Fallback text -->
            <div class="video-placeholder flex-center" style="height: 100%;">
                <span class="placeholder-text">Video source: ${video.src} (Missing locally)</span>
            </div>
        </video>
    `;

    infoEl.innerHTML = `
        <h4 class="video-title">${video.title} <span style="font-size:0.8rem; font-weight:normal; color:var(--text-muted); padding-left: 10px;">[${video.badge}]</span></h4>
        <p class="video-desc">${video.description}</p>
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
