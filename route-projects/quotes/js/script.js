var quoteHolder = document.getElementById("quote");
var authorHolder = document.getElementById("author");
var prevIndex = 0;
var quotes = [
    { quote: "\"Be yourself; everyone else is already taken.\"", author: "― Oscar Wilde" },
    { quote: "\"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\"", author: "― Albert Einstein" },
    { quote: "\"So many books, so little time.\"", author: "― Frank Zappa" },
    { quote: "\"A room without books is like a body without a soul.", author: "― Marcus Tullius Cicero" },
    { quote: "\"You know you're in love when you can't fall asleep because reality is finally better than your dreams.\"", author: "― Dr. Seuss" },
    { quote: "\"You only live once, but if you do it right, once is enough.\"", author: "― Mae West" },
    { quote: "\"Be the change that you wish to see in the world.\"", author: "― Mahatma Gandhi" },
    { quote: "\"In three words I can sum up everything I've learned about life: it goes on.\"", author: "― Robert Frost" },
    { quote: "\"Don’t walk in front of me… I may not follow. Don’t walk behind me… I may not lead. Walk beside me… just be my friend\"", author: "― Albert Camus" },
    { quote: "\"I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.\"", author: "― Maya Angelou" },
    { quote: "\"A friend is someone who knows all about you and still loves you.\"", author: "― Elbert Hubbard" },
    { quote: "\"Live as if you were to die tomorrow. Learn as if you were to live forever.\"", author: "― Mahatma Gandhi" },
    { quote: "\"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.\"", author: "― Ralph Waldo Emerson" }
]

function getRndInteger(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function displayQuote()
{
    do {
        var index = getRndInteger(0, quotes.length);
    } while (index == prevIndex);
    prevIndex = index;
    quoteHolder.innerHTML = quotes[index].quote;
    authorHolder.innerHTML = quotes[index].author;
    // Get the height of the document
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );

    // Scroll to the bottom of the page
    window.scrollTo({
        top: documentHeight,
        behavior: 'smooth' // You can also set this to 'auto' for instant scrolling
    });
}