import express from "express";
import pool from "./config.mjs";
import { generateNextCoordinate, generateRandomCoordinate } from "./utils.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const INTERVAL = process.env.INTERVAL;

app.use(express.json());

// Fonction qui récupère les utilisateurs et leurs dernières coordonnées enregistrées dans la base de données.
const getPeople = async () => {
  try {
    const people = [];
    const { rows } = await pool.query(
      "SELECT id, name FROM users WHERE role=$1",
      ["user"]
    );

    // Position initiale par défaut (exemple : Antananarivo)
    const initialLatitude = -18.8792;
    const initialLongitude = 47.5079;

    for (let person of rows) {
      // Récupérer les deux dernières coordonnées enregistrées de l'utilisateur
      const { rows: lastCoordinates, rowCount: lastCoordinatesCount } =
        await pool.query(
          "SELECT * FROM movements WHERE user_id = $1 ORDER BY movement_at DESC LIMIT 2",
          [person.id]
        );

      // Affichage des dernières coordonnées pour débogage
      // console.log("lastCoordinates[0] =>", lastCoordinates[0]);
      // console.log("lastCoordinates[1] =>", lastCoordinates[1]);

      // Définir les coordonnées précédentes si disponibles
      if (lastCoordinates && lastCoordinates[1]) {
        person.prevLatitude = lastCoordinates[1].latitude;
        person.prevLongitude = lastCoordinates[1].longitude;
      }

      // Définir les coordonnées actuelles (utiliser les dernières enregistrées ou les coordonnées initiales par défaut)
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
    console.log("⚠️ Aucun utilisateur trouvé.");
    return [];
  }
};

// Fonction qui met à jour la position des utilisateurs
const updateLocation = async () => {
  try {
    // Récupérer la liste des utilisateurs
    const people = await getPeople();

    // Vérifier si des utilisateurs existent
    if (!(people && people.length > 0)) {
      console.log("⚠️ Aucun utilisateur trouvé pour mise à jour.");
      return;
    }

    // Stocker les nouvelles coordonnées insérées
    let moves = [];

    for (let person of people) {
      // Définir les coordonnées précédentes
      const prevCoord = {
        latitude: person.prevLatitude,
        longitude: person.prevLongitude,
      };

      // Définir les coordonnées actuelles
      const currentCoord = {
        latitude: person.latitude,
        longitude: person.longitude,
      };

      // Fonction pour obtenir les nouvelles coordonnées
      const getNextCoord = () => {
        if (
          prevCoord.latitude &&
          prevCoord.longitude &&
          currentCoord.latitude &&
          currentCoord.longitude
        ) {
          // 📍 Génération de coordonnées adjacentes (déplacement plus réaliste)
          return generateNextCoordinate(prevCoord, currentCoord);
        } else {
          // 📍 Génération de coordonnées aléatoires (point initial)
          return generateRandomCoordinate(
            currentCoord.latitude,
            currentCoord.longitude
          );
        }
      };

      // Générer la nouvelle position
      const nextCoord = getNextCoord();

      // Préparer les données à insérer dans la base de données
      const move = {
        user_id: person.id,
        latitude: nextCoord.latitude,
        longitude: nextCoord.longitude,
      };

      // Insérer les nouvelles coordonnées dans la base de données
      await pool.query(
        "INSERT INTO movements (user_id, latitude, longitude) VALUES ($1, $2, $3)",
        [move.user_id, move.latitude, move.longitude]
      );

      moves.push(move);
    }

    console.log("✅ Mouvements mis à jour : ", moves.length);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour des positions :", error);
    return null;
  }
};

// Service qui met à jour les mouvements des utilisateurs toutes les <INTERVAL> millisecondes
setInterval(updateLocation, INTERVAL);

// Démarrer le serveur Express
app.listen(PORT, () => {
  console.log(
    `📡 Microservice démarré sur le port : ${PORT} (mise à jour toutes les ${INTERVAL}ms) 🚀`
  );
});
