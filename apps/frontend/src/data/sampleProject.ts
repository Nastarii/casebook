export type ProjectPage = {
  id: string;
  title: string;
  slug: string;
  eyebrow: string;
  excerpt: string;
  readingTime: string;
  body: string[];
};

export type ProjectChapter = {
  id: string;
  number: string;
  title: string;
  summary: string;
  pages: ProjectPage[];
};

export type ReaderProject = {
  title: string;
  subtitle: string;
  summary: string;
  chapters: ProjectChapter[];
};

export const sampleProject: ReaderProject = {
  title: 'Casebook Genesis',
  subtitle: 'Da ideia inicial ao primeiro livro digital de projeto.',
  summary:
    'Uma narrativa curta sobre as escolhas que transformam conhecimento bruto em uma experiencia de leitura preservavel.',
  chapters: [
    {
      id: 'origem',
      number: '01',
      title: 'Origem',
      summary: 'O contexto que deu forma ao produto e ao modo como ele deve ser lido.',
      pages: [
        {
          id: 'visao',
          title: 'Visao do produto',
          slug: 'visao-do-produto',
          eyebrow: 'Fundacao',
          excerpt:
            'Casebook nasce para transformar projetos em historias digitais, nao em paineis administrativos.',
          readingTime: '3 min',
          body: [
            'Todo projeto carrega decisoes, desvios e aprendizados que costumam se perder em conversas, tickets e documentos fragmentados.',
            'O leitor coloca essa memoria em primeiro plano. Capitulos organizam a jornada, paginas preservam momentos importantes e cada bloco existe para sustentar a compreensao.',
            'A primeira experiencia precisa ser calma, editorial e direta: abrir um projeto deve parecer abrir um livro vivo.',
          ],
        },
        {
          id: 'principios',
          title: 'Principios narrativos',
          slug: 'principios-narrativos',
          eyebrow: 'Direcao',
          excerpt:
            'Narrativa, legibilidade e apresentacao guiam a interface antes de qualquer recurso administrativo.',
          readingTime: '4 min',
          body: [
            'A estrutura do Casebook favorece leitura continua, descoberta gradual e preservacao de contexto.',
            'Capitulos nao sao listas de tarefas. Eles sao arcos de entendimento. Paginas nao sao registros soltos. Elas sao cenas que explicam por que algo foi feito.',
            'Essa diferenca protege o produto de virar mais uma superficie operacional e sustenta sua identidade como livro digital interativo.',
          ],
        },
      ],
    },
    {
      id: 'arquitetura',
      number: '02',
      title: 'Arquitetura',
      summary: 'Como a fundacao tecnica sustenta uma experiencia simples e elegante.',
      pages: [
        {
          id: 'modelo',
          title: 'Modelo de leitura',
          slug: 'modelo-de-leitura',
          eyebrow: 'Estrutura',
          excerpt:
            'Projetos contem capitulos; capitulos contem paginas; paginas recebem blocos narrativos.',
          readingTime: '5 min',
          body: [
            'O dominio central e pequeno de proposito. Projeto, capitulo e pagina formam a espinha dorsal da experiencia.',
            'A interface inicial respeita essa hierarquia e evita controles que interrompam a leitura.',
            'Com essa base, blocos de texto, imagem, arquitetura, decisoes e metricas podem ser introduzidos sem quebrar o fluxo editorial.',
          ],
        },
        {
          id: 'preservacao',
          title: 'Preservacao do conhecimento',
          slug: 'preservacao-do-conhecimento',
          eyebrow: 'Memoria',
          excerpt:
            'O valor do Casebook aparece quando decisoes continuam compreensiveis meses depois.',
          readingTime: '3 min',
          body: [
            'Preservar conhecimento nao significa armazenar mais campos. Significa manter contexto, sequencia e significado acessiveis.',
            'O leitor torna a navegacao previsivel: indice, pagina atual, progresso e proxima leitura ficam sempre proximos do conteudo.',
            'Essa fundacao prepara o produto para crescer sem abandonar simplicidade.',
          ],
        },
      ],
    },
  ],
};
