const fs = require('fs');

function ImportFile(fileName)
{
 
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    let cards = new Object();

    lines.forEach(line => {
        let card_number = line.split(": ")[0];
        let values = line.split(": ")[1]; 
        
        let winning_numbers = values.split("|")[0].split(" ");
        winning_numbers = winning_numbers.filter(function (el) {
          return el !== '';
        });

        let your_numbers = values.split("|")[1].split(" ");
        your_numbers = your_numbers.filter(function (el) {
          return el !== '';
        });

        cards[Number(card_number.split("Card")[1])] = { winning_numers : winning_numbers, your_numbers : your_numbers, unchecked : 1 };

    });
    return cards;
}

function PartOne(input) {
  
    let card_numbers = Object.keys(input);
    let sum = 0;

    card_numbers.forEach(card_number => {

        let winning_numbers = input[card_number].winning_numers;
        let winning_numbers_converted = [];
        winning_numbers.forEach(number => {
            winning_numbers_converted.push(Number(number));
        });
        let your_numbers = input[card_number].your_numbers;

        let card_sum = 0;

        your_numbers.forEach(your_number => {
            if (winning_numbers_converted.includes(Number(your_number)))
            {
              if (card_sum === 0 ) card_sum = 1;
              else (card_sum *= 2);
            } 
        });

        sum += card_sum;
    });
    return sum;
  }
  
function PartTwo(input) {
  let card_numbers = Object.keys(input);
  let sum = 0;

  let all_checked = false;

  while (!all_checked)
  {
    all_checked = true;
    card_numbers.forEach(card_number => {
        if (input[Number(card_number)].unchecked > 0)
        {
          input[Number(card_number)].unchecked--;
          let winning_numbers = input[card_number].winning_numers;
          let winning_numbers_converted = [];
          winning_numbers.forEach(number => {
              winning_numbers_converted.push(Number(number));
          });
          let your_numbers = input[card_number].your_numbers;
    
          let card_sum = 0;
          your_numbers.forEach(your_number => {
              if (winning_numbers_converted.includes(Number(your_number)))
              {
                card_sum++;
                input[Number(card_number) + Number(card_sum)].unchecked++;
                all_checked = false;
              } 
          });
          sum += card_sum;
        }
    });
    
  }
  return sum + card_numbers.length;
}


let data = ImportFile("text.txt");

console.log(PartOne(data));
console.log(PartTwo(data));
