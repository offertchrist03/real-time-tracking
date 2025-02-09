import express from "express";
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
    const { rows } = await pool.query(
      "SELECT id, name FROM users WHERE role=$1",
      ["user"]
    );

    // Position initiale  (exemple : Antananarivo)
    const initialLatitude = -18.8792;
    const initialLongitude = 47.5079;

    for (let person of rows) {
      // recuperer le dernier coordonees
      const { rows: lastCoordinates, rowCount: lastCoordinatesCount } =
        await pool.query(
          "SELECT * FROM movements WHERE user_id = $1 ORDER BY movement_at DESC LIMIT 1",
          [person.id]
        );

      person.latitude = lastCoordinatesCount
        ? lastCoordinates[0].latitude
        : initialLatitude;
      person.longitude = lastCoordinatesCount
        ? lastCoordinates[0].longitude
        : initialLongitude;

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
