```mermaid
sequenceDiagram
    participant Usuario
    participant Pagina SPA
    Usuario->>Pagina SPA: Ingresar al navegador 
    Pagina SPA-->>Usuario: Muestra pagina principal
    Usuario->>Pagina SPA: Ingresar URL o link <BR> https://studies.cs.helsinki.fi/exampleapp/spa
    Pagina SPA-->>Usuario: Muestra página de notas
   

