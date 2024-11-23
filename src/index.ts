// src/index.ts
import { api } from './transport/api';

const PORT = 3000;

api.listen(PORT, () => {
  console.log(`DWN Node listening on port ${PORT}`);
});