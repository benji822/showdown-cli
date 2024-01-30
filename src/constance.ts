export enum RANK {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NIGHT = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
  ACE = 14,
}

export enum SUIT {
  DIAMONDS,
  CLUBS,
  HEARTS,
  SPADES,
}

export enum GAME_STATE {
  START,
  PLAYING,
  END,
}

export enum ACTION_TYPE {
  DRAW,
  EXCHANGE,
  SHOW,
}
