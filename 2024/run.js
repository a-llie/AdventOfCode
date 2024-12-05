import { execSync } from 'child_process';
import { emptyDirSync } from 'fs-extra';

const file = process.argv[2];

if (!file) {
  console.log('Please provide a file name without the ts extension(e.g., 1).');
  process.exit(1);
}

emptyDirSync('dist');
execSync(`tsc && node ./dist/day/${file}.js`, { stdio: 'inherit' });