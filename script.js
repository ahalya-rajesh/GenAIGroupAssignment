const userEntry = document.getElementById('userEntry');
const submitButton = document.getElementById('submitEntry');
const responseArea = document.getElementById('response-area');
let conversationHistory = [];

const responses = {
    reflective: {
        stuck: ["Sometimes, stillness is a chance to gather yourself.", "Perhaps this pause is a moment for reflection."],
        happy: ["The gentle warmth of joy, a precious thing.", "Savor the quiet joy within."],
        default: ["What thoughts are stirring within you?", "Let your mind wander, what do you discover?"],
    },
    poetic: {
        stuck: ["The river of your spirit, momentarily still.", "A pause in the dance of your soul."],
        happy: ["A sunbeam caught in the heart's quiet garden.", "A whisper of joy, a delicate bloom."],
        default: ["The echoes of your heart, what stories do they tell?", "Let your words paint the canvas of your soul."],
    },
    affirming: {
        stuck: ["You are stronger than you realize.", "You have the strength to navigate this."],
        happy: ["You deserve this happiness.", "Your joy is a beautiful light."],
        default: ["Your words hold power.", "You are heard and understood."],
    },
};

function getRandomVoiceMode() {
    const modes = Object.keys(responses);
    return modes[Math.floor(Math.random() * modes.length)];
}

function getResponse(text) {
    text = text.toLowerCase();
    const voiceMode = getRandomVoiceMode();
    const modeResponses = responses[voiceMode];
    for (const keyword in modeResponses) {
        if (text.includes(keyword)) {
            return modeResponses[keyword][Math.floor(Math.random() * modeResponses[keyword].length)];
        }
    }
    return modeResponses.default[Math.floor(Math.random() * modeResponses.default.length)];
}

function displayResponse(text) {
    const responseDiv = document.createElement('div');
    responseDiv.textContent = text;
    responseArea.appendChild(responseDiv);
}

submitButton.addEventListener('click', () => {
    const entry = userEntry.value;
    displayResponse(`You: ${entry}`);
    conversationHistory.push({ user: entry });
    const response = getResponse(entry);
    displayResponse(`Yours Truly: ${response}`);
    conversationHistory.push({ response: response });
    userEntry.value = ''; // Clear input
});