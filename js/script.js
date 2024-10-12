const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet-quote");
const quoteManager = {
  author: "",
  quote: {},
  fetchQuote: async function () {
    const res = await fetch("https://stoic.tekloon.net/stoic-quote");
    const obj = await res.json();
    const { data } = obj;
    const { author, quote } = data;
    this.author = author;
    this.quote = quote;
  },
  showQuote: async function () {
    await this.fetchQuote();
    console.log(this.author);
    console.log(this.quote);
    quoteText.textContent = this.quote;
    quoteAuthor.textContent = this.author;
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
