const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

// Função para abrir o banco de dados
async function openDb() {
  return sqlite.open({
    filename: './data.db',
    driver: sqlite3.Database
  });
}

// Função para criar as tabelas
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
      usuario TEXT NOT NULL
    );
  `);
  await db.close();
}

// Função para inserir dados de exemplo
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
    INSERT INTO ordens (tipo, quantidade, usuario) VALUES
    ('compra', 10, 'user1'),
    ('venda', 5, 'user2'),
    ('compra', 20, 'user3'),
    ('venda', 10, 'user1'),
    ('compra', 15, 'user2'),
    ('venda', 12, 'user4'),
    ('compra', 5, 'user5'),
    ('venda', 8, 'user3'),
    ('compra', 22, 'user1'),
    ('venda', 30, 'user2');
  `);

  await db.close();
}

// Executar a criação de tabelas e inserção de dados
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
