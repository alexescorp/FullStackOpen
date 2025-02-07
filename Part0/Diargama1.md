```mermaid
graph TD;
    Inicio --> A[Acción 1];
    A --> B{Decisión};
    B -->|Sí| C[Acción 2];
    B -->|No| D[Acción 3];
    C --> Fin;
    D --> Fin;
