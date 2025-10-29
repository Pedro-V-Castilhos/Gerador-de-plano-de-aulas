# Gerador de Planos de Aula com IA Generativa
- - -

## Resumo:
> O software se trata de um gerador de plano de aula baseado em IA generativa. O projeto será focado na implementação com a API do Google Gemini, também utilizando do SupaBase para automatização da base de dados, visando completar todos os requisitos propostos no teste técnico apresentado.

## Tecnologias utilizadas:
* **BackEnd:**
  - **Supabase:** Automação de backend, criação e gerenciamento de banco de dados Postgres.
* **IA:**
  - **Google AI Studio:** IA Generativa para criação dos planos de aula, utilizada a `versão 2.0-flash` devido a velocidade de geração dos textos e possibilidade de realizar mais testes sem atingir um limite de plano gratuito.
  - **Gemini API:** API para utilização do modelo generativo. 
* **FrontEnd:**
  - **React:** Componentização e organização das views do projeto, componentização das exibições.
  - **Vite:** Gerenciamento de pacotes do projeto.
  - **Bootstrap:** Estilização pré-definida de elementos.

## Links:

* Repositório: https://github.com/Pedro-V-Castilhos/Gerador-de-plano-de-aulas
* Projeto no Supabase: https://supabase.com/dashboard/project/eqlpjoilsmpoqdlwntfs
* Documentação prévia ao projeto: https://github.com/Pedro-V-Castilhos/Gerador-de-plano-de-aulas/blob/main/Documenta%C3%A7%C3%A3o.pdf
  
## Arquitetura de Dados:
![alt text](<Gerador de Plano de Aulas/public/Plano de Aula com IA (3).png>)

### Dicionário de dados e RLS:
#### Entidade: users 
| Nome | Tipo | Descrição |
|:----:|:----:|:----------|
|Id| Int8| Código de identificação único|
|Subject| text| Email de identificação do cliente
|Password| Text | Senha criptografada do cliente

|RLS (Row Level Security)|
|:----------------|
    • Create: qualquer pessoa pode criar uma conta
    • Read: o usuário poderá consultar os dados da conta vinculada ao próprio e-mail;
    • Update: o usuário poderá alterar os dados da conta vinculada ao próprio e-mail;
    • Delete: o usuário poderá deletar conta vinculada ao próprio e-mail;

#### Entidade: classPlans
|Nome | Tipo| Descrição |
|:--:|:--:|:--| 
| Id| Int8| Código de identificação único|
|Subject| Text| O tema principal do plano de aula
|PdfUrl | Text| A url do pdf do plano
|Client| Int8| Chave do usuário vinculado ao plano

|RLS (Row Level Security)|
|:----------------|
    • Create: qualquer pessoa pode criar um plano;
    • Read: um usuário poderá visualizar os planos vinculados a ele próprio;
    • Delete: o usuário poderá deletar pedidos vinculados a ele próprio;

## Como executar (Local):
* Baixar o arquivo .env com as chaves da aplicação, fornecidos pelo email enviado pelo candidato.
* Mover este arquivo para a pasta onde o projeto funcionará.
* No terminal, selecione uma pasta onde o projeto funcionará e execute os seguintes comandos:
```bash
# clonar repo
git clone "https://github.com/Pedro-V-Castilhos/Gerador-de-plano-de-aulas.git"
cd repo

# instalar dependências
npm install

# criar .env com as variáveis acima

# rodar localmente
npm run dev
# ou
npm start
```

## Como testar:
* Com a aplicação executando, selecione a opção de cadastro e insira um email e senha para credenciais;
* Clique no link de confirmação enviado para o email fornecido;
* Selecione a opção de criar novo plano;
* Insira os dados nos devidos campos;
* Clique em criar e espere o resultado ser exibido na tela;
* Volte para a aba inicial para ver o histórico de planos gerados naquela conta.

## Decisões técnicas:
* Simplicidade: o projeto deveria ser simples e somente com as funcionalidades essenciais, devido o tempo limitado para o projeto;
* Uso de versão antiga do Gemini: devido os modelos mais recentes terem limite de tokens para ser utilizado, foi usada a versão com melhor desempenho que não possuia tal limite;
* Geração da resposta em formato markdown: para automatizar o processo de estilização, foi decidido que a IA geraria o texto dos planos em formato markdown, para então ser convertido em HTML para renderização, assim o documento seria apresentado com formatação, facilitando a leitura do usuário. Quanto ao parsing do JSON, foi pensado que tal habilidade já poderia ser avaliada no projeto, visto que a resposta das requisições enviadas a API do modelo já são neste formato, sendo necessário pegar somente a resposta textual para o prosseguimento, assim, prevaleceu a justificativa anterior.
* PDFs gerados a partir de imagens: Como a intenção era que os PDFs fossem gerados já para leitura do usuário final, tal ação requer uma renderização da formatação, para que somente depois ela seja convertida em PDF. Essa solução não é a ideal, mas foi a solução que mais se encaixava ao tempo limitado do projeto.

## Desafios e soluções:
* O maior desafio para o projeto foi o tempo, devido a dificuldade da possibilidade de programar nos horários comerciais, devido o emprego atual do candidato (Ainda cumpre o horário, mesmo estando em processo de saída), mas o candidato conseguiu realizá-lo fora desses horários.
* Foi necessário que muitos conceitos fossem aprendidos e revisados, utilizando de tempo útil, felizmente a revisão de tais conceitos permitiu a melhor estruturação do projeto.
* A componentização das funcionalidades acabou gerando muitas etapas para a geração do pdf do plano, mas a revisão e organização do fluxo do projeto ajudou.
* A renderização das páginas do documento final acabou sendo bastante trabalhosa, mas a alteração dos parametros utilizados e na posição relativa para a separação das páginas foi o suficiente.

# Melhorias futuras:
* Arrumar uma alternativa para a geração de pdfs, para que possam ser gerados a partir do texto, e não de imagens.
* Organizar o processo de geração do pdf, visto que o processo acabou confuso e não centralizado.
* Adicionar funcionalidade de fazer edições nos planos gerados, antes de gerar o pdf com eles.
* Adicionar a opção de excluir um plano gerado.
