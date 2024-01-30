import { SUIT } from "./constance";

export const suitsToEmoji = (suit: SUIT) => {
  switch (suit) {
    case SUIT.CLUBS:
      return "♣️";
    case SUIT.DIAMONDS:
      return "♦️";
    case SUIT.HEARTS:
      return "♥️";
    case SUIT.SPADES:
      return "♠️";
  }
};

export const rankToText = (rank: number) => {
  switch (rank) {
    case 2:
      return "2";
    case 3:
      return "3";
    case 4:
      return "4";
    case 5:
      return "5";
    case 6:
      return "6";
    case 7:
      return "7";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return "10";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    case 14:
      return "A";
  }
};
