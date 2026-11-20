# 🚀 Nexxus — Blog API con Fetch & Axios

<div align="center">
  <table>
    <tr>
      <td bgcolor="#4c1d95" align="center" style="background:#8b5cf6;border: 2px solid #8b5cf6; border-radius: 12px; padding: 12px;">
        <img src="/public/assets/giff-readme.gif" alt="Banner Nexxus" width="520" />
      </td>
    </tr>
  </table>
</div>

¡Bienvenidos a **Nexxus!** Una aplicación web de blogs desarrollada en TypeScript para explorar publicaciones, buscar contenido en tiempo real, navegar con paginación sincronizada en la URL y comparar el consumo de APIs mediante **Fetch** y **Axios**. Todo con una interfaz limpia, rápida y respaldada por algunas pruebas unitarias. ✨

### 🛠️ ¿Qué tecnologías usamos aquí?

- **Lenguajes**<br><br>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />

- **Estilos**<br><br>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />

- **Consumo de API & Herramientas**<br><br>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />

### ✨ Funcionalidades principales

- **Doble cliente HTTP (`Fetch` y `Axios`):** consume los posts centralizando peticiones, cabeceras (`X-Total-Count`) y manejo de errores.
- **Buscador con debounce:** filtra publicaciones de forma fluida y reinicia automáticamente a la página `1` al realizar una búsqueda.
- **Paginación y sincronización en URL:** mantiene `?q=` y `?page=` sincronizados, con control de límites (_clamping_) y estados vacíos o sin resultados.

### 🛠️ ¿Cómo ponerlo en marcha en tu ordenador?

1. Clona este repositorio:

```
git clone [https://github.com/tu-usuario/Nexxus.git](https://github.com/tu-usuario/Nexxus.git)

```

2. Entra a la carpeta del proyecto e instala las dependencias:

```
cd Nexxus
npm install

```

3.  Arranca el proyecto:
    3.1. Compila TypeScript en modo observación:

            ```
            npx tsc --w

            ```

    3.2. Inicia el servidor de desarrollo local:

            ```
                    npm run dev

            ```

¡Y listo! Ya podrás abrir la web en tu navegador y empezar a explorar. 🌟

### 🛠️ 🧪 Pruebas automáticas (Tests)

Para asegurarnos que el código esté limpio y sin errores. Por eso, tenemos pruebas unitarias para revisar que las tarjetas se pinten bien y que el buscador filtre correctamente a los usuarios.

1. Para ejecutar las pruebas en tu terminal, solo escribe:

    ```

     npm test

    ```

Un proyecto hecho para aprender y practicar desarrollo web con TypeScript, arquitectura modular, sincronización de estado en la URL y pruebas automatizadas. ¡A disfrutar del código! 🚀
