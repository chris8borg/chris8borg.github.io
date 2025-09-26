particlesJS("particles-js", { "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#990000" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 2, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } }, "retina_detect": true });

const vimeoPlayers = [];

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const backgroundVideoContainer = document.querySelector('.video-background-container');
    const backgroundVideo = backgroundVideoContainer.querySelector('video');

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
    lyricsAudio.volume = 0.25;

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

    const interactiveElements = document.querySelectorAll('.video-wrapper, .spotify-wrapper, .link-wrapper, .social-links a, .close-button, .triforce-icon, .floating-lyrics, .sackboy-image, #minimize-btn, #minimized-widget, #song-link, .profile-picture');
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
        vimeoPlayers.forEach(player => player.pause());
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
        if (e.target === secretModal) closeModal();
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
const originalTitle = document.title;

function glitchTabTitle() {
    const glitchChars = ['█', '▓', '▒', '░', '_', '-', '|', ' '];
    const minLength = 5;
    const maxLength = 30;
    const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let glitchText = '';
    for (let i = 0; i < randomLength; i++) {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        glitchText += randomChar;
    }
    document.title = glitchText;
    const randomDelay = Math.random() * (900 - 150) + 150;
    setTimeout(glitchTabTitle, randomDelay);
}
glitchTabTitle();

    const banner = document.querySelector('.banner');
    const bannerImg = banner.querySelector('img');
    const kamojiDesktop = banner.querySelector('.kamoji-desktop');

    if (window.innerWidth > 768) {
        banner.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = banner.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / width * 20;
            const y = (e.clientY - top - height / 2) / height * 20;
            bannerImg.style.transform = `translateX(${-x}px) translateY(${-y}px) scale(1.1)`;
            if (kamojiDesktop) {
                kamojiDesktop.style.transform = `translate(-50%, -50%) translateX(${x * 0.5}px) translateY(${y * 0.5}px)`;
            }
        });
        banner.addEventListener('mouseleave', function() {
            bannerImg.style.transform = 'translateX(0px) translateY(0px) scale(1)';
            if (kamojiDesktop) {
                kamojiDesktop.style.transform = 'translate(-50%, -50%)';
            }
        });
    }
    
    const profilePicture = document.querySelector('.profile-picture');

    if (profilePicture && window.innerWidth > 768) {
        const existingImg = profilePicture.querySelector('img');
        const videoPlaylist = [
            'assets/videos/profile-video-3.mp4'
        ];
        if (existingImg) {
            existingImg.remove();
        }

        let currentVideoIndex = 0;
        let hasPlayedFirstTime = false;
        const videoPlayers = [document.createElement('video'), document.createElement('video')];
        const glitchLayers = [document.createElement('div'), document.createElement('div')];

        videoPlayers.forEach((video, index) => {
            video.muted = true;
            video.playsInline = true;
            if (index === 0) video.classList.add('is-active');
            glitchLayers[index].className = 'glitch-layer';
            profilePicture.append(video, glitchLayers[index]);
        });
        
        let activePlayer = 0;

        function playNextVideo() {
            if (!hasPlayedFirstTime) {
                hasPlayedFirstTime = true;
                return;
            }

            const nextPlayerIndex = (activePlayer + 1) % 2;
            const currentPlayer = videoPlayers[activePlayer];
            const nextPlayer = videoPlayers[nextPlayerIndex];

            currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
            nextPlayer.src = videoPlaylist[currentVideoIndex];
            nextPlayer.load();

            nextPlayer.addEventListener('loadeddata', () => {
                currentPlayer.classList.remove('is-active');
                nextPlayer.classList.add('is-active');
                nextPlayer.play();
                activePlayer = nextPlayerIndex;
            }, { once: true });
        }

        videoPlayers.forEach(video => {
            video.addEventListener('ended', playNextVideo);
        });

        videoPlayers[0].src = videoPlaylist[0];
        videoPlayers[0].play();
        
        profilePicture.addEventListener('mouseenter', () => {
            profilePicture.classList.add('glitch-active');
            if (hasPlayedFirstTime) {
                videoPlayers[activePlayer].play();
            }
        });
        profilePicture.addEventListener('mouseleave', () => {
            profilePicture.classList.remove('glitch-active');
            videoPlayers[activePlayer].pause();
        });

    } else if (profilePicture) {
        profilePicture.addEventListener('mouseenter', () => {
            profilePicture.classList.add('glitch-active');
        });
        profilePicture.addEventListener('mouseleave', () => {
            profilePicture.classList.remove('glitch-active');
        });
    }

    const vimeoIframes = document.querySelectorAll('.video-wrapper iframe');
    vimeoIframes.forEach(iframe => {
        const player = new Vimeo.Player(iframe);
        vimeoPlayers.push(player);
        const parentWrapper = iframe.closest('.video-wrapper');
        const bgVideoSrc = parentWrapper.getAttribute('data-bg-video');

        player.on('play', () => {
            vimeoPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    otherPlayer.pause();
                }
            });
            document.querySelectorAll('.video-wrapper').forEach(w => w.classList.remove('video-active'));
            parentWrapper.classList.add('video-active');
            body.classList.add('video-is-playing');
            if (bgVideoSrc) {
                if (!backgroundVideo.src.endsWith(bgVideoSrc)) {
                    backgroundVideo.src = bgVideoSrc;
                }
                backgroundVideoContainer.style.opacity = '1';
                backgroundVideo.play();
            }
        });

        const onPauseOrEnd = async () => {
            let anyPlaying = false;
            for (const p of vimeoPlayers) {
                const paused = await p.getPaused();
                if (!paused) {
                    anyPlaying = true;
                    break;
                }
            }
            if (!anyPlaying) {
                body.classList.remove('video-is-playing');
                backgroundVideoContainer.style.opacity = '0';
                backgroundVideo.pause();
                parentWrapper.classList.remove('video-active');
            }
        };

        player.on('pause', onPauseOrEnd);
        player.on('ended', onPauseOrEnd);
    });

    const sackboyImage = document.getElementById('sackboy-image');
    const lbpAudio = document.getElementById('lbp-audio');
    const lbpEmojis = ['🪐', '🌸', '👑', '🌟'];
    let isAudioPlaying = false;

    sackboyImage.addEventListener('click', () => {
        if (!isAudioPlaying) {
            if (lbpAudio) {
                lbpAudio.currentTime = 0;
                lbpAudio.play();
                isAudioPlaying = true;
                lbpAudio.onended = () => { isAudioPlaying = false; };
            }
        }
        const rect = sackboyImage.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            const emoji = document.createElement('span');
            emoji.classList.add('lbp-emoji');
            emoji.textContent = lbpEmojis[Math.floor(Math.random() * lbpEmojis.length)];
            document.body.appendChild(emoji);
            emoji.style.left = `${rect.left + Math.random() * rect.width}px`;
            emoji.style.top = `${rect.top + Math.random() * rect.height}px`;
            const angle = Math.random() * 2 * Math.PI;
            const distance = 100 + Math.random() * 100;
            emoji.style.setProperty('--x-end', `${Math.cos(angle) * distance}px`);
            emoji.style.setProperty('--y-end', `${Math.sin(angle) * distance}px`);
            emoji.addEventListener('animationend', () => emoji.remove());
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.content > .video-wrapper, .content > .spotify-wrapper, .content > .link-wrapper, .sackboy-image');
    
    elementsToAnimate.forEach((item, index) => {
        item.classList.add('hidden-on-load');
        item.style.transitionDelay = `${index * 100}ms`;
        observer.observe(item);
    });
    
    const API_KEY = '37551a7c353320cef274485b6aef74ff';
    const USERNAME = 'chris8borg';
    const REFRESH_INTERVAL = 15000;

    const widget = document.getElementById('now-playing-widget');
    const minimizedWidget = document.getElementById('minimized-widget');
    const songTitleEl = document.getElementById('song-title');
    const songArtistEl = document.getElementById('song-artist');
    const albumArtEl = document.getElementById('album-art');
    const minimizeBtn = document.getElementById('minimize-btn');
    const songLink = document.getElementById('song-link');
    const songInfoEl = document.querySelector('.song-info');
    const INACTIVE_IMAGE_URL = 'assets/idle-render.png';
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

    function showInactiveState() {
        songTitleEl.textContent = 'Silencio por aquí...';
        songArtistEl.textContent = '';
        albumArtEl.src = INACTIVE_IMAGE_URL;
        songLink.href = '#';
        songLink.classList.add('disabled');
        songInfoEl.classList.add('system-idle');
    }
    
    async function fetchNowPlaying() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API connection error');
            const data = await response.json();
            const recentTrack = data?.recenttracks?.track?.[0];

            if (recentTrack && recentTrack['@attr']?.nowplaying === 'true') {
                updateWidgetUI(recentTrack);
            } else {
                showInactiveState();
            }
        } catch (error) {
            songTitleEl.textContent = 'CONNECTION FAILED';
            songArtistEl.textContent = 'PLEASE TRY LATER';
            albumArtEl.src = INACTIVE_IMAGE_URL;
            songLink.href = '#';
            songLink.classList.add('disabled');
            songInfoEl.classList.add('system-idle');
        }
    }

    function updateWidgetUI(track) {
        const artist = track.artist?.['#text'] || 'Artista Desconocido';
        const title = track.name || 'Canción Desconocida';
        songTitleEl.textContent = title;
        songArtistEl.textContent = artist;
        albumArtEl.src = track.image?.[3]?.['#text'] || INACTIVE_IMAGE_URL;
        songLink.href = `https://www.last.fm/music/${encodeURIComponent(artist)}/_/${encodeURIComponent(title)}`;
        songLink.classList.remove('disabled');
        songInfoEl.classList.remove('system-idle');
    }

    function initializeWidgetState() {
        const isMobile = window.innerWidth <= 768;
        const savedState = localStorage.getItem('widgetState');
        if (isMobile) {
            widget.classList.add('hidden');
            minimizedWidget.classList.remove('hidden');
            localStorage.setItem('widgetState', 'minimized');
        } else if (savedState === 'minimized') {
            widget.classList.add('hidden');
            minimizedWidget.classList.remove('hidden');
        } else {
            widget.classList.remove('hidden');
            minimizedWidget.classList.add('hidden');
            fetchNowPlaying();
        }
    }

    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        widget.classList.add('hidden');
        minimizedWidget.classList.remove('hidden');
        localStorage.setItem('widgetState', 'minimized');
    });

    minimizedWidget.addEventListener('click', () => {
        widget.classList.remove('hidden');
        minimizedWidget.classList.add('hidden');
        localStorage.setItem('widgetState', 'default');
        fetchNowPlaying();
    });

    initializeWidgetState();
    setInterval(() => {
        if (!widget.classList.contains('hidden')) fetchNowPlaying();
    }, REFRESH_INTERVAL);
});
