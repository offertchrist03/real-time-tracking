import express, { json } from "express";
import pool from "./config.mjs";
import { generateRandomCoordinate } from "./utils.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const INTERVAL = process.env.INTERVAL || 5000;

app.use(express.json());

// fonction qui recupere les utilisateurs et leurs dernier coordonnees dans la base de donnee
const getPeople = async () => {
  try {
    const people = [];
    const { rows } = await pool.query("SELECT id, name FROM users");

    // Position initiale si aucun dernier coordonnee (exemple : Antananarivo)
    const initialLatitude = -18.8792;
    const initialLongitude = 47.5079;

    for (let person of rows) {
      person.latitude = initialLatitude;
      person.longitude = initialLongitude;
      people.push(person);
    }

    return people;
  } catch (error) {
    return [];
  }
};

// recuperer les utilisateurs
const people = await getPeople();

const updateLocation = async () => {
  if (!(people && people.length > 0)) {
    console.log("no people");
    return [];
  }

  let moves = [];

  for (let person of people) {
    const { latitude, longitude } = generateRandomCoordinate(
      person.latitude,
      person.longitude
    );

    person.latitude = latitude;
    person.longitude = longitude;

    const move = { user_id: person.id, latitude, longitude };

    // changer les coordonees
    await pool.query(
      "INSERT INTO movements (user_id, latitude, longitude) VALUES ($1, $2, $3)",
      [move.user_id, move.latitude, move.longitude]
    );

    moves.push(move);
  }

  console.log(moves);
  return moves;
};

// Route pour récupérer les mouvements des utilisateurs
setInterval(updateLocation, INTERVAL);

app.listen(PORT, () => {
  console.log(`Microservice running on port : ${PORT}`);
});
