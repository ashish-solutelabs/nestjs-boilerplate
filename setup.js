// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

const commands = [
  {
    title: 'Removing github templates',
    cmd: 'rm -rf .github',
  },
  {
    title: 'Cleaning git commits ',
    cmd: 'rm -rf .git',
  },
  {
    title: 'Creating .env',
    cmd: 'cp .env.example .env',
  },
  {
    title: 'Initializing Git Repo',
    cmd: 'git init',
  },
];

// eslint-disable-next-line no-console
console.info('š Starting Setup... \n');

for (const command of commands) {
  // eslint-disable-next-line no-console
  console.info(`ā ${command.title}`);
  exec(command.cmd);
}
// eslint-disable-next-line no-console
console.info('\nš„³ Setup Finish!\n');
// eslint-disable-next-line no-console
console.info('ā” ka boom š„');
