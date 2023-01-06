## Prueba-Eduardo
Proyecto para Encuestas.

# Instalar dependencias
Correr el comando `npm install` para instalar todas las dependencias necesarias para el uso correcto del proyecto.

# Instalar docker desktop
Es necesario descargar docker desktop para poder utilizar la base de datos de manera local. Para poder descargarlo es necesario ingresar al siguiente link `https://www.docker.com/products/docker-desktop/`.

# Base de datos
Para almacenar toda la información del proyecto usaremos la base de datos de MySQL.

# Sequelize ORM
Se estará utilizando el ORM de Sequelize. Para mayor información acerca del ORM visitar su documentación completa en `https://sequelize.org/` en su versión 6.

# Environments
Todas las variables de entorno estarán guardadas dentro del archivo `.env` que esta en la raíz del poroyecto.

# Ejecución en modo local
Primer debemos ejecutar el comando `docker-compose pull` para descargar las imagenes de la base de datos de MySQL y su adminer. Una vez finalizado el proceso, debemos ejecutar el comando `docker-compose up -d` para levantar las imagenes. Para confirmar que todo este correcto, navegaremos hacia `http://localhost:8080/` aquí nos pedirá usuario y contraseña para ingresar (las cuales estan en el archivo `.env`) en el nombre de la base de datos puede ir vacío.

# Crear base de datos
Una vez completado el paso anterior, procederemos a crear la base de datos con el nombre `apiencuestas`, en dado caso que el nombre sea diferente, favor de cambiar el nombre de la base en el archivo `.env`

# Migraciones
Una vez creada la base de datos, procedermos a ejecutar las migraciones con el comando `npm run migrate`.

# Migraciones
Una vez finalizadas las migraciones, procedermos a ejecutar los seeders con el comando `npm run seeders`.

# Ejecutar proyecto
Para inicializar el proyecto, ejecutaremos el comando `npm run dev` para levantar el proyecto, una vez en la consola nos confirme que todo es correcto, podremos hacer uso de postman para probar los diferentes end points.

## Swagger
Para poder ver todos los end points documentados con swagger es necesario ingresar al link de `http://localhost:3000/api/v1/documentation/`.

## Lista de las dependencias utilizadas
# bcrypt
Este paquete nos sirve para encriptar datos y desencriptarlos y es el que usamos para guardar las contraseñas.

# cors
Este paquete nos sirve para permitir que todo mundo sin restricción se conecte a nuestas apis. 

# dotenv
Este paquete nos sirve para poder tener un archivo con nuestras variables de entorno y poder ocultarlas a simple vista de los usuarios.

# express
Este paquete nos sirve para la creación de nuestros end points.

# jsonwebtoken
Este paquete nos sirve para generar tokens.

# mysql2
Este paquete nos sirve para conectarnos a la base de datos.

# nodemailer
Este paquete nos sirve para enviar correos a diferentes usuarios.

# pug
Este paquete nos sirve para convertir simple template a html ideal para crear plantillas y enviarlas por correo.

# sequelize
Este paquete nos sirve para modelar nuestras tablas en la base de datos, entre otras más funciones.

# shortid
Este paquete nos sirve para generar un id corto único e irrepetible.

# swagger-jsdoc
Este paquete nos sirve para documentar los end points.

# swagger-ui-express
Este paquete nos sirve para documentar los end points.

# validator
Este paquete nos sirve para validar la información que se envía en los diferentes end points.

# winston
Este paquete nos sirve para guardar los errores que tenga una consulta a la base de datos, hacia una función, etc.

## Lista de las dependencias de desarrollo utilizadas
# eslint
Este paquete nos sirve para validar las buenas practicas de programación, por ejemplo, que tenga cierta identación, que no tenga console.log, etc.

# jest y supertest
Estos paquetes nos sirven para poder realizar las pruebas unitarias de nuestros end points creados.

# nodemon
Este paquete nos sirve para que nuestro proyecto se este reiniciando constantemente cuando detecte un cambio en los archivos establecidos.

# husky
Este paquete nos ayuda a validar que antes de realizar un commit hacia cualquier rama, deben ejecutarse los comandos indicados, por ejemplo, en este proyecto, antes de hacer el commit se ejecután los script `npm run lint` y `npm run test` si ambos script logran pasar con éxito, se hará el commit, de lo contrario marcara un error indicando donde esta el problema.