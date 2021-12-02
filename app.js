const inquirer =require('inquirer'); 
// const fs =require('fs');    
// const generatePage = require('./src/page-template.js');

// //const profileDataArgs = process.argv.slice(2, process.argv.length)
// //const [name, github] = profileDataArgs;   
// const pageHTML = generatePage(name, github);


// fs.writeFile('index.html',pageHTML, err => {
//   if(err) throw err;
//   console.log('Portfolio complete! check out index.html to see the output!');
//});
const promptUser = ()=>{
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter you github username'     
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself'
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
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provid a description of your project (Required)'
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
      message: 'Enter your github link to your project (required)'
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
  console.log(portfolioData);
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