/**
 * Analisa o texto CSV e preenche a tabela de horários dinamicamente.
 * O mapeamento é feito usando os atributos data-dia e data-intervalo.
 * @param {string} csvText - O conteúdo do arquivo horarios.csv.
 */
function montarQuadroHorarios(csvText) {
    // 1. Divide o texto em linhas e remove espaços em branco extras
    const linhas = csvText.trim().split('\n');

    // 2. Remove a linha de cabeçalho (a primeira linha)
    const dados = linhas.slice(1);

    dados.forEach(linha => {
        // Ignora linhas vazias
        if (linha.trim() === '') return;

        // Separa os valores por ponto e vírgula (;) e remove espaços em cada valor
        // Formato esperado: Dia;Turma;Disciplina;Inicio;Fim
        const colunas = linha.split(';').map(coluna => coluna.trim());
        const [diaCSV, turma, disciplina, inicio, fim] = colunas;

        // Constrói a chave de intervalo (ex: "07h30-09h30") para corresponder ao HTML
        const intervaloChave = ${inicio}-${fim};
        
        // Conteúdo formatado para a célula
        const conteudo = `
            ${disciplina}<br>
            <small>${turma}</small>
        `;

        // Normaliza as chaves de busca para garantir tolerância a maiúsculas/minúsculas no HTML.
        // O diaCSV é usado diretamente, mas a busca no HTML é feita de forma robusta.
        const diaBusca = diaCSV; 

        // 1. Localiza a linha da tabela (<tr>) usando o atributo data-intervalo
        // Seletor: tr[data-intervalo="07h30-09h30"]
        const tr = document.querySelector(tr[data-intervalo="${intervaloChave}"]);

        if (tr) {
            // 2. Dentro da linha, localiza a célula (<td>) usando o atributo data-dia
            // Seletor: td[data-dia="Segunda"]
            const td = tr.querySelector(td[data-dia="${diaBusca}"]);

            if (td) {
                // 3. Preenche a célula com o conteúdo gerado e adiciona uma classe CSS
                td.innerHTML = conteudo;
                td.classList.add('aula-preenchida'); // Adiciona classe para melhor estilização
            } else {
                console.warn(Célula não encontrada para Dia: "${diaBusca}" no Intervalo: "${intervaloChave}". Verifique a correspondência no HTML.);
            }
        } else {
            console.warn(Linha de Intervalo não encontrada: "${intervaloChave}". Verifique a correspondência no HTML.);
        }
    });