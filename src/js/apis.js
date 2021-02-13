// Return an array of objects
const fetchData = async () => {
  try {
    const response = await fetch('https://picsum.photos/v2/list');
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

const getURLs = async () => {
  try {
    const response = await fetchData();
    return response.map((item) => item.download_url);
  } catch (err) {
    console.error(err);
  }
};

export {getURLs};
