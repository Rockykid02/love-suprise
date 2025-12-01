// ===== THREE.JS PARTICLE SYSTEM =====
let scene, camera, renderer, particleSystem;
let audioEnabled = false;
let backgroundMusic;
function initBackgroundMusic() {
    backgroundMusic = new Audio();
    backgroundMusic.src = 'love.mp3';  // Your music file in the main folder
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    
    // Important: Don't play automatically!
    // backgroundMusic.play(); // ← Remove this if it exists
    
    console.log("Background music initialized with: love.mp3");
}

function initParticleSystem() {
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('particle-container').appendChild(renderer.domElement);
    
    // Particles
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Random positions
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        
        // Pink and red colors
        colors[i] = Math.random() * 0.5 + 0.5;     // R
        colors[i + 1] = Math.random() * 0.3;       // G  
        colors[i + 2] = Math.random() * 0.3 + 0.7; // B
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===== ANIMATION LIBRARY =====
const Animations = {
    // 1. SPARKLE TRAIL
    createSparkleTrail: function(x, y) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨SAGE';
            sparkle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 15px;
                pointer-events: none;
                animation: sparklePop 1s ease-out forwards;
                z-index: 20;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    },

    // 2. HEARTBEAT
    addHeartbeat: function() {
        const heartbeat = document.createElement('div');
        heartbeat.innerHTML = '💖';
        heartbeat.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 30px;
            animation: heartbeat 1.5s ease-in-out infinite;
            z-index: 1000;
        `;
        document.body.appendChild(heartbeat);
    },

    // 3. TYPEWRITER EFFECT
    typewriterEffect: function(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    },

    // 4. LOVE EXPLOSION
    loveExplosion: function(x, y) {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.innerHTML = '💖';
                const tx = Math.random() * 200 - 100;
                const ty = Math.random() * 200 - 100;
                const rot = Math.random() * 360;
                
                particle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${15 + Math.random() * 15}px;
                    z-index: 50;
                    --tx: ${tx}px;
                    --ty: ${ty}px;
                    --rot: ${rot}deg;
                `;
                particle.style.animation = 'loveExplode 1.5s ease-out forwards';
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }, i * 30);
        }
    },

    // 5. RIPPLE EFFECT
    createRipple: function(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #ff6b6b;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: rippleExpand 1s ease-out forwards;
            pointer-events: none;
            z-index: 20;
        `;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    },

    // 6. MOSAIC PHOTO REVEAL
    photoMosaicReveal: function(photoElement) {
        const pieces = 9;
        
        for (let i = 0; i < pieces; i++) {
            const piece = document.createElement('div');
            const startX = Math.random() * 200 - 100;
            const startY = Math.random() * 200 - 100;
            
            piece.style.cssText = `
                position: absolute;
                left: ${photoElement.style.left};
                top: ${photoElement.style.top};
                width: 120px;
                height: 120px;
                background: url('${photoElement.src}');
                background-size: cover;
                clip-path: polygon(${this.getPolygonPath(i, pieces)});
                z-index: 5;
                --startX: ${startX}px;
                --startY: ${startY}px;
            `;
            piece.style.animation = `mosaicPiece 0.8s ease-out ${i * 0.1}s forwards`;
            document.body.appendChild(piece);
            
            setTimeout(() => piece.remove(), 1000);
        }
        
        setTimeout(() => {
            photoElement.style.animation = 'photoPop 0.5s ease-out forwards';
        }, 300);
    },

    // 7. GRAVITY HEARTS
    createGravityHearts: function(count = 20) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}vw;
                font-size: ${20 + Math.random() * 20}px;
                z-index: 10;
            `;
            heart.style.animation = `gravityFall ${3 + Math.random() * 2}s ease-in forwards`;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.animation = 'heartBounce 0.5s ease-out 3';
            }, (3 + Math.random() * 2) * 1000);
            
            setTimeout(() => heart.remove(), 5000);
        }
    },

    // 8. WAVE TEXT
    createWaveText: function(text) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            z-index: 100;
        `;
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.cssText = `
                font-size: 40px;
                font-weight: bold;
                color: #ff6b6b;
                display: inline-block;
                animation: wave 1.5s ease-in-out infinite;
                animation-delay: ${i * 0.1}s;
            `;
            container.appendChild(span);
        });
        
        document.body.appendChild(container);
        return container;
    },

    // 9. RAINBOW BEAM
    createRainbowBeam: function() {
        const beam = document.createElement('div');
        beam.style.cssText = `
            position: fixed;
            top: 0;
            left: 50%;
            width: 100px;
            height: 100vh;
            background: linear-gradient(180deg, 
                #ff6b6b, #ff8e8e, #ffafbd, #ffc3a0, #a8edea, #fed6e3);
            z-index: 30;
            transform: translateX(-50%);
        `;
        beam.style.animation = 'rainbowBeam 2s ease-out forwards';
        document.body.appendChild(beam);
        setTimeout(() => beam.remove(), 2000);
    },

    // 10. FLOATING BUBBLES
    createFloatingBubbles: function() {
        const messages = ['I', '❤️', 'YOU', 'TRISH', 'FOREVER'];
        
        messages.forEach((msg, i) => {
            const bubble = document.createElement('div');
            bubble.textContent = msg;
            bubble.style.cssText = `
                position: fixed;
                bottom: -50px;
                left: ${(i + 1) * (100 / (messages.length + 1))}%;
                font-size: 24px;
                color: #ff6b6b;
                font-weight: bold;
                z-index: 5;
            `;
            bubble.style.animation = `floatBubble 10s ease-in-out infinite ${i * 0.5}s`;
            document.body.appendChild(bubble);
        });
    },

    // Helper function for mosaic
    getPolygonPath: function(index, total) {
        const angle = (index / total) * 360;
        const nextAngle = ((index + 1) / total) * 360;
        const radius = 50;
        
        const x1 = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y1 = 50 + radius * Math.sin((angle * Math.PI) / 180);
        const x2 = 50 + radius * Math.cos((nextAngle * Math.PI) / 180);
        const y2 = 50 + radius * Math.sin((nextAngle * Math.PI) / 180);
        
        return `50% 50%, ${x1}% ${y1}%, ${x2}% ${y2}%`;
    }
};

// ===== DRAMATIC ENTRANCE SEQUENCE =====
function startDramaticEntrance() {
    console.log("Starting dramatic entrance...");
    
    // Create shooting stars
    createShootingStars();
    
    // Start floating bubbles in background
    Animations.createFloatingBubbles();
    
    // Sequence of messages
    const messages = [
        { id: 'destiny1', delay: 1000 },
        { id: 'destiny2', delay: 4000 },
        { id: 'destiny3', delay: 7000 },
        { id: 'destiny4', delay: 10000 },
        { id: 'finalDestiny', delay: 13000 }
    ];
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            const element = document.getElementById(message.id);
            if (element.classList.contains('final-destiny')) {
                element.style.animation = 'finalReveal 2s ease-out forwards';
                element.style.opacity = '1';
                element.classList.add('shimmer-text');
                
                // After final message, reveal envelope
                setTimeout(() => {
                    revealEnvelope();
                }, 3000);
            } else {
                element.style.animation = `messageSlideIn 3s ease-out forwards`;
            }
        }, message.delay);
    });
}

function createShootingStars() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.cssText = `
                width: 3px;
                height: 3px;
                top: ${Math.random() * 50}%;
                left: ${Math.random() * 50}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            document.getElementById('dramatic-entrance').appendChild(star);
            
            setTimeout(() => star.remove(), 3000);
        }, i * 800);
    }
}

function revealEnvelope() {
    console.log("Revealing envelope...");
    
    // Fade out dramatic entrance
    const entrance = document.getElementById('dramatic-entrance');
    entrance.style.transition = 'opacity 1.5s ease-out';
    entrance.style.opacity = '0';
    
    setTimeout(() => {
        // Remove entrance
        entrance.remove();
        
        // Reveal envelope with animation
        const envelope = document.getElementById('envelope');
        envelope.style.display = 'flex';
        envelope.style.animation = 'envelopeEntrance 1.5s ease-out forwards';
        envelope.style.opacity = '0';
        
        // Start heartbeat when envelope appears
        Animations.addHeartbeat();
        
    }, 1500);
}

// ===== CONTROL BUTTONS =====

// Audio Toggle Button - FIXED FOR iOS
document.getElementById('toggle-audio').addEventListener('click', function() {
    // Toggle the audio state
    audioEnabled = !audioEnabled;
    this.textContent = audioEnabled ? '🔊' : '🔈';

    // Initialize music ONLY on first click (iOS requirement)
    if (!backgroundMusic) {
        initBackgroundMusic(); // This function creates the Audio object
    }

    // Play or pause based on the new state
    if (audioEnabled) {
        // iOS: Must call .play() directly from this click event
        const playPromise = backgroundMusic.play();
        
        // Catch autoplay errors (common in browsers)
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log("Autoplay prevented. User interaction was required.");
                // If it fails, revert the button state
                audioEnabled = false;
                this.textContent = '🔈';
            });
        }
    } else {
        backgroundMusic.pause();
    }
});

// Fullscreen Toggle Button (unchanged)
document.getElementById('toggle-fullscreen').addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
// ===== ORIGINAL ROMANTIC FLOW =====
// Step 1: Envelope click
document.getElementById('envelope').addEventListener('click', function(e) {
    console.log("Envelope clicked - working!");
    
    // Trigger love explosion
    Animations.loveExplosion(e.clientX, e.clientY);
    Animations.createRipple(e.clientX, e.clientY);
    
    this.style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
});

// Step 2: Check answer
function checkAnswer() {
    const answer = document.getElementById('birthdayAnswer').value.toLowerCase().trim();
    const correctAnswers = ['21 october', 'october 21', '21st october', 'october 21st', '21 oct', 'oct 21'];
    
    console.log("Answer given:", answer);
    
    if (correctAnswers.includes(answer)) {
        // Trigger rainbow beam
        Animations.createRainbowBeam();
        
        document.getElementById('questionScreen').style.display = 'none';
        showHurray();
    } else {
        alert(' not quite right... Try Again" 😘');
    }
}

function showHurray() {
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.innerHTML = `
        <div style="font-size: 50px; color: #ff6b6b; margin-bottom: 20px;">🎉 HURRAY! 🎉</div>
        <p style="font-size: 20px; margin-bottom: 20px;">You remembered my birthday! 💖</p>
        <button class="next-btn" onclick="closeMessageAndStart()">Next Babe 💖</button>
    `;
    document.body.appendChild(messageBox);
}

function closeMessageAndStart() {
    document.querySelector('.message-box').remove();
    popOutPhotos();
}

function popOutPhotos() {
    console.log("Photos popping out!");
    
    const photos = [
        'image1.jpg.JPG',
        'image2.jpg.JPG', 
        'image3.jpg.JPG',
        'image4.jpg.JPG'
    ];

    const positions = [
        { left: '20%', top: '30%' },
        { left: '70%', top: '20%' },
        { left: '15%', top: '70%' },
        { left: '75%', top: '75%' }
    ];

    photos.forEach((photoUrl, index) => {
        const photo = document.createElement('img');
        photo.className = 'photo';
        photo.src = photoUrl;
        photo.alt = `Our memory ${index + 1}`;
        photo.style.left = positions[index].left;
        photo.style.top = positions[index].top;
        document.body.appendChild(photo);
        
        // Animate each photo with mosaic reveal
        setTimeout(() => {
            Animations.photoMosaicReveal(photo);
        }, index * 300);
    });

    setTimeout(() => {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'Continue ⚡';
        nextBtn.style.cssText = `
            position: fixed;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
        `;
        nextBtn.onclick = strikeThunder;
        document.body.appendChild(nextBtn);
    }, 2000);
}

function strikeThunder() {
    console.log("Thunder strike!");
    
    document.querySelectorAll('.next-btn').forEach(btn => btn.remove());
    
    const thunder = document.createElement('div');
    thunder.className = 'thunder';
    document.body.appendChild(thunder);
    
    setTimeout(() => {
        thunder.style.transition = 'opacity 0.3s';
        thunder.style.opacity = '0.8';
        
        setTimeout(() => {
            thunder.style.opacity = '0';
            
            setTimeout(() => {
                thunder.remove();
                showNameWithHearts();
            }, 300);
        }, 100);
    }, 100);
}

function showNameWithHearts() {
    console.log("Showing name with hearts!");
    
    // Create wave text effect for name
    const nameContainer = Animations.createWaveText('TRISH 💖');
    nameContainer.className = 'name-display';
    nameContainer.style.opacity = '0';
    
    setTimeout(() => {
        nameContainer.style.opacity = '1';
        nameContainer.style.transition = 'opacity 1s';
    }, 100);
    
    // Add gravity hearts
    Animations.createGravityHearts(15);
    
    setTimeout(() => {
        nameContainer.style.opacity = '0';
        setTimeout(() => {
            nameContainer.remove();
            showRomanticMessage();
        }, 1000);
    }, 3000);
}

// UPDATED with Typewriter Effect
function showRomanticMessage() {
    console.log("Showing romantic message!");
    
    const message = document.createElement('div');
    message.className = 'romantic-message';
    message.innerHTML = `
        <h1 class="neon-text">Hey Trish Babe... 💫</h1>
        <div id="typed-text" style="min-height: 150px;"></div>
        <button class="next-btn" onclick="startPhotosGoBack()">Watch Magic Continue ✨</button>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transition = 'opacity 1s';
        Animations.typewriterEffect(document.getElementById('typed-text'), 
            "I dont just see you in my presence-iI see you in every one of my Tomorrows.1 picture of us growing together'still laughing at the same stupid jokes'still holding hands and still choosing each other every single day.With you future is exciting'full of Adventures and love that just keeps growing.Icant wait for all our moments to come.Hence i dedicate this WEB as a token of LOVE TO YOU🌟");
    }, 100);
}

// ===== PHOTOS GO BACK FEATURE =====
function startPhotosGoBack() {
    console.log("Starting photos go back sequence...");
    document.querySelector('.romantic-message').remove();
    
    // First, show a message about photos going back
    const goingBackMsg = document.createElement('div');
    goingBackMsg.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <p style="font-size: 24px; color: #ff6b6b; margin-bottom: 20px;">
                BYE LOVE... ✨
            </p>
            <p>Watch as our photos find their way back home 💖</p>
        </div>
    `;
    goingBackMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 30px;
        border-radius: 15px;
        z-index: 100;
        animation: fadeIn 0.5s ease-out;
    `;
    document.body.appendChild(goingBackMsg);
    
    // Remove message and start photos going back
    setTimeout(() => {
        goingBackMsg.remove();
        photosGoBack();
    }, 2000);
}

function photosGoBack() {
    console.log("Photos going back into envelope...");
    
    const photos = document.querySelectorAll('.photo');
    
    // Get envelope position (it's hidden but we need its original position)
    const envelopeOriginalX = window.innerWidth / 2 - 150; // Center - half envelope width
    const envelopeOriginalY = window.innerHeight / 2 - 100; // Center - half envelope height
    
    // Animate each photo flying back to envelope position
    photos.forEach((photo, index) => {
        // Get current photo position
        const photoRect = photo.getBoundingClientRect();
        const photoX = photoRect.left + photoRect.width / 2;
        const photoY = photoRect.top + photoRect.height / 2;
        
        // Calculate distance to envelope
        const deltaX = envelopeOriginalX - photoX;
        const deltaY = envelopeOriginalY - photoY;
        
        // Create trail effect
        createPhotoTrail(photoX, photoY, envelopeOriginalX, envelopeOriginalY, index);
        
        // Animate photo flying back
        setTimeout(() => {
            photo.style.transition = `all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)`;
            photo.style.transform = `
                translate(${deltaX}px, ${deltaY}px) 
                scale(0) 
                rotate(${360 + index * 90}deg)
            `;
            photo.style.opacity = '0';
        }, index * 300);
    });

    // Show final message after all photos go back
    setTimeout(() => {
        showFinalMessage();
    }, 1500 + photos.length * 300);
}

// Helper function for photo trails
function createPhotoTrail(startX, startY, endX, endY, index) {
    const trailCount = 8;
    const colors = ['#ff6b6b', '#ff8e8e', '#ffafbd', '#ffc3a0'];
    const color = colors[index % colors.length];
    
    for (let i = 0; i < trailCount; i++) {
        setTimeout(() => {
            const trailDot = document.createElement('div');
            const progress = i / trailCount;
            const x = startX + (endX - startX) * progress;
            const y = startY + (endY - startY) * progress;
            const size = 10 * (1 - progress);
            
            trailDot.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                opacity: ${1 - progress};
                z-index: 15;
                animation: trailFade 0.5s ease-out forwards;
            `;
            document.body.appendChild(trailDot);
            
            setTimeout(() => trailDot.remove(), 500);
        }, i * 30);
    }
}

// ===== DRAMATIC FINALE =====
function showFinalMessage() {
    console.log("Final message!");
    
    const finalMsg = document.createElement('div');
    finalMsg.className = 'final-message';
    finalMsg.innerHTML = `
        <div class="shimmer-text">I really really love you 😘</div>
        <div style="font-size: 30px; margin-top: 20px;">Forever and always... 💝</div>
        <br><br>
        <button class="next-btn" onclick="startDramaticFinale()">Our Eternal Story Continues... 🌌</button>
    `;
    document.body.appendChild(finalMsg);
    
    setTimeout(() => {
        finalMsg.style.opacity = '1';
        finalMsg.style.transition = 'opacity 1s';
    }, 100);
    
    // Create heart explosion
    Animations.createGravityHearts(25);
}

function startDramaticFinale() {
    // Remove current final message
    document.querySelector('.final-message').remove();
    
    // Start the epic finale
    setTimeout(() => {
        showDramaticFinale();
    }, 1000);
}

function showDramaticFinale() {
    console.log("Starting dramatic finale...");
    
    // Create cosmic background
    const cosmicFinale = document.createElement('div');
    cosmicFinale.id = 'cosmic-finale';
    document.body.appendChild(cosmicFinale);
    
    // Sequence of finale messages
    const finaleMessages = [
        { text: "Our love isn't just a moment...", delay: 1000 },
        { text: "It's a constellation in the cosmos", delay: 3000 },
        { text: "Written in the stars forever", delay: 5000 },
        { text: "And echoed through eternity", delay: 7000 },
        { text: "I will love you...", delay: 9000 },
        { text: "ALWAYS AND FOREVER 💫", delay: 11000, final: true }
    ];
    
    finaleMessages.forEach((message, index) => {
        setTimeout(() => {
            if (message.final) {
                showFinalCosmicMessage(message.text);
            } else {
                showCosmicMessage(message.text);
            }
        }, message.delay);
    });
}

function showCosmicMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 36px;
        color: white;
        text-align: center;
        opacity: 0;
        text-shadow: 0 0 20px #ff6b6b;
        font-family: 'Georgia', serif;
        z-index: 1001;
    `;
    message.style.animation = 'cosmicMessage 4s ease-in-out forwards';
    document.getElementById('cosmic-finale').appendChild(message);
    
    // Create stars around message
    createStarBurst();
}

function showFinalCosmicMessage(text) {
    const finalMessage = document.createElement('div');
    finalMessage.innerHTML = text;
    finalMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
        color: #ff6b6b;
        font-weight: bold;
        text-align: center;
        opacity: 0;
        text-shadow: 0 0 30px #ff6b6b, 0 0 60px #ff6b6b;
        z-index: 1002;
    `;
    finalMessage.style.animation = 'finalCosmicReveal 3s ease-out forwards';
    document.getElementById('cosmic-finale').appendChild(finalMessage);
    
    // Epic star explosion
    createStarExplosion();
    
    // Final restart option
    setTimeout(() => {
        createFinalRestartButton();
    }, 5000);
}

function createStarBurst() {
    for (let i = 0; i < 12; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        const tx = `calc(-50% + ${Math.random() * 200 - 100}px)`;
        const ty = `calc(-50% + ${Math.random() * 200 - 100}px)`;
        const tx2 = `calc(-50% + ${Math.random() * 400 - 200}px)`;
        const ty2 = `calc(-50% + ${Math.random() * 400 - 200}px)`;
        
        star.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            font-size: 20px;
            z-index: 1001;
            --tx: ${tx};
            --ty: ${ty};
            --tx2: ${tx2};
            --ty2: ${ty2};
        `;
        star.style.animation = 'starBurst 2s ease-out forwards';
        document.getElementById('cosmic-finale').appendChild(star);
        
        setTimeout(() => star.remove(), 2000);
    }
}

function createStarExplosion() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = '⭐';
            const tx = `calc(-50% + ${Math.random() * 800 - 400}px)`;
            const ty = `calc(-50% + ${Math.random() * 800 - 400}px)`;
            
            star.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                font-size: ${15 + Math.random() * 20}px;
                z-index: 1001;
                --tx: ${tx};
                --ty: ${ty};
            `;
            star.style.animation = 'starExplode 3s ease-out forwards';
            document.getElementById('cosmic-finale').appendChild(star);
            
            setTimeout(() => star.remove(), 3000);
        }, i * 50);
    }
}

function createFinalRestartButton() {
    const restartBtn = document.createElement('button');
    restartBtn.innerHTML = 'Relive Our Love Story 💖';
    restartBtn.style.cssText = `
        position: fixed;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
        color: white;
        border: none;
        padding: 20px 40px;
        font-size: 20px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 0 30px rgba(255, 107, 107, 0.7);
        z-index: 1003;
        animation: pulseGlow 2s ease-in-out infinite;
    `;
    restartBtn.onclick = () => location.reload();
    document.getElementById('cosmic-finale').appendChild(restartBtn);
}

// ===== GLOBAL CLICK HANDLER FOR SPARKLES =====
document.addEventListener('click', function(e) {
    Animations.createSparkleTrail(e.clientX, e.clientY);
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    initParticleSystem();
    
    // Start with dramatic entrance
    startDramaticEntrance();
    
    console.log("✨ Epic Romantic Experience Loaded!");
    console.log("🎬 All Animations Integrated");
    console.log("📸 Photos Go Back Feature RESTORED");
    console.log("💖 Ready for Trish!");
    console.log("🚀 Complete Flow:");
    console.log("1. Cosmic Entrance");
    console.log("2. Envelope Click");
    console.log("3. Birthday Question");
    console.log("4. Photos Pop Out");
    console.log("5. Thunder & Name");
    console.log("6. Romantic Message");
    console.log("7. Photos Go Back ✓");
    console.log("8. Final Message");
    console.log("9. Cosmic Finale");
});
