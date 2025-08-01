import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import useSWR from 'swr'
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
  // Add the fetcher function
  const fetcher = url => fetch(url).then(res => res.json());
  
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher // ✅ Add the fetcher
  );
  
  // Add debug logging
  console.log(`🖼️ ArtworkCard ${objectID}:`, { data: !!data, error: !!error });
  
  if(error){
    console.error(`❌ ArtworkCard ${objectID} error:`, error);
    return <Error statusCode={404} /> 
  }

  if (data) {
    console.log(`✅ ArtworkCard ${objectID} loaded:`, data.title);
    return (
      <Card style={{ height: '100%' }}>
        <Card.Img
          variant="top"
          src={data.primaryImageSmall ? data.primaryImageSmall : 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png'}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{data.title || 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {data.objectDate || 'N/A'}<br />
            <strong>Classification:</strong> {data.classification || 'N/A'}<br />
            <strong>Medium:</strong> {data.medium || 'N/A'}
            <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
             <Button variant="outline-primary" size="sm"><strong>ID: </strong>{objectID}</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  } else {
    console.log(`⏳ ArtworkCard ${objectID} loading...`);
    return (
      <Card style={{ height: '100%' }}>
        <Card.Body>
          <Card.Text>Loading artwork...</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}