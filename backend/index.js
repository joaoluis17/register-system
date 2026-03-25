import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/cadastro", (req, res) => {
    res.status(200).json({ message: "API para cadastro de usuários funcionando!" });
});

app.post("/cadastro", (req, res) => {
    const {
        email,
        tipoCadastro,
        nome,
        razaoSocial,
        cpf,
        cnpj,
        dataNascimento,
        dataAbertura,
        telefone,
        senha,
    } = req.body;

    if (!email || !tipoCadastro || !telefone || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    if (tipoCadastro === "PF") {
        if (!nome || !cpf || !dataNascimento) {
            return res.status(400).json({
                error: "Nome, CPF e data de nascimento são obrigatórios para Pessoa Física."
            });
        }
    } else if (tipoCadastro === "PJ") {
        if (!razaoSocial || !cnpj || !dataAbertura) {
            return res.status(400).json({
                error: "Razão social, CNPJ e data de abertura são obrigatórios para Pessoa Jurídica."
            });
        }
    }

    res.status(200).json({ message: "Cadastro realizado com sucesso!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});