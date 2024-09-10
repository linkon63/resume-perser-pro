// algorithms
// 0. start
// 1. read the file and get the exe where pdf or doc
// 2. parse the file according to the exe
// 3. parse the name from the resume
// 4. parse the email address from the resume
// 5. parse the work experience from the resume
// .......
// .......
// make a json format 
// return the json object
// end

const fs = require('node:fs');
const mammoth = require("mammoth");
// const { fetchGitHubData }  = require('./utils/fetchGitHubData');
// import * as fetchGitHubData from './utils/fetchGitHubData.js';
const fetchGitHubData = require('./utils/fetchGitHubData');


console.log("Starting resume parser ..")

function extractSocialMediaLinks(html) {
    const urlPattern = {
        github: /https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+/gi,
        linkedin: /https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/gi,
    };

    const githubMatches = html.match(urlPattern.github);
    const linkedinMatches = html.match(urlPattern.linkedin);

    return {
        github: githubMatches ? githubMatches[0] : 'GitHub not found',
        linkedin: linkedinMatches ? linkedinMatches[0] : 'LinkedIn not found',
    };
}

const extractTextFromDocx = async (filePath) => {
    try {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Resume parsed successfully! ...");
            mammoth.convertToHtml({ path: filePath })
                .then(function (result) {
                    const html = result.value; // The generated HTML
                    const messages = result.messages; // Any messages, such as warnings during conversion
                    console.log('generated html', html);
                    const socialLinks = extractSocialMediaLinks(html);
                    console.log('Extracted Social Links:', socialLinks);
                    
                    const fetchGitHub = fetchGitHubData(socialLinks.github)
                    console.log('Fetching GitHub data:', fetchGitHub);
                    })
                .catch(function (error) {
                    console.error(error);
                });
        });
    } catch (error) {
        console.log("Error from resume parser file reading: ", error)
    }
}

extractTextFromDocx('./Md Abdul Ahad Linkon Resume v-12 (1).docx');
