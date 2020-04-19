import { useState, useEffect } from 'react';

const useCurrentArtistUpdate = () => {
  const [artist, setArtist] = useState(null);
  const [params, setParams] = useState(null);
  const [album, setAlbum] = useState(null);
  const [track, setTrack] = useState(null);

  const getParams = params => {
    const { artistInit, albumID, trackID, listens } = params;
    const albumInit = artistInit.albums.find(album => album._id === albumID);
    const trackInit = trackID
      ? albumInit.tracks.find(track => track._id === trackID)
      : null;
    return { artistInit, albumInit, trackInit, listens };
  };

  const trackSorting = (a, b) => {
    return a.discNumber >= b.discNumber && a.number >= b.number ? 1 : 0;
  };

  useEffect(() => {
    if (params) {
      const { trackInit, listens } = getParams(params);

      if (trackInit) {
        setTrack({
          ...trackInit,
          isTracked: listens ? trackInit.isTracked : !trackInit.isTracked,
          listens: listens ? listens : trackInit.listens
        });
      }
    }
  }, [params]);

  useEffect(() => {
    if (params && track) {
      const { albumInit } = getParams(params);
      if (
        albumInit.tracks.filter(trackE => trackE.isTracked === true).length ===
          1 ||
        albumInit.tracks.every(trackE => trackE.isTracked === false)
      ) {
        setAlbum({
          ...albumInit,
          isTracked: track.isTracked,
          tracks: [
            ...albumInit.tracks.filter(trackE => trackE._id !== track._id),
            track
          ].sort(trackSorting)
        });
      } else {
        setAlbum({
          ...albumInit,
          tracks: [
            ...albumInit.tracks.filter(trackE => trackE._id !== track._id),
            track
          ].sort(trackSorting)
        });
      }
    } else if (params && !params.trackID) {
      const { albumInit } = getParams(params);
      setAlbum({
        ...albumInit,
        isTracked: !albumInit.isTracked,
        tracks: albumInit.tracks.map(trackE => {
          return { ...trackE, isTracked: !albumInit.isTracked };
        })
      });
    }
  }, [track, params]);

  useEffect(() => {
    if (params && album) {
      const { artistInit } = getParams(params);
      if (
        artistInit.albums.filter(albumE => albumE.isTracked === true).length ===
          1 ||
        artistInit.albums.every(albumE => albumE.isTracked === false)
      ) {
        setArtist({
          ...artistInit,
          isTracked: !artistInit.isTracked,
          albums: [
            ...artistInit.albums.filter(albumE => albumE._id !== album._id),
            album
          ]
        });
      } else {
        setArtist({
          ...artistInit,
          albums: [
            ...artistInit.albums.filter(albumE => albumE._id !== album._id),
            album
          ]
        });
      }
    }
  }, [album, params]);

  return [artist, setParams];
};

export default useCurrentArtistUpdate;