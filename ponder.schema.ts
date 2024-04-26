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
  CrossChainExec: p.createTable({
    id: p.string(),
    sender: p.hex(),
    dstChainId: p.bigint(),
    amount: p.bigint().optional(),
    fee: p.bigint(),
    to: p.hex(),
    asset: p.hex().optional(),
    status: p.enum("Status")
  }),
  RequestTransaction: p.createTable({
    id: p.string(),
    hash: p.hex(),
    from: p.hex(),
    timestamp: p.bigint(),
    crossChainExecId: p.string().references("CrossChainExec.id")
  }),
  ResponseTransaction: p.createTable({
    id: p.string(),
    hash: p.hex(),
    from: p.hex(),
    timestamp: p.bigint(),
    crossChainExecId: p.string().references("CrossChainExec.id")
  }),
}));
