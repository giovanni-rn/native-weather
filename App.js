import { StatusBar } from "expo-status-bar"; // barre de notification
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"; // composants natifs
import axios from "axios"; // axios pour les requêtes API
import { useState } from "react"; // useState pour la ville à saisir et les infos à afficher

export default function App() {
  const [weather, setWeather] = useState(); // objet avec les infos météo
  const [location, setLocation] = useState(""); // ville pour l'API

  const fetchWeather = async () => {
    // fonction de recherche grâce à l'API
    const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: location, format: "json", u: "c" }, // reprend le state location et unité: celsius
      headers: {
        "X-RapidAPI-Key": "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options); // requête API
      setWeather(response.data); // ajoute l'objet au state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Grand titre */}
      <Text style={styles.header}>☀ WEATHER API</Text>
      {/* Formulaire */}
      <View style={styles.form}>
        {/* Champ de saisie */}
        <TextInput
          style={styles.input}
          placeholder="Ville"
          onChangeText={setLocation}
          defaultValue={location}
        />
        {/* Bouton de validation (lance l'API) */}
        <Pressable style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
      {/* Si l'API est chargé, afficher les infos */}
      {weather && (
        <View>
          {/* Ville et pays */}
          <Text style={styles.location}>
            {weather.location.city}, {weather.location.country}
          </Text>
          {/* Temps */}
          <Text style={styles.condition}>
            {weather.current_observation.condition.text}
          </Text>
          {/* Infos complémentaires */}
          <Text style={styles.infos}>
            🌡 Temperature : {weather.current_observation.condition.temperature}
            °c
          </Text>
          <Text style={styles.infos}>
            ☀ Sunrise : {weather.current_observation.astronomy.sunrise}
          </Text>
          <Text style={styles.infos}>
            💧 Humidity : {weather.current_observation.atmosphere.humidity}
          </Text>
        </View>
      )}
      {/* Barre de notification */}
      <StatusBar style="auto" />
    </View>
  );
}

// Style (à manipuler comme un objet)
const styles = StyleSheet.create({
  // Page principale
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // Grand titre
  header: {
    fontSize: 35,
    fontWeight: "bold",
  },
  // Formulaire
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginLeft: 52,
    marginRight: 45,
    marginBottom: 30,
    height: 70,
  },
  input: {
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    flex: 8,
    padding: 3,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 3,
    flex: 2,
    elevation: 4,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    padding: 5,
  },
  // Infos à afficher
  location: {
    fontSize: 35,
    textAlign: "center",
    marginBottom: 5,
  },
  condition: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  infos: {
    fontSize: 20,
    marginBottom: 1,
    textAlign: "center",
  },
});
