document.addEventListener('DOMContentLoaded', function() {
    const easyTexts = [
		"The cat shat on the rug I paid for.",
        "Birds sing in the trees even when no one is listening.",
        "He plays with his toys, but the less said about that the better.", 
        "The sun is bright today and it's burning my eyes.",
        "Is Star Wars any goood? Asking for a friend.",
        "It did not rain in London today."
    ];

    const mediumTexts = [
        "Before calling a meeting, ask yourself if the issue can be resolved with an email instead.",
        "Reading books expands your vocabulary and imagination, but I find roleplaying much more fun.", 
        "I'm just reminding you that the washing up needs doing and your bath towel is on the floor.",
        "The poor dog still ran after the ball that you only pretended to throw.",
        "I'm terrible for apologising when someone else barges into me. It's probably because I'm British.",
        "Did you know that in New Zealand, they celebrate Christmas during the summer? Wild, right?"
    ];

    const hardTexts = [
    "The phenomenon of quantum entanglement challenges our conventional understanding of physics and locality; Einstein famously referred to it as spooky action at a distance.",
    "The philosophical implications of consciousness remain one of the most perplexing questions in neuroscience, challenging our understanding of subjective experience and self-awareness.",
    "She typed furiosly, annoyed that there was a typing error in the sample text that she still had to copy down perfectly to get a good WPM score.",
    "Anthropological studies suggest that early hominids didn't have to worry about typos, however they were statistically far more likely to be eaten by a bear.",
    "The meticulous orchestration of microservices requires a level of patience usually reserved for teachers, and people persevering with a typing test.",
    "The architectural integrity of a skyscraper is paramount, yet we build our entire digital economy on top of a single library maintained by one tired person in Nebraska.",
    "If you can type this entire sentence without looking at your fingers once, then I'm impressed. Let me know what you are having for your dinner tonight because I'm geninely curious."
];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const timeDisplay = document.getElementById('time');
    const userInput = document.getElementById('user-input');
    const levelDisplay = document.getElementById('level');
    const wpmDisplay = document.getElementById('wpm');
    const nextWordButton = document.getElementById('next-word-btn');
    const timerDisplay = document.getElementById('timer-display');
    const timerSpan = document.getElementById('timer');
    const performanceFeedback = document.getElementById('performance-feedback');

    let startTime;
    let endTime;
    let testStarted = false;
    let timerInterval;

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
        if (!testStarted) {
            console.log('Test not started');
            return;
        }
        
        console.log('stopTest called, showing button');
        endTime = new Date();
        clearInterval(timerInterval);
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const result = calculateWPM(timeTaken);
        
        displayResults(timeTaken, result);

        userInput.disabled = true;        
        nextWordButton.style.display = 'inline-block';
        console.log('Button display set to:', nextWordButton.style.display);
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
        
        const wpm = Math.round((correctWords / timeTaken) * 60);
        const accuracy = sampleWords.length > 0 ? Math.round((correctWords / sampleWords.length) * 100) : 0;
        
        return { wpm, accuracy };
    }

    function displayResults(timeTaken, result) {
        const wpm = result.wpm;
        const accuracy = result.accuracy;
        
        console.log('displayResults called with wpm:', wpm, 'accuracy:', accuracy);
        
        timeDisplay.textContent = timeTaken.toFixed(2);
        wpmDisplay.textContent = wpm;
        document.getElementById('accuracy').textContent = accuracy;
        const accuracyContainer = document.getElementById('accuracy-container');
        accuracyContainer.style.display = 'block';
        console.log('Accuracy container display set to:', accuracyContainer.style.display);
        const selectedDifficulty = difficultySelect.value;
        levelDisplay.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
        
        // Show performance feedback
        const feedbackElement = document.getElementById('performance-feedback');
        const feedbackText = document.getElementById('feedback-text');
        feedbackElement.style.display = 'block';
        
        if (wpm >= 70) {
            feedbackText.textContent = '🔥 Blimey that was somme shit hot fast typing! Well done!';
            feedbackText.style.color = '#28a745';
        } else if (wpm >= 40) {
            feedbackText.textContent = '✓ Nice job, that is a comfortable speed, keep practicing to see if you can do even better!';
            feedbackText.style.color = '#17a2b8';
        } else if (wpm >= 20) {
            feedbackText.textContent = '⚠ Speed comes with practice. Keep trying and I know you will improve!';
            feedbackText.style.color = '#ffc107';
        } else {
            feedbackText.textContent = '🐢 You took your time and that is a good way to learn. Keep going and your score will improve.';
            feedbackText.style.color = '#dc3545';
        }
    }

    function updateTypingFeedback() {

        if (!testStarted) {
            startTime = new Date();
            testStarted = true;
            timerDisplay.style.display = 'block';
            
            // Start the timer
            timerInterval = setInterval(function() {
                const elapsedTime = (new Date() - startTime) / 1000;
                timerSpan.textContent = elapsedTime.toFixed(2);
            }, 100);
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
        console.log('handleEnterKey triggered, key:', event.key, 'testStarted:', testStarted);
        if (event.key === 'Enter' && testStarted) {
            console.log('Stopping test');
            event.preventDefault();
            stopTest();
        }
    }

    function resetTest() {
        clearInterval(timerInterval);
        userInput.value = '';
        userInput.disabled = false;
        updateSampleText();
        timeDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        document.getElementById('accuracy-container').style.display = 'none';
        document.getElementById('accuracy').textContent = '0';
        timerDisplay.style.display = 'none';
        timerSpan.textContent = '0';
        performanceFeedback.style.display = 'none';
        testStarted = false;
        nextWordButton.style.display = 'none';
        userInput.focus();
    }

    difficultySelect.addEventListener('change', function() {
        if (!testStarted) {
            updateSampleText();
        }
    });
    userInput.addEventListener('input', updateTypingFeedback);
    userInput.addEventListener('keydown', handleEnterKey);
    nextWordButton.addEventListener('click', resetTest);

    // Prevent copying and pasting from sample text
    sampleTextDiv.addEventListener('copy', function(e) {
        e.preventDefault();
    });
    sampleTextDiv.addEventListener('paste', function(e) {
        e.preventDefault();
    });

    // Prevent pasting in the test input box
    userInput.addEventListener('paste', function(e) {
        e.preventDefault();
    });

    // Initialize with a random text from the default difficulty level
    updateSampleText();
    userInput.disabled = false;
    userInput.focus();

    // Dynamically set footer height to 1/3 of header height
    const headerEl = document.querySelector('header');
    const footerEl = document.getElementById('site-footer');
    function setFooterHeight() {
        if (!headerEl || !footerEl) return;
        const h = headerEl.offsetHeight;
        footerEl.style.minHeight = Math.round(h / 3) + 'px';
    }
    setFooterHeight();
    window.addEventListener('resize', setFooterHeight);
});