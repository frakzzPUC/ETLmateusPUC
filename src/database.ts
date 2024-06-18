// Importando as bibliotecas
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';  // Aqui precisamos garantir que está usando a função open corretamente

// Função para abrir o banco de dados
async function openDb() {
  return open({
    filename: './data.db',
    driver: sqlite3.Database
  });
}


// Listar todas as ações disponíveis
export async function listarAcoes() {
  const db = await openDb();
  const acoes = await db.all('SELECT * FROM acoes');
  await db.close();
  return acoes;
}

// Criar uma ordem de compra ou venda
export async function criarOrdem(tipo: string, quantidade: number, usuario: string) {
  const db = await openDb();
  const result = await db.run('INSERT INTO ordens (tipo, quantidade, usuario) VALUES (?, ?, ?)', [tipo, quantidade, usuario]);
  await db.close();
  return { id: result.lastID, tipo, quantidade, usuario };
}

// Cancelar uma ordem
export async function cancelarOrdem(id: number) {
  const db = await openDb();
  const ordem = await db.get('SELECT * FROM ordens WHERE id = ?', [id]);
  if (!ordem) {
    return { sucesso: false, mensagem: 'Ordem não encontrada' };
  }
  await db.run('DELETE FROM ordens WHERE id = ?', [id]);
  await db.close();
  return { sucesso: true, mensagem: 'Ordem cancelada com sucesso' };
}

// Obter a carteira de um usuário
export async function obterCarteira(usuario: string) {
  const db = await openDb();
  const carteira = await db.all('SELECT * FROM ordens WHERE usuario = ?', [usuario]);
  await db.close();
  return carteira;
}
