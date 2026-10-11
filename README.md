# Geladeira_Inteligente

1. Visão geral do projeto
Geladeira Inteligente é um sistema web destinado a consumidores e famílias que desejam organizar os alimentos disponíveis em casa, acompanhar datas de validade, planejar compras e aproveitar ingredientes por meio de sugestões de receitas.
O problema central é a falta de controle sobre os alimentos armazenados na geladeira e na despensa. Isso pode levar ao esquecimento de produtos, compras duplicadas, descarte de alimentos e gastos desnecessários.
1.1 Proposta de valor
•	Centralizar o estoque de alimentos da casa em um único lugar.
•	Priorizar alimentos que precisam ser consumidos em breve.
•	Sugerir receitas a partir dos ingredientes disponíveis.
•	Ajudar a montar listas de compras sem duplicar itens já existentes.
•	Registrar consumo e descarte para acompanhar o desperdício.

# Ferramentas 

Frontend:	Next.js + React	Páginas, formulários, navegação, dashboard e interface responsiva.
Estilização:	Tailwind CSS	Sistema visual consistente, layouts, cores, espaçamentos e responsividade.
Backend:	Node.js + Express	API REST, autenticação, autorização, validações e regras de negócio.
Acesso a dados:	MySQL2	Conexão e execução de consultas SQL parametrizadas.
Banco de dados:	MySQL	Persistência relacional dos dados.
Controle de versão:	Git	Histórico de alterações e colaboração.

# Requisitos 

RF01:	Permitir cadastro, login e logout de usuários. ( X )
RF02:	Permitir criar e gerenciar uma família ou despensa compartilhada. ( X )
RF03:	Permitir cadastrar, consultar, editar e remover/arquivar alimentos do estoque. ( X )
RF04:	Registrar quantidade, unidade, validade e local de armazenamento por lote. ( X )
RF05:	Identificar alimentos vencidos e próximos do vencimento. ( X )
RF06:	Exibir dashboard com resumo do estoque e alertas. ( X )
RF07:	Cadastrar receitas e seus ingredientes. ( X )
RF08:	Recomendar receitas com base nos alimentos disponíveis. ( X )
RF09:	Criar e gerenciar listas de compras. ( X )
RF10:	Avisar quando um item da lista já existir no estoque. ( X )
RF11:	Registrar consumo, descarte e outras movimentações. ( X )
RF12:	Exibir relatórios de desperdício e estimativas financeiras. ( X )
RF13:	Pesquisar e filtrar alimentos por nome, categoria, validade e local. ( X )

# Modelo de dados

usuarios:	id, nome, email, senha_hash, criado_em	Contas de acesso.
familias:	id, nome, criado_em	Despensas compartilhadas.
familia_usuarios:	familia_id, usuario_id, papel	Associação e permissões dos membros.
categorias:	id, nome	Classificação dos alimentos.
alimentos:	id, categoria_id, nome, unidade_padrao	Catálogo de alimentos.
estoque_alimentos:	id, familia_id, alimento_id, quantidade, validade, local_armazenamento, custo_total, status	Lotes existentes em casa.
historico_alimentos:	id, estoque_id, tipo_movimentacao, quantidade, motivo, data_movimentacao	Entradas, consumo, descarte e ajustes.
receitas:	id, nome, modo_preparo, tempo_preparo, porcoes	Receitas disponíveis.
receita_ingredientes:	receita_id, alimento_id, quantidade, unidade	Ingredientes e quantidades de cada receita.
listas_compras:	id, familia_id, nome, criado_em	Listas por família.
itens_lista_compras:	id, lista_id, alimento_id, quantidade, unidade, comprado	Itens e estado de compra.

# Comandos de API

POST	/api/auth/register - Criar conta.
POST	/api/auth/login -	Iniciar sessão.
POST	/api/auth/logout -	Encerrar sessão.
GET	/api/dashboard -	Resumo do estoque e alertas.
GET	/api/alimentos -	Listar catálogo de alimentos.
POST	/api/alimentos -	Cadastrar alimento no catálogo.
GET	/api/estoque -	Listar lotes da família ativa.
POST	/api/estoque - 	Adicionar lote ao estoque.
GET	/api/estoque/:id -	Consultar um lote.
PUT	/api/estoque/:id -	Editar lote.
DELETE	/api/estoque/:id -	Arquivar ou remover lote, conforme a política definida.
GET	/api/estoque/alertas -	Consultar lotes por urgência de validade.
POST	/api/estoque/:id/movimentacoes -	Registrar consumo, descarte ou ajuste.
GET	/api/receitas -	Listar e pesquisar receitas.
GET	/api/receitas/sugestoes -	Recomendar receitas com base no estoque.
POST	/api/receitas -	Cadastrar receita, com permissão apropriada.
GET	/api/listas-compras -	Listar listas de compras.
POST	/api/listas-compras -	Criar lista.
POST	/api/listas-compras/:id/itens -	Adicionar item à lista.
PATCH	/api/listas-compras/:id/itens/:itemId -	Atualizar item ou marcar como comprado.
GET	/api/relatorios/desperdicio -	Consultar relatório de desperdício.

# Regras de negócio

1. Validade
O backend classificará os lotes como vencidos, vencendo hoje, próximos do vencimento ou dentro do prazo. Como ponto de partida, os alertas podem considerar hoje, os próximos 3 dias e os próximos 7 dias; os limites poderão ser configuráveis. A data de validade é uma referência informativa e não deve ser tratada como garantia de segurança do alimento.

2. Consumo e descarte
•	Verificar se a quantidade solicitada está disponível.
•	Executar a alteração do estoque e o registro do histórico em uma única transação.
•	Registrar o tipo de movimentação, quantidade, data e motivo quando aplicável.
•	Não permitir que uma movimentação deixe a quantidade abaixo de zero.
•	Manter histórico auditável; preferir arquivamento a exclusão definitiva de lotes movimentados.

3. Sugestões de receitas
Uma primeira versão pode usar um algoritmo baseado em regras, sem depender de inteligência artificial. Para cada receita, o sistema compara os ingredientes necessários com os lotes disponíveis, calcula a proporção de 
ingredientes atendidos e aumenta a prioridade de receitas que utilizam alimentos próximos do vencimento. Ingredientes obrigatórios ausentes devem ser exibidos como faltantes.

4. Lista de compras
Ao adicionar um item à lista, o sistema pode consultar o estoque da família e informar se o alimento já está disponível. Ao marcar a compra como concluída, o sistema deve perguntar ou seguir uma regra clara para registrar 
a entrada no estoque, evitando atualizações duplicadas.

5. Relatórios de desperdício
O relatório será calculado a partir das movimentações de descarte. O valor financeiro será uma estimativa, derivada do custo registrado no lote e da quantidade descartada. Se o custo for desconhecido, o sistema deverá indicar que o valor não foi calculado, em vez de inventar um custo.
