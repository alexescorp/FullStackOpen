
```mermaid
flowchart TD
    A(INICIO) -->|URL| B[Ingreso página SPA] -->|Ubicar entrada de texto| C[Ingresar texto]
    C --> D{Presionar boton Save <BR> enviar solicitud HTTP-POST <BR> new_note_spa <BR> JSON}
    D -->|Si| E[Actualiza lista] -->|Ver lista| F[Verifica texto ingresado]
    D -->|No| G[Ver lista]
    F --> H(FIN)
    G --> H(FIN)
	

