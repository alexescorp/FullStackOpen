```mermaid
flowchart TD
    A(INICIO) -->|URL| B[Ingreso página] -->|Ubicar entrada de texto| C[Ingresar texto]
    C --> D{Presionar boton Save, enviar formulario HTTP-POST}
    D -->|Si| E[Recarga página, mediante una redireccion] -->|Ver lista| F[Verifica texto ingresado]
    D -->|No| G[Ver lista]
    F --> H(FIN)
    G --> H(FIN)
	
