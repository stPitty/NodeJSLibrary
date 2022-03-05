const fs = require('fs');

async function writer (filepath, data) {
  try {
    await fs.promises.writeFile(filepath, JSON.stringify(data, 0, 2));
  } catch (e) {
    console.error(e);
  }
}

async function reader (filepath) {
  try {
    const data = await fs.promises.readFile(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  writer: writer,
  reader: reader,
}