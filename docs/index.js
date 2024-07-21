// Imports
//
// Filesystem module
const fs = require('fs');
// Inquirer module
const inq = require('inquirer');
// DayJS module (looks nice :))
const dayjs = require('dayjs');

// Globals
//
var licenseData;
const licenseChoices = ['Apache License 2.0', 'GNU General Public License 3.0', 'MIT License'];
const filePath = './out/README.md';

// Program
//
// Read license data
fs.readFile('license-data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error retrieving licenses:', err)
        return;
    };
    licenseData = JSON.parse(data);
    // console.log('License data:', licenseData); // DEBUG LINE
});

// Questions
const questions = [
    {
        type: 'input',
        name: 'authorName',
        message: 'Please enter your full name.'
    },
    {
        type: 'input',
        name: 'authorUsername',
        message: 'Please enter your Github username. (optional)'
    },
    {
        type: 'input',
        name: 'authorEmail',
        message: 'Please enter your email.'
    },
    {
        type: 'input',
        name: 'projectTitle',
        message: 'Please enter a Title for your project.'
    },
    {
        type: 'editor',
        name: 'projectDesc',
        message: 'Please enter a Description for your project. (optional)'
    },
    {
        type: 'editor',
        name: 'projectInstall',
        message: 'Please enter Installation Instructions for your project. (optional)'
    },
    {
        type: 'editor',
        name: 'projectUsage',
        message: 'Please enter Usage Information for your project. (optional)'
    },
    {
        type: 'editor',
        name: 'projectContri',
        message: 'Please enter Contribution Guidelines for your project. (optional)'
    },
    {
        type: 'editor',
        name: 'projectTestInfo',
        message: 'Please enter Test Instructions for your project. (optional)'
    },
    {
        type: 'list',
        name: 'selectedLicense',
        message: 'Select the license for your project.',
        choices: licenseChoices
    }
];

// Inquiry
inq
    .prompt(questions) // Any information not provided is ommitted.
    .then((answers) => {
        const { authorName, authorUsername, authorEmail, projectTitle, projectDesc, projectInstall, projectUsage, projectContri, projectTestInfo, selectedLicense } = answers;
        const selectedLicenseData = licenseData[licenseChoices.indexOf(selectedLicense)];
        
        // Project Title
        //
        // Create readmeString and append Title and selected license badge to the start of the string.
        var readmeString = 
            '# ' + projectTitle + '\n' +
            selectedLicenseData.badge + '\n';

        // Description
        //
        // If Project Description is provided; Concatenate.
        if (projectDesc) { 
            readmeString = readmeString.concat('## Description\n' + projectDesc + '\n');
        };

        // Table of Contents 
        //
        // Any information not provided is ommitted.
        readmeString = readmeString.concat('## Table of Contents\n');
        // TOC - Description
        if (projectDesc) {
            readmeString = readmeString.concat('- **<a href="#description" style="text-decoration: none; color: inherit;">Description</a>**\n');
        };
        // TOC - Table of Contents
        readmeString = readmeString.concat('- **Table of Contents**\n');
        // TOC - Installation Instructions
        if (projectInstall) {
            readmeString = readmeString.concat('- **<a href="#installation-instructions" style="text-decoration: none; color: inherit;">Installation</a>**\n');
        };
        // TOC - Usage
        if (projectUsage) {
            readmeString = readmeString.concat('- **<a href="#usage-guidelines" style="text-decoration: none; color: inherit;">Usage Guidelines</a>**\n');
        };
        // TOC - Contribution
        if (projectContri) {
            readmeString = readmeString.concat('- **<a href="#contribution-guidelines" style="text-decoration: none; color: inherit;">Contribution Guidelines</a>**\n');
        };
        // TOC - Testing
        if (projectTestInfo) {
            readmeString = readmeString.concat('- **<a href="#testing-information" style="text-decoration: none; color: inherit;">Testing Information</a>**\n');
        };
        // TOC - License
        readmeString = readmeString.concat('- **<a href="#license" style="text-decoration: none; color: inherit;">License</a>**\n');
        // TOC - Questions
        readmeString = readmeString.concat('- **<a href="#questions" style="text-decoration: none; color: inherit;">Questions</a>**\n');

        // Installation Instructions
        //
        if (projectInstall) { 
            readmeString = readmeString.concat('## Installation Instructions\n' + projectInstall + '\n');
        };

        // Usage Guidelines
        //
        if (projectUsage) { 
            readmeString = readmeString.concat('## Usage Guidelines\n' + projectUsage + '\n');
        };

        // Contribution Guidelines
        //
        if (projectContri) { 
            readmeString = readmeString.concat('## Contribution Guidelines\n' + projectContri + '\n');
        };

        // Testing Guidelines
        //
        if (projectTestInfo) { 
            readmeString = readmeString.concat('## Testing Information\n' + projectTestInfo + '\n');
        };

        // License
        //
        const copyrightStatement = 'Copyright (c) ' + dayjs().format('YYYY') + ' ' + authorName + '\n\n';
        readmeString = readmeString.concat('## License\n' + copyrightStatement + selectedLicenseData.notice + '\n');

        // Questions
        //
        readmeString = readmeString.concat('## Questions\n**Any Questions?**\n\nSend an email to **' + authorName + '** at **' + authorEmail + '**');

        if (authorUsername) {
            readmeString = readmeString.concat(' or check out their Github at <a href="www.github.com/' + authorUsername + '">Github ' + authorUsername + '</a>');
        }

        readmeString = readmeString.concat('.\n\nLast Modified: ' + dayjs().format('DD/MM/YYYY'));
        
        // Create the README.md file using the processed string.
        fs.writeFile(filePath, readmeString, (err) => 
            err ? console.log(err) : console.log('Output Successful!')
        );
    });