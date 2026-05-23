const fs = require('fs');
const path = require('path');

const dirs = [
  'src\\api',
  'src\\hooks',
  'src\\components\\alunno',
  'src\\components\\materia',
  'src\\pages'
];

dirs.forEach(dir => {
  const fullPath = path.join('e:\\develop\\React\\Apps\\exam-register-ui', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${fullPath}`);
  }
});
