const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

function parseNYTimes(myJson) {
    let articles = [];
    const results = myJson.results;
    for (let result of results) {
        const title = result.title;
        const description = result.abstract;
        const date = result.published_date.substring(0, 10);
        const section = result.section;
        let image = '';
        if (result.multimedia != null) {
            for (let i = 0; i < result.multimedia.length; i++) {
                if (result.multimedia[i].width >= 2000) {
                    image = result.multimedia[i].url;
                    break;
                }
            }
        }
        if (image === ''){
            image = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        }
        const id = result.url;
        const url = result.url;

        articles.push({
            title: title,
            description: description,
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

function parseGuardian(myJson) {
    let articles = [];
    const results = myJson.response.results;
    for (let result of results) {
        const title = result.webTitle;
        let description = ''
        if (result.blocks && result.blocks.body && result.blocks.body[0]) {
            description = result.blocks.body[0].bodyTextSummary;
        }
        const date = result.webPublicationDate.substring(0, 10);
        const section = result.sectionId;
        let image = '';
        if (result.blocks && result.blocks.main && result.blocks.main.elements && result.blocks.main.elements[0] && result.blocks.main.elements[0].assets && result.blocks.main.elements[0].assets.length > 0) {
            const index = result.blocks.main.elements[0].assets.length - 1;
            if (result.blocks.main.elements[0].assets[index] && result.blocks.main.elements[0].assets[index].file) {
                image = result.blocks.main.elements[0].assets[index].file;
            }
        }
        if (image === ''){
            image = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
        }
        const id = result.id;
        const url = result.webUrl;

        articles.push({
            title: title,
            description: description,
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

router.get('/:source/:section', (req, res, next) => {
    const source = req.params.source;
    let section = req.params.section;
    if (source === 'Guardian' && section === 'sports'){
        section = 'sport'
    }

    if (source === 'NYTimes') {
        if (section === 'Home' || section === 'home') {
            fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=nZqDoCaCb2ZL9YAjJr7HgkIqHMzdF7LZ')
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    return parseNYTimes(myJson);
                })
                .then(articles => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(200).json({'articles': articles});
                });
        } else {
            fetch('https://api.nytimes.com/svc/topstories/v2/' + section.toLowerCase() + '.json?api-key=nZqDoCaCb2ZL9YAjJr7HgkIqHMzdF7LZ')
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    return parseNYTimes(myJson);
                })
                .then(articles => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(200).json({articles: articles});
                })
        }
    } else {
        if (section === 'Home' || section === 'home') {
            fetch('https://content.guardianapis.com/search?api-key=e635f283-c7d0-4762-bf39-c713fa65f063&section=(sport|business|technology|politics)&show-blocks=all')
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    return parseGuardian(myJson);
                })
                .then(articles =>{
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(200).json({'articles': articles});
                });
        } else {
            fetch('https://content.guardianapis.com/' + section.toLowerCase() + '?api-key=e635f283-c7d0-4762-bf39-c713fa65f063&show-blocks=all')
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    return parseGuardian(myJson);
                })
                .then(articles =>{
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(200).json({'articles': articles});
                });
        }
    }    
})

module.exports = router;