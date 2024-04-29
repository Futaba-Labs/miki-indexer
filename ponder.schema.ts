import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Status: p.createEnum(["PENDING", "SUCCESS", "ERROR"]),
  Deposit: p.createTable({
    id: p.string(),
    amount: p.bigint(),
    to: p.hex(),
    tokenPool: p.hex(),
    transactionHash: p.hex()
  }),
  Withdraw: p.createTable({
    id: p.string(),
    amount: p.bigint(),
    to: p.hex(),
    tokenPool: p.hex(),
    transactionHash: p.hex()
  }),
  RequestTransaction: p.createTable({
    id: p.string(),
    hash: p.hex(),
    from: p.hex(),
    timestamp: p.bigint(),
  }),
  ResponseTransaction: p.createTable({
    id: p.string(),
    hash: p.hex(),
    from: p.hex(),
    timestamp: p.bigint(),
  }),
  CrossChainExec: p.createTable({
    id: p.string(),
    sender: p.hex(),
    dstChainId: p.bigint(),
    amount: p.bigint().optional(),
    receiveAmount: p.bigint().optional(),
    fee: p.bigint(),
    to: p.hex(),
    asset: p.hex().optional(),
    message: p.hex().optional(),
    status: p.enum("Status"),
    error: p.string().optional(),
    reqTransactionId: p.string().references("RequestTransaction.id"),
    resTransactionId: p.string().references("ResponseTransaction.id").optional(),
    reqTransaction: p.one("reqTransactionId"),
    resTransaction: p.one("resTransactionId")
  }),
}));
