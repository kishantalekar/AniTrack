import axios from 'axios';

export const SearchUrl = (query: string) =>
  `https://aniwatch.to/search?keyword=${query}`;

export async function getTrendingData() {
  try {
    const data = (await axios.get('http://127.0.0.1:8000/trending')).data;
    // console.log(data.trending_data[0]);
    return data;
  } catch (error: any) {
    console.log(error.message);
    console.log(error);
  }
}

export async function getFeaturedData() {
  try {
    const data = (await axios.get('http://127.0.0.1:8000/featured')).data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    console.log(error);
  }
}

export async function getAnimeByUrl(url: string) {
  try {
    const data = (await axios.get(`http://127.0.0.1:8000/anime/${url}`)).data;

    return data['anime_info'];
  } catch (error: any) {
    console.log(error.message);
    console.log(error);
  }
}
export async function getSchedules() {
  try {
    const data = (await axios.get(`http://127.0.0.1:8000/schedules`)).data;

    return data;
  } catch (error: any) {
    console.log(error.message);
    console.log(error);
  }
}

export async function getSearchQueryData(searchQuery: string) {
  try {
    const data = (
      await axios.get(`http://127.0.0.1:8000/search/${searchQuery}`)
    ).data;
    return data;
  } catch (error) {
    throw error;
  }
}
