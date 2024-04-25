import { ponder } from "@/generated";

ponder.on("l2AssetManager:AddDeposits", async ({ event, context }) => {
  const { Deposit } = context.db;

  console.log(event.args)

  await Deposit.create({
    id: event.transaction.hash,
    data: {
      amount: event.args.amount,
      to: event.args.user,
      tokenPool: event.args.tokenPool
    }
  });
});
