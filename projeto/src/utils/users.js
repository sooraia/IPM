export default async function validateEmail(email) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    if (data.length > 0) {
      return true; // já existe
    }
    
    else false; // não existe
  } catch (error) {
    console.error(" Erro a verificar email" , error );
  } finally {
    console.log("Verificação de email terminada");
  }
}


/* 
    "saved_chart_configs": [
      {
        "config_name": "My First Chart",
        "chart_type": "bar", //(/line/pie),
        "parameters": {
          "city": "Lisbon",
          "metric": "Number of Listings",
          "rows": 12,
          "price_range": [50, 300],
          "property_type": "Apartment" // (/All default)
        }
      },
      {
        "config_name": "Vacation Rentals Analysis",
        "chart_type": "pie",
        "parameters": {
          "city": "Barcelona",
          "metric": "Property Types",
          "Neighborhood": "Gothic Quarter", // optional
          "price_range": [100, 500] // optional
        }
      }
    ]

*/
export async function saveChartConfig(userEmail, chartConfig) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(userEmail)}`);
    const users = await response.json();
    if (users.length === 0) {
      throw new Error("Utilizador não encontrado");
    }
    const user = users[0];
    const updatedConfigs = user.saved_chart_configs || [];
    updatedConfigs.push(chartConfig);
    const updateResponse = await fetch(`http://localhost:3000/profiles.users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ saved_chart_configs: updatedConfigs })
    });
    if (updateResponse.ok) {
          return true;
    }
  } catch (error) {
    console.error("Erro ao salvar configuração do gráfico:", error);
    return false;
  }
}

export async function getChartConfig(userEmail) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(userEmail)}`);
    const users = await response.json();
    if (users.length === 0) {
      return [];
    }
    return users[0].saved_chart_configs || [];
  } catch (error) {
    return [];
  }
}

export async function deleteChartConfig(userIdentifier, chartIndex) {
  try {
    // tenta encontrar user por email
    let response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(userIdentifier)}`);
    let users = await response.json();
    let user = Array.isArray(users) && users.length > 0 ? users[0] : null;

    // se não encontrou por email, tenta por id
    if (!user) {
      const byIdResp = await fetch(`http://localhost:3000/profiles.users/${encodeURIComponent(userIdentifier)}`);
      if (byIdResp.ok) user = await byIdResp.json();
    }

    if (!user) {
      throw new Error('Utilizador não encontrado');
    }

    const updatedConfigs = user.saved_chart_configs || [];

    if (chartIndex < 0 || chartIndex >= updatedConfigs.length) {
      throw new Error('Índice inválido');
    }

    updatedConfigs.splice(chartIndex, 1);

    const updateResponse = await fetch(`http://localhost:3000/profiles.users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ saved_chart_configs: updatedConfigs })
    });

    return updateResponse.ok;
  } catch (error) {
    console.error('Erro ao apagar configuração do gráfico:', error);
    return false;
  }
}


export async function saveFiltersConfig(userEmail, filtersConfig) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(userEmail)}`);
    const users = await response.json();
    
    if (users.length === 0) {
      throw new Error("Utilizador não encontrado");
    }
    
    const user = users[0];
    const updatedFilters = user.saved_filters_configs || [];
    updatedFilters.push(filtersConfig);
    
    const updateResponse = await fetch(`http://localhost:3000/profiles.users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ saved_filters_configs: updatedFilters })
    });
    
    if (updateResponse.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function getFiltersConfig(userEmail) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(userEmail)}`);
    const users = await response.json();
    
    if (users.length === 0) {
      return [];
    }
    
    return users[0].saved_filters_configs || [];
  } catch (error) {
    return [];
  }
}

export async function deleteFiltersConfig(userEmail, filterIndex) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(userEmail)}`);
    const users = await response.json();
    
    if (users.length === 0) {
      throw new Error("Utilizador não encontrado");
    }
    
    const user = users[0];
    const updatedFilters = user.saved_filters_configs || [];
    
    updatedFilters.splice(filterIndex, 1);
    
    const updateResponse = await fetch(`http://localhost:3000/profiles.users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ saved_filters_configs: updatedFilters })
    });
    
    if (updateResponse.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}


export async function getSavedChartConfigs(userEmail) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(userEmail)}`);
    const users = await response.json();
    if (users.length === 0) {
      throw new Error("Utilizador não encontrado");
    }
    const user = users[0];
    console.log(user.saved_chart_configs);
    return user.saved_chart_configs || [];
  } catch (error) {
    return [];
  }
}