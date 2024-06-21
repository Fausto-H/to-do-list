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
    taskItem.className = isCompleted ? 'completed' : '';
    taskItem.draggable = true; // Torna o item arrastável

    // Cria o elemento para arrastar
    const dragHandle = document.createElement('span');
    dragHandle.className = 'drag-handle';
    dragHandle.innerHTML = '<i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i>';

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

    // Adiciona o span de texto, os pontinhos e o contêiner de botões ao item da tarefa
    taskItem.appendChild(dragHandle);
    taskItem.appendChild(taskText);
    taskItem.appendChild(actionButtons);

    // Adiciona o item da tarefa à lista de tarefas
    taskList.appendChild(taskItem);

    // Adiciona eventos de arrastar e soltar
    addDragAndDrop(taskItem);

    saveTasks(); // Salva as tarefas após adicionar a tarefa
}

// Função para adicionar suporte a arrastar e soltar
function addDragAndDrop(taskItem) {
    taskItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', taskItem.outerHTML);
        taskItem.classList.add('dragging');
    });

    taskItem.addEventListener('dragend', (e) => {
        taskItem.classList.remove('dragging');
        saveTasks(); // Salva as tarefas após arrastar
    });

    taskItem.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const draggingItem = document.querySelector('.dragging');
        if (draggingItem && draggingItem !== taskItem) {
            const taskList = document.getElementById('task-list');
            const bounding = taskItem.getBoundingClientRect();
            const offset = bounding.y + (bounding.height / 2);

            if (e.clientY - offset > 0) {
                taskList.insertBefore(draggingItem, taskItem.nextSibling);
            } else {
                taskList.insertBefore(draggingItem, taskItem);
            }
        }
    });
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

// Configura o Sortable.js para usar a classe .drag-handle como handle
new Sortable(document.getElementById('task-list'), {
    handle: '.drag-handle',
    animation: 150
});
