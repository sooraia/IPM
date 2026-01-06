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