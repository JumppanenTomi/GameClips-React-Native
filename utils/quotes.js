const quotes = [
    "đŽ Gaming is not just a hobby, it's a way of life! đšī¸",
    "đž Level up your gaming skills and let the victories roll in! đ",
    "đšī¸ Play hard, have fun, and always remember to save your progress! đž",
    "đ¨âđģ Gaming isn't just about pushing buttons, it's about pushing yourself to be the best! đĒ",
    "đšī¸ In the world of gaming, the impossible becomes possible! đĨ",
    "đŽ Gaming is not a game, it's an adventure! đ",
    "đž Don't just play the game, become a legend! đ",
    "đšī¸ Life is too short to play boring games! đ",
    "đ¨âđģ A true gamer never gives up, they just press the restart button! đ",
    "đŽ Gaming is the ultimate stress reliever! đ§ââī¸",
    "đšī¸ The only limit to gaming is the one you set for yourself! đĨ",
    "đŽ Gaming isn't just a pastime, it's a community! đĨ",
    "đž The real adventure starts when the game begins! đ",
    "đšī¸ Gaming is not about winning or losing, it's about enjoying the journey! đ",
    "đ¨âđģ A true gamer knows that the greatest challenge is within themselves! đĒ",
    "đŽ The best way to predict the future is to create it through gaming! đ",
    "đž The game may be virtual, but the memories and friendships are real! đĨ",
    "đšī¸ Gaming is not a waste of time if you're having fun and learning something new! đ¤",
    "đ¨âđģ The beauty of gaming is that you can be whoever you want to be! đĻ¸ââī¸",
    "đŽ The greatest achievements in gaming are the ones that are earned through hard work and dedication! đ",
]

const getQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

export { quotes, getQuote }