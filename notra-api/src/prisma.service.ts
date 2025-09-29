import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  async onModuleInit() {
    const max = 10;
    const sleep = (ms:number)=>new Promise(r=>setTimeout(r,ms));
    for (let i=1;i<=max;i++){
      try { await this.$connect(); return; }
      catch (e) {
        const wait = Math.min(1000 * 2**(i-1), 10000);
        console.warn(`Prisma connect falhou (tentativa ${i}/${max}). Retentando em ${wait}ms`, e);
        await sleep(wait);
      }
    }
    await this.$connect();
  }
}
