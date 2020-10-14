const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "discription",
            message: "What is your project about?"
        },
        {
            type: "input",
            name: "installation",
            message: "How do you install your project?"
        },
        {
            type: "input",
            name: "usage",
            message: "How do you use such a contraption?"
        },
        {
            type: "input",
            name: "contribution",
            message: "Who is the rebel scum that helped you work on this?"
        },
        {
            type: "input",
            name: "test",
            message: "what are the test instructions?"
        },
        {
            type: "checkbox",
            name: "license",
            message: "Please choose a license so that your ass doesn't get sued",
            choices: [
                "Apache%202.0",
                "License-MIT",
                "The-Unlicense",
                "wtfpl"
            ],
        },
        {
            type: "input",
            name: "username",
            message: "Enter your gitHub username"
        },
        {
            type: "input",
            name: "credit",
            message: "Who made this?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
    ])
}

function generateMarkdown(response) {
    return `
    # ${response.title}
    
    # Table of Contents
    
    -[Description]
    -[Installation]
    -[Usage]
    -[Contributing Party's]
    -[Test]
    -[License]
    
    ## Description:
    ![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")
    
        ${response.discription}
    ## Installation:
        ${response.installation}
    ## Usage:
        ${response.usage}
    ## Contributing Party's
        ${response.contribution}
    ## Test:
        ${response.test}
    ##  Credits:
        ${response.credit}
    ##License:
        For more information about the Licensem click the link below! or not, I can't force you to do anything.
        
    - [License](https://opensource.org/licenses/${response.license})
    
    ##Questions:
        For my weekly dose of "how does this shit work??" please follow the link to my gitHub:
        
    - [gitHub Profile](https://github.com/${response.username})
    
    For additional questions outside of any of the above, please email me @: ${response.email}`
}

async function init() {
    try {
        const response = await promptUser();

        const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("congrats yeh fuckin' muppet, yeh did it")
    } catch (err) {
        console.log("hehe err go brrrrrrrr")
    }
}

init();