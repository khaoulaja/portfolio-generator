const inquirer =require('inquirer'); 
const fs =require('fs');    
const generatePage = require('./src/page-template.js');

// //const profileDataArgs = process.argv.slice(2, process.argv.length)
// //const [name, github] = profileDataArgs;   

const promptUser = ()=>{
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?(Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your github username (Required)',
      validate: gitInput =>{
        if (gitInput){
          return true;
        } else{
          console.log("Please enter your github username!");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself',
      when: ({confirmAbout}) =>{
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
  
} ;

const promptProject = portfolioData => {
  
  if(!portfolioData.projects){
  portfolioData.projects =[];
}
 return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?(Required)',
      validate: (projectName) => {
        if (projectName) {
          return true;
        } else {
          console.log('Please enter the name of your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provid a description of your project (Required)',
      validate: (projectDesc) =>{
        if (projectDesc) {
          return true;
        } else {
          console.log('Please enter a description of your project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with?',
      choices: ['HTML','CSS','JS','ES6', 'JQuery']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter your github link to your project (required)',
      validate: (projectLink) =>{
        if (projectLink) {
          return true;
        } else {
          console.log('Please enter your github link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message :'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]).then(projectData => {
  portfolioData.projects.push(projectData);
  if(projectData.confirmAddProject) {
    return promptProject(portfolioData);
  }
  else{
    return portfolioData;
  }
});
}
promptUser()
.then(promptProject)
.then(portfolioData => {
  const pageHTML = generatePage(portfolioData);

fs.writeFile('index.html',pageHTML, err => {
  if(err) throw err;
  console.log('Portfolio complete! check out index.html to see the output!');
});
 
});









// console.log(profileDataArgs);

// const printProfileData = (profileDataArr) => {
//     for (let i = 0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]); 
//     }

//     console.log("=======================");
// profileDataArr.forEach((profileItem) =>{
//     console.log(profileItem);
// });
// }
// printProfileData(profileDataArgs);