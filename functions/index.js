const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.notificarCambioJugador = functions.firestore
  .document("players/{playerId}")
  .onWrite(async (change, context) => {
    const isNew = !change.before.exists;

    if (!change.after.exists) {
      console.log("Jugador eliminado, no se envía notificación.");
      return null;
    }

    const player = change.after.data();

    const titulo = isNew
      ? "Nuevo jugador añadido"
      : "Jugador actualizado";

    const nombre = player.nombre || player.name || "Jugador";
    const apellidos = player.apellidos || player.surname || "";

    const mensaje = `${nombre} ${apellidos}`.trim();

    const message = {
      notification: {
        title: titulo,
        body: mensaje,
      },
      data: {
        playerId: context.params.playerId,
      },
      topic: "players",
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Notificación enviada correctamente:", response);
      return response;
    } catch (error) {
      console.error("Error enviando la notificación:", error);
      return null;
    }
  });