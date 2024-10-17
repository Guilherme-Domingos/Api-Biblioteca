import express from "express"
import { LivroControle } from "./controle/livro_controle"
import { LivroDao } from "./dao/livro.dao"

const livroControle = new LivroControle(new LivroDao())

const app = express()

app.post("/livro", (req, res)=>{
    livroControle.salvarLivro(req, res)
})

app.get("/livro", (req, res)=>{
    livroControle.listarLivro(res)
})

app.listen(3000, ()=>{
    console.log("serviço http rodando")
})