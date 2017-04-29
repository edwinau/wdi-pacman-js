// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;
var numGhost = 0;
// Define your ghosts here
var Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var Pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var Clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [Inky, Blinky, Pinky, Clyde];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n' + '\n' + 'Power-Pellets Left: ' + powerPellets + '\n' + '\n' + 'Dots Left: ' + dots );
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots <= 240 && dots >= 100) {
    console.log('(d) Eat Dot');
    console.log('(t) Eat 10 Dots');
    console.log('(h) Eat 100 Dots');
    console.log('(r) Eat Remaining Dots');
  } else if (dots <= 99 && dots >=10) {
    console.log('(d) Eat Dot');
    console.log('(t) Eat 10 Dots');
    console.log('(r) Eat Remaining Dots');
  } else if (dots <= 9 && dots > 0) {
    console.log('(d) Eat Dot');
    console.log('(r) Eat Remaining Dots');
}
  console.log('(p) Eat Power-Pellet');
  console.log('(1) Eat Inky (' + ghostState(ghosts[0]) + ')' );
  console.log('(2) Eat Blinky (' + ghostState(ghosts[1]) + ')' );
  console.log('(3) Eat Pinky (' + ghostState(ghosts[2]) + ')' );
  console.log('(4) Eat Clyde (' + ghostState(ghosts[3]) + ')' );
  console.log('(q) Quit');
}

//line 65 now read Eat Inky (true) but I want it to read Eat Inky (edible)

//if ghost.edible ===true, then print edible

function ghostState(ghost) {
  if (ghost.edible === true) {
      return "edible";
  } else if (ghost.edible === false) {
      return "inedible";
  }
};


function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots -=1;
}

function eatRemainDot() {
  console.log('\nChomp!');
  score = score + dots*10;
  dots = 0;
}

function eatTenDot() {
  console.log('\nChomp!');
  score += 100;
  dots -= 10;
}

function eatHundredDot() {
  console.log('\nChomp!');
  score += 1000;
  dots -= 100;
}

function eatPowerPellet() {
  score += 50;
    for (var index = 0; index < ghosts.length; index++) {
      ghosts[index].edible = true;
    }
  powerPellets -= 1;
  console.log('\nChomp!');
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      if (dots <= 0) {
        console.log('\nNo more Dots to Eat');
        break;
      } else {
        eatDot();
      }
      break;
    case 't':
      if (dots >= 10){
        eatTenDot();
      } else {
        eatRemainDot();
      }
      break;
    case 'h':
      if (dots >= 100){
        eatHundredDot();
      } else {
        eatRemainDot();
      }
      break;
    case 'r':
      eatRemainDot();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log('\nChomp!')
    console.log(ghost.colour + ' ' + ghost.name + ' kills pacman');
    lives -= 1;
  } else if (ghost.edible === true) {
    numGhost += 1;
      switch(numGhost){
        case 1:
          point = 200;
          score += point;
          console.log(ghost.colour + ' ' + ghost.name + ' was eaten by pacman! Points: '+ point + '\nChomp!');
          ghost.edible = false;
          break;
        case 2:
          point = 400;
          score += point;
          console.log(ghost.colour + ' ' + ghost.name + ' was eaten by pacman! Points: '+ point + '\nChomp!');
          ghost.edible = false;
          break;
        case 3:
          point = 800;
          score += point;
          console.log(ghost.colour + ' ' + ghost.name + ' was eaten by pacman! Points: '+ point + '\nChomp!');
          ghost.edible = false;
          break;
        case 4:
          point = 1600;
          score += point;
          console.log(ghost.colour + ' ' + ghost.name + ' was eaten by pacman! Points: '+ point + '\nChomp!');
          ghost.edible = false;
          break;
        }
    } else if (ghost.lives === 0) {
      process.exit();
      console.log('\n GAME OVER');
    }
  }






// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
