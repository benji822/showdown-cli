import { Card } from "./Card";
import { Deck } from "./Deck";

export type TPlayer = {
  name: string;
  hand: Card[];
  points: number;
  showCard: () => void;
  drawCard: (deck: Deck) => void;
  exchangeHands: (player: TPlayer) => void;
};

export type TPlayerWithShownCard = {
  player: TPlayer;
  shownCard: Card;
};
