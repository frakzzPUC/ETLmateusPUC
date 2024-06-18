"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterCarteira = exports.cancelarOrdem = exports.criarOrdem = exports.listarAcoes = void 0;
// Importando as bibliotecas
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite"); // Aqui precisamos garantir que está usando a função open corretamente
// Função para abrir o banco de dados
function openDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, sqlite_1.open)({
            filename: './data.db',
            driver: sqlite3_1.default.Database
        });
    });
}
// Listar todas as ações disponíveis
function listarAcoes() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        const acoes = yield db.all('SELECT * FROM acoes');
        yield db.close();
        return acoes;
    });
}
exports.listarAcoes = listarAcoes;
// Criar uma ordem de compra ou venda
function criarOrdem(tipo, quantidade, usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        const result = yield db.run('INSERT INTO ordens (tipo, quantidade, usuario) VALUES (?, ?, ?)', [tipo, quantidade, usuario]);
        yield db.close();
        return { id: result.lastID, tipo, quantidade, usuario };
    });
}
exports.criarOrdem = criarOrdem;
// Cancelar uma ordem
function cancelarOrdem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        const ordem = yield db.get('SELECT * FROM ordens WHERE id = ?', [id]);
        if (!ordem) {
            return { sucesso: false, mensagem: 'Ordem não encontrada' };
        }
        yield db.run('DELETE FROM ordens WHERE id = ?', [id]);
        yield db.close();
        return { sucesso: true, mensagem: 'Ordem cancelada com sucesso' };
    });
}
exports.cancelarOrdem = cancelarOrdem;
// Obter a carteira de um usuário
function obterCarteira(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        const carteira = yield db.all('SELECT * FROM ordens WHERE usuario = ?', [usuario]);
        yield db.close();
        return carteira;
    });
}
exports.obterCarteira = obterCarteira;
