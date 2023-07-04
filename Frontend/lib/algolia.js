const call = async (searchTerm) => {
  const url = `https://LKQSISUJ6U-dsn.algolia.net/1/indexes/Umbraco and Contentful demo/query`;
  const response = await fetch(new Request(url), {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Algolia-Application-Id": "LKQSISUJ6U",
      "X-Algolia-API-Key": "843751a9231559694f75a546bcb0bfe1",
    },
    body: JSON.stringify({ "params": `query='${searchTerm}'&hitsPerPage=10` })
  });
  return response.json();
};

export const searchAlgolia = async (searchTerm) => {
  const response = await call(searchTerm);
  return response;
};
