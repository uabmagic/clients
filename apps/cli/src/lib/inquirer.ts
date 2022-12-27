import * as inquirer from "inquirer";

export class Inquirer {
  static askUABCredentials() {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your UAB username:',
        validate: function (value: any) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value: any) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];

    return inquirer.prompt(questions);
  }
}
