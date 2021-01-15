# Trabajo Aplicaciones Web para móviles.

## Configuración
El servidor de NodeJs utiliza como base de datos mongodb. Para que funcione correctamente hay que instalar mongodb y crear una bd llamada **my_db**.
Para el servidor de Parse la base de datos también es en mongodb y se tiene que llamar **parse_db**.

En la app movil te puedes registrar y logear y después craer tus tareas.

## Partes Optativas.

1. Service Workers. He hecho dos service workers. Uno se encuentra en la carpeta /public, este contiene archivos estáticos, como imágenes e iconos. Y el otro venía configurado con la creación de la aplicación de React, se encuentra en el directorio /src y está activado en /src/index.tsx

2. Servidor Parse. 
    2.1 Instalado y configurado en local. Esta configurado para usar mongoddb con una colección que tipo {"item" : "nombre item"}.


