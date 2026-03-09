const express = require('express')
const app = express()
 
app.use(express.json())
 
const alunos = [
    {
        id: 1,
        nome: "Miguel Francelino",
        email: "miguelfrancelino@gmail.com"
    },
    {
        id: 2,
        nome: "Evellyn Caitano",
        email: "evellyncaitano@gmail.com"
    },
    {
        id: 3,
        nome: "Celeny Ordonez",
        email: "celenyordonez@gmail.com"
    }
]
 
const professores = [
    {
        id: 1,
        nome: "Carlos",
        disciplina: "História",
        anoContratacao: 2025
    },
    {
        id: 2,
        nome: "Bethboo",
        disciplina: "Filosofia",
        anoContratacao: 1940
    },
    {
        id: 3,
        nome: "Gabriel",
        disciplina: "Ed. Física",
        anoContratacao: 2023
    },
]
 
// Alunos
 
app.get("/", function (req, res) {
    res.send("Hello World!, você conseguiu!")
})
 
app.get("/alunos", function (req, res) {
    const nome = req.query.nome
 
    // Se não passar query param, retorna todos!
    // O ponto de exclamação inverte o valor
    // Se o nome não tiver valor ele é falso mas por conta do sinal de exclamação ele vira verdadeiro e executa o que está no if
    if(!nome){
        return res.json(alunos)
    }
 
    const alunosFiltrados = alunos.filter(a =>
        a.nome.toLowerCase().includes(nome.toLowerCase())
    )
 
    res.json(alunosFiltrados)
})
 
app.post("/alunos", function (req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const emailQueVeioDoCliente = req.body.email
 
    // Validação
    if (!nomeQueVeioDoCliente || !emailQueVeioDoCliente) {
        return res.status(400).json({ erro: "Nome e e-mail são obrigatórios!" })
    }
 
    // Criando um objeto novo com as informações que veio do cliente
    const novoAluno = {
        id: 4,
        nome: nomeQueVeioDoCliente,
        email: emailQueVeioDoCliente
    }
 
    // Adiciona o novo aluno no final da lista
    alunos.push(novoAluno)
    res.status(201).send()
})
 
 
 
// Buscar aluno por id
app.get("/alunos/:id", function (req, res) {
    const id = parseInt(req.params.id) // O query parameter volta como um texto
 
    const aluno = alunos.find(a => a.id == id)
 
    // Se a variável for nula é igual a falso, se tiver alguma coisa é verdadeiro
    if (aluno) {
        return res.json(aluno)
    } else {
        res.status(404).json("Aluno não encontrado")
    }
})
 
app.put("/alunos/:id", function (req, res) {
    const id = parseInt(req.params.id)
    // const nome = req.body.nome
    // const email = req.body.email
 
    // Desestruturação do objeto
    const { nome, email } = req.body
 
    if (!nome || !email) {
        return res.status(400).json("Nome e email são obrigatórios")
    }
 
    // Precisa descobrir em qual posição do array/lista o alunos está pelo id
    const indexDoAluno = alunos.findIndex(a => a.id == id)
 
    if (indexDoAluno === -1) {
        return res.status(404).json("Aluno não encontrado")
    }
 
    // Substitui os dados do aluno por novos dados da requisição
    alunos[indexDoAluno].email = email
    alunos[indexDoAluno].nome = nome
 
    return res.json(alunos[indexDoAluno])
})
 
app.delete("/alunos/:id", function(req, res) {
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id === id)
 
 
    if(index == -1){
        return res.status(404).json("Aluno não encontrado")
    }
    // Remove elemento a partir de um index
    // Nesse caso ele remove um elemento a partir do index informado
    // Exemplo: frutas = ["Maçã", "Banana", "Uva", "Abacaxi"]
    // frutas.splice(1, 2) essa função vai retornar o que foi removido, no caso, banana e uva
    // E a lista de frutas irá ficar apenas ["Maçã", "Abacaxi"]
    const alunoRemovido = alunos.splice(index, 1)
    return res.status(204).json("Aluno deletado com sucesso!")
 
})
 
 
 
 
 
 
// Professores
 
app.get("/professores", function (req, res) {
    const ano = req.query.anoContratacao
 
    if(!ano){
        return res.json(professores)
    }
 
    const professoresFiltrados = professores.filter(a =>
        a.anoContratacao == parseInt(ano))
 
    res.json(professoresFiltrados)
})
 
app.post("/professores", function (req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const disciplinaQueVeioDoCliente = req.body.disciplina
    const anoQueVeioDoCliente = req.body.anoContratacao
 
    // Validação
    if (!nomeQueVeioDoCliente || !disciplinaQueVeioDoCliente || !anoQueVeioDoCliente) {
        return res.status(400).json({ erro: "Nome, disciplina e ano da contratação são obrigatórios!" })
    }
 
    const novoProfessor = {
        id: 3,
        nome: nomeQueVeioDoCliente,
        disciplina: disciplinaQueVeioDoCliente,
        anoContratacao: anoQueVeioDoCliente
    }
 
    professores.push(novoProfessor)
    res.status(201).send()
})
 
 
// Buscar professor por id
app.get("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)
 
    const professor = professores.find(a => a.id == id)
 
    if (professor) {
        return res.json(professor)
    } else {
        res.status(404).json("Professor não encontrado")
    }
})
 
app.put("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)
    const { nome, disciplina, anoContratacao } = req.body
 
    if (!nome || !disciplina || !anoContratacao) {
        return res.status(400).json("Nome, disciplina e ano da contratação são obrigatórios")
    }
 
    const indexDoProfessor = professores.findIndex(a => a.id == id)
 
    if (indexDoProfessor === -1) {
        return res.status(404).json("Professor não encontrado")
    }
 
    professores[indexDoProfessor].disciplina = disciplina
    professores[indexDoProfessor].nome = nome
    professores[indexDoProfessor].anoContratacao = anoContratacao
 
    return res.json(professores[indexDoProfessor])
})
 
app.delete("/professores/:id", function(req, res) {
    const id = parseInt(req.params.id)
    const index = professores.findIndex(a => a.id === id)
 
 
    if(index == -1){
        return res.status(404).json("Professor não encontrado")
    }
 
    const professorRemovido = professores.splice(index, 1)
    return res.status(204).json("Professor deletado com sucesso!")
 
})
 
// Monitora / Escuta a porta 3000
app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000!")
})