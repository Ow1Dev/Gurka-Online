import Card from './Card';

export default class Player {
  hand: Card[] = [];
  name: string;

  constructor(name: string = 'NoName') {
    this.name = name;
  }

  dealCard(card: Card) {
    this.hand.push(card);
  }

  ownsCard(card: Card) {
    return this.hand.includes(card);
  }

  clearHand() {
    this.hand.splice(0, this.hand.length);
  }

  getCard(index: number): Card {
    return this.hand[index];
  }

  getLowestCard(): Card {
    //TODO: cache the lowest when added and or removed
    return this.hand.reduce((min, curr) => (curr.number < min.number ? curr : min), this.hand[0]);
  }

  takeCard(card: Card) {
    let index = this.hand.indexOf(card);
    if (index < 0) return;
    this.hand.splice(index, 1);
  }
}
