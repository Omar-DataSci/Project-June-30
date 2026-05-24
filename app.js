document.addEventListener('DOMContentLoaded', () => {
    // 1. جلب عناصر النافذة من الـ DOM
    const interactionState = {};
    const popup = document.getElementById('custom-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const closeBtn = document.getElementById('popup-close-btn');

    // 2. قاعدة بيانات النصوص لكل Hitbox حسب الـ ID الخاص به
    const roomData = {
        'sofa': {
            interactions: [
                {
                title: "&@#'&#'s Sofa",
                text: "You see a sofa..it looks really comfortable..",
                sound: sfx.chutter
                },
                 {
                title: "&@#'&#'s Sofa",
                text: "Maybe he likes to sit here and relax or something..",
                sound: sfx.chutter
                },
                {
                title: "&@#'&#'s Sofa",
                text: "He used to fall asleep here while waiting.",
                sound: sfx.chutter
            },
            {
                title: "&@#'&#'s Sofa",
                text: "..was he's waiting for you to come back and sit with him..?",
                sound: sfx.chutter
            },
            {
                title: "&@#'&#'s Sofa",
                text: "He always left enough room beside him...",
                sound: sfx.chutter
            },
            
            {
                title: "&@#'&#'s Sofa",
                text: "The room felt less empty when you were around.",
                sound: sfx.chutter
                },
                {
                title: "&@#'&#'s Sofa",
                text: "Why didnt he just say it..",
                sound: sfx.chutter
                },
            ]
        },
        'secret-diary': {
            interactions: [
                {
                title: "📔 &@#'&#5&@#'&# ",
                text: "Secret Diary??",
                sound: sfx.pageFlip
                },
                {
                title: "📔 Secret Diary ",
                text: "There must be something more personal in here.",
                sound: sfx.pageFlip
                },
                {
                title: "📔 Secret Diary ",
                text: "It's just some random thoughts and stuff..nothing personal at all.",
                sound: sfx.pageFlip
                },
                {
                title: "📔 Secret Diary ",
                text: "Some sentences are scratched out harder than the others.",
                sound: sfx.pageFlip
                },
                {
                title: "Mirror",
                text: "There is a story..titled 'Mirror'..is he enflunced by cinderela or something?..",
                sound: sfx.pageFlip
                },
                 {
                title: "Mirror",
                text: "Unbelievable..it's realy him talking about his reflection in the mirror..",
                sound: sfx.pageFlip
                },
                {
                title: "📔 &@'#£ &@$#'",
                text: ".. Wait... was this always here?",
                sound: sfx.pageFlip
                },
                {
                title: "📔 Secret Diary",
                text: "Somewhere Safe?",
                sound: sfx.glitch1
                },
                {
                title: "📔Somewhere Safe",
                text: "The handwriting gets softer whenever he talks about you.",
                sound: sfx.pageFlip
                }
            ]
        }
        
        ,
        'diary': {
            interactions: [
                {
                    title: "📔 Locked Diary",
                    text: "You found a diary..or maybe just a random notebook.",
                    sound: sfx.pageFlip
                },
                {
                    title: "📔 Locked Diary",
                    text: "Oh~ a personal diary..maybe he writes about his feelings.",
                    sound: sfx.pageFlip
                },
                {
                    title: "📔 Locked Diary",
                    text: "It's not personal .. to read..others diary put it down.",
                    sound: sfx.pageFlip
                },
                {
                    title: "📔 Locked Diary",
                    text: "..Ok..one quick peek..There must be something more personal in here.",
                    sound: sfx.pageFlip
                },

                {
                    title: "📔 Locked Diary",
                    text: "Wait... why are some pages missing?",
                    sound: sfx.pageFlip
                },

                {
                    title: "📔 L0cked D!ary",
                    text: "I think someone wrote here before...",
                    sound: sfx.pageFlip
                },
                {
                    title: "📔 L0cked D!ary",
                    text: "He keeps calling his feelings cringe… then writes them anyway.",
                    sound: sfx.pageFlip
                },
                {
                    title: "ERROR_014",
                    text: "STOP LOOKING.",
                    sound: sfx.glitch
                }
            ]
        }, 
        'screen': {
            interactions: [
                {
                title: "Terminal",
                text: "A screens..that shows..well..nothing really..just some random code and stuff..",
                sound: sfx.click
                },
                {
                title: "Terminal",
                text: "He keep staring at this lines talking nonsense..i wonder when he gonna get a job?",
                sound: sfx.click
                },
                {
                title: "Terminal",
                text: "He kept building things hoping he would be understood. ",
                sound: sfx.click
                },
                {
                title: "Terminal",
                text: "Keep Day Dreaming..trying to escape reality through his work..",
                sound: sfx.click
                },
                
                {
                title: "Terminal",
                text: "Yah..he gonna give up after some time..he always does that..",
                sound: sfx.click
                },
                
                {
                title: "Terminal",
                text: "What's the point of doing something if you know you gonna give up on it eventually?..",
                sound: sfx.click
                },
                
                {
                title: "Terminal",
                text: "Why are you not stopping?..Why are you doing this?..feel alive? what a joke.",
                sound: sfx.click
                },
                {
                title: "Terminal",
                text: "Honestly, why would it be a terminal? My relationship with him isn't some computer terminal thing.",
                sound: sfx.glitch
                },
                {
                title: "Terminal",
                text: "ERROR_014...file not found.",
                sound: sfx.glitch1
                },
                {
                title: "Terminal",
                text: "The cursor blinked for a very long time.",
                sound: sfx.click
                },
            ]
        },
        'figure': {
            interactions: [
                {
                    title: "Pixel Figure",
                    text: "You see a small pixel Finn figure ..There is a note on the side.",
                    sound: sfx.drawer

                },
                {
                    title: "Pixel Figure",
                    text: "Why its hard to read?..what's happening to me?",
                    sound: sfx.pageFlip
                },
                {
                    title: "Pixel Figure",
                    text: "You see a small pixel Finn figure...",
                    sound: sfx.glitch1
                },
                {
                    title: "Pixel Figure",
                    text: "How childich.."
                },
                {
                    title: "Pixel Figure",
                    text: "Why does it feel like it's watching me?",
                    sound: sfx.glitch  
                }
            ]
        },

        'note': {
            interactions: [
                {
                title: "📄 Note",
                text: "You see a note on the desk..it's written in a messy handwriting..it looks like it's been written in a hurry..maybe it's something important?"
                },
                {
                title: "📄 Note",
                text: "The note says: “I wish I could say things directly..”"
                },  
                {
                title: "📄 Note",
                text: "There is a date on the note..30 June 2026..is that his birthday?.."
                },
                {
                title: "📄 Note",
                text: "Keep going ,&@#'&#'s Birthday is close..",
                sound: sfx.glitch1
                },
                {
                title: "📄 Note",
                text: "Create something worth staying for."
                },
            ]
        },
        
        'window': {
            interactions: [
                {
                title: "Window",
                text: "You see a window..it's covered with some old curtains..but you can still see the outside world through it",
                sound: sfx.curtain
                },
                {
                title: "Window",
                text: "Another day passes by..he's been looking outside for a while now.."
                },
                {
                title: "Window",
                text: "He used to watch the sunset from here."
                },
                {
                title: "Window",
                text: "It's raining outside..he used to like the sound of rain."
                },
                {
                title: "Window",
                text: "He used to watch the sky at night..counting the stars..wondering if there's someone out there looking at the same stars as him.."
                },
                {
                title: "Window",
                text: "The moon is beautiful, isn't it?"
                },
                {
                title: "Window",
                text: "It is exactly because it's out of reach that it looks so beautiful.",
                sound: sfx.curtainEnd
                },
            ]
        },
        
        'couch': {
            interactions: [
                {
                title: "Couch",
                text: "The room smells like coffee and dust."
                },
                {
                title: "Couch",
                text: "He kept rehearsing conversations that never happened."
                },
                {
                title: "Couch",
                text: "He always left enough room beside him.."
                },
                {
                title: "Couch",
                text: "I wonder what his gonna build next time."
                },
                {
                title: "Notebook",
                text: "Another notebook filled halfway."
                },
            ]
        },
        
        'clock': {
            interactions: [
                {
                title: "Clock",
                text: "He kept saying ..One more hour...",
                sound: sfx.glitch1
                },
                {
                title: "Clock",
                text: "The room stopped caring about time long ago.",
                sound: sfx.glitch1
                }
            ]
        },
        
        'time-capsule': {
            interactions: [
                {
                title: "Desk Drawer",
                text: "You open the drawer.."
                },
                {
                title: "Letter",
                text: "There is a letter"
                },
                {
                title: "Letter From a Friend",
                text: "I didn't know how to say things directly."
                },
                {
                title: "Letter From a Friend",
                text: "So I built this place instead."
                },
                {
                title: "Letter From a Friend",
                text: "Happy birthday."
                },
                {
                title: "Letter From a Friend",
                text: "I hope you like it."
                },
                {
                title: "Letter From a Friend",
                text: "I hope you have a good day"
                },
                {
                title: "Letter From a Friend",
                text: "I hope you have a good year."
                },
                {
                title: "Letter From a Friend",
                text: "I hope you have a good life."
                },
                {
                title: "Letter From a Friend",
                text: "I hope you have a good everything."
                },
                {
                title: "Letter From a Friend",
                text: "See ya next time in another Project."
                },
                {
                title: "Letter From a Friend",
                text: "Happy birthday."
                }
            ]
        },
        'xxxx': {
            interactions: [
                {
                title: "📄 xxx",
                text: ""
                }
            ]
        },
        'xxxx': {
            interactions: [
                {
                title: "📄 xxx",
                text: "Keep going ,&@#'&# Birthday is close.."
                }
            ]
        },
        'drawer': {
            interactions: [  
                {      
                title: "📄 Desk Drawer",
                text: "Seems like the drawer is locked.\n\n Where did he put the key?",
                sound: sfx.drawer
                },
                {
                title: "📄 Desk Drawer",
                text: "There is a letter",
                sound: sfx.pageFlip
                }

            ]
        },

        'jbl': {
            interactions: [
                {
            title: "Speaker",
            text: "Surah Youcef..palying in the background",
            sound: sfx.click
                }
            ]    
        },

        'boy-target': {
            interactions: [    
                {
                title: "Weird Guy",
                text: "He's staring at the wall, lost in thought.",
                },
                {
                title: "Weird Guy",
                text: "Dont bother trying he w'ont notice u..Once he locked in ..he tend to be oblivious to his surounding.",
                sound: sfx.keyboard_typing1
                }
                ,
                {
                title: "Weird Guy",
                text: "He's mutering to himself, something..about a soul link?"
                },
                {
                title: "Weird Guy",
                text: "He's been like this for a while..Is he waiting for someone?..to reach him?",
                },
                {
                title: "Weird Guy",
                text: "He is trying to write something but end up deleting his words.",
                sound: sfx.keyboard_typing
                },
                {
                title: "Weird Guy",
                text: "He keeps starting over",
                sound: sfx.keyboard_typing
                },
                {
                title: "Weird Guy",
                text: "Will he ever leave this room?",
                sound: sfx.click
                },
                 {
                title: "Weird Guy",
                text: "The room learned how to keep him company.",
                sound: sfx.curtain
                },
                {
                title: "&@#£#'&#",
                text: "You don't mean it anyway so why don't you stop lying to your self.",
                sound: sfx.glitch1
                }
            ]
        },

        'shelf': {
            interactions: [
                {
                title: "Book Shelf",
                text: "A bunch of Novels..but why all of them dark fantasy theme..",
                sound: sfx.drawer
                },
                {
                title: "Novel",
                text: "Shadow Slave..intersting story..i wonder if he have any Romance",
                sound: sfx.pageFlip  
                },
                {
                title: "Novel",
                text: "Lost from light..",
                sound: sfx.glitch1 
                },
            ]    
        },
        'cat-2': {
            interactions: [
                {
                title: "Cat",
                text: "You see a cat sitting on the book shelf..it looks like it's sleeping.."
                },
                {
                title: "Mimi",
                text: "You read the name tag on her collar..it says “Mimi”..maybe that's her name?"
                },
                {
                title: "Mimi",
                text: "She dont like strangers but she seems to be comfortable around you.."
                },
                {
                title: "Mimi",
                text: "Maybe she can sense you are important to him too?..or maybe she just like you cause you cute.",
                sound: sfx.meow 
                },
                {
                title: "Mimi",
                text: "Meow..",
                sound: sfx.meow  
                }
            ]    
        },
        'cat-1': {
            interactions: [
                {
                title: "Cat",
                text: "You see another cat sitting on the bookshelf..it looks like it's staring at you too.."
                },
                {
                title: "Cat",
                text: "I advise you don't try to pet him he doesn't like strangers touch him..he's a bit shy and stuff.."   
                },
                {
                title: "Cat",
                text: "His name tag says “Mino”.."   
                },
                {
                title: "Mino",
                text: "He lived as a coward for a long time..he's been hiding in the room for a while"   
                },
                {
                title: "Mino",
                text: "The day he got outside the house for the first time..a dog ate him..and just like that..he's gone.."   
                },
                {
                title: "Mino",
                text: "He was really scared of the outside world..he never wanted to leave his place like..he know..how his ending gonna be.."   
                },
                {
                title: "Mino",
                text: "....", 
                sound: sfx.glitch1
                },
            ]    
        },
        'blured-picture': {
            interactions: [
                {
                title: "Blured Picture",
                text: "You see a blurry picture on the wall",
                sound: sfx.drawer
                },
                {
                title: "Blured Picture",
                text: "It's hard to make out what it is..but it looks like a photo of someone..maybe it's you?.."   
                },
                {
                title: "Blured Picture",
                text: "Or just a figment of imagination..a dream that he wish to come true",
                sound: sfx.glitch
                },
                {
                title: "Blured Picture",
                text: "You see a blurry picture on the wall",
                sound: sfx.glitch1
                },
                {
                title: "Blured Picture",
                text: "Just a random photo that he put there for decoration..",
                sound: sfx.drawer
                },
            ]    
        }

        // يمكنك إضافة بقية العناصر هنا بنفس الأسلوب (jbl, drawer, window...)
    };

    // 3. دالة موحدة لفتح النافذة وضخ البيانات فيها
    function openPopup(itemId) {

    const data = roomData[itemId];

    if (!data) return;

    // if object never clicked before
    if (!interactionState[itemId]) {
        interactionState[itemId] = 0;
    }

    const currentIndex = interactionState[itemId];

    // prevent going beyond last interaction
    const interaction =
        data.interactions[
            Math.min(currentIndex, data.interactions.length - 1)
        ];

    popupTitle.textContent = interaction.title;

    typeWriter(interaction.text);
    if (interaction.sound) {
        playSound(interaction.sound);
        }

    popup.classList.remove('popup-hidden');

    // increase state for next click
    interactionState[itemId]++;
}
    function typeWriter(text) {

        popupText.textContent = '';

        let index = 0;

        const interval = setInterval(() => {

            popupText.textContent += text[index];

            index++;

            if (index >= text.length) {
                clearInterval(interval);
            }

        }, 25);
    }
    // 4. ربط أحداث النقر ديناميكياً
    // نبحث عن كل الـ IDs الموجودة في قاعدة البيانات ونربطها فوراً
    Object.keys(roomData).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', () => openPopup(id));
        }
    });

    // 5. إغلاق النافذة عند الضغط على زر Close
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            playSound(sfx.chutter);
            popup.classList.add('popup-hidden');
        });
    }
});



let isNight = true; // starts as night since the image is night

document.getElementById('clock').addEventListener('click', () => {
    isNight = !isNight;
    
    const overlay = document.querySelector('#room-container::after') 
        || document.getElementById('day-night-overlay');
    
    if (isNight) {
        document.getElementById('room-container').style.filter = 'none';
    } else {
        document.getElementById('room-container').style.filter = 
            'brightness(1.6) saturate(0.8) hue-rotate(20deg)';
    }
});








/*=====================================================
Cozy & Immersive Experience
======================================================== */
// 1. تعريف مكتبة المؤثرات الصوتية المركزية
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

// دالة مساعدة لتشغيل أي صوت فوراً وإعادة ضبطه لو تكررت النقر سرياً
function playSound(audioObject) {
    audioObject.currentTime = 0; // إعادة الصوت للبداية حتى لو كان يعمل
    audioObject.play().catch(err => console.log("Audio play blocked until user interaction:", err));
}



// Start music on first click anywhere
document.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    if (music.paused) {
        music.volume = 0.3;
        music.play();
    }
}, { once: true }); // 'once' means this fires only on the first click