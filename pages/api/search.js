import axios from "axios";

export default async function handler(req, res) {
  //   const options = {
  //     method: "GET",
  //     url: `https://hapi-books.p.rapidapi.com/search/${req.query.title}`,
  //     headers: {
  //       "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
  //       "X-RapidAPI-Key": "2a99c8f368msh72cedc0a92effbap1e326djsn7d451f2ba3de",
  //     },
  //   };
  try {
    let response = await axios(
      `https://hn.algolia.com/api/v1/search?query=${req.query.title}`
    );

    res.status(200).json(response.data.hits);
  } catch (error) {
    console.error(error.response);
  }
}
