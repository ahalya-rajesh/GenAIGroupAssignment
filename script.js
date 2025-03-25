const userEntry = document.getElementById('userEntry');
const submitButton = document.getElementById('submitEntry');
const responseArea = document.getElementById('response-area');
let conversationHistory = [];

const responses = {
    reflective: {
        stuck: [
            "You know, sometimes, stillness isn't being stuck, right? It's like... a chance to just breathe. What physical sensations accompany this feeling?",
            "Feeling stuck, huh? Well, maybe it's a pause, not a full stop. Is there another way to look at this situation?",
        ],
        happy: [
            "That's wonderful! Hold on to that feeling, it's a gift. What's making you happy today? Let's savor that moment.",
            "What do you need right now to keep this feeling going?"
        ],
        default: [
            "What thoughts are stirring within you? When did you first notice this feeling arise?",
            "Let your mind wander, what do you discover? What would you tell a friend who was experiencing this?"
        ]
    },
    poetic: {
        stuck: [
            "The river of your spirit, momentarily still.",
            "A pause in the dance of your soul."
        ],
        happy: [
            "A sunbeam caught in the heart's quiet garden.",
            "A whisper of joy, a delicate bloom."
        ],
        default: [
            "The echoes of your heart, what stories do they tell?",
            "Let your words paint the canvas of your soul."
        ]
    },
    affirming: {
        stuck: [
            "You are stronger than you realize.",
            "You have the strength to navigate this."
        ],
        happy: [
            "You deserve this happiness.",
            "Your joy is a beautiful light."
        ],
        default: [
            "Your words hold power.",
            "You are heard and understood."
        ]
    },
    empathy: {
        stuck: [
            "That sounds really tough, I understand. What do you need to hear right now?",
            "It's completely valid to feel that way. What kind of person do you want to be in this moment?"
        ],
        default: [
            "I'm here to listen, tell me more. What do you need right now?",
            "What can I do to support you right now? Is there another way to look at this situation?"
        ]
    },
    mindfulness: {
        default: [
            "Take a moment to notice your breath. What do you feel in your body right now?",
            "What sensations are you noticing in this moment?"
        ]
    },
    patterns: {
        default: [
            "I've noticed you mention feeling stuck quite often. Is there a common thread there? Does this situation remind you of anything else in your life?",
            "Do you see any patterns in your thoughts or feelings? What have you learned from similar situations in the past?"
        ]
    }
};

function getRandomVoiceMode() {
    const modes = Object.keys(responses);
    return modes[Math.floor(Math.random() * modes.length)];
}

function analyzeText(text) {
    text = text.toLowerCase();
    let keywords = [];
    let sentiment = "neutral";
    let topics = [];

    // Simple keyword extraction
    const emotionKeywords = {
        positive: ["happy", "joyful", "excited"],
        negative: ["sad", "angry", "anxious"]
    };

    for (const emotion in emotionKeywords) {
        emotionKeywords[emotion].forEach(word => {
            if (text.includes(word)) {
                keywords.push(word);
                sentiment = emotion;
            }
        });
    }

    // Simple topic modeling simulation
    const topicKeywords = {
        work: ["job", "career", "office"],
        relationships: ["friend", "family", "partner"]
    };

    for (const topic in topicKeywords) {
        topicKeywords[topic].forEach(word => {
            if (text.includes(word)) {
                topics.push(topic);
            }
        });
    }

    return { keywords, sentiment, topics };
}

function getResponse(text) {
    const analysis = analyzeText(text);

    if (analysis.sentiment === "negative") {
        return "It sounds like you're feeling " + analysis.sentiment + ". Tell me more about that.";
    } else if (analysis.topics.includes("work")) {
        return "How's work been affecting you lately?";
    } else {
        const voiceMode = getRandomVoiceMode();
        const modeResponses = responses[voiceMode];
        for (const keyword in modeResponses) {
            if (text.includes(keyword)) {
                return modeResponses[keyword][Math.floor(Math.random() * modeResponses[keyword].length)];
            }
        }
        const allResponses = Object.values(responses).flatMap(mode => Object.values(mode).flat());
        return allResponses[Math.floor(Math.random() * allResponses.length)];
    }
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
    userEntry.value = '';
});
