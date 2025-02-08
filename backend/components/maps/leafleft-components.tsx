import L from "leaflet";

export function mapPin({ last = false, start = false }) {
  const customIcon = L.divIcon({
    className: "custom-icon",
    html: `<span style="background-color: yellow; border: 3px solid ${
      start ? "orangered" : last ? "#1d4ed8" : "#ffcc00"
    }; box-sizing: border-box; border-radius: 50%; width: 30px; height: 30px; display: inline-block; text-align: center; line-height: 30px;"></span>`, // <span> rond et jaune
    iconSize: [30, 30], // Taille de l'icône
    iconAnchor: [15, 15], // Point d'ancrage de l'icône
    popupAnchor: [0, -15], // Position du popup
  });

  return customIcon;
}
