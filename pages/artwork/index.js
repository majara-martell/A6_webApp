import validObjectIDList from '@/public/data/validObjectIDList.json';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();
  
  let finalQuery = router.asPath.split('?')[1];
  
  const fetcher = url => fetch(url).then(res => res.json());

  const { data, error } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null, fetcher
  );
  console.log('finalQuery:', finalQuery);
  console.log('data:', data);
  console.log('error:', error);

  function previousPage() {
    if (page > 1) {
      setPage(p => p - 1); // page - 1
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(p => p + 1) // page + 1
    }
  }

  useEffect(() => {
  if (data) {
    console.log('✅ Search data received:', data);
  }
  if (error) {
    console.error('❌ Search error:', error);
  }
  }, [data, error]);


  useEffect(() => {
  if (data) {
    console.log('🔍 Search returned:', data.objectIDs.length, 'IDs');
    
    // Create a Set from valid IDs for fast lookup
    const validIDsSet = new Set(validObjectIDList.objectIDs);
    
    // Filter the search results to keep only valid ones
    let filteredResults = data.objectIDs.filter(id => validIDsSet.has(id));
    
    console.log('✅ Valid matches found:', filteredResults.length);
    console.log('✅ First few valid IDs:', filteredResults.slice(0, 5));

    // Paginate the filtered results
    const results = [];
    for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
      const chunk = filteredResults.slice(i, i + PER_PAGE);
      results.push(chunk);
    }
    
    console.log('📦 Total pages:', results.length);
    console.log('📦 First page:', results[0]);
    
    setArtworkList(results);
    setPage(1);
  } else {
    setArtworkList([]);
  }
  }, [data]);

  if (!data && !error) {
    return <p>Loading search results...</p>; 
  }

  if (error) {
    return (
        <Card>
          <Card.Body>
            <Card.Text>
              <h4>Search Error</h4>
              <p>We couldn’t fetch results. Try a new query or check your connection.</p>
            </Card.Text>
          </Card.Body>
        </Card>
    );
    //return <Error statusCode={404} />;
  }

  if (artworkList) {
    console.log('🎨 RENDER: artworkList exists, length:', artworkList.length);
    console.log('🎨 RENDER: current page:', page);
    console.log('🎨 RENDER: current page data:', artworkList[page - 1]);
    
    return (
      <>
        {artworkList.length > 0 ? (
          <>
            <p>Debug: Showing {artworkList[page - 1]?.length} cards on page {page}</p>
            <Row className="gy-4">
              {artworkList[page - 1]?.map((currentObjectID) => {
                console.log('🖼️ Rendering card for ID:', currentObjectID);
                return (
                  <Col lg={3} key={currentObjectID}>
                    <ArtworkCard objectID={currentObjectID} />
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>
                <h4>Nothing Here</h4>
                <p>Try searching for something else.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        
        {artworkList.length > 0 && (
          <Row>
            <Col>
              <br />
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  } else {
    console.log('🎨 RENDER: artworkList is null/undefined');
    return null;
  }
  }