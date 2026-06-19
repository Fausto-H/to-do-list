# To-Do List

Uma aplicação de lista de tarefas simples, responsiva e interativa, criada para ajudar no gerenciamento de atividades diárias com persistência de dados local e suporte a temas.

## 🚀 Funcionalidades

- **Adicionar Tarefas:** Insira novas tarefas pressionando "Enter" ou clicando no botão "+".
- **Persistência de Dados:** Suas tarefas são salvas automaticamente no navegador (`localStorage`), para que você não as perca ao atualizar a página.
- **Drag & Drop:** Reordene suas tarefas facilmente arrastando-as pela alça de movimentação.
- **Modo Dark/Light:** Alterne entre temas claro e escuro para melhor conforto visual.
- **Limpeza Rápida:** Remova todas as tarefas de uma vez com um clique.
- **Design Responsivo:** Adaptável a diversos tamanhos de tela (Mobile-First).

## 🛠 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica.
- **CSS3:** Estilização com variáveis CSS, Flexbox e design responsivo.
- **JavaScript (Vanilla):** Lógica da aplicação, manipulação do DOM e gerenciamento de estado.
- **Sortable.js:** Biblioteca para fornecer a funcionalidade de arrastar e soltar (Drag and Drop) de forma eficiente.
- **Font Awesome:** Ícones para a interface.

## 📂 Estrutura do Projeto

```text
to-do-list/
├── index.html       # Arquivo principal de marcação
├── styles.css       # Estilos e temas
├── main.js          # Lógica da aplicação
└── README.md        # Documentação do projeto
```

## 💻 Como Rodar

1. Clone este repositório em sua máquina local.
2. Abra o arquivo `index.html` diretamente no seu navegador.
3. Não é necessária nenhuma instalação ou servidor backend, pois os dados são salvos localmente.

## 💡 Melhorias Futuras (Possíveis)

- [ ] Adicionar suporte a categorias ou prioridades (ex: baixa, média, alta).
- [ ] Adicionar um contador de tarefas concluídas vs. pendentes.
- [ ] Implementar animações de entrada e saída para itens da lista.
- [ ] Adicionar validação para evitar a criação de tarefas vazias ou duplicadas.

## 📝 Licença
Este projeto é de código aberto e está disponível sob a licença MIT.
