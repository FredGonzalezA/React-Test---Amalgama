1. La implementación actual simplifica el código al eliminar la necesidad de rastrear y filtrar explícitamente duplicados basados en IDs. Al actualizar directamente el estado con los nuevos datos del servidor, se hace más claro y fácil de entender.
2. Dado que las respuestas de la API contienen la lista completa de elementos, no es necesario realizar operaciones adicionales para fusionar datos o filtrar duplicados. 
3. Al no necesitar comparar IDs y filtrar duplicados, se eliminan algunas operaciones que se tendrian que ahcer de otra forma, mejorando el rendimiento.
4. Reemplazar el estado completo con un nuevo conjunto de datos (en lugar de modificar el que ya existe) es una buena práctica, sobretodo si se trata de una API. Ayudara a evitar problemas de inconsistencia y facilita el seguimiento de los cambios en el estado.