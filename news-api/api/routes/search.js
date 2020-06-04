const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

function parseNYTimes(articles, myJson) {
    const results = myJson.response.docs;
    for (let result of results) {
        const title = result.headline.main;
        const date = result.pub_date.substring(0, 10);
        const section = result.news_desk;
        if (section === '') {
            continue;
        }
        let image = '';
        if (result.multimedia != null) {
            for (let i = 0; i < result.multimedia.length; i++) {
                if (result.multimedia[i].width >= 2000) {
                    image = result.multimedia[i].url;
                    break;
                }
            }
        }
        if (image === '') {
            image = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        }
        if (!image.startsWith('https://')) {
            image = 'https://nyt.com/' + image;
        }
        const id = result.web_url;
        const url = result.web_url;

        articles.push({
            title: title,
            date: date,
            section: section,
            image: image,
            id: id,
            url: url,
            source: 'NYTimes'
        });
    }
    return articles;
}

function parseGuardian(articles, myJson) {
    const results = myJson.response.results;
    for (let result of results) {
        const title = result.webTitle;
        const date = result.webPublicationDate.substring(0, 10);
        const section = result.sectionId;
        if (section === '') {
            continue;
        }
        let image = '';
        if (result.blocks && result.blocks.main && result.blocks.main.elements && result.blocks.main.elements[0] && result.blocks.main.elements[0].assets && result.blocks.main.elements[0].assets.length > 0) {
            const index = result.blocks.main.elements[0].assets.length - 1;
            if (result.blocks.main.elements[0].assets[index] && result.blocks.main.elements[0].assets[index].file) {
                image = result.blocks.main.elements[0].assets[index].file;
            }
        }
        if (image === '') {
            image = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
        }
        const id = result.id;
        const url = result.webUrl;

        articles.push({
            title: title,
            date: date,
            section: section,
            image: image,
            id: id,
            url: url,
            source: 'Guardian'
        });
    }
    return articles;
}

router.get('/', (req, res, next) => {
    const query = req.query.query;
    let articles = [];

    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&api-key=nZqDoCaCb2ZL9YAjJr7HgkIqHMzdF7LZ')
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            parseNYTimes(articles, myJson);
        })
        .then(
            fetch('https://content.guardianapis.com/search?q=' + query + '&api-key=e635f283-c7d0-4762-bf39-c713fa65f063&show-blocks=all')
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    parseGuardian(articles, myJson);
                })
        )
        .then(() => {
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json({ 'articles': articles });
        }

        );

})

module.exports = router;