import { spawnSync } from 'node:child_process';
import console from 'node:console';
import { networkInterfaces } from 'node:os';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const subnet = '10.13.13.0/24';
const addresses = [...new Set(
  Object.values(networkInterfaces()).flat()
    .filter(({ family, address, internal }) =>
      family === 'IPv4' && !internal && address.startsWith('10.13.13.'),
    )
    .map(({ address }) => address),
)];

if (addresses.length === 0) {
  console.error(`${subnet} の IP が見つかりません。VPN に接続してから実行してください。`);
  process.exit(1);
}

if (addresses.length > 1) {
  console.error(`${subnet} の IP が複数あります (${addresses.join(', ')})。pnpm dev -- --host <VPN IP> で指定してください。`);
  process.exit(1);
}

const turbo = fileURLToPath(import.meta.resolve('turbo'));
const result = spawnSync(process.execPath, [turbo, 'run', 'dev', '--', '--host', addresses[0]], {
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
}
process.exitCode = result.status ?? 1;
