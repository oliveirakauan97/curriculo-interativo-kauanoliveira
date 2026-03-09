// VARIÁVEIS DO JOGO
let currentPhase = 1;
let score = 0;

// FUNÇÕES DE NAVEGAÇÃO
function startGame() {
    hideAllScreens();
    document.getElementById('gameScreen').classList.add('active');
    currentPhase = 1;
    score = 0;
    updateScore();
    showPhase(1);
}

function showAbout() {
    hideAllScreens();
    document.getElementById('aboutScreen').classList.add('active');
}

function showContact() {
    hideAllScreens();
    document.getElementById('contactScreen').classList.add('active');
}

function backToMenu() {
    hideAllScreens();
    document.getElementById('menu').classList.add('active');
    document.getElementById('feedback').classList.add('hidden');
    resetGame();
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

// MECÂNICA DO JOGO
function showPhase(phase) {
    document.querySelectorAll('.phase').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById('phase' + phase).classList.add('active');
    
    document.getElementById('progress').textContent = phase;
}

function checkAnswer(phase, answer, isCorrect) {
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedbackText');
    
    if (isCorrect) {
        score += 25;
        feedbackText.innerHTML = '✅ <strong>CORRETO!</strong> Excelente!';
        feedbackText.style.color = 'var(--success)';
    } else {
        feedbackText.innerHTML = '❌ <strong>ERRADO!</strong> Tente novamente.';
        feedbackText.style.color = 'var(--error)';
    }
    
    updateScore();
    feedback.classList.remove('hidden');
    
    // Desabilitar botões
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.6';
    });
}

function nextPhase() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'all';
        btn.style.opacity = '1';
    });
    
    if (currentPhase < 4) {
        currentPhase++;
        showPhase(currentPhase);
        document.getElementById('feedback').classList.add('hidden');
    } else {
        finishGame();
    }
}

function finishGame() {
    hideAllScreens();
    document.getElementById('resultScreen').classList.add('active');
    
    document.getElementById('finalScore').textContent = score + '/100';
    
    let message = '';
    if (score === 100) {
        message = '🏆 PERFEITO! Você é um especialista no CV de Kauan!';
    } else if (score >= 75) {
        message = '🎉 ÓTIMO! Você conhece bem a trajetória profissional!';
    } else if (score >= 50) {
        message = '👍 BOM! Continue aprendendo sobre a carreira!';
    } else {
        message = '💪 Tente novamente e aprenda mais!';
    }
    
    document.getElementById('customMessage').textContent = message;
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function resetGame() {
    currentPhase = 1;
    score = 0;
}

// INICIALIZAR
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('menu').classList.add('active');
});
