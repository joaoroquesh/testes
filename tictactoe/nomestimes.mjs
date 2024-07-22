// Altere esta linha
import fetch from 'node-fetch';

// Seu código continua igual
async function fetchTeams() {
    let teams = [];

    for (let i = 1; i <= 8122; i++) {
        const url = `https://api.sofascore.app/api/v1/team/${i}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data.team && data.team.name) {
                    teams.push({ id: i, name: data.team.name });
                }
            }
        } catch (error) {
            console.log(`Erro ao acessar a URL ${url}: ${error}`);
        }
    }

    // Código para salvar o arquivo ou o que desejar fazer com os dados
}

fetchTeams();
