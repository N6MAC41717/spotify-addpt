import { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import useAPIRequest from '../../utils/useAPIRequest';
import LibraryContext from '../../context/library/libraryContext';

const SSEUpdate = ({ updArtists }) => {
  const [{ data, isError, isLoading }, setConfig] = useAPIRequest();

  const [artistArr, setArtistArr] = useState(null);

  const {
    artists,
    loadLibrary,
    currentArtist,
    setCurrentArtist,
    setCurrentAlbum
  } = useContext(LibraryContext);

  useEffect(() => {
    if (updArtists) {
      setArtistArr(updArtists);
      setConfig({
        url: '/api/library',
        method: 'get'
      });
    }
    if (data && !isError && !isLoading && artistArr) {
      loadLibrary(isError, data);
    }
    return () => {
      if (!currentArtist && data) {
        setArtistArr(null);
      }
    };
  }, [
    updArtists,
    data,
    isError,
    currentArtist,
    artists,
    artistArr,
    isLoading,
    setArtistArr,
    loadLibrary,
    setConfig
  ]);

  useEffect(() => {
    if (
      currentArtist &&
      artistArr &&
      artistArr.some(artistArrE => artistArrE === currentArtist._id)
    ) {
      const id = currentArtist._id;
      setCurrentAlbum(null);
      setCurrentArtist(artists.find(artistsE => artistsE._id === id));
      setArtistArr(null);
    }
    // eslint-disable-next-line
  }, [artists]);

  return null;
};

SSEUpdate.propTypes = {
  updArtists: PropTypes.array
};

export default SSEUpdate;
