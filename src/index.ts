import * as p from "@clack/prompts";
import color from "picocolors";
import { HumanPlayer } from "./HumanPlayer";
import { AiPlayer } from "./AiPlayer";
import { Game } from "./Game";
import { rankToText, suitsToEmoji } from "./helpers";
import { ACTION_TYPE } from "./constance";
import { TPlayerWithShownCard } from "./interfaces";

async function main() {
  console.clear();

  await setTimeout(() => {}, 1000);

  p.intro(
    `${color.bgMagenta(
      color.black(
        " Welcome to Showdown. First let me know how many human players are there? "
      )
    )}`
  );

  const numberOfHumanPlayers = await p.select({
    message: "How many human players are there?",
    initialValue: "1",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ],
  });

  const numberOfAiPlayers = 4 - parseInt(numberOfHumanPlayers as string);

  const message = `There are ${numberOfHumanPlayers.toString()} human players and ${numberOfAiPlayers} AI players. Let's start the game!`;

  p.intro(message);

  await setTimeout(() => {}, 1000);

  const players = [];

  for (let i = 0; i < parseInt(numberOfHumanPlayers as string); i++) {
    const name = await p.text({
      message: `Enter player ${i + 1}'s name`,
    });

    const player = new HumanPlayer(name as string);
    players.push(player);
  }

  for (let i = 0; i < numberOfAiPlayers; i++) {
    const names = ["Danny", "Claudia", "Alex", "Jim"];
    const player = new AiPlayer(names[i]);
    players.push(player);
  }

  players.forEach((player) => {
    p.intro(`Player ${player.name} joined!`);
  });

  const showdownGame = new Game(players);
  showdownGame.start();

  p.intro(`Game started!\n`);

  await setTimeout(() => {}, 1000);

  for (let i = 0; i < 13; i++) {
    p.intro(`Round ${i + 1}`);
    let exchangeHandsRound = -1;
    let playersWithShownCard: TPlayerWithShownCard[] = [];

    for (const player of showdownGame.gamePlayers) {
      const isPlayerUsedExchangeHands = showdownGame.actionLog.find(
        (action) =>
          action.actionType === ACTION_TYPE.EXCHANGE &&
          action.player.name === player.name
      );

      if (player instanceof HumanPlayer && !isPlayerUsedExchangeHands) {
        const isExchangeHands = await p.text({
          message: `${player.name}, it's your turn. Do you want to exchange hands? (y/n)`,
        });

        if (isExchangeHands === "y") {
          const cardToExchange = await p.select({
            message: `${player.name}, which player do you want to exchange hands with?`,
            options: [
              ...showdownGame.gamePlayers
                .filter((p) => p !== player)
                .map((p) => ({
                  value: p.name,
                  label: p.name,
                })),
            ],
          });
          const playerToExchangeHands = showdownGame.gamePlayers.find(
            (p) => p.name === cardToExchange
          );
          if (playerToExchangeHands) {
            p.intro(
              `${player.name} exchange hands with ${playerToExchangeHands.name}`
            );
            exchangeHandsRound = i;
            showdownGame.dispatchExchangeHandsAction(
              player,
              playerToExchangeHands
            );
          }
        }
      }

      if (isPlayerUsedExchangeHands && exchangeHandsRound + 3 === i) {
        const playerExchangeFrom = isPlayerUsedExchangeHands?.player;
        const playerExchangeTo = isPlayerUsedExchangeHands?.targetPlayer;

        p.intro(
          `3 rounds is over, ${playerExchangeFrom?.name} and ${playerExchangeTo?.name} exchange hands back!`
        );
        showdownGame.dispatchExchangeHandsAction(
          playerExchangeFrom!,
          playerExchangeTo!
        );
      }

      p.intro(
        `${player.name} show ${rankToText(
          player.hand[12 - i]?.getRank()
        )} of ${suitsToEmoji(player.hand[12 - i]?.getSuit())}`
      );

      playersWithShownCard.push({
        player,
        shownCard: player.hand[12 - i],
      });
      showdownGame.dispatchShowAction(player, player.hand[12 - i]);
    }

    showdownGame.dispatchGetRoundWinnerAction(playersWithShownCard);
    p.intro(
      `Round ${i + 1} ended. ${showdownGame.roundWinners?.name} won this round!`
    );
    p.intro();

    await setTimeout(() => {}, 1000);
  }

  const gameWinner = showdownGame.dispatchGetGameWinnerAction();
  const [winner, score] = gameWinner;
  p.intro(
    `Game ended. ${winner.name} get the total of ${score} points and won this game!`
  );
}

main();
