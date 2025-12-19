document.addEventListener('DOMContentLoaded', function() {
    const easyTexts = [
		"The cat shat on the rug that you paid for.",
        "The dog ran after the ball that you only pretended to throw.",
        "Birds sing in the trees even when no one is listening.",
        "She likes to type away all day long.",
        "He plays with his toys, but the less said about that the better.", 
        "The sun is bright today and it's burning my eyes.", 
        "Children play outside so drive carefully.",
        "Verity is a Software Engineer lol."
    ];

    const mediumTexts = [
        "Before calling a meeting, ask yourself if the issue can be resolved with an email instead.",
        "Reading books expands your vocabulary and imagination, but I find roleplaying much more fun.", 
        "It didn't rain in London today, and it was hot topic amongst the locals.",
        "I have never watched Star Wars but I hear it's good.",
        "Coding is fun but you're typing right now so focus!"
    ];

    const hardTexts = [
    "The phenomenon of quantum entanglement challenges our conventional understanding of physics and locality; Einstein famously referred to it as spooky action at a distance.",
    "Artificial intelligence and machine learning algorithms are revolutionising industries by enabling computers to learn from data patterns and make autonomous decisions.",
    "The philosophical implications of consciousness remain one of the most perplexing questions in neuroscience, challenging our understanding of subjective experience and self-awareness.",
    "She typed furiously, annoyed that there was a typing error in the sample text that she had to copy down perfectly to get a good WPM score.",
    "The asynchronous nature of JavaScript's event loop often leads to a 'callback hell' that would make even the most seasoned developer weep.",
    "Sisyphus was happy, or so Camus claimed, but Camus never had to debug a legacy codebase written in COBOL by a developer who vanished in 1994.",
    "To be, or not to be, that is the question; whether 'tis nobler in the mind to suffer the slings and arrows of syntax errors or to just quit and open a bakery.",
    "Anthropological studies suggest that early hominids didn't have to worry about 'forgotten semicolons' or 'undefined is not a function,' but they were hunted by bears.",
    "Existential dread is the feeling you get when you realize your production environment has been down for three hours and your last backup was taken in 2019.",
    "The meticulous orchestration of microservices requires a level of patience usually reserved for saints, teachers, and people waiting for the typing test to finish.",
    "Metaphysical poets often explored the tension between the physical and spiritual, much like a developer explores the tension between 'it works on my machine' and reality.",
    "A recursive function that lacks a proper base case is the digital equivalent of a mid-life crisis: it goes on forever and eventually crashes the entire system.",
    "The architectural integrity of a skyscraper is paramount, yet we build our entire digital economy on top of a single library maintained by one tired person in Nebraska.",
    "If you can type this entire sentence without looking at your fingers once, then I'm impressed. Let me know what you are having for your dinner tonight."
];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const timeDisplay = document.getElementById('time');
    const userInput = document.getElementById('user-input');
    const levelDisplay = document.getElementById('level');
    const wpmDisplay = document.getElementById('wpm');
    const retryButton = document.getElementById('retry-btn');

    let startTime;
    let endTime;
    let testStarted = false;

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function updateSampleText() {
        let selectedDifficulty = difficultySelect.value;
        let selectedText;

        if (selectedDifficulty === 'easy') {
            selectedText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            selectedText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            selectedText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = selectedText;
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const wpm = calculateWPM(timeTaken);
        
        displayResults(timeTaken, wpm);

        userInput.disabled = true;        
        retryButton.disabled = false;
        testStarted = false;
    }

    function calculateWPM(timeTaken) {
        const sampleText = sampleTextDiv.textContent.trim();
        const userText = userInput.value.trim();
        const sampleWords = sampleText.split(" ");
        const userWords = userText.split(" ");
    
        let correctWords = 0;
        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }
    
        return Math.round((correctWords / timeTaken) * 60);
    }

    function displayResults(timeTaken, wpm) {
        timeDisplay.textContent = timeTaken.toFixed(2);
        wpmDisplay.textContent = wpm;
        const selectedDifficulty = difficultySelect.value;
        levelDisplay.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    }

    function updateTypingFeedback() {

        if (!testStarted) {
            startTime = new Date();
            testStarted = true;
            retryButton.disabled = true;
        }

        const sampleText = sampleTextDiv.textContent.trim();
        const userText = userInput.value.trim();
        const sampleWords = sampleText.split(" ");
        const userWords = userText.split(" ");
    
        let feedbackHTML = '';
    
        for (let i = 0; i < sampleWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                feedbackHTML += `<span class="correct">${sampleWords[i]}</span> `;
            } else if (userWords[i]) {
                feedbackHTML += `<span class="incorrect">${sampleWords[i]}</span> `;
            } else {
                feedbackHTML += `<span>${sampleWords[i]}</span> `;
            }
        }
    
        sampleTextDiv.innerHTML = feedbackHTML.trim();
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            stopTest();
        }
    }

    function resetTest() {
        userInput.value = '';
        userInput.disabled = false;
        updateSampleText();
        timeDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        testStarted = false;
        retryButton.disabled = true;
    }

    difficultySelect.addEventListener('change', updateSampleText);
    userInput.addEventListener('input', updateTypingFeedback);
    userInput.addEventListener('keydown', handleEnterKey);
    retryButton.addEventListener('click', resetTest);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});