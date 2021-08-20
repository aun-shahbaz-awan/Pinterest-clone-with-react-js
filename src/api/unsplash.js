import axios from "axios";

export default axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID 91Z30vWVDrc1GLereYys4ZNPgqvzN2u7AIkKCeTZkhU"
    }
})