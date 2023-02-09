

//! dubricated
export async function _getToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_SECRET), //base64
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();

  try {
    return `${data.token_type} ${data.access_token}`;
  } catch (err) {
    console.log(err);
  }
}

export async function _getArtists(token: string, ids: Array<string>) {
  const res = await fetch(
    `https://api.spotify.com/v1/artists?ids=${ids.join(",")}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await res.json();
  return data;
}

export const _getAlbums = async (token: string, id: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: token,
    },
  });

  try {
    const data = await res.json();
    return data;

  } catch (error) {
    console.log(error)
  }


};

export const _getAlbumsAndTracks = async (token: string, ids: Array<string>) => {
  const res = await fetch(
    `https://api.spotify.com/v1/albums?ids=${ids.join(",")}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
    }
  );

  const data = res.json();

  return data;
};