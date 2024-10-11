const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const quoteManager = {
  quotes: {},
  quoteNumber: 0,
  fetchQuotes: async function () {
    const res = await fetch("https://zenquotes.io/api/quotes");
    const data = await res.json();
    this.quotes = data;
  },
  refreshQuotes: async function () {
    if (!Object.keys(this.quotes).length || this.quoteNumber >= 50) {
      await this.fetchQuotes();
      console.log("obj refresh");
    }

    if (this.quoteNumber >= 50) {
      this.quoteNumber = 0;
    }
  },
  showQuote: async function () {
    await this.refreshQuotes();
    const quoteObj = this.quotes[this.quoteNumber];
    quoteText.textContent = quoteObj["q"];
    quoteAuthor.textContent = quoteObj["a"];
    this.quoteNumber += 1;
    console.log(this.quoteNumber);
  },
};
quoteManager.showQuote();

newQuoteBtn.addEventListener("click", () => {
  quoteManager.showQuote();
});
