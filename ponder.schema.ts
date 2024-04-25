import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Deposit: p.createTable({
    id: p.hex(),
    amount: p.bigint(),
    to: p.hex(),
    tokenPool: p.hex(),
  })
}));
