let postRequest = (url, json, callback) => {
  console.log(json);
  let opts = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  };

  fetch(url, opts)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export {postRequest};
