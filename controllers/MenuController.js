const inquirer = require('inquirer');
const ContactController = require("./ContactController");

module.exports = class MenuController {
  constructor(){
    this.mainMenuQuestions = [
      {
       type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "View all contacts",
          "Get today's date",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();
  }

  main(){
    console.log(`Welcome to AddressBloc!`);
     inquirer.prompt(this.mainMenuQuestions).then((response) => {
       switch(response.mainMenuChoice){
         case "Add new contact":
           this.addContact();
           break;
         case "View all contacts":
           this.getContacts();
           break;
         case "Get today's date":
           this.getDate();
           break;
         case "Exit":
           this.exit();
         default:
           console.log("Invalid input");
           this.main();
       }
     })
     .catch((err) => {
       console.log(err);
     });
  }

  clear(){
    console.log("\x1Bc");
  }

  addContact(){
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
    });
  }

  getDate(){
    this.clear();
    var today = new Date();
    var time = "Date: " + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + " Time: " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(time);
    this.main();
  }

  getContactCount(){
    return this.contacts.length;
  }

  remindMe(){
    return "Learning is a life-long pursuit";
  }

  getContacts(){
    this.clear();
    this.book.getContacts().then((contacts) => {
      for (let contact of contacts) {
        console.log(`
        name: ${contact.name}
        phone number: ${contact.phone}
        email: ${Contact.email}
        ---------------`
        );
      }
      this.main();
    }).catch((err) => {
      console.log(err);
      this.main();
    });
  }

  exit(){
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }

}

