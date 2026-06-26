document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. الحالة والبيانات الأساسية (State & Data)
    // ==========================================
    let timeCapsuleUnlocked = false;
    let typeWriterInterval = null; // لمنع تداخل النصوص عند النقر السريع
    
    const interactionState = {};
    const popup = document.getElementById('custom-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const closeBtn = document.getElementById('popup-close-btn');

    const requiredObjects = [
        'sofa', 'window', 'screen', 'diary', 
        'boy-target', 'blured-picture', 'cat-1', 'cat-2'
    ];

    // قاعدة بيانات النصوص لكل Hitbox حسب الـ ID الخاص به
    const roomData = {
        'sofa': {
            interactions: [
                { title: "&@#'&#'s Sofa", text: "You see a sofa..it looks really comfortable..", sound: sfx.chutter },
                { title: "&@#'&#'s Sofa", text: "He used to fall asleep here while waiting.", sound: sfx.chutter },
                { title: "&@#'&#'s Sofa", text: "Waiting for someone?", sound: sfx.chutter },
                { title: "&@#'&#'s Sofa", text: "He always left enough room beside him.", sound: sfx.chutter },
                { title: "&@#'&#'s Sofa", text: "The room felt less empty when you were around.", sound: sfx.chutter }
            ]
        },
        'secret-diary': {
            interactions: [
                { title: "📔 &@#'&#5&@#'&# ", text: "Secret Diary?", sound: sfx.pageFlip },
                { title: "📔 Secret Diary ", text: "There must be something more personal in here.", sound: sfx.pageFlip },
                { title: "📔 Secret Diary ", text: "Mostly unfinished thoughts.", sound: sfx.pageFlip },
                { title: "📔 Secret Diary ", text: "Some sentences are scratched out harder than the others.", sound: sfx.pageFlip },
                { title: "Mirror", text: ".....", sound: sfx.pageFlip },
                { title: "Mirror", text: "....", sound: sfx.pageFlip },
                { title: "📔 &@'#£ &@$#'", text: "Wait... was this always here?", sound: sfx.pageFlip },
                { title: "📔 Secret Diary", text: "Somewhere Safe?", sound: sfx.glitch1 },
                { title: "📔Somewhere Safe", text: "The handwriting gets softer whenever he talks about you.", sound: sfx.pageFlip }
            ]
        },
        'diary': {
            interactions: [
                { title: "📔 Locked Diary", text: "You found a diary..or maybe just a random notebook.", sound: sfx.pageFlip },
                { title: "📔 Locked Diary", text: "Oh~ a personal diary..maybe he writes about his feelings.", sound: sfx.pageFlip },
                { title: "📔 Locked Diary", text: "It's not personal .. to read..others diary put it down.", sound: sfx.pageFlip },
                { title: "📔 Locked Diary", text: "..Ok..one quick peek..There must be something more personal in here.", sound: sfx.pageFlip },
                { title: "📔 Locked Diary", text: "Wait... why are some pages missing?", sound: sfx.pageFlip },
                { title: "📔 L0cked D!ary", text: "I think someone wrote here before...", sound: sfx.pageFlip },
                { title: "📔 L0cked D!ary", text: "He keeps calling his feelings cringe… then writes them anyway.", sound: sfx.pageFlip },
                { title: "ERROR_014", text: "STOP LOOKING.", sound: sfx.glitch }
            ]
        }, 
        'screen': {
            interactions: [
                { title: "Terminal", text: "A screens..that shows..well..nothing really..just some random code and stuff..", sound: sfx.click },
                { title: "Terminal", text: "The screen is filled with unfinished projects.", sound: sfx.click },
                { title: "Terminal", text: "Another attempt to build something.", sound: sfx.click },
                { title: "Terminal", text: "Another attempt to be understood.", sound: sfx.click },
                { title: "Terminal", text: "The cursor keeps blinking.", sound: sfx.click },
                { title: "Terminal", text: "It always waits for one more line.", sound: sfx.click },
                { title: "Terminal", text: "Just like him.", sound: sfx.click },
                { title: "Terminal", text: "Honestly, why would it be a terminal? My relationship with him isn't some computer terminal thing.", sound: sfx.glitch },
                { title: "Terminal", text: "ERROR_014...file not found.", sound: sfx.glitch1 },
                { title: "Terminal", text: "The cursor blinked for a very long time.", sound: sfx.click }
            ]
        },
        'figure': {
            interactions: [
                { title: "Pixel Figure", text: "You see a small pixel Finn figure. There is a note beside it.", sound: sfx.drawer },
                { title: "Pixel Figure", text: "The note is faded. Most of it is unreadable.", sound: sfx.pageFlip },
                { title: "Pixel Figure", text: "He kept this?", sound: sfx.glitch1 },
                { title: "Pixel Figure", text: "How childish.." },
                { title: "Pixel Figure", text: "Then why couldn't he throw it away?", sound: sfx.glitch }
            ]
        },
        'note': {
            interactions: [
                { title: "📄 Note", text: "You see a note on the desk..it's written in a messy handwriting.." },
                { title: "📄 Note", text: "The note says: “I wish I could say things directly..”" },  
                { title: "📄 Note", text: "There is a date on the note..30 June 2026..is that his birthday?.." },
                { title: "📄 Note", text: "Keep going ,&@#'&#'s Birthday is close..", sound: sfx.glitch1 },
                { title: "📄 Note", text: "Create something worth staying for." }
            ]
        },
        'window': {
            interactions: [
                { title: "Window", text: "An old window. The curtains are worn, but the outside world still finds its way in.", sound: sfx.curtain },
                { title: "Window", text: "Another day passes by..he's been looking outside for a while." },
                { title: "Window", text: "He spent a lot of time standing here." },
                { title: "Window", text: "Sometimes watching the sunset." },
                { title: "Window", text: "Sometimes listening to the rain." },
                { title: "Window", text: "Sometimes counting the stars..wondering if someone else was looking at the same sky." },
                { title: "Window", text: "The moon is beautiful, isn't it?" },
                { title: "Window", text: "Perhaps it is beautiful because it is out of reach.", sound: sfx.curtainEnd }
            ]
        },
        'couch': {
            interactions: [
                { title: "Couch", text: "The room smells faintly of coffee and dust." },
                { title: "Couch", text: "He spent a lot of time sitting here." },
                { title: "Couch", text: "He kept rehearsing conversations that never happened." },
                { title: "Couch", text: "I wonder what he's gonna build next time." },
                { title: "Notebook", text: "Another notebook filled halfway." }
            ]
        },
        'clock': {
            interactions: [
                { title: "Clock", text: "He kept saying ..One more hour...", sound: sfx.glitch1 },
                { title: "Clock", text: "The room stopped caring about time long ago.", sound: sfx.glitch1 }
            ]
        },
        'time-capsule': {
            interactions: [
                { title: "Desk Drawer", text: "You open the drawer.." },
                { title: "Letter", text: "There is a letter" },
                { title: "Letter From a Friend", text: "I didn't know how to say things directly." },
                { title: "Letter From a Friend", text: "So I built this place instead." },
                { title: "Letter From a Friend", text: "Happy birthday." },
                { title: "Letter From a Friend", text: "I hope you have a good day" },
                { title: "Letter From a Friend", text: "I hope this room makes you smile." },
                { title: "Letter From a Friend", text: "I hope someone builds something for me someday." },
                { title: "Letter From a Friend", text: "Happy birthday." }
            ]
        },
        'drawer': {
            interactions: [  
                { 
                    title: "📄 Desk Drawer", 
                    text: "Seems like the drawer is locked.\n\nWhere did he put the key?", 
                    sound: sfx.drawer 
                },
                {   title: "📄 Desk Drawer", 
                    text: "You gently shake the handle. Something heavy slides around inside.\n\nIt sounds like a thick stack of letters.. or a gift he never got to send.", 
                    sound: sfx.chutter 
                }
            ]
        },
        'jbl': {
            interactions: [
                { title: "Speaker", text: "Surah Yusuf..playing in the background", sound: sfx.click }
            ]    
        },
        'boy-target': {
            interactions: [    
                { title: "Weird Guy", text: "He's staring at the wall, lost in thought." },
                { title: "Weird Guy", text: "He's talking to himself again.", sound: sfx.keyboard_typing1 },
                { title: "Weird Guy", text: "You catch a few words." },
                { title: "Weird Guy", text: "Most of them don't make sense." },
                { title: "&@#£#'&#", text: "One of them sounds important..", sound: sfx.glitch1 },
                { title: "Weird Guy", text: "He is trying to write something but ends up deleting his words.", sound: sfx.keyboard_typing },
                { title: "Weird Guy", text: "He keeps starting over", sound: sfx.keyboard_typing },
                { title: "Weird Guy", text: "Will he ever leave this room?", sound: sfx.click },
                { title: "Weird Guy", text: "The room learned how to keep him company.", sound: sfx.curtain }
            ]
        },
        'shelf': {
            interactions: [
                { title: "Book Shelf", text: "A shelf full of novels.\n\nMost of them seem darker than they should be", sound: sfx.drawer },
                { title: "Novel", text: "Shadow Slave..interesting story..i wonder if he has any Romance", sound: sfx.pageFlip },
                { title: "Novel", text: "Lost from light..", sound: sfx.glitch1 },
                { title: "Novel", text: "Some books are read so often the corners have started to fade.", sound: sfx.pageFlip },
                { title: "Novel", text: "There are no bookmarks.\n\nAs if he already knows every page.", sound: sfx.pageFlip }
            ]    
        },
        'cat-2': {
            interactions: [
                { title: "Cat", text: "You see a cat sitting on the book shelf..it looks like it's sleeping.." },
                { title: "Mimi", text: "You read the name tag on her collar..it says “Mimi”..maybe that's her name?" },
                { title: "Mimi", text: "She doesn't like strangers but she seems to be comfortable around you.." },
                { title: "Mimi", text: "Maybe she can sense you are important to him too?", sound: sfx.meow },
                { title: "Mimi", text: "Maybe she just likes you cause you look cute.", sound: sfx.meow },
                { title: "Mimi", text: "Meow..", sound: sfx.meow }
            ]    
        },
        'cat-1': {
            interactions: [
                { title: "Cat", text: "You see another cat sitting on the bookshelf..it looks like it's staring at you too.." },
                { title: "Cat", text: "I advise you don't try to pet him he doesn't like strangers touching him." },
                { title: "Cat", text: "His name tag says “Mino”.." },
                { title: "Mino", text: "He was always hiding somewhere." },
                { title: "Mino", text: "He never liked going outside." },
                { title: "Mino", text: "The room felt safer." },
                { title: "Mino", text: "....", sound: sfx.glitch1 },
                { title: "Mino", text: "One day he finally left." },
                { title: "Mino", text: "He never came back." }
            ]    
        },
        'blured-picture': {
            interactions: [
                { title: "Blurred Picture", text: "You see a blurry picture on the wall", sound: sfx.drawer },
                { title: "Blurred Picture", text: "It's difficult to make out who it is." },
                { title: "Blurred Picture", text: "For a moment... it almost looks familiar." },
                { title: "Blurred Picture", text: "Maybe it's someone he misses." },
                { title: "Blurred Picture", text: "Or someone he never met.", sound: sfx.glitch1 },
                { title: "Blurred Picture", text: "The longer you stare at it, the harder it becomes to look away." },
                { title: "Blurred Picture", text: "You see a blurry picture on the wall" },
                { title: "Blurred Picture", text: "Perhaps it's just a decoration.", sound: sfx.drawer }
            ]    
        }
    };

    // ==========================================
    // 2. الدوال المتحكمة والتحقق (Core Logic)
    // ==========================================
    
    function checkTimeCapsuleUnlock() {
        if (timeCapsuleUnlocked) return;
        
        // التحقق من أن كل العناصر المطلوبة تم النقر عليها مرة واحدة على الأقل
        const completed = requiredObjects.every(id => interactionState[id] >= 1);
        
        if (completed) {
            timeCapsuleUnlocked = true;
            playSound(sfx.drawer);
            popupTitle.textContent = "...";
            typeWriter("You hear a quiet click somewhere in the room.");
            popup.classList.remove('popup-hidden');
        }
    }

    function typeWriter(text) {
        // إيقاف أي عملية كتابة جارية فورًا لتجنب تداخل النصوص
        if (typeWriterInterval) {
            clearInterval(typeWriterInterval);
        }

        popupText.textContent = '';
        let index = 0;

        typeWriterInterval = setInterval(() => {
            popupText.textContent += text[index];
            index++;

            if (index >= text.length) {
                clearInterval(typeWriterInterval);
            }
        }, 25);
    }

    function openPopup(itemId) {
        // حالة خاصة بالـ Time Capsule المقفلة
        if (itemId === "time-capsule" && !timeCapsuleUnlocked) {
            playSound(sfx.drawer);
            popupTitle.textContent = "Desk Drawer";
            typeWriter("It won't open.");
            popup.classList.remove('popup-hidden');
            return;
        }    

        const data = roomData[itemId];
        if (!data) return;

        // تهيئة الحالة إذا لم تكن موجودة
        if (!interactionState[itemId]) {
            interactionState[itemId] = 0;
        }

        const currentIndex = interactionState[itemId];
        const interaction = data.interactions[Math.min(currentIndex, data.interactions.length - 1)];

        popupTitle.textContent = interaction.title;
        typeWriter(interaction.text);
        
        if (interaction.sound) {
            playSound(interaction.sound);       
        }

        popup.classList.remove('popup-hidden');

        // تحديث العداد بعد النقر مباشرة
        interactionState[itemId]++;
        
        // استدعاء التحقق هنا ديناميكيًا بعد كل تفاعل
        checkTimeCapsuleUnlock();
    }

    // ==========================================
    // 3. ربط الأحداث (Event Listeners)
    // ==========================================
    
    Object.keys(roomData).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', () => openPopup(id));
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            playSound(sfx.chutter);
            popup.classList.add('popup-hidden');
            if (typeWriterInterval) clearInterval(typeWriterInterval); // إيقاف الكتابة عند الإغلاق
        });
    }
});

// ==========================================
// 4. التحكم في البيئة والموسيقى (Environment & Audio)
// ==========================================
let isNight = true; 

document.getElementById('clock').addEventListener('click', () => {
    isNight = !isNight;
    const roomContainer = document.getElementById('room-container');
    
    if (roomContainer) {
        if (isNight) {
            roomContainer.style.filter = 'none';
        } else {
            roomContainer.style.filter = 'brightness(1.6) saturate(0.8) hue-rotate(20deg)';
        }
    }
});

const sfx = {
    pageFlip: new Audio('assets/audio/page-flip.mp3'),
    meow: new Audio('assets/audio/cat-meow.mp3'),
    click: new Audio('assets/audio/mouse-click.mp3'),
    chutter: new Audio('assets/audio/chutter-click.mp3'),
    glitch: new Audio('assets/audio/glitch.mp3'),
    glitch1: new Audio('assets/audio/glitch1.mp3'),
    sigh: new Audio('assets/audio/sigh.mp3'),
    keyboard_typing1: new Audio('assets/audio/keyboard-typing1.mp3'),
    keyboard_typing: new Audio('assets/audio/keyboard-typing1.mp3'),
    quran: new Audio('assets/audio/quran.mp3'),
    curtain: new Audio('assets/audio/curtain.mp3'),
    curtainEnd: new Audio('assets/audio/curtain-end.mp3'),
    drawer: new Audio('assets/audio/drawer.mp3')
};

function playSound(audioObject) {
    if (!audioObject) return;
    audioObject.currentTime = 0; 
    audioObject.play().catch(err => console.log("Audio play blocked until user interaction:", err));
}

document.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.volume = 0.4;
        music.play().catch(err => console.log("Music play blocked:", err));
    }
}, { once: true });