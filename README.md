# Quiz Challenge — Proyecto 22

Aplicación de concurso sobre historia, desarrollada con HTML, CSS y JavaScript puro.

## Cómo ejecutar

1. Descarga y descomprime `Quiz-App.zip`.
2. Abre la carpeta `Quiz-App`.
3. Abre `index.html` en tu navegador.

No requiere instalación, servidor ni dependencias externas.

## Estructura

```text
Quiz-App/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── questions.js
│   └── app.js
├── assets/
│   └── img/
└── README.md
```

## Funcionalidades

- Pantalla inicial con información del examen.
- Preguntas de opción múltiple cargadas desde `js/questions.js`.
- Retroalimentación inmediata.
- Respuesta correcta resaltada en verde y respuesta incorrecta en rojo.
- Puntaje acumulado: +1 por respuesta correcta.
- Temporizador de 60 segundos por pregunta.
- Penalización de -1 punto cuando se agota el tiempo.
- Resultado final con aciertos, errores y preguntas sin responder.
- Revisión de todas las preguntas y sus explicaciones.
- Opción para repetir el examen.
- Diseño adaptable a móviles y computadores.

## Cómo agregar o editar preguntas

Abre `js/questions.js`. Cada pregunta tiene esta estructura:

```javascript
{
    category: "HTML",
    question: "¿Qué significa HTML?",
    answers: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correctAnswer: 0,
    explanation: "Explicación de la respuesta correcta."
}
```

`correctAnswer` es el índice de la opción correcta y empieza desde `0`:
- `0` = primera opción
- `1` = segunda opción
- `2` = tercera opción
- `3` = cuarta opción

Puedes modificar el tiempo y la puntuación desde las constantes al inicio de `js/app.js`.
