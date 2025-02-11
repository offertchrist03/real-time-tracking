import express from "express";
import pool from "./config.mjs";
import { generateNextCoordinate, generateRandomCoordinate } from "./utils.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const INTERVAL = process.env.INTERVAL;

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
          "SELECT * FROM movements WHERE user_id = $1 ORDER BY movement_at DESC LIMIT 2",
          [person.id]
        );

      // set previous lat and long
      console.log("lastCoordinates[0] =>", lastCoordinates[0]);
      console.log("lastCoordinates[1] =>", lastCoordinates[1]);

      if (lastCoordinates && lastCoordinates[1]) {
        person.prevLatitude = lastCoordinates[1].latitude;
        person.prevLongitude = lastCoordinates[1].longitude;
      }

      // set current coordonates if not get initials
      person.latitude =
        lastCoordinatesCount && lastCoordinates[0]
          ? lastCoordinates[0].latitude
          : initialLatitude;
      person.longitude =
        lastCoordinatesCount && lastCoordinates[0]
          ? lastCoordinates[0].longitude
          : initialLongitude;

      people.push(person);
    }

    return people;
  } catch (error) {
    return [];
  }
};

const updateLocation = async () => {
  // recuperer les utilisateurs
  const people = await getPeople();

  if (!(people && people.length > 0)) {
    console.log("no people");
    return [];
  }

  // stock les coordonées que l'on vient d'inserer
  let moves = [];

  for (let person of people) {
    // obtenir les coordonées précedentes
    const prevCoord = {
      latitude: person.prevLatitude,
      longitude: person.prevLongitude,
    };

    // obtenir les coordonées actueles
    const currentCoord = {
      latitude: person.latitude,
      longitude: person.longitude,
    };

    const getNextCoord = () => {
      if (
        prevCoord.latitude &&
        prevCoord.longitude &&
        currentCoord.latitude &&
        currentCoord.longitude
      ) {
        console.log("generateNextCoordinate()");
        return generateNextCoordinate(prevCoord, currentCoord);
      } else {
        console.log("generateRandomCoordinate()");
        return generateRandomCoordinate(
          currentCoord.latitude,
          currentCoord.longitude
        );
      }
    };

    // génère les nouveaux coordonée
    const nextCoord = getNextCoord();

    const move = {
      user_id: person.id,
      latitude: nextCoord.latitude,
      longitude: nextCoord.longitude,
    };

    // inserer les nouveaux coordonees
    await pool.query(
      "INSERT INTO movements (user_id, latitude, longitude) VALUES ($1, $2, $3)",
      [move.user_id, move.latitude, move.longitude]
    );

    moves.push(move);
  }

  console.log(moves);
  return moves;
};

// service qui génère les mouvements des utilisateurs pendant toutes les <INTERVAL> (secondes)
setInterval(updateLocation, INTERVAL);

app.listen(PORT, () => {
  console.log(
    `Microservice running on port : ${PORT} ( update interval : ${INTERVAL}ms )`
  );
});
