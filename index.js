const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { makeBadge, ValidationError } = require('badge-maker')

const writeFileAsync = util.promisify(fs.writeFile);



const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your GitHub username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
    },
    {
      type: 'input',
      name: 'title',
      message: 'What is the reposition titled?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please write a short description of your project.',
    },
    {
      type: 'list',
      name: 'license',
      message: 'What kind of license should your project have?',
      choices: ['MIT License', 'The Unilicense', 'Apache License 2.0', 'Mozilla Public License 2.0', 'Creative Commons Zero v1.0 Universal', 'GNU General Public Licesne', 'Boost Software License 1.0', 'Eclipse Public License v2.0'],
    },
    {
        type: 'list',
        name: 'installation',
        message: 'What command should be run to install dependencies? Use default if unsure.',
        choices: ['npm i'],
      },
      {
        type: 'list',
        name: 'tests',
        message: 'What command should be run to run tests? Use default if unsure.',
        choices: ['npm test'],
      },
      {
        type: 'input',
        name: 'usage',
        message: 'What does the user need to know about using the repo?',
      },
      {
        type: 'input',
        name: 'contributions',
        message: 'What does the user need to know about contributing to the repo?',
      },
  ]);

const generateREADME = (answers) =>
  `![GitHub License](https://img.shields.io/github/license/${answers.username}/${answers.title})

  # ${answers.title}

  ${answers.description}

  # Table of Contents
  [License](https://github.com/${answers.username}/${answers.title}?tab=readme-ov-file#license)

  [Installation](https://github.com/${answers.username}/${answers.title}?tab=readme-ov-file#installation)

  [Usage](https://github.com/${answers.username}/${answers.title}?tab=readme-ov-file#usage)

  [Contributions](https://github.com/${answers.username}/${answers.title}?tab=readme-ov-file#contributions)

  [Tests](https://github.com/${answers.username}/${answers.title}?tab=readme-ov-file#tests)

  [Questions](https://github.com/${answers.username}/${answers.title}?tab=readme-ov-file#questions)

  
  # License

  ${answers.license}

  # Installation

  To install the dependencies needed in your coding software in order to use this generator, simply type ${answers.installation} into your terminal and press enter.

  # Tests

  To test if the packages are working, type ${answers.tests} into your terminal and press enter.

  # Usage

  ${answers.usage}

  # Contributions

  ${answers.contributions}


  # Questions

  If you have any questions about this project, feel free to reach me via github:
  
  ${answers.username} (https://github.com/${answers.username}/)

  Alternatively, you can send me a message via email:

  ${answers.email}
  
  `;

promptUser()
  .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
  .then(() => console.log('Successfully wrote README.md'))
  .catch((err) => console.error(err));


