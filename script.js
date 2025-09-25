particlesJS("particles-js", { "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#990000" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 2, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } }, "retina_detect": true });

const vimeoPlayers = [];

(() => {
    const body = document.body;
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    let mouseX = 0, mouseY = 0;

    const updateCursor = () => {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        cursorOutline.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', e => {
        if (!body.classList.contains('custom-cursor-active')) {
            body.classList.add('custom-cursor-active');
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    updateCursor();

    const lyricsLink = document.querySelector('.floating-lyrics');
    const lyricsAudio = document.getElementById('lyrics-audio');

    if (lyricsLink && lyricsAudio) {
        lyricsAudio.addEventListener('canplaythrough', () => {
            lyricsLink.addEventListener('mouseenter', () => {
                let playPromise = lyricsAudio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            });

            lyricsLink.addEventListener('mouseleave', () => {
                lyricsAudio.pause();
            });
        }, { once: true });
    }

    const interactiveElements = document.querySelectorAll('.video-wrapper, .spotify-wrapper, .link-wrapper, .social-links a, .close-button, .triforce-icon, .floating-lyrics, .sackboy-image');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-hidden');
            cursorOutline.classList.add('cursor-hidden');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-hidden');
            cursorOutline.classList.remove('cursor-hidden');
        });
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('cursor-hidden');
        cursorOutline.classList.remove('cursor-hidden');
    });

    const modalTrigger = document.getElementById('easter-egg-trigger');
    const secretModal = document.getElementById('secret-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalVideo = secretModal.querySelector('video');

    function openModal() {
        if (secretModal.style.display === 'flex') return;
        secretModal.style.display = 'flex';
        cursorDot.classList.add('cursor-hidden');
        cursorOutline.classList.add('cursor-hidden');
        vimeoPlayers.forEach(player => {
            player.pause();
        });
    }

    function closeModal() {
        secretModal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.load();
        cursorDot.classList.remove('cursor-hidden');
        cursorOutline.classList.remove('cursor-hidden');
    }

    modalTrigger.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', e => {
        if (e.target === secretModal) {
            closeModal();
        }
    });

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                openModal();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    const pageTitle = "chris8borg";
    const edgyEmojis = ["🗝️", "🔮", "🌌", "⏳"];
    let i = 0;
    setInterval(() => {
        const emoji = edgyEmojis[i % edgyEmojis.length];
        document.title = `${emoji} ${pageTitle} ${emoji}`;
        i++;
    }, 1000);

    const banner = document.querySelector('.banner');
    const bannerImg = document.querySelector('.banner img');
    const bannerText = document.querySelector('.banner-text');

    if (window.innerWidth > 768) {
        banner.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = banner.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / width * 20;
            const y = (e.clientY - top - height / 2) / height * 20;
            bannerImg.style.transform = `translateX(${-x}px) translateY(${-y}px) scale(1.1)`;
            bannerText.style.transform = `translate(-50%, -50%) translateX(${x*0.5}px) translateY(${y*0.5}px)`;
        });
        banner.addEventListener('mouseleave', function() {
            bannerImg.style.transform = `translateX(0px) translateY(0px) scale(1)`;
            bannerText.style.transform = `translate(-50%, -50%)`;
        });
    } else {
        bannerImg.style.transform = `scale(1)`;
        bannerText.style.transform = `translate(-50%, -50%)`;
    }

    const backgroundContainer = document.querySelector('.video-background-container');
    const backgroundVideo = backgroundContainer.querySelector('video');
    const contentItemsToFade = document.querySelectorAll('.content > .video-wrapper, .content > .spotify-wrapper, .content > .link-wrapper');
    let activePlayer = null;

    const vimeoIframes = document.querySelectorAll('.video-wrapper iframe');
    vimeoIframes.forEach(iframe => {
        const player = new Vimeo.Player(iframe);
        vimeoPlayers.push(player);
        const videoWrapper = iframe.closest('.video-wrapper');
        const bgVideoPath = videoWrapper.getAttribute('data-bg-video');

        player.on('play', () => {
            vimeoPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    otherPlayer.pause();
                }
            });

            contentItemsToFade.forEach(item => {
                if (item !== videoWrapper) {
                    item.classList.add('is-faded');
                }
            });

            if (bgVideoPath) {
                activePlayer = player;
                backgroundVideo.src = bgVideoPath;
                backgroundVideo.play().catch(() => {});
                backgroundContainer.style.opacity = 1;
            }
        });

        const restorePageVisuals = () => {
            contentItemsToFade.forEach(item => {
                item.classList.remove('is-faded');
            });
            if (activePlayer === player) {
                backgroundVideo.pause();
                backgroundContainer.style.opacity = 0;
                activePlayer = null;
            }
        };

        player.on('pause', restorePageVisuals);
        player.on('ended', restorePageVisuals);
    });

    const sackboyImage = document.getElementById('sackboy-image');
    const lbpAudio = document.getElementById('lbp-audio');
    const lbpEmojis = ['🪐', '🌸', '👑', '🌟'];
    let isAudioPlaying = false;

    sackboyImage.addEventListener('click', (e) => {
        if (!isAudioPlaying) {
            if (lbpAudio) {
                lbpAudio.currentTime = 0;
                lbpAudio.play();
                isAudioPlaying = true;
                lbpAudio.onended = () => {
                    isAudioPlaying = false;
                };
            }
        }
        const rect = sackboyImage.getBoundingClientRect();
        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;
        for (let i = 0; i < 5; i++) {
            const emoji = document.createElement('span');
            emoji.classList.add('lbp-emoji');
            emoji.textContent = lbpEmojis[Math.floor(Math.random() * lbpEmojis.length)];
            document.body.appendChild(emoji);
            emoji.style.left = `${startX}px`;
            emoji.style.top = `${startY}px`;
            const angle = Math.random() * 2 * Math.PI;
            const distance = 100 + Math.random() * 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            emoji.style.setProperty('--x-end', `${endX}px`);
            emoji.style.setProperty('--y-end', `${endY}px`);
            emoji.addEventListener('animationend', () => {
                emoji.remove();
            });
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-on-scroll');
            } else {
                entry.target.classList.remove('show-on-scroll');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    const contentItems = document.querySelectorAll('.content > .video-wrapper, .content > .spotify-wrapper, .content > .link-wrapper');
    contentItems.forEach(item => {
        item.classList.add('hidden-on-load');
        observer.observe(item);
    });
})();