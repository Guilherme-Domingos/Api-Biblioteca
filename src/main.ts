import express from "express"
import { LivroControle } from "./controle/livro_controle"
import { LivroDao } from "./dao/livro.dao"

const livroControle = new LivroControle(new LivroDao())

const app = express()

// Salvar Livros
app.post("/livro", (req, res)=>{
    livroControle.salvarLivro(req, res)
})

// Listar Livros
app.get("/livro", (req, res)=>{
    livroControle.listarLivro(res)
})

// Buscar livros
app.get("/livro/id", (req, res) =>{
    livroControle.buscarLivro(req, res)
})

// Deletar livro
app.delete("/livro/:id", (req, res)=>{
    livroControle.deletarLivro(req, res)
})

// Atualizar livro



app.patch("/livro/emprestar/id", )

app.listen(3000, ()=>{
    console.log("serviço http rodando")
})