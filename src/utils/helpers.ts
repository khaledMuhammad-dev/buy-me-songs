import { ITrack } from "../store/data/data.reducer";


/**
 * 
 * @param duration_ms 
 * @returns 
 */
export const songDurationFormate = (duration_ms: number) => {
  const [min, sec] = ((duration_ms / 1000) / 60).toString().split(".");
  return `${min}:${Math.floor((Number(sec) / 1000) * 60)}`.slice(0, 4)
}


export const structureAlbumsState = (albums: any, artist_id: string) => {
  let albumsPayload = {}

  albums.forEach((album: any) => {
    const { name, id, images, total_tracks } = album;
    albumsPayload = { ...albumsPayload, [id]: { name, id, images, total_tracks, artist_id } }
  })

  return albumsPayload;
}

interface IAlbumTracksPayload {
  [key: string]: Array<ITrack>
}



/**
 * 
 * @param albumsWithTracks 
 * @param artist_id 
 * @returns 
 */
export const structureTracksState = (albumsWithTracks: any, artist_id: string) => {
  let tracksPayload = {}
  let albumTracksPayload: IAlbumTracksPayload = {};

  albumsWithTracks.forEach((album: any) => {
    const album_id = album.id;
    const images = album.images
    const tracks = album.tracks.items

    albumTracksPayload = { ...albumTracksPayload, [album_id]: [] }

    for (let track of tracks) {
      const { name, id, track_number, duration_ms } = track
      const tempTrack = {
        album_id,
        artist_id,
        name,
        id,
        track_number,
        duration_ms,
        images,
        price: Number((Math.random() * 3 + 1).toFixed(2))
      }

      tracksPayload = {
        ...tracksPayload,
        [id]: tempTrack
      }

      albumTracksPayload[album_id].push(tempTrack)
    }

  })

  return { tracksPayload, albumTracksPayload }
}



/**
 * 
 * @param e 
 * @param container 
 * @param lightBox 
 * @returns 
 */
export const lightBoxAnimation = (e: MouseEvent, container: HTMLDivElement, lightBox: HTMLDivElement) => {
  const { clientX: mouseX, clientY: mouseY } = e;
  if (!container || !lightBox) return;

  // container props
  const {
    x: containerX,
    y: containerY,
    width: containerWidth,
    height: containerHeight,
  } = container.getBoundingClientRect();

  // light box props
  const {
    width: lightBoxWidth,
    height: lightBoxHeight,
  } = lightBox.getBoundingClientRect();

  // handle X axis
  let offsetleft = mouseX - containerX;
  const maxX = containerX + containerWidth + containerWidth / 2 + 20;
  const minX = containerX - lightBoxWidth / 2 - 20;

  if (mouseX > maxX) offsetleft = maxX;
  else if (mouseX < minX) offsetleft = minX;
  else lightBox.style.left = offsetleft + "px";

  // handle Y axis
  let offsetTop = mouseY - containerY;
  const maxY = containerY + containerHeight + containerHeight / 2 + 20;
  const minY = containerY - lightBoxHeight / 2 - 20;

  if (mouseY > maxY) offsetTop = maxY
  else if (mouseY < minY) offsetTop = minY
  else lightBox.style.top = offsetTop + "px";

}