import { Card } from "./Card";
import { SUIT } from "./constance";

export class Deck {
  cards: Card[];
  constructor() {
    this.cards = [];
    for (let i = 2; i <= 14; i++) {
      this.cards.push(new Card(i, SUIT.DIAMONDS));
      this.cards.push(new Card(i, SUIT.CLUBS));
      this.cards.push(new Card(i, SUIT.HEARTS));
      this.cards.push(new Card(i, SUIT.SPADES));
    }
  }

  deal() {
    return this.cards.pop();
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      let j = Math.floor(Math.random() * this.cards.length);
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }
}
