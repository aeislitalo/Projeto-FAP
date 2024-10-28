// Interface IEndereco representa a estrutura de dados para um endereço
interface IEndereco {
  cep: string; // Código de Endereçamento Postal
  address_type: string; // Tipo de endereço (ex: residencial, comercial)
  address_name: string; // Nome do endereço
  address: string; // Endereço completo
  state: string; // Estado
  district: string; // Bairro ou distrito
  city: string; // Cidade
  lat: string; // Latitude
  lng: string; // Longitude
  city_ibge: string; // Código IBGE da cidade
  ddd: string; // Código de Discagem Direta à Distância
}

// Exporta a interface IEndereco para ser utilizada em outras partes do aplicativo
export default IEndereco;
