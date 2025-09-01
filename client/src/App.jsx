import { useEffect, useState } from "react";
function App() {
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!cep) {
      alert("Por favor, insira um CEP.");
      return;
    }
    // se cep for diferente de 8 digitos, mostrar alerta
    if (cep.length !== 8) {
      alert("CEP inválido. O CEP deve conter exatamente 8 dígitos.");
      return;
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }

        setCidade(data.localidade);
        setBairro(data.bairro);
        setRua(data.logradouro);
        setNumero(""); // número continua vazio, pois ViaCEP não retorna
      } catch (error) {
        alert("Erro ao consultar o CEP. Tente novamente.");
        console.error("Erro ao consultar o CEP:", error);
      }
    }

    return (
      <>
        <div className="h-screen w-screen bg-blue-500 text-white">
          <section className="p-2 flex flex-col gap-4">
            {/* title */}
            <h1 className="text-3xl">
              API CEP - Consumo de API para consulta de CEP (ViaCEP)
            </h1>
            {/* form */}
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-4 border-2 border-white p-4 w-[500px] rounded-lg"
            >
              {/* CEP */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">CEP:</label>
                <input
                  type="text"
                  className="p-2 rounded border-2 border-white "
                  placeholder="Digite o CEP"
                  value={cep}
                  onChange={(e) => {
                    setCep(e.target.value.replace(/\D/, "")); // Remove qualquer caractere que não seja dígito
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Cidade:</label>
                <input
                  type="text"
                  readOnly
                  className="p-2 rounded border-2 border-white "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Bairro:</label>
                <input
                  type="text"
                  readOnly
                  className="p-2 rounded border-2 border-white "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Rua:</label>
                <input
                  type="text"
                  readOnly
                  className="p-2 rounded border-2 border-white "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">NÚMERO:</label>
                <input
                  type="text"
                  readOnly
                  className="p-2 rounded border-2 border-white "
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-white text-black rounded-lg font-bold"
              >
                Consultar CEP
              </button>
            </form>
          </section>
        </div>
      </>
    );
  };
}
export default App;
