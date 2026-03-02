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
    // ------------------------------------
    // Franka Panda Kinesthetic
    // ------------------------------------
    {
        id: 'robot-extreme',
        title: 'Franka Panda (Extreme Hesitancy)',
        badge: 'Kinesthetic',
        description: 'The manipulator reaches the Jenga tower while exhibiting significant start-stop motions and retractions, characteristic of extreme uncertainty.',
        src: 'assets/videos/extremely hesitant robot.mp4',
        type: 'video/mp4',
        thumb: '#21262d'
    },
    {
        id: 'robot-significant',
        title: 'Franka Panda (Significant Hesitancy)',
        badge: 'Kinesthetic',
        description: 'A noticeably slower approach with prominent pauses and decelerations before proceeding to the target.',
        src: 'assets/videos/significantly hesitant robot.mp4',
        type: 'video/mp4',
        thumb: '#2c333b'
    },
    {
        id: 'robot-slight',
        title: 'Franka Panda (Slight Hesitancy)',
        badge: 'Kinesthetic',
        description: 'A smooth approach with only a minor deceleration or micro-pause before proceeding to the target.',
        src: 'assets/videos/slightly hesitant robot.mp4',
        type: 'video/mp4',
        thumb: '#30363d'
    },

    // ------------------------------------
    // Full Body Dancer
    // ------------------------------------
    {
        id: 'human-whole-front',
        title: 'Full Body Dancer (Extreme Hesitancy) - Front',
        badge: 'RGB-D Keypoints',
        description: 'Dancer expresses profound uncertainty using stepping behaviors, torso retraction, and hesitant arm extension (Front View).',
        src: 'assets/videos/whole_body_front.avi',
        type: 'video/mp4', // Modern browsers try to handle AVI via HTML5 video, though fallback might be needed
        thumb: '#161b22'
    },
    {
        id: 'human-whole-side',
        title: 'Full Body Dancer (Extreme Hesitancy) - Side',
        badge: 'RGB-D Keypoints',
        description: 'Dancer expresses profound uncertainty using stepping behaviors, torso retraction, and hesitant arm extension (Side View).',
        src: 'assets/videos/whole_body_side.avi',
        type: 'video/mp4',
        thumb: '#161b22'
    },

    // ------------------------------------
    // Upper Limb Dancer - Extreme
    // ------------------------------------
    {
        id: 'human-arm-extreme-front',
        title: 'Upper Limb Dancer (Extreme Hesitancy) - Front',
        badge: 'RGB-D Keypoints',
        description: 'Dancer demonstrates severe jerky motions, sudden stops, and multi-step retractions while extending the arm.',
        src: 'assets/videos/extremely_hesitant_limb_front.avi',
        type: 'video/mp4',
        thumb: '#0d1117'
    },
    {
        id: 'human-arm-extreme-side',
        title: 'Upper Limb Dancer (Extreme Hesitancy) - Side',
        badge: 'RGB-D Keypoints',
        description: 'Dancer demonstrates severe jerky motions, sudden stops, and multi-step retractions while extending the arm.',
        src: 'assets/videos/extremely_hesitant_limb_side.avi',
        type: 'video/mp4',
        thumb: '#0d1117'
    },

    // ------------------------------------
    // Upper Limb Dancer - Significant
    // ------------------------------------
    {
        id: 'human-arm-significant-front',
        title: 'Upper Limb Dancer (Significant Hesitancy) - Front',
        badge: 'RGB-D Keypoints',
        description: 'Dancer demonstrates moderate pausing and slower velocity profiles when extending the arm.',
        src: 'assets/videos/significant_hesitant_limb_front.avi',
        type: 'video/mp4',
        thumb: '#0d1117'
    },
    {
        id: 'human-arm-significant-side',
        title: 'Upper Limb Dancer (Significant Hesitancy) - Side',
        badge: 'RGB-D Keypoints',
        description: 'Dancer demonstrates moderate pausing and slower velocity profiles when extending the arm.',
        src: 'assets/videos/significant_hesitant_limb_side.avi',
        type: 'video/mp4',
        thumb: '#0d1117'
    },

    // ------------------------------------
    // Upper Limb Dancer - Slight
    // ------------------------------------
    {
        id: 'human-arm-slight-front',
        title: 'Upper Limb Dancer (Slight Hesitancy) - Front',
        badge: 'RGB-D Keypoints',
        description: 'Dancer extends arm smoothly with only a very brief reduction in speed midway.',
        src: 'assets/videos/slightly_hesitant_limb_front.avi',
        type: 'video/mp4',
        thumb: '#0d1117'
    },
    {
        id: 'human-arm-slight-side',
        title: 'Upper Limb Dancer (Slight Hesitancy) - Side',
        badge: 'RGB-D Keypoints',
        description: 'Dancer extends arm smoothly with only a very brief reduction in speed midway.',
        src: 'assets/videos/slightly_hesitant_limb_side.avi',
        type: 'video/mp4',
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
            <source src="${video.src}" type="${video.type}">
            <!-- Fallback text -->
            <div class="video-placeholder flex-center" style="height: 100%;">
                <span class="placeholder-text">Video format unsupported natively. <a href="${video.src}" download style="color:var(--primary-color)">Download video</a></span>
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
