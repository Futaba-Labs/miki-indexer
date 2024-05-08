import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Status: p.createEnum(["PENDING", "SUCCESS", "ERROR"]),
  Deposit: p.createTable({
    id: p.string(),
    amount: p.bigint(),
    to: p.hex(),
    tokenPool: p.hex(),
    transactionHash: p.hex(),
    timestamp: p.int(),
  }),
  Withdraw: p.createTable({
    id: p.string(),
    amount: p.bigint(),
    to: p.hex(),
    tokenPool: p.hex(),
    transactionHash: p.hex(),
    timestamp: p.int(),
  }),
  RequestTransaction: p.createTable({
    id: p.string(),
    hash: p.hex(),
    from: p.hex(),
    timestamp: p.int(),
  }),
  ResponseTransaction: p.createTable({
    id: p.string(),
    hash: p.hex(),
    from: p.hex(),
    timestamp: p.int(),
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
    timestamp: p.int(),
    reqTransactionId: p.string().references("RequestTransaction.id"),
    resTransactionId: p.string().references("ResponseTransaction.id").optional(),
    reqTransaction: p.one("reqTransactionId"),
    resTransaction: p.one("resTransactionId")
  }),
}));
