const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

function parseNYTimes(myJson) {
    const result = myJson.response.docs[0];

    const title = result.headline.main;
    const description = result.abstract;
    const date = result.pub_date.substring(0, 10);
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
    const url = result.web_url;
    const section = result.news_desk;

    const article = {
        title: title,
        description: description,
        date: date,
        image: image,
        url: url,
        source: 'NYTimes',
        section: section
    };
    return article;
}

function parseGuardian(myJson) {
    const result = myJson.response.content;

    const title = result.webTitle;
    let description = ''
    if (result.blocks && result.blocks.body && result.blocks.body[0]) {
        description = result.blocks.body[0].bodyTextSummary;
    }
    const date = result.webPublicationDate.substring(0, 10);
    let image = '';
    if (result.blocks && result.blocks.main && result.blocks.main.elements && result.blocks.main.elements[0] && result.blocks.main.elements[0].assets && result.blocks.main.elements[0].assets.length > 0) {
        const index = result.blocks.main.elements[0].assets.length - 1;
        image = result.blocks.main.elements[0].assets[index].file;
    } else {
        image = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
    }
    const url = result.webUrl;
    const section = result.sectionId;

    const article = {
        title: title,
        description: description,
        date: date,
        image: image,
        url: url,
        source: 'Guardian',
        section: section
    };

    return article;
}

router.get('/:source/', (req, res, next) => {
    const source = req.params.source;
    const id = req.query.id;

    if (source === 'NYTimes') {
        fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + id + '")&api-key=nZqDoCaCb2ZL9YAjJr7HgkIqHMzdF7LZ')
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                return parseNYTimes(myJson);
            })
            .then(article => {
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).json({ 'article': article });
            });
    } else {
        fetch('https://content.guardianapis.com/' + id + '?api-key=e635f283-c7d0-4762-bf39-c713fa65f063&show-blocks=all')
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                return parseGuardian(myJson);
            })
            .then(article => {
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).json({ 'article': article });
            });

    }
})

module.exports = router;