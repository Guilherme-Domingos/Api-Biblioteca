import { Api } from "./api/api";
import { LivroControle } from "./controle/livro_controle";
import { LivroDao } from "./dao/livro.dao";

function main() {
    const api = Api.build()
    const livroControle = new LivroControle(new LivroDao)
    api.addRota("/livro", "POST", livroControle.salvarLivro)
    api.addRota("/livro", "GET", livroControle.listarLivro)
    api.addRota("/livro/:id", "DELETE", livroControle.deletar)
    // api.addRota("/livro/:id", "PUT", livroControle.salvarLivro)
    api.addRota("/livro/:id", "GET", livroControle.buscarLivro)
    // api.addRota("/livro/emprestar/:id", "PATCH", livroControle.emprestar)
}
main()