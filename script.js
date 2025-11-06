// Espera o documento carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Selecionar os elementos do HTML
    const calculateButton = document.getElementById('calculateButton');
    const resultsSection = document.getElementById('resultsSection');
    const scoreEl = document.getElementById('score');
    const messageEl = document.getElementById('message');
    const quizForm = document.getElementById('quizForm');
    const resetButton = document.getElementById('resetButton');
    const tipsEl = document.getElementById('tips');

    // 2. Lógica do botão "Calcular"
    calculateButton.addEventListener('click', () => {
        // Obter os valores das respostas
        const transporteScore = parseInt(document.getElementById('transporte').value);
        const dietaScore = parseInt(document.getElementById('dieta').value);
        const energiaScore = parseInt(document.getElementById('energia').value);
        const residuosScore = parseInt(document.getElementById('residuos').value);
        
        // Calcular a pontuação total
        // Pontuação "crua" (min 7, max 40)
        const rawScore = transporteScore + dietaScore + energiaScore + residuosScore;
        
        // Mapear o intervalo [7, 40] para o intervalo [0, 100]
        // Onde 0 é a melhor pontuação (min) e 100 é a pior (max)
        // Fórmula: ((valor - minA) / (maxA - minA)) * (maxB - minB) + minB
        // ((rawScore - 7) / (40 - 7)) * (100 - 0) + 0
        const totalScore = Math.round(((rawScore - 7) / 33) * 100);

        // Exibir a pontuação
        scoreEl.textContent = totalScore;

        // Exibir uma mensagem com base na pontuação
        let message = '';
        // Começa o HTML das dicas personalizadas
        let tipsHTML = '<h3 class="font-bold text-lg text-gray-800">Suas dicas personalizadas:</h3><ul class="list-disc list-inside space-y-3 mt-3">'; 
        
        // Limpa classes de cor antigas antes de adicionar uma nova
        scoreEl.classList.remove('text-green-600', 'text-yellow-600', 'text-orange-600', 'text-red-600');

        // --- Lógica de Dicas Personalizadas ---
        // Verifica cada resposta individualmente para dar dicas relevantes
        let hasHighImpactAreas = false;

        // 1. Checar Transporte (Se escolheu carro)
        if (transporteScore > 7) { // Captura 8 e 10
            tipsHTML += '<li><strong>Transporte:</strong> Vimos que seu principal transporte é o carro. Tente combinar viagens ou usar transporte público/bicicleta uma vez por semana.</li>';
            hasHighImpactAreas = true;
        }

        // 2. Checar Dieta (Se come carne diariamente)
        if (dietaScore > 7) { // Captura 10
            tipsHTML += '<li><strong>Dieta:</strong> O consumo frequente de carne vermelha tem um impacto alto. Tente experimentar um "dia sem carne" para começar.</li>';
            hasHighImpactAreas = true;
        }

        // 3. Checar Energia (Se não economiza)
        if (energiaScore > 6) { // Captura 10 (era > 7, mudei para > 6 para pegar 10)
            tipsHTML += '<li><strong>Energia:</strong> Parece que há espaço para economizar energia. Desligar luzes e aparelhos da tomada (em vez de standby) já ajuda muito.</li>';
            hasHighImpactAreas = true;
        }

        // 4. Checar Resíduos (Se não recicla)
        if (residuosScore > 5) { // Captura 10 (era > 7, mudei para > 5 para pegar 10)
            tipsHTML += '<li><strong>Resíduos:</strong> Vimos que você não recicla. Começar é mais fácil do que parece! Tente separar o lixo "seco" (plástico, papel, metal) do "úmido" (restos de comida).</li>';
            hasHighImpactAreas = true;
        }

        // Se o score for 0, dê parabéns
        if (totalScore === 0) { 
             tipsHTML += '<li>Parabéns! Sua pontuação é 0. Você é um exemplo e seus hábitos são de baixíssimo impacto em todas as áreas. Continue assim!</li>';
        } else if (!hasHighImpactAreas && totalScore < 50) { // Se não tem áreas graves e a pontuação é boa
             tipsHTML += '<li>Muito bem! Você não possui áreas de impacto "vermelho" (as mais graves). Suas dicas são focadas em otimização.</li>';
        }
        
        // Fecha a lista de dicas
        tipsHTML += '</ul>';
        
        // --- Lógica de Mensagem Geral e Cor (baseada no totalScore 0-100) ---
        if (totalScore <= 25) { // 0-25
            message = "Uau! Sua pegada é muito baixa. Você é um exemplo a ser seguido!";
            scoreEl.classList.add('text-green-600'); // Cor Verde
        } else if (totalScore <= 50) { // 26-50
            message = "Sua pegada é baixa. Você já faz bastante, mas sempre há como melhorar.";
            scoreEl.classList.add('text-yellow-600'); // Cor Amarelo
        } else if (totalScore <= 75) { // 51-75
            message = "Sua pegada é média. Você está no caminho certo. Foque nas dicas abaixo!";
            scoreEl.classList.add('text-orange-600'); // Cor Laranja
        } else { // 76-100
            message = "Sua pegada é alta. Esta é uma ótima oportunidade para repensar alguns hábitos.";
            scoreEl.classList.add('text-red-600'); // Cor Vermelho
        }
        
        messageEl.textContent = message;
        tipsEl.innerHTML = tipsHTML; // Adiciona as dicas personalizadas

        // Ocultar o formulário e mostrar os resultados
        quizForm.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        // Rola a tela para o topo para o usuário ver o resultado
        window.scrollTo(0, 0);
    });
    
    // 3. Lógica do botão de refazer
    resetButton.addEventListener('click', () => {
         // Mostrar o formulário e ocultar os resultados
        quizForm.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        
        // Limpar o formulário
        quizForm.reset();
        
        // Limpar as dicas antigas
        tipsEl.innerHTML = '';
    });

}); // Fim do 'DOMContentLoaded'
