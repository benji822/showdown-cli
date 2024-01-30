import { Card } from "./Card";
import { Deck } from "./Deck";
import { ACTION_TYPE } from "./constance";
import { TPlayer } from "./interfaces";

export class Action {
  constructor(
    public actionType: ACTION_TYPE,
    public player: TPlayer,
    public deck?: Deck,
    public targetPlayer?: TPlayer,
    public card?: Card
  ) {
    this.actionType = actionType;
    this.player = player;
    this.deck = deck;
    this.targetPlayer = targetPlayer;
    this.card = card;
  }

  execute() {
    switch (this.actionType) {
      case ACTION_TYPE.DRAW:
        this.player.drawCard(this.deck!);
        break;
      case ACTION_TYPE.SHOW:
        this.player.showCard();
        break;
      case ACTION_TYPE.EXCHANGE:
        this.player.exchangeHands(this.targetPlayer!);
        break;
    }
  }
}
