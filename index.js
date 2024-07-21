// Filesystem module
const fs = require('fs');
// Inquirer module
const inq = require('inquirer');
// Globals
var licenseData;
const licenseChoices = ['Apache License 2.0', 'GNU General Public License 3.0', 'MIT License'];

const filePath = './output/README.md';
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
        message: 'Please enter your alias.'
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
        message: 'Please enter a Description for your project.'
    },
    {
        type: 'editor',
        name: 'projectInstall',
        message: 'Please enter Installation Instructions for your project.'
    },
    {
        type: 'editor',
        name: 'projectUsage',
        message: 'Please enter Usage Information for your project.'
    },
    {
        type: 'editor',
        name: 'projectContri',
        message: 'Please enter Contribution Guidelines for your project.'
    },
    {
        type: 'editor',
        name: 'projectTestInfo',
        message: 'Please enter Test Instructions for your project.'
    },
    {
        type: 'list',
        name: 'selectedLicense',
        message: 'Select the license for your project.',
        choices: licenseChoices
    }
];

inq
    .prompt(questions) // Any information not provided is ommitted.
    .then((data) => {
        const selectedLicenseData = licenseData[licenseChoices.indexOf(data.selectedLicense)];
        var readmeString = 
            '# ' + data.projectTitle + '\n' +
            selectedLicenseData.badge + '\n';
        
        console.log(data.projectDesc);
        if (data.projectDesc) { // If Project Description is provided. Concatenate.
            readmeString = readmeString.concat('## Description\n' + data.projectDesc + '\n')
        }

        // Table of Contents logic. Any information not provided is ommitted.
        readmeString = readmeString.concat('## Table of Contents\n')
        fs.writeFile(filePath, readmeString, (err) => 
            err ? console.log(err) : console.log('Success!')
        );
    });