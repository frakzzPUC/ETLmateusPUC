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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const database_1 = require("./database");
function routes(app) {
    app.get('/acoes', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const acoes = yield (0, database_1.listarAcoes)();
            res.json(acoes);
        }
        catch (error) {
            res.status(500).send('Erro ao listar ações');
        }
    }));
    app.post('/ordens', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { tipo, quantidade, usuario } = req.body;
        try {
            const resultado = yield (0, database_1.criarOrdem)(tipo, quantidade, usuario);
            res.json(resultado);
        }
        catch (error) {
            res.status(500).send('Erro ao criar ordem');
        }
    }));
    app.delete('/ordens/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const resultado = yield (0, database_1.cancelarOrdem)(id);
            res.json(resultado);
        }
        catch (error) {
            res.status(500).send('Erro ao cancelar ordem');
        }
    }));
    app.get('/carteira/:usuario', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const usuario = req.params.usuario;
        try {
            const carteira = yield (0, database_1.obterCarteira)(usuario);
            res.json(carteira);
        }
        catch (error) {
            res.status(500).send('Erro ao obter carteira');
        }
    }));
}
exports.routes = routes;
