export default

async function validateEmail(email) {
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
async function saveChartConfig(userEmail, chartConfig) {
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