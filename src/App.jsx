//Importa o css 
import "./App.css"
//Inportanto nosso hook useState da biblioteca React 
//Ele permite amezenar valores e atualizar a tela automaticamente 

import { useState } from "react";
//  cria um componete principal da apricação 
 function App(){
  
  //Estado responsavel por
  //  armazenar a cidade digitada 

  const [cidade, setCidade] = useState("") ;

  //Estado responsavel por armazernar a temperatura da cidade 
  const [temperatura, setTemperatura]= useState("");

  //Estado responsavel por armazernar a clima da cidade 
  const [clima, setClima ] = useState("");

  //Estado responsavel por armazernar a Umidade da cidade 
  const [umidade, setUmidade ] = useState("");


  // Funçao executada quando os usuario clicar no botão consultar 
  async function consultarClima() {


    //Verifica se o campo está vazio 
    if (cidade === ""){
      alert("Digite uma cidade!!!");
      return;
    }

    try{

      // Faz a requisição para a API
      const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}$appid=879ba2d5a4086028183b75df8b174667&units=metric&lang=pt-br`
        
      );
      //converte a resposta para JSON 
      const dados = await resposta.json();


      //Verifica se a cidade foi encontrada 
      if (dados.cod !== 200){
        alert("Cidade não encontrada");
        return; 
      }


      // Atualiza a temperatura
      setTemperatura(dados.main.temp + "°C");

      //Atualiza a condição climática
      setClima(dados.weather[0].description);

      // Atualiza a umidade
      setUmidade(dados.main.humidity + "%");

    }catch (erro) {

      console.log(erro);

      alert("Erro ao consultar a API. ");

    }
  }

  //Fnção executada quando o usuario clicar no botão consultar 
  /* function consultarClima(){
    //Verifica se a cidade digitada é São Paulo 
    if(
      cidade.toLowerCase() === "são paulo " || 
      cidade.toLowerCase() === "sao paulo "  

    ){
       //Atualiza a temperatura 

      setTemperatura("24°C")

      //Atualiza condição climatica
      setClima("Ensolarado");

      //Atualiza a Umidade 
      setUmidade("60%")

    }

    else if (cidade.toLowerCase()=== "curitiba"){

      //Atualiza a temperatura 
      setTemperatura("17°C");


      //Atualiza condição climatica
      setClima("Chuvoso");

      //Atualiza a Umidade 
      setUmidade("85%")

    }

    else if (cidade.toLowerCase()=== "rio de janeiro"){

      //Atualiza a temperatura 
      setTemperatura("30°C");


      //Atualiza condição climatica
      setClima("Ensolarado");

      //Atualiza a Umidade 
      setUmidade("45%")
    }


    //Executa caso a cidade digitada não esteja cadastrada 
    else{
      setTemperatura("--");
      setClima("Cidade não cadastrada ");
      setUmidade("--");

    }
  } */
//importa a inteface visual do sistema 
return(
  //container principal da aplicação
<div className="app-container">
      <div className="weather-card">
        {/* Titulo Principal */}
        <h1 className="weather-title">PREVISÃO DO TEMPO ☁️</h1>

        {/* Campo para digitação e botão */}
        <div className="search-box">
          <input 
            type="text"
            placeholder="Digite o nome da cidade..."
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="weather-input"
          />
          
          <button onClick={consultarClima} className="weather-button">
            Consultar
          </button>
        </div>

        {/* Linha horizontal para separar seções */}
        <hr className="weather-divider" />

        {/* Resultados */}
        <div className="results-container">
          <div className="result-item">
            <span className="result-label">Cidade:</span>
            <span className="result-value">{cidade || "--"}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Temperatura:</span>
            <span className="result-value">{temperatura || "--"}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Clima:</span>
            <span className="result-value">{clima || "--"}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Umidade:</span>
            <span className="result-value">{umidade || "--"}</span>
          </div>
        </div>
      </div>
    
</div>

)
}
//Exporta o componete App para ser utilizad no React 
export default App; 