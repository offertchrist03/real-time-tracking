import express from "express";
import pool from "./config.mjs";
import { generateRandomCoordinate } from "./utils.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const INTERVAL = process.env.INTERVAL || 5000;

app.use(express.json());

// recuperer les utilisateurs dans la base de donnee
const getPeople = async () => {
  try {
    const { rows } = await pool.query("SELECT id, name FROM users");

    return rows;
  } catch (error) {
    return [];
  }
};

const people = await getPeople();

const updateLocation = async () => {
  if (!(people && people.length > 0)) {
    console.log("no people");
    return;
  }

  // Position initiale (exemple : Antananarivo)
  const initialLatitude = -18.8792;
  const initialLongitude = 47.5079;

  for (let person of people) {
    person.latitude = initialLatitude;
    person.longitude = initialLongitude;

    const { latitude, longitude } = generateRandomCoordinate(
      person.latitude,
      person.longitude
    );

    person.latitude = latitude;
    person.longitude = longitude;

    await pool.query(
      "INSERT INTO movements (user_id, latitude, longitude) VALUES ($1, $2, $3)",
      [person.id, latitude, longitude]
    );

    console.log(
      `${person.name} : { latitude:${latitude}, longitude:${longitude} }`
    );
  }

  console.log(`All Locations updated`);
};

// 📌 Route pour récupérer tous les utilisateurs
app.get("/mouvements", async (req, res) => {
  try {
    setInterval(updateLocation, INTERVAL);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des mouvements des utilisateurs :"
    );
  }
});

app.listen(PORT, () => {
  console.log(`Microservice running on port ${PORT}`);
});
