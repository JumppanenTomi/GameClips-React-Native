const quotes = [
    "🎮 Gaming is not just a hobby, it's a way of life! 🕹️",
    "👾 Level up your gaming skills and let the victories roll in! 🎉",
    "🕹️ Play hard, have fun, and always remember to save your progress! 💾",
    "👨‍💻 Gaming isn't just about pushing buttons, it's about pushing yourself to be the best! 💪",
    "🕹️ In the world of gaming, the impossible becomes possible! 🔥",
    "🎮 Gaming is not a game, it's an adventure! 🌟",
    "👾 Don't just play the game, become a legend! 🏆",
    "🕹️ Life is too short to play boring games! 🚀",
    "👨‍💻 A true gamer never gives up, they just press the restart button! 🔁",
    "🎮 Gaming is the ultimate stress reliever! 🧘‍♀️",
    "🕹️ The only limit to gaming is the one you set for yourself! 🔥",
    "🎮 Gaming isn't just a pastime, it's a community! 👥",
    "👾 The real adventure starts when the game begins! 🌟",
    "🕹️ Gaming is not about winning or losing, it's about enjoying the journey! 🚀",
    "👨‍💻 A true gamer knows that the greatest challenge is within themselves! 💪",
    "🎮 The best way to predict the future is to create it through gaming! 🌅",
    "👾 The game may be virtual, but the memories and friendships are real! 👥",
    "🕹️ Gaming is not a waste of time if you're having fun and learning something new! 🤓",
    "👨‍💻 The beauty of gaming is that you can be whoever you want to be! 🦸‍♂️",
    "🎮 The greatest achievements in gaming are the ones that are earned through hard work and dedication! 🏆",
]

const getQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

export { quotes, getQuote }