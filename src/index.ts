import { ponder } from "@/generated";

ponder.on("l2AssetManager:AddDeposits", async ({ event, context }) => {
  const { Deposit } = context.db;

  await Deposit.create({
    id: event.log.id,
    data: {
      amount: event.args.amount,
      to: event.args.user,
      tokenPool: event.args.tokenPool,
      transactionHash: event.transaction.hash,
      timestamp: Number(event.block.timestamp)
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
      transactionHash: event.transaction.hash,
      timestamp: Number(event.block.timestamp)
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
      timestamp: Number(event.block.timestamp)
    }
  })

  await CrossChainExec.create({
    id: event.args.id,
    data: {
      sender: event.args.sender,
      dstChainId: event.args.dstChainId,
      fee: event.args.fee,
      to: event.args.recipient,
      message: event.args.data,
      status: "PENDING",
      reqTransactionId: id,
      timestamp: Number(event.block.timestamp)
    }
  });
});

ponder.on("ethTokenPool:CrossChainContractCallWithAsset", async ({ event, context }) => {
  const { CrossChainExec, RequestTransaction } = context.db;

  const { id } = await RequestTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: Number(event.block.timestamp)
    }
  })

  await CrossChainExec.create({
    id: event.args.id,
    data: {
      sender: event.args.sender,
      dstChainId: event.args.dstChainId,
      to: event.args.recipient,
      asset: event.args.asset,
      fee: event.args.fee,
      amount: event.args.amount,
      message: event.args.data,
      status: "PENDING",
      reqTransactionId: id,
      timestamp: Number(event.block.timestamp)
    }
  });
});

ponder.on("ethTokenPool:CrossChainTransferAsset", async ({ event, context }) => {
  const { CrossChainExec, RequestTransaction } = context.db;

  const { id } = await RequestTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: Number(event.block.timestamp)
    }
  })

  await CrossChainExec.create({
    id: event.args.id,
    data: {
      sender: event.args.sender,
      dstChainId: event.args.dstChainId,
      to: event.args.recipient,
      asset: event.args.asset,
      fee: event.args.fee,
      amount: event.args.amount,
      status: "PENDING",
      reqTransactionId: id,
      timestamp: Number(event.block.timestamp)
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
      timestamp: Number(event.block.timestamp)
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

ponder.on("mikiReceiver:SentMsgAndToken", async ({ event, context }) => {
  const { CrossChainExec, ResponseTransaction } = context.db;

  const { id } = await ResponseTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: Number(event.block.timestamp)
    }
  })

  await CrossChainExec.update({
    id: event.args.id,
    data: {
      status: "SUCCESS",
      receiveAmount: event.args._amountLD,
      resTransactionId: id
    }
  });
});

ponder.on("mikiReceiver:FailedMsg", async ({ event, context }) => {
  const { CrossChainExec, ResponseTransaction } = context.db;

  const { id } = await ResponseTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: Number(event.block.timestamp)
    }
  })

  await CrossChainExec.update({
    id: event.args.id,
    data: {
      status: "ERROR",
      error: event.args._reason,
      resTransactionId: id
    }
  });
});

ponder.on("mikiReceiver:FailedMsgAndToken", async ({ event, context }) => {
  const { CrossChainExec, ResponseTransaction } = context.db;

  const { id } = await ResponseTransaction.create({
    id: event.transaction.hash,
    data: {
      hash: event.transaction.hash,
      from: event.transaction.from,
      timestamp: Number(event.block.timestamp)
    }
  })

  await CrossChainExec.update({
    id: event.args.id,
    data: {
      status: "ERROR",
      error: event.args._reason,
      resTransactionId: id
    }
  });
});

