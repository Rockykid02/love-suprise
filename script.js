// Step 1: Envelope click
document.getElementById('envelope').addEventListener('click', function() {
    console.log("Envelope clicked - working!");
    this.style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
});

// Step 2: Check answer
function checkAnswer() {
    const answer = document.getElementById('birthdayAnswer').value.toLowerCase().trim();
    const correctAnswers = ['21 october', 'october 21', '21st october', 'october 21st', '21 oct', 'oct 21'];
    
    console.log("Answer given:", answer);
    
    if (correctAnswers.includes(answer)) {
        document.getElementById('questionScreen').style.display = 'none';
        showHurray();
    } else {
        alert(' not quite rightU Dont tell me you FORGOT... TrY Again" 😘');
    }
}

function showHurray() {
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.innerHTML = `
        <div style="font-size: 50px; color: #ff6b6b; margin-bottom: 20px;">🎉 HURRAY! 🎉</div>
        <p style="font-size: 20px; margin-bottom: 20px;">You remembered my birthday! 💖</p>
        <button class="next-btn" onclick="closeMessageAndStart()">click hereBabe 💖</button>
    `;
    document.body.appendChild(messageBox);
}

function closeMessageAndStart() {
    document.querySelector('.message-box').remove();
    popOutPhotos();
}

function popOutPhotos() {
    console.log("Photos popping out!");
    
    // USING YOUR LOCAL IMAGES
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
        
        // Animate photo in
        setTimeout(() => {
            photo.style.opacity = '1';
            photo.style.transform = 'scale(1)';
        }, index * 300 + 500);
    });

    // Show next button
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
    
    const name = document.createElement('div');
    name.className = 'name-display';
    name.innerHTML = 'TRISH 💖';
    document.body.appendChild(name);
    
    setTimeout(() => {
        name.style.opacity = '1';
    }, 100);
    
    for (let i = 0; i < 15; i++) {
        createHeart(i);
    }
    
    // AUTOMATICALLY show romantic message after 3 seconds (NO BUTTON)
    setTimeout(() => {
        // Fade out name first
        name.style.opacity = '0';
        
        // Then show romantic message after fade out
        setTimeout(() => {
            name.remove();
            showRomanticMessage();
        }, 1000);
    }, 3000);
}

function showRomanticMessage() {
    console.log("From my HEART❤️!");
    
    const message = document.createElement('div');
    message.className = 'romantic-message';
    message.innerHTML = `
        <h1>Hey Trish Babe... 💫</h1>
        <p style="font-size: 20px; line-height: 1.6; margin: 20px 0;">
            Hey Trish babe...

I don't just see you in my present - I see you in every 
one of my tomorrows. I picture us growing old together, 
still laughing at the same stupid jokes, still holding 
hands, still choosing each other every single day.

With you, the future isn't scary - it's exciting. It's 
full of adventures, lazy Sundays, and a love that just 
keeps growing. I can't wait for all our moments to come.

🚀. 🌟
        </p>
        <button class="next-btn" onclick="startPhotosGoBack()">Watch Magic Continue ✨</button>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '1';
    }, 100);
}

function startPhotosGoBack() {
    console.log("I truly love you!");
    document.querySelector('.romantic-message').remove();
    photosGoBack();
}

function photosGoBack() {
    const photos = document.querySelectorAll('.photo');
    
    photos.forEach((photo, index) => {
        setTimeout(() => {
            photo.style.opacity = '0';
            photo.style.transform = 'scale(0)';
        }, index * 300);
    });

    // AUTOMATICALLY show final message after photos disappear
    setTimeout(() => {
        showFinalMessage();
    }, 1500);
}

function showFinalMessage() {
    console.log("Final message!");
    
    const finalMsg = document.createElement('div');
    finalMsg.className = 'final-message';
    finalMsg.innerHTML = `
        I really really love you 😘<br>
        Forever and always... 💝
        <br><br>
        <button class="next-btn" onclick="location.reload()">Start Over 💕</button>
    `;
    document.body.appendChild(finalMsg);
    
    setTimeout(() => {
        finalMsg.style.opacity = '1';
    }, 100);
    
    for (let i = 0; i < 25; i++) {
        createHeart(i);
    }
}

function createHeart(index) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.opacity = '1';
        heart.style.transform = 'translateY(-100vh) rotate(360deg)';
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }, index * 100);
}

console.log("Page loaded successfully!");
