const fs = require('fs');

function ImportFile(fileName)
{
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    data.hands = new Object();
    lines.forEach(line => {
      let hand = line.split(" ")[0].replace("\r", '');
      let bet = line.split(" ")[1].replace("\r", '');
      let ranking = null; 


      data.hands[hand] = {hand : hand, bet : bet, ranking : ranking };
      data.hands[hand]["cards"] = new Object();
      for (const c of hand)
      {
        if (!data.hands[hand].cards[c]) data.hands[hand].cards[c] = 1;
        else data.hands[hand].cards[c]++;
      }

    });

    return data;
}

function PartOne(data) {
    let ordered_hands = ["Five of a Kind", "Four of a Kind", "Full House", "Three of a Kind", "Two Pair", "One Pair", "High Pair"];
    let ordered_cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    
    let hands = Object.keys(data.hands);
    hands.forEach(hand => {
      RankHand(hand, data);
    });

    let sum = 0;
    let sorted_hands = SortHand(ordered_cards, ordered_hands, data.hands);

    for (let i = 0; i < sorted_hands.length; i++)
    {
      sum+= parseInt(data.hands[sorted_hands[i]].bet) * (i+1);
    }
        
    return sum;
}
  
function PartTwo(data) {
    let ordered_hands = ["Five of a Kind", "Four of a Kind", "Full House", "Three of a Kind", "Two Pair", "One Pair", "High Pair"];
    let ordered_cards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

    let hands = Object.keys(data.hands);
    hands.forEach(hand => {
      RankHandWild(hand, data);
    });

    let sum = 0;
    let sorted_hands = SortHand(ordered_cards, ordered_hands, data.hands);

    for (let i = 0; i < sorted_hands.length; i++)
    {
      sum+= parseInt(data.hands[sorted_hands[i]].bet) * (i+1);
    }
      
  return sum;
}

function SortHand(ordered_cards, ordered_hands, hands)
{
  let all_hands = Object.keys(hands);
  let sorted_hands = all_hands.sort((a,b) => {
    let a_card = null;
    let b_card = null;
    for (let i = 0; i < 5; i++)
    {
    if (data.hands[a].hand[i] !== data.hands[b].hand[i])
    {
      a_card = data.hands[a].hand[i];
      b_card = data.hands[b].hand[i];
      break;
    }
  }
    let rank_a = ordered_hands.indexOf(data.hands[a].ranking);
    let rank_b = ordered_hands.indexOf(data.hands[b].ranking);
    if (rank_a !== rank_b)
    {
      return ordered_hands.indexOf(data.hands[b].ranking) - ordered_hands.indexOf(data.hands[a].ranking);
    } 
    else return ordered_cards.indexOf(b_card) - ordered_cards.indexOf(a_card);
    
  });

  return sorted_hands;
}

function RankHand(hand, data)
{
  let card_sums =  Object.values(data.hands[hand].cards);

  if (card_sums.includes(5))
  {
    data.hands[hand].ranking = "Five of a Kind";
  }
  else if (card_sums.includes(4))
  {
    data.hands[hand].ranking = "Four of a Kind";
  }
  else if (card_sums.includes(3) && card_sums.includes(2))
  {
    data.hands[hand].ranking = "Full House";
  }
  else if (card_sums.includes(3))
  {
    data.hands[hand].ranking = "Three of a Kind";
  }
  else if (card_sums.sort((a,b) => {return b - a}).indexOf(2) !== card_sums.sort((a,b) => {return b - a}).lastIndexOf(2))
  {
    data.hands[hand].ranking = "Two Pair";
  }
  else if (card_sums.includes(2))
  {
    data.hands[hand].ranking = "One Pair";
  }
  else
  {
    data.hands[hand].ranking = "High Pair";
  }
}

function RankHandWild(hand, data)
{
  let card_sums =  Object.values(data.hands[hand].cards);
  let card_types = Object.keys(data.hands[hand].cards);

  if (card_types.includes("J"))
  {
    if (card_sums.includes(5))
    {
      data.hands[hand].ranking = "Five of a Kind";
    }
    else if (card_sums.includes(4))
    {
      data.hands[hand].ranking = "Five of a Kind";
    }
    else if (card_sums.includes(3) && card_sums.includes(2))
    {
      data.hands[hand].ranking = "Five of a Kind";
    }
    else if (card_sums.includes(3))
    {
      data.hands[hand].ranking = "Four of a Kind";
    }
    //two different pairs
    else if (card_sums.sort((a,b) => {return b - a}).indexOf(2) !== card_sums.sort((a,b) => {return b - a}).lastIndexOf(2))
    {
      if (data.hands[hand].cards["J"] === 2)
      {
        data.hands[hand].ranking = "Four of a Kind";
      }
      else if (data.hands[hand].cards["J"] === 1)
      {
        data.hands[hand].ranking = "Full House";
      }
      else data.hands[hand].ranking = "Three of a Kind";
    }
    else if (card_sums.includes(2))
    {
      data.hands[hand].ranking = "Three of a Kind";
    }
    else
    {
      data.hands[hand].ranking = "One Pair";
    }
  }
}

let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));

