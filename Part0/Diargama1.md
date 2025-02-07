```mermaid
graph TD;
    Inicio --> A[Acción 1];
    A --> B{Decisión};
    B -->|Sí| C[Acción 2];
    B -->|No| D[Acción 3];
    C --> Fin;
    D --> Fin;


flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
