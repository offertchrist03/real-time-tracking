import pg from "pg";
import dotenv from "dotenv";

// Chargement des variables d'environnement
dotenv.config();

// Création d'une pool de connexions à PostgreSQL en utilisant les variables d'environnement
const pool = new pg.Pool({
  user: process.env.DB_USER, // Nom d'utilisateur pour la base de données
  host: process.env.DB_HOST, // Hôte de la base de données (ex: localhost, serveur distant)
  database: process.env.DB_NAME, // Nom de la base de données
  password: process.env.DB_PASS, // Mot de passe de l'utilisateur
  port: process.env.DB_PORT, // Port utilisé pour la connexion (par défaut : 5432)
});

// Exportation de la pool de connexions pour l'utiliser dans d'autres fichiers
export default pool;
