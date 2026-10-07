# Alquimikamente · Catálogo de Fragrâncias

Site do catálogo de fragrâncias da **Alquimikamente** ([@alquimikamente](https://instagram.com/alquimikamente)).

🌐 **Acesse:** https://rafaelnikolaspuggi.github.io/alquimikamente-catalogo/

## O que tem no site
- **Página inicial** com categorias (Premium, Super Premium e Luxo), intensidades, famílias olfativas, as fragrâncias femininas, compartilháveis e masculinas, tabela de valores, encomendas e contato.
- **Busca** (`busca.html`) por nome, marca ou família olfativa, com filtros por gênero, linha e família.
- **Ficha do perfume**: ao clicar em um perfume, aparecem linha, gênero, família olfativa (com explicação), valores da linha e um botão para pedir pelo WhatsApp. Cada ficha tem link próprio (`#perfume=nome-do-perfume`) para compartilhar.
- Funciona no computador e no celular.

## Pastas
| Pasta / arquivo | Conteúdo |
|---|---|
| `index.html`, `busca.html`, `assets/`, `img/` | O site |
| `Catálogo de Fragrâncias Alquimikamente.pdf` | Catálogo em PDF (link no rodapé do site) |
| `arquivos/Fragrâncias Alquimikamente - FINAL.xlsx` | Planilha das essências: a referência de tudo |
| `arquivos/fotos/` | Fotos dos perfumes (Feminino, Masculinos, Compartilhável) |
| `arquivos/fotos catálogo/` | Fotos de ambiente usadas no catálogo e no site |
| `arquivos/Logo Alquimikamente/` | Logotipo em todos os formatos |
| `ferramentas/gerar_site.py` | Script que gera `assets/dados.js` e as imagens otimizadas a partir das planilhas |

A planilha de precificação (custos e margens) **não** é publicada aqui, de propósito.

## Como atualizar
1. Atualize a planilha **FINAL** (essências) e/ou a planilha de **precificação** na pasta *Catálogo Alquimikamente* da área de trabalho.
2. Rode `python ferramentas/gerar_site.py` (precisa de `openpyxl` e `Pillow`).
3. Faça commit e push: o GitHub Pages publica sozinho em alguns minutos.

---
*Fragrâncias inspiradas nos perfumes citados. Não possuímos vínculo com as marcas mencionadas. As marcas pertencem aos seus respectivos donos. Imagens meramente ilustrativas.*
