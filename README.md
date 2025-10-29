# Gerador de Planos de Aula com IA Generativa
- - -

## Resumo:
> O software se trata de um gerador de plano de aula baseado em IA generativa. O projeto será focado na implementação com a API do Google Gemini, também utilizando do SupaBase para automatização da base de dados, visando completar todos os requisitos propostos no teste técnico apresentado.

## Tecnologias utilizadas:
* BackEnd: Supabase
* IA: Google Ai Studio, Gemini API 
* FrontEnd: React, Vite, Bootstrap

## Links:

* Repositório: https://github.com/Pedro-V-Castilhos/Gerador-de-plano-de-aulas
* Projeto no Supabase: https://supabase.com/dashboard/project/eqlpjoilsmpoqdlwntfs
  
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

## 