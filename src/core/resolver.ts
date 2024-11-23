// src/core/resolver.ts
import { Resolver } from 'did-resolver';

export class DIDResolver {
  private resolver: Resolver;

  constructor() {
    this.resolver = new Resolver({
      // Add resolver methods like `ethr-did` here
    });
  }

  async resolve(did: string) {
    const result = await this.resolver.resolve(did);
    if (!result) throw new Error(`DID ${did} could not be resolved.`);
    return result;
  }
}