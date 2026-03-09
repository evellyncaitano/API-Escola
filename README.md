# API Escola - Node.Js +Express
API REST simples para gerenciar alunos e professores

## Pré-  requisitos
- Node.js instalado

## Como rodar

### Instalar dependências
```bash
npm
```

### Iniciar o servidor
```bash
npm
```

#### Acessar
Abra o navegador em: `http://localhost:3000`


## Endpoints

### Alunos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/alunos`| Lista todos os alunos |
| GET | `/alunos/:id`| Buscar um aluno específico |
| POST | `/alunos`| Cria um novo aluno |
| PUT | `/alunos/:id`| Atualiza um aluno |
| DELETE | `/alunos/:id`| Remove um aluno |

### Professores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/professores`| Lista todos os professores |
| POST | `/professores`| Cria um novo professor |
| PUT | `/professores/id`| Atualiza um professor |
| DELETE | `/professores/:id`| Deleta um professor |

## Tecnologias
- Node.js
- Express

## Notas
-Os dados são armazenados em memória (reiniciar o servidor apaga tudo)
