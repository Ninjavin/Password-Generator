#!/usr/bin/env node
// const inquirer = require("inquirer");
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

const UPPER_LETTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_LETTER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "1234567890";
const SPECIAL_CHARACTERS = "!@#$%^&*(){}-_[].,";

const generateChars = (upper, lower, digit, symbols) => {
  let chars = "";
  if (upper) chars += UPPER_LETTER;
  if (lower) chars += LOWER_LETTER;
  if (digit) chars += DIGITS;
  if (symbols) chars += SPECIAL_CHARACTERS;
  return chars;
};

const questions = [
  {
    type: "input",
    name: "password_length",
    message: chalk.blue(
      "What is the length of password you would like to generate?"
    ),
  },
  {
    type: "input",
    name: "use_upper",
    message: chalk.blue(
      "Do you want to use Upper case alphabets in the password? (yes/no)"
    ),
  },
  {
    type: "input",
    name: "use_lower",
    message: chalk.blue(
      "Do you want to use Lower case alphabets in the password? (yes/no)"
    ),
  },
  {
    type: "input",
    name: "use_digits",
    message: chalk.blue(
      "Do you want to use digits (0-9) in the password? (yes/no)"
    ),
  },
  {
    type: "input",
    name: "use_special_characters",
    message: chalk.blue(
      "Do you want to use special characters in the password? (yes/no)"
    ),
  },
];

const generatePassword = (len, ch) => {
  let pass = "";
  for (let i = 1; i <= len; i++) {
    pass += ch.charAt(Math.floor(Math.random() * ch.length));
  }
  return pass;
};

figlet("Password Generator!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);

  inquirer.prompt(questions).then((answers) => {
    let useUpperLetters = false,
      useLowerLetters = false,
      useDigits = false,
      useSpecialCharacters = false;
    if (answers.use_upper == "yes") useUpperLetters = true;
    if (answers.use_lower == "yes") useLowerLetters = true;
    if (answers.use_digits == "yes") useDigits = true;
    if (answers.use_special_characters == "yes") useSpecialCharacters = true;

    if (
      !useLowerLetters &&
      !useUpperLetters &&
      !useDigits &&
      !useSpecialCharacters
    ) {
      console.log(
        chalk.red("Password cannot be generated with none of the options!")
      );
      return;
    }

    const password_length = answers.password_length;
    if (password_length == 0) {
      console.log(
        chalk.red("Password length cannot be zero!") +
          chalk.cyanBright("\nWe recommend a minimum 8 characters password!")
      );
      return;
    }

    const chars = generateChars(
      useUpperLetters,
      useLowerLetters,
      useDigits,
      useSpecialCharacters
    );
    const generatedPassword = generatePassword(answers.password_length, chars);

    console.log(
      chalk.green("Generated Password is : ") +
        chalk.greenBright.underline.bold(generatedPassword)
    );
  });
});
