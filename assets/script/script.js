document.addEventListener('DOMContentLoaded', function() {
    const easyTexts = [
		"The cat sat on the mat. The dog ran in the park. Birds sing in the trees.",
        "She likes to read books. He plays with his toys. They go to school every day.",
        "The sun is bright today. We can see the blue sky. Children play outside happily."
    ];

    const mediumTexts = [
        "Learning to type quickly takes practice and patience. Regular exercises help improve your speed and accuracy over time.",
        "Technology has transformed the way we communicate and work. Digital skills are essential in the modern workplace.",
        "Reading books expands your vocabulary and imagination. Good literature can transport you to different worlds and perspectives."
    ];

    const hardTexts = [
        "The phenomenon of quantum entanglement challenges our conventional understanding of physics and locality. Einstein famously referred to it as spooky action at a distance.",
        "Artificial intelligence and machine learning algorithms are revolutionising industries by enabling computers to learn from data patterns and make autonomous decisions.",
        "The philosophical implications of consciousness remain one of the most perplexing questions in neuroscience, challenging our understanding of subjective experience and self-awareness."
 ];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');

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

    difficultySelect.addEventListener('change', updateSampleText);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});