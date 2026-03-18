import fs from 'fs';
const files = fs.readdirSync('public/images');
for (const file of files) {
  const stats = fs.statSync(`public/images/${file}`);
  console.log(`${file}: ${stats.size / 1024 / 1024} MB`);
}
