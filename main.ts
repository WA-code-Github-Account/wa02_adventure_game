#! /usr/bin/env nodeno
import chalk from "chalk";
import { log } from "console";

import inquirer from "inquirer"; 

let enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin", "Daragon"];
let maxEnemyHealth: number = 75;
let enemyAttackDamage: number = 25;
let health: number = 100;
let attackDamage: number = 50;
let numHealthPotions: number = 3;
let healthPotionHealAmount: number = 30;
let healthPotionDropChance: number = 50;
let running: boolean = true;
let playerLevel: number = 1;

let getRandomNumber = (min: number , max: number) => {
  return Math.floor(Math.random() * max - min) +min;
}

console.log(chalk.redBright.bold("\n\tWelcome to the Dungeon!"));
GAME:

while (running)
   {

    console.log(chalk.yellowBright.bold("\t.........................."));

  let enemyHealth: number = getRandomNumber(1,maxEnemyHealth);

  let enemy: string =enemies [getRandomNumber (0,enemies.length)];
    console.log(chalk.redBright.bold(`\t\n# A ${enemy} has appeared!\n`));

  while (enemyHealth > 0) 
    {
    console.log(chalk.greenBright.bold(`\t\nYour HP: ${health}`));
    console.log(chalk.redBright.bold(`\t\n ${enemy} 's HP:${enemyHealth}`));
    
    let control= await inquirer.prompt([
      {
        type: "list",
        name: "command",
        message:chalk.green.bold("\tWhat would you like to do?"),
        choices:["\tAttack", "\tDrink Health Potion", "\tRun"],
      }
    ]);
      switch (control.command) {
      case "\tAttack":

        let damageDealt: number = getRandomNumber( 1,attackDamage);

        let damageTaken: number = getRandomNumber(1,enemyAttackDamage);

        enemyHealth -= damageDealt;
        health -= damageTaken;

        console.log(chalk.greenBright.bold(`\tYou strike the ${enemy} for ${damageDealt} damage.\n`));

        console.log(chalk.redBright.bold(`\tYou recieved ${damageTaken} damage from the enemy!`));

         if (health < 1) {
          console.log(chalk.redBright.bold(`\t\nYou have taken too much damage, you are too weak to go on!\n`));
        
        break;
      }
      break;

      case "\tDrink Health Potion":
        if (numHealthPotions > 0) {
          health += healthPotionHealAmount;
          numHealthPotions--;
          console.log(chalk.blueBright.bold(`\t\nYou drink a health potion, healing yourself for ${healthPotionHealAmount}.\n`));
          console.log(chalk.redBright.bold(`\t\nYou now have ${health} HP and ${numHealthPotions} health potions left.\n`));
        } else {
          console.log(chalk.yellowBright.bold("\t\nYou have no health potions left! Defeat enemies for a chance to get one!\n"));
          break;
        }

      case "\tRun":
        console.log(chalk.greenBright.bold(`\t\nYou run away from the ${enemy}!`));
        continue GAME;
        break;
      }
    }
      
    if (health < 1) {
      console.log(chalk.red.bold(`\t\nYou limp out of the dungeon, weak from battle.`));
    } else {
        
        console.log(chalk.yellowBright.bold(`\t\nYou run away from the ${enemy}!`));
    }
    
  
    
    console.log(chalk.yellow.bold("\t-----------------------------------"));
    console.log(chalk.bgRedBright(`\t# ${enemy} has been defeated #`));
    console.log(chalk.yellowBright.bold(`\t# You have ${health} HP left #`));
    playerLevel++;
    console.log(chalk.green.bold(`\t# Your level is now Level #${playerLevel} #`));

    if (getRandomNumber(1, 100) < healthPotionDropChance)
    {
        numHealthPotions++;
        console.log(chalk.redBright.bold(`\t# The ${enemy} dropped a health potion #`));
        console.log(chalk.blueBright.bold(`\t# You now have ${numHealthPotions} health potion(s). #`));
    }

    let stateControl = await inquirer.prompt({
        message:chalk.yellow.bold("\n\tWhat would you like to do?"),
        type: "list",
        choices: ["\tContinue Fighting", "\tExit Dungeon"],
        name: "command"
    });

    if (stateControl.command == "\tContinue Fighting")
    {
        console.log(chalk.greenBright.bold(`\n\tYour adventure continues!`));
    } else {
        console.log(chalk.greenBright.bold(`\n\tYou exit the dungeon, successful from your adventures.`));
        break;
    }
    
}
console.log(chalk.bgCyanBright(`\n\t......................`));
console.log(chalk.bgRedBright(`\tTHANK YOU FOR PLAYING `));
console.log(chalk.bgCyanBright(`\t......................`));
