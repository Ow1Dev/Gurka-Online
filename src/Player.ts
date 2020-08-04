import Card from './Card';

export default class Player {
  hand: Card[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  dealCard(card: Card) {
    this.hand.push(card);
  }

  getCard(index: number): Card {
    return this.hand[index];
  }

  takeCard(card: Card) {
    let index = this.hand.indexOf(card);
    if (index < 0) return;
    this.hand.splice(index, 1);
  }
}
