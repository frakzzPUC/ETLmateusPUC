const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

async function openDb() {
  return sqlite.open({
    filename: './data.db',
    driver: sqlite3.Database
  });
}

async function createTables() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS acoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ordens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      quantidade INTEGER NOT NULL,
      usuario TEXT NOT NULL,
      acao TEXT NOT NULL
    );
  `);
  await db.close();
}

async function insertData() {
  const db = await openDb();
  await db.run(`
    INSERT INTO acoes (nome, preco) VALUES 
    ('Apple', 175.50),
    ('Google', 2725.30),
    ('Amazon', 3100.20),
    ('Facebook', 330.10),
    ('Tesla', 890.50),
    ('Microsoft', 305.30),
    ('Netflix', 525.20),
    ('Boeing', 212.50),
    ('Visa', 235.00),
    ('IBM', 143.50);
  `);

  await db.run(`
    INSERT INTO ordens (tipo, quantidade, usuario, acao) VALUES
    ('compra', 10, 'user1', 'Apple'),
    ('venda', 5, 'user2', 'Google'),
    ('compra', 20, 'user3', 'Amazon'),
    ('venda', 10, 'user1', 'Facebook'),
    ('compra', 15, 'user2', 'Tesla'),
    ('venda', 12, 'user4', 'Microsoft'),
    ('compra', 5, 'user5', 'Netflix'),
    ('venda', 8, 'user3', 'Boeing'),
    ('compra', 22, 'user1', 'Visa'),
    ('venda', 30, 'user2', 'IBM');
  `);
  await db.close();
}

async function setupDatabase() {
  try {
    await createTables();
    await insertData();
    console.log('Banco de dados configurado com sucesso.');
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
  }
}

setupDatabase();
