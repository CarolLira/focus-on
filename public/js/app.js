// Main application logic
console.log("app.js loaded");

// Sem imports - os componentes são carregados diretamente pelo HTML

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização dos componentes
    // Verifica se cada componente foi inicializado corretamente
    if (typeof initTodoList === 'function' && !window.todoListInitialized) {
        initTodoList();
        window.todoListInitialized = true;
    }
    
    if (typeof initPomodoroTimer === 'function' && !window.pomodoroTimerInitialized) {
        initPomodoroTimer();
        window.pomodoroTimerInitialized = true;
    }
    
    if (typeof initMediaEmbed === 'function' && !window.mediaEmbedInitialized) {
        initMediaEmbed();
        window.mediaEmbedInitialized = true;
    }
    
    // Contador de tarefas
    updateTasksCounter();
    
    // Theme Toggler Logic
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        const currentTheme = localStorage.getItem('focusOnTheme') || 'light';
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');

        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('focusOnTheme', theme);
        });
    }
    
    // Blue Theme Toggler Logic
    const blueThemeToggleButton = document.getElementById('blue-theme-toggle');
    if (blueThemeToggleButton) {
        // Aplica o tema azul salvo ao carregar
        const currentTheme = localStorage.getItem('focusOnTheme') || 'light';
        if (currentTheme === 'blue-light') {
            document.body.classList.add('blue-light-mode');
            document.body.classList.remove('blue-dark-mode');
            document.body.classList.remove('dark-mode');
        } else if (currentTheme === 'blue-dark') {
            document.body.classList.add('blue-dark-mode');
            document.body.classList.remove('blue-light-mode');
            document.body.classList.remove('dark-mode');
        }

        blueThemeToggleButton.addEventListener('click', () => {
            // Alterna entre azul claro e azul escuro
            if (document.body.classList.contains('blue-light-mode')) {
                document.body.classList.remove('blue-light-mode');
                document.body.classList.add('blue-dark-mode');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('focusOnTheme', 'blue-dark');
            } else {
                document.body.classList.add('blue-light-mode');
                document.body.classList.remove('blue-dark-mode');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('focusOnTheme', 'blue-light');
            }
        });
    }

    // Toggle para mostrar/esconder o campo de entrada de tarefas
    const addTaskButton = document.getElementById('show-add-task');
    const taskInputContainer = document.getElementById('task-input');
    
    if (addTaskButton && taskInputContainer) {
        addTaskButton.addEventListener('click', () => {
            taskInputContainer.classList.toggle('active');
            if (taskInputContainer.classList.contains('active')) {
                document.getElementById('task').focus();
            }
        });
    }
});

// Função para atualizar o contador de tarefas
function updateTasksCounter() {
    const tasksCounter = document.getElementById('tasks-count');
    const tasksList = document.getElementById('tasks');
    
    if (tasksCounter && tasksList) {
        // Ignorar a mensagem de "nenhuma tarefa" na contagem
        const emptyMessage = tasksList.querySelector('.empty-tasks-message');
        const totalTasks = emptyMessage ? 0 : tasksList.children.length;
        const completedTasks = tasksList.querySelectorAll('.completed').length;
        
        tasksCounter.textContent = totalTasks === 0 
            ? 'Nenhuma tarefa' 
            : totalTasks === 1 
                ? '1 tarefa' 
                : `${totalTasks} tarefas (${completedTasks} completas)`;
    }
}

// Função global para ser chamada do todoList.js quando tarefas são atualizadas
window.updateTasksCounter = updateTasksCounter;

// Ajuste para garantir que só um tema esteja ativo
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.remove('blue-light-mode');
        document.body.classList.remove('blue-dark-mode');
    });
}

// Ao carregar, aplicar o tema salvo corretamente
const savedTheme = localStorage.getItem('focusOnTheme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('blue-light-mode');
    document.body.classList.remove('blue-dark-mode');
} else if (savedTheme === 'blue-light') {
    document.body.classList.add('blue-light-mode');
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('blue-dark-mode');
} else if (savedTheme === 'blue-dark') {
    document.body.classList.add('blue-dark-mode');
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('blue-light-mode');
} else {
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('blue-light-mode');
    document.body.classList.remove('blue-dark-mode');
}
