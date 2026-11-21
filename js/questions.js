// Banco de preguntas del quiz de historia.
// correctAnswer indica el índice de la respuesta correcta (empieza desde 0).
const quizQuestions = [
    {
        category: "ANTIGÜEDAD",
        question: "¿En qué región se desarrolló la civilización del antiguo Egipto?",
        answers: ["A orillas del río Nilo", "En la península ibérica", "En el valle del río Indo", "En las islas griegas"],
        correctAnswer: 0,
        explanation: "La civilización egipcia surgió y prosperó a lo largo del río Nilo, cuya crecida favorecía la agricultura."
    },
    {
        category: "ANTIGÜEDAD",
        question: "¿Cuál era la principal ciudad-estado asociada con el nacimiento de la democracia en la antigua Grecia?",
        answers: ["Esparta", "Atenas", "Troya", "Corinto"],
        correctAnswer: 1,
        explanation: "Atenas desarrolló una forma temprana de democracia en la que los ciudadanos varones podían participar en decisiones políticas."
    },
    {
        category: "ANTIGÜEDAD",
        question: "¿Quién fue el primer emperador romano?",
        answers: ["Julio César", "Nerón", "Augusto", "Constantino"],
        correctAnswer: 2,
        explanation: "Octavio Augusto se convirtió en el primer emperador romano en el año 27 a. C., después del fin de la República."
    },
    {
        category: "EDAD MEDIA",
        question: "¿En qué año suele situarse la caída del Imperio romano de Occidente?",
        answers: ["476 d. C.", "1492 d. C.", "711 d. C.", "1453 d. C."],
        correctAnswer: 0,
        explanation: "El año 476 d. C. marca tradicionalmente la caída del Imperio romano de Occidente, cuando fue depuesto Rómulo Augústulo."
    },
    {
        category: "EDAD MEDIA",
        question: "¿Qué acontecimiento comenzó en 1096 y tuvo como objetivo religioso recuperar Tierra Santa?",
        answers: ["La Guerra de los Cien Años", "Las Cruzadas", "La Reconquista de Granada", "La Guerra de las Rosas"],
        correctAnswer: 1,
        explanation: "Las Cruzadas fueron expediciones militares impulsadas por motivos religiosos y políticos, dirigidas principalmente hacia Tierra Santa."
    },
    {
        category: "EDAD MODERNA",
        question: "¿En qué año llegó Cristóbal Colón a América?",
        answers: ["1453", "1519", "1492", "1607"],
        correctAnswer: 2,
        explanation: "La expedición de Cristóbal Colón llegó al Caribe el 12 de octubre de 1492, dando inicio a un proceso de contacto y conquista europea."
    },
    {
        category: "EDAD MODERNA",
        question: "¿Qué movimiento cultural e intelectual europeo promovió el regreso al estudio del arte y el pensamiento de la Antigüedad clásica?",
        answers: ["La Revolución Industrial", "El Renacimiento", "La Guerra Fría", "La Reforma protestante"],
        correctAnswer: 1,
        explanation: "El Renacimiento impulsó las artes, las ciencias y el humanismo, inspirándose en gran medida en las culturas griega y romana."
    },
    {
        category: "HISTORIA CONTEMPORÁNEA",
        question: "¿En qué año comenzó la Revolución francesa?",
        answers: ["1776", "1810", "1848", "1789"],
        correctAnswer: 3,
        explanation: "La Revolución francesa comenzó en 1789 y transformó profundamente la política y la sociedad de Francia y de Europa."
    },
    {
        category: "HISTORIA CONTEMPORÁNEA",
        question: "¿Qué acontecimiento se considera el detonante inmediato de la Primera Guerra Mundial?",
        answers: ["La invasión de Polonia", "El asesinato del archiduque Francisco Fernando", "La Revolución rusa", "La caída del muro de Berlín"],
        correctAnswer: 1,
        explanation: "El asesinato del archiduque Francisco Fernando de Austria en Sarajevo, el 28 de junio de 1914, desencadenó una crisis que llevó a la guerra."
    },
    {
        category: "HISTORIA CONTEMPORÁNEA",
        question: "¿En qué año cayó el Muro de Berlín, símbolo de la división de Alemania durante la Guerra Fría?",
        answers: ["1961", "1989", "1991", "1945"],
        correctAnswer: 1,
        explanation: "El Muro de Berlín cayó el 9 de noviembre de 1989, en medio de cambios políticos que precedieron a la reunificación alemana."
    }
];
