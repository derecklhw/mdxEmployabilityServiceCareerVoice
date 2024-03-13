import { Client } from "@googlemaps/google-maps-services-js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({});

export async function getGoogleMaps(location) {
  const response = await client.textSearch({
    params: {
      query: location,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });
  let iframe = `<iframe 
        src="https://www.google.com/maps/embed/v1/place?q=place_id:${response.data.results[0].place_id}&key=${process.env.GOOGLE_MAPS_API_KEY}" 
        width="450" 
        height="250" 
        frameborder="0"
        style="border:0;" 
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen>
    </iframe>`;
  return iframe;
}
