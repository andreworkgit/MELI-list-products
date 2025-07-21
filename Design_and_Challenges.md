# Design e Desafios / Design and Challenges

Para o desenvolvimento da aplicação, optei por utilizar o **Next.js** como framework principal, por sua capacidade de unificar frontend e backend em um único projeto. Essa escolha foi motivada pela facilidade de roteamento baseado em arquivos, suporte nativo a server-side rendering (SSR) e API Routes, o que me permitiu entregar rapidamente uma arquitetura integrada e de excelente desempenho.

O layout da página de produto foi inspirado diretamente na interface do **Mercado Livre**. Para acelerar a prototipagem visual e estrutural, utilizei ferramentas de IA generativa que me ajudaram a explorar rapidamente variações de layout e organização dos elementos, garantindo uma boa experiência visual.

No backend, utilizei os recursos de **API Routes do Next.js** para expor os endpoints RESTful de forma simples, com os dados sendo lidos de um arquivo JSON local, conforme solicitado. Essa estrutura me permitiu manter o escopo do projeto simples, porém escalável.

Um dos desafios enfrentados foi a persistência dos dados sem o uso de um banco de dados real. A escolha por arquivos `.json` locais atendeu bem à proposta, garantindo fácil leitura e manutenção.

Por fim, para alcançar uma **cobertura de testes superior a 80%** nos endpoints da API backend, dediquei atenção especial aos testes automatizados. Utilizei **Jest**, cobrindo tanto os endpoints quanto os fluxos principais, assegurando o comportamento esperado e o tratamento adequado de falhas.

---

For the development of this application, I chose **Next.js** as the main framework due to its ability to unify frontend and backend in a single project. This decision was driven by its file-based routing, native support for server-side rendering (SSR), and API Routes, which allowed me to deliver an integrated and high-performance architecture quickly.

The product page layout was directly inspired by **Mercado Libre's** interface. To accelerate the visual and structural prototyping process, I leveraged generative AI tools that helped me quickly explore layout variations and element organization, ensuring a solid user experience.

On the backend, I used **Next.js API Routes** to expose RESTful endpoints in a simple way, with product data read from a local JSON file, as requested. This approach allowed me to keep the project scope simple yet scalable.

One of the challenges was persisting data without using a real database. I addressed this by storing product data in local `.json` files, which ensured easy access and maintenance.

Finally, to achieve **over 80% test coverage** on the backend API endpoints, I dedicated special attention to automated testing. I used **Jest** to cover both the API endpoints and the core flows, ensuring expected behavior and proper error handling.
