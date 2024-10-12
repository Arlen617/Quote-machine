const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet-quote");
const quoteManager = {
  author: "",
  quote: {},
  randomIndex: function () {
    return Math.floor(Math.random() * 30) + 1;
  },
  fetchQuote: async function () {
    const res = await fetch(
      `https://dummyjson.com/quotes/${this.randomIndex()}`
    );
    const data = await res.json();
    const { author, quote } = data;
    this.author = author;
    this.quote = quote;
  },
  showQuote: async function () {
    await this.fetchQuote();
    quoteAuthor.textContent = this.author;
    quoteText.textContent = this.quote;
  },
};

const tweet = {
  link: "https://twitter.com/intent/tweet?text=",
  makeTweet: function () {
    tweetBtn.href =
      this.link + quoteText.innerText + " " + quoteAuthor.innerText;
  },
};

quoteManager.showQuote();
tweet.makeTweet();

newQuoteBtn.addEventListener("click", () => {
  quoteManager.showQuote();
  tweet.makeTweet();
});
