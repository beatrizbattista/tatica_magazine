// The local preview uses the installed Next.js runtime without Workers or auth.
// Production builds retain the existing Vinext / Sites configuration.
import { fileURLToPath } from 'node:url';
process.env.NEXT_TELEMETRY_DISABLED = '1';
const cli = new URL('../node_modules/next/dist/bin/next', import.meta.url);
process.argv = [process.execPath, fileURLToPath(cli), 'dev', '--webpack',
  '--hostname', '127.0.0.1', '--port', '5173'];
await import(cli.href);
