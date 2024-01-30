import { Action } from "./Action";
import { Card } from "./Card";
import { Deck } from "./Deck";
import { ACTION_TYPE, GAME_STATE } from "./constance";
import { TPlayer, TPlayerWithShownCard } from "./interfaces";

export class Game {
  currentRound: number = 0;
  roundWinners: TPlayer | null = null;
  gameState: GAME_STATE = GAME_STATE.START;
  scoreBoard: Map<TPlayer, number> = new Map();
  actionLog: Action[] = [];
  deck: Deck;

  constructor(public gamePlayers: TPlayer[]) {
    this.gamePlayers = gamePlayers;
    this.deck = new Deck();
  }

  start() {
    this.gameState = GAME_STATE.PLAYING;
    this.currentRound = 1;
    this.scoreBoard = new Map();
    this.deck.shuffle();

    this.gamePlayers.forEach((player) => {
      this.scoreBoard.set(player, 0);
    });

    // each player draw 13 card
    for (let i = 0; i < 13; i++) {
      this.gamePlayers.forEach((player) => {
        const actionType = ACTION_TYPE.DRAW;
        const action = new Action(actionType, player, this.deck);
        action.execute();
        this.actionLog.push(action);
      });
    }
  }

  dispatchShowAction(player: TPlayer, card: Card) {
    const actionType = ACTION_TYPE.SHOW;
    const action = new Action(actionType, player, undefined, undefined, card);
    action.execute();

    this.actionLog.push(action);
  }

  dispatchExchangeHandsAction(player: TPlayer, playerToExchangeHands: TPlayer) {
    const actionType = ACTION_TYPE.EXCHANGE;
    const action = new Action(
      actionType,
      player,
      undefined,
      playerToExchangeHands
    );
    action.execute();

    this.actionLog.push(action);
  }

  dispatchGetRoundWinnerAction(playersWithShownCard: TPlayerWithShownCard[]) {
    const roundWinner = playersWithShownCard.reduce((prev, current) => {
      const prevValue = prev.shownCard!.rank + prev.shownCard!.suit;
      const currentValue = current.shownCard!.rank + current.shownCard!.suit;

      if (prevValue > currentValue) {
        return prev;
      }

      return current;
    });

    this.roundWinners = roundWinner.player;
    this.scoreBoard.set(
      roundWinner.player,
      this.scoreBoard.get(roundWinner.player)! + 1
    );
  }

  dispatchGetGameWinnerAction() {
    const gameWinner = Array.from(this.scoreBoard.entries()).reduce(
      (prev, current) => {
        if (prev[1] > current[1]) {
          return prev;
        }

        return current;
      }
    );

    this.gameState = GAME_STATE.END;
    return gameWinner;
  }
}
