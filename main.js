// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.task-text').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para adicionar uma tarefa ao DOM
function addTaskToDOM(taskValue, isCompleted = false) {
    const taskList = document.getElementById('task-list');

    // Cria um novo item de lista para a tarefa
    const taskItem = document.createElement('li');
    if (isCompleted) taskItem.classList.add('completed');

    // Cria um span para o texto da tarefa
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = taskValue;

    // Cria um contêiner para os botões de ação
    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';

    // Cria um botão de concluir tarefa com ícone
    const completeButton = document.createElement('i');
    completeButton.className = 'fa fa-check';
    completeButton.onclick = () => {
        taskItem.classList.toggle('completed');
        saveTasks(); // Salva as tarefas após modificar a tarefa
    };

    // Cria um botão de deletar tarefa com ícone
    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa fa-trash';
    deleteButton.onclick = () => {
        taskItem.remove();
        saveTasks(); // Salva as tarefas após deletar a tarefa
    };

    // Adiciona os botões ao contêiner de ações
    actionButtons.appendChild(completeButton);
    actionButtons.appendChild(deleteButton);

    // Adiciona o span de texto e o contêiner de botões ao item da tarefa
    taskItem.appendChild(taskText);
    taskItem.appendChild(actionButtons);

    // Adiciona o item da tarefa à lista de tarefas
    taskList.appendChild(taskItem);

    saveTasks(); // Salva as tarefas após adicionar a tarefa
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskValue = taskInput.value.trim();

    // Verifica se o valor da tarefa não está vazio
    if (taskValue) {
        addTaskToDOM(taskValue);
        taskInput.value = ''; // Limpa o campo de entrada
    }
}

// Função para limpar a lista de tarefas após confirmação
function clearList() {
    if (confirm('Tem certeza de que deseja limpar a lista de tarefas?')) {
        document.getElementById('task-list').innerHTML = ''; // Remove todos os itens da lista
        localStorage.removeItem('tasks'); // Remove as tarefas do localStorage
    }
}

// Adiciona um listener para o evento de clique no botão "Adicionar Tarefa"
document.getElementById('add-task').addEventListener('click', addTask);

// Adiciona um listener para o evento de pressionar tecla no campo de entrada
document.getElementById('new-task').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Carrega as tarefas do localStorage quando a página é carregada
document.addEventListener('DOMContentLoaded', loadTasks);

// Adiciona um listener para o evento de clique no link "Limpar lista"
document.getElementById('clear-list').addEventListener('click', clearList);
