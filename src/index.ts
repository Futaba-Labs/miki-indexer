import { ponder } from "@/generated";

ponder.on("l2AssetManager:AddDeposits", async ({ event, context }) => {
  const { Deposit } = context.db;

  await Deposit.create({
    id: event.log.id,
    data: {
      amount: event.args.amount,
      to: event.args.user,
      tokenPool: event.args.tokenPool,
      transactionHash: event.transaction.hash
    }
  });
});

ponder.on("l2AssetManager:Withdraw", async ({ event, context }) => {
  const { Withdraw } = context.db;

  await Withdraw.create({
    id: event.log.id,
    data: {
      amount: event.args.amount,
      to: event.args.user,
      tokenPool: event.args.tokenPool,
      transactionHash: event.transaction.hash
    }
  });
});

ponder.on("ethTokenPool:CrossChainContractCall", async ({ event, context }) => {
  const { CrossChainExec, RequestTransaction } = context.db;

  const { id } = await RequestTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: event.block.timestamp,
    }
  })

  await CrossChainExec.create({
    id: event.args.id,
    data: {
      sender: event.args.sender,
      dstChainId: event.args.dstChainId,
      fee: event.args.fee,
      to: event.args.recipient,
      status: "PENDING",
      reqTransactionId: id
    }
  });
});

ponder.on("mikiReceiver:SentMsg", async ({ event, context }) => {
  const { CrossChainExec, ResponseTransaction } = context.db;

  const { id } = await ResponseTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: event.block.timestamp,
    }
  })

  await CrossChainExec.update({
    id: event.args.id,
    data: {
      status: "SUCCESS",
      resTransactionId: id
    }
  });
});

