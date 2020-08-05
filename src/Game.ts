import Player from './Player';
import Deck from './Deck';
import Card from './Card';

export default class Game {
  players: Player[] = [];

  deck: Deck = new Deck();
  middledeck: Deck = new Deck();

  private started = false;
  private currentPlayerIndex: number = 0;

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  get hasStarted() {
    return this.started;
  }

  /**
   * Generate the Game
   */
  constructor(players: Player[] = []) {
    this.players = players;
  }

  reset(count: number) {
    this.deck.initCards();
    this.players.forEach((p) => {
      for (let i = 0; i < count; i++) {
        this.getACardFromDeck(p);
      }
    });
  }

  private trade(p: Player, d: Deck, card: Card) {
    d.removeCard(card);
    p.dealCard(card);
  }

  /**
   * Get the card from the deck
   */
  getACardFromDeck(p: Player) {
    let card = this.deck.getRandomCard();
    this.trade(p, this.deck, card);
  }

  /**
   * Puts the card from the deck
   */
  putACardinMiddleDeck(player: Player, card: Card): boolean {
    if (card === undefined) return false;

    if (
      this.middledeck.cards[0] === undefined ||
      card.number >= this.middledeck.cards[0].number ||
      card === player.getLowestCard()
    ) {
      player.takeCard(card);
      this.middledeck.addCard(card);
      return true;
    }
    return false;
  }

  /**
   * Set who turn is it
   */
  setPlayerTurn(index: number) {
    this.currentPlayerIndex = index;
  }

  /**
   * Finish the players turn
   */
  finishPlayerTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  /**
   * Starts The Game
   */
  start() {
    this.deck.initCards();

    this.reset(7);
    this.started = true;
  }

  //TODO: Stop function
}
