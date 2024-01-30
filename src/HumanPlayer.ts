import { Card } from "./Card";
import { Deck } from "./Deck";
import { TPlayer } from "./interfaces";

export class HumanPlayer implements TPlayer {
  name: string;
  hand: Card[];
  points: number;
  constructor(name: string) {
    this.name = name;
    this.hand = [];
    this.points = 0;
  }
  drawCard(deck: Deck) {
    const card = deck.deal();

    if (card) {
      this.hand.push(card);
    }
  }
  showCard() {
    this.hand.pop();
  }
  exchangeHands(player: TPlayer) {
    let temp = this.hand;
    this.hand = player.hand;
    player.hand = temp;
  }
}
