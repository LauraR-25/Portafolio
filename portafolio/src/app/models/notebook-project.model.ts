export interface NotebookProject {
  id: number;
  title: string;
  gif: string;
  description: string;
  repositoryUrl: string;
  aspect: string;
}

export const NOTEBOOK_PROJECTS: NotebookProject[] = [
  {
    id: 1,
    title: 'Contacto Frameworks',
    gif: 'assets/gifs/ContactoFrameworks.gif',
    description: 'Formulario de contacto construido con un stack de frameworks modernos, validación en tiempo real y diseño totalmente responsivo.',
    repositoryUrl: 'https://github.com/LauraR-25/ContactoFrameworks',
    aspect: 'aspect-video',
  },
  {
    id: 2,
    title: 'Diseñador de Procedimientos',
    gif: 'assets/gifs/DisenadorProcedimientos.gif',
    description: 'Herramienta visual para diseñar y documentar procedimientos paso a paso, con diagramas interactivos y exportación sencilla.',
    repositoryUrl: 'https://github.com/LauraR-25/Proyecto-Sistemas-Operativos',
    aspect: 'aspect-video',
  },
  {
    id: 3,
    title: 'Juego POO',
    gif: 'assets/gifs/JuegoPOO.gif',
    description: 'Mini videojuego educativo desarrollado con Programación Orientada a Objetos para repasar conceptos jugando.',
    repositoryUrl: 'https://github.com/LauraR-25/MiniJuegoPOO',
    aspect: 'aspect-square',
  },
  {
    id: 4,
    title: 'Visualizador de Tiempo',
    gif: 'assets/gifs/VisualizadorTiempo.gif',
    description: 'Aplicación para visualizar y comparar intervalos de tiempo con gráficas animadas e interactivas.',
    repositoryUrl: 'https://github.com/LauraR-25/AngularProject',
    aspect: 'aspect-video',
  },
];
