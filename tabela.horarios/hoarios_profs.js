/**
 * Analisa o texto CSV e preenche a tabela de horários dinamicamente.
 * O mapeamento é feito usando os atributos data-dia e data-intervalo.
 * @param {string} csvText - O conteúdo do arquivo horarios.csv.
 */
function montarQuadroHorarios(csvText) {
    // Divide o texto em linhas e remove espaços em branco extras
    const linhas = csvText.trim().split('\n');

    // Remove a linha de cabeçalho (a primeira linha)
    const dados = linhas.slice(1);

    dados.forEach(linha => {
        // Ignora linhas vazias que podem ter sido geradas
        if (linha.trim() === '') return;

        // Separa os valores por ponto e vírgula (;)
        // Formato esperado: Dia;Turma;Disciplina;Inicio;Fim
        const [dia, turma, disciplina, inicio, fim] = linha.split(';');

        // Constrói a chave de intervalo (ex: "07h30-09h30") para corresponder ao HTML
        const intervaloChave = ${inicio}-${fim};
        
        // Conteúdo formatado para a célula
        const conteudo = `
            ${disciplina}<br>
            <small>${turma}</small>
        `;

        // 1. Localiza a linha da tabela (<tr>) usando o atributo data-intervalo
        // Ex: tr[data-intervalo="07h30-09h30"]
        const tr = document.querySelector(tr[data-intervalo="${intervaloChave}"]);

        if (tr) {
            // 2. Dentro da linha, localiza a célula (<td>) usando o atributo data-dia
            // Ex: td[data-dia="Segunda"]
            const td = tr.querySelector(td[data-dia="${dia}"]);

            if (td) {
                // 3. Preenche a célula com o conteúdo gerado
                td.innerHTML = conteudo;
            } else {
                console.warn(Célula não encontrada para Dia: ${dia} no Intervalo: ${intervaloChave}. Verifique se o dia no HTML corresponde ao CSV.);
            }
        } else {
            console.warn(Linha de Intervalo não encontrada: ${intervaloChave}. Verifique se o horário no HTML corresponde ao CSV.);
        }
    });
}