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

  await CrossChainExec.create({
    id: event.args.id,
    data: {
      sender: event.args.sender,
      dstChainId: event.args.dstChainId,
      amount: undefined,
      fee: event.args.fee,
      asset: undefined,
      to: event.args.recipient,
      status: "PENDING"
    }
  });

  await RequestTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: event.block.timestamp,
      crossChainExecId: event.args.id
    }
  })
});

ponder.on("mikiReceiver:SentMsg", async ({ event, context }) => {
  const { CrossChainExec, ResponseTransaction } = context.db;

  console.log(event.args.id)

  await CrossChainExec.update({
    id: event.args.id,
    data: {
      status: "SUCCESS"
    }
  });

  await ResponseTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: event.block.timestamp,
      crossChainExecId: event.args.id
    }
  })
});

