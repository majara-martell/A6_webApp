import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useState, useEffect } from 'react';

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  // Update showAdded whenever favouritesList changes
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    let updatedList;

    if (showAdded) {
      updatedList = await removeFromFavourites(objectID);
      setShowAdded(false);
    } else {
      updatedList = await addToFavourites(objectID);
      setShowAdded(true);
    }

    setFavouritesList(updatedList);
  };

  if (error) return <Error statusCode={404} />;

  if (data) {
    return (
      <Card>
        {data.primaryImage && (
          <Card.Img
            variant="top"
            src={data.primaryImage}
            style={{ height: '400px', objectFit: 'contain' }}
          />
        )}
        <Card.Body>
          <Card.Title>{data.title || 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {data.objectDate || 'N/A'}
            <br />
            <strong>Classification:</strong> {data.classification || 'N/A'}
            <br />
            <strong>Medium:</strong> {data.medium || 'N/A'}
            <br />
            <br />
            <strong>Artist:</strong> {data.artistDisplayName || 'N/A'}
            {data.artistDisplayName && data.artistWikidata_URL && (
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                (wiki)
              </a>
            )}
            <br />
            <strong>Credit Line:</strong> {data.creditLine || 'N/A'}
            <br />
            <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
            <br />
            <br />
            <Button
              style={{ backgroundColor: 'orange', color: 'black' }}
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              <strong>
                {showAdded ? '+ Favourite (added)' : '+ Favourite'}
              </strong>
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}
