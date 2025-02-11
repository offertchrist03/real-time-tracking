import L from "leaflet";

// Fonction pour créer une icône personnalisée pour la carte Leaflet
export function mapPin({ last = false, start = false }) {
  const customIcon = L.divIcon({
    className: "custom-icon",
    html: `<span style="background-color: yellow; border: 3px solid ${
      start ? "orangered" : last ? "#1d4ed8" : "#ffcc00"
    }; box-sizing: border-box; border-radius: 50%; width: 30px; height: 30px; display: inline-block; text-align: center; line-height: 30px;"></span>`,
    // Icône en forme de cercle jaune avec une bordure colorée selon les paramètres (orangered pour la position initiale et / ou bleu pour la position actuele)

    iconSize: [30, 30], // Taille de l'icône
    iconAnchor: [15, 15], // Centre de l'icône aligné avec la position sur la carte
    popupAnchor: [0, -15], // Position du popup au-dessus de l'icône
  });

  return customIcon;
}
