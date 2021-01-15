const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.status(200).json(repositories)

});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repositorie = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  }

  repositories.push(repositorie);

  return response.status(200).json(repositorie)

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);


  if(repositorieIndex < 0){

    return response.status(400).json({ error: "Repositorio não encontado" })
  
  }

  // const repositorie = repositories[repositorieIndex];

  const repositorie = {
    id,
    title,
    url,
    techs,
  }

  repositorie.likes = repositories[repositorieIndex].likes;
  repositories[repositorieIndex] = repositorie;




  return response.status(200).json(repositorie);
  

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);


  if(repositorieIndex < 0){

    return response.status(400).json({ error: "Repositorio não encontado" })
  
  }
// tirando do array. primeiro passa o indece que quer remover, e quantas posições que remover a partir desse indice, como so quer remover ele, passa 1
  repositories.splice(repositorieIndex, 1)

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const {id} = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({ error: "Repositorio não encontrado, não foi possivel dar like " })
  }

  const repositorie = repositories[repositorieIndex];

  repositorie.likes += 1;

  return response.status(200).json(repositorie);

});

module.exports = app;
