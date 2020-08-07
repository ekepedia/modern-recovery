const _ = require("lodash");

let Parser = require('rss-parser');
let parser = new Parser();

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var natural = require('natural');

var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
var tokenizer = new natural.WordTokenizer();
const analyzer = new Analyzer("English", stemmer, "afinn");

function getRSSData({state, offset, limit}) {

    state = state ? state.toLowerCase() : "";

    return new Promise(async (resolve) => {
        let feed = await parser.parseURL(`https://news.google.com/rss/search?q=coronavirus+${state}&hl=en-US&gl=US&ceid=US:en`);

        let objects = feed.items.map(item => {

            const lowerTitle = item.title.toLowerCase();

            const publisher = item.title.substr(item.title.lastIndexOf('-') + 1).trim();
            const title = item.title.replace(`- ${publisher}`, "").trim();
            const date = new Date(item.pubDate);
            const link = item.link;

            if (title.toLowerCase().indexOf(state) === -1)
                return null;

            const result = sentiment.analyze(item.title);
            const sent_s = result.score;

            const titles = tokenizer.tokenize(item.title);
            const sent_n = analyzer.getSentiment(titles);

            // console.log(title);
            // console.log(publisher);
            // console.log(date);
            // console.log(link);
            // console.log("Sent S Score:", sent_s);
            // console.log("Sent N Score:", sent_n);

            return {
                title,
                publisher,
                date: date.getTime(),
                link,
                sent_s,
                sent_n
            };
        });

        objects = _.without(objects, null);
        objects = objects.sort((a,b) => (b.date - a.date));

        if (offset)  {
            objects = objects.slice(offset);
        }

        if (limit)
            objects = objects.slice(0, limit);

        resolve(objects);
    });

}

module.exports.getRSSData = getRSSData;