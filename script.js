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
        // Pontuação "crua" (max 40)
        const rawScore = transporteScore + dietaScore + energiaScore + residuosScore;
        // Normalizar a pontuação para uma escala de 0-100 (onde 100 é o pior)
        // (100 / 40) = 2.5
        const totalScore = Math.round(rawScore * 2.5);

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
        if (transporteScore > 7) {
            tipsHTML += '<li><strong>Transporte:</strong> Vimos que seu principal transporte é o carro. Tente combinar viagens ou usar transporte público/bicicleta uma vez por semana.</li>';
            hasHighImpactAreas = true;
        }

        // 2. Checar Dieta (Se come carne diariamente)
        if (dietaScore > 7) {
            tipsHTML += '<li><strong>Dieta:</strong> O consumo frequente de carne vermelha tem um impacto alto. Tente experimentar um "dia sem carne" para começar.</li>';
            hasHighImpactAreas = true;
        }

        // 3. Checar Energia (Se não economiza)
        if (energiaScore > 7) {
            tipsHTML += '<li><strong>Energia:</strong> Parece que há espaço para economizar energia. Desligar luzes e aparelhos da tomada (em vez de standby) já ajuda muito.</li>';
            hasHighImpactAreas = true;
        }

        // 4. Checar Resíduos (Se não recicla)
        if (residuosScore > 7) {
            tipsHTML += '<li><strong>Resíduos:</strong> Vimos que você não recicla. Começar é mais fácil do que parece! Tente separar o lixo "seco" (plástico, papel, metal) do "úmido" (restos de comida).</li>';
            hasHighImpactAreas = true;
        }

        // Se nenhuma área tiver alto impacto, dê parabéns
        if (!hasHighImpactAreas && totalScore < 90) { // Adicionamos um bônus se a pessoa for bem
             tipsHTML += '<li>Parabéns! Seus hábitos já são de baixo impacto em todas as áreas. Continue assim e inspire outras pessoas!</li>';
        }
        
        // Fecha a lista de dicas
        tipsHTML += '</ul>';
        
        // --- Lógica de Mensagem Geral e Cor (baseada no totalScore 0-100) ---
        if (totalScore <= 38) { // Era 15 (38 = 15 * 2.5)
            message = "Uau! Sua pegada é muito baixa. Você é um exemplo a ser seguido!";
            scoreEl.classList.add('text-green-600'); // Cor Verde
        } else if (totalScore <= 63) { // Era 25 (63 = 25 * 2.5)
            message = "Sua pegada é baixa. Você já faz bastante, mas sempre há como melhorar.";
            scoreEl.classList.add('text-yellow-600'); // Cor Amarelo
        } else if (totalScore <= 88) { // Era 35 (88 = 35 * 2.5)
            message = "Sua pegada é média. Você está no caminho certo. Foque nas dicas abaixo!";
            scoreEl.classList.add('text-orange-600'); // Cor Laranja
        } else { // Acima de 88 (até 100)
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