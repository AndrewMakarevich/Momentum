function setQuotesData(text, author) {


    if (!author) {
        author = "Unknown author";
    }
    document.querySelector('.quotes .quotes-text').innerText = text;
    document.querySelector('.quotes .quotes-author').innerText = author;
}

async function getQuotes() {
    try {
        const resetQuoteBtn = document.querySelector('.rechange-quote-btn');
        resetQuoteBtn.onclick = () => {
            getQuotes();
        }
        const host = axios.create();
        const { data } = await host.get('https://type.fit/api/quotes');
        function getRandomNumber(min, max) {
            return Math.random() * (max - min) + min;
        }
        const randomNumber = Math.floor(getRandomNumber(0, data.length));

        return setQuotesData(data[randomNumber].text, data[randomNumber].author);
    } catch (e) {
        alert(e.message);
    }
}
getQuotes();