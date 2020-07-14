# DStore API

Dstore es un API desarrollado para controlar las funciones de una tienda departamental; el sistema es capas de almacenar usuarios, productos, marcas y tickets. Los clientes podar hacer peticiones siempre y cuando estén autenticados como Administradores o Usuarios; este ultimo solo tendrá acceso a la vista de la información con excepción de los tickets que podrá generar siempre y cuando realice una compra.

La página que contiene la documentación fue desarrollada en GitHub Pages, la puedes encontrar Aquí: [DStore Docs](https://developeromega.github.io/DStoreDocs/)

## Iniciar proyecto

#### Clonar proyecto:

```bash
git clone https://github.com/developerOmega/departament-store-api.git
```

#### instalar dependencias:

```bash
npm install
```
O
```bash
yarn
```

#### ejecutar aplicación en nodejs:

```bash
node start
``` 

## Requerimientos
- La aplicación está desarrollada en NodeJs y Express.
- Se utilizo PostgreSQL para desarrollar la base de datos.
- Para realizar las peticiones a la base de datos se utiliza el ORM Sequelize (Para más información, consultar en la [documentación](https://sequelize.org/))
- La información está protegida con el estándar JWT (JSON Web Token)
- Para configurar la base de datos y Sequelize, se modifica en `/config/config.js`
- Para configurar las variables de entorno, se modifican en `/server/config/config.js`
- Para configurar los modelos, se modifican en `/models`
- Para configurar los seeders, se modifican en `/seeders`
- Para modificar las rutas, se modifican en `/server/routes/v1/`
- Para consultar la lista de dependencias, ingresar en package.json
