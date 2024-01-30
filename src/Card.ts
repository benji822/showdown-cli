import { RANK, SUIT } from "./constance";

export class Card {
  constructor(public rank: RANK, public suit: SUIT) {}
  getRank() {
    return this.rank;
  }
  getSuit() {
    return this.suit;
  }
}
