/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";
//Required modules

Route.get("/", async ({ view }) => {
  return view.render("welcome");
}).as('HomePages');

Route.get("/profile", async ({ view }) => {
  return view.render("profile");
});

Route.get('/profil', 'HomePagesController.profil').as('profil')


// Route.get('/', 'HomePagesController.index').as('HomePages')
Route.get('/wallet', 'HomePagesController.wallet').as('wallet')
Route.get('/createNft', 'HomePagesController.createNft').as('createNft')
Route.get('/login', 'HomePagesController.login').as('login')
Route.get('/register', 'HomePagesController.register').as('register')



Route.group(() => {
  Route.get("/addfile", "IpfsManagersController.store");
  
  Route.post("/addfile", "IpfsManagersController.store");


  Route.get("/getfile", "IpfsManagersController.getfilewithhash" );

}).prefix("/ipfs/");


Route.get("/*", async ({ view }) => {
  return view.render("welcome");
});