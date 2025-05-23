// Select DOM elements
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Speak text aloud using Web Speech API
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

// Wish based on time
function wishMe() {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning BOSS...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon BOSS..");
    } else {
        speak("Good Evening SIR...");
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

// Setup Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Command Processor
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } 
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } 
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } 
    else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } 
    else if (message.includes("open gmail")) {
        window.open("https://mail.google.com", "_blank");
        speak("Opening Gmail...");
    } 
    else if (message.includes("play music")) {
        window.open("https://www.youtube.com/results?search_query=play+music", "_blank");
        speak("Playing music on YouTube...");
    } 
    else if (message.includes("news")) {
        window.open("https://news.google.com", "_blank");
        speak("Here is the latest news.");
    } 
    else if (message.includes("weather")) {
        window.open("https://www.google.com/search?q=weather", "_blank");
        speak("Here is the weather forecast.");
    } 
    else if (message.includes("play a game")) {
        window.open("https://poki.com", "_blank");
        speak("Opening Poki. Have fun playing!");
    }
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } 
    else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + query);
    } 
    else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    } 
    else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    } 
    else if (message.includes('day')) {
        const day = new Date().toLocaleDateString(undefined, { weekday: 'long' });
        speak("Today is " + day);
    }
    else if (message.includes('calculator')) {
        speak("Sorry, I can't open the calculator from the browser.");
    } 
    else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}
