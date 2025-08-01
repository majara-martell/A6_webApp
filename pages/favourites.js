import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

    //avoid showing an incorrect nothing here msg:
  if (typeof favouritesList === 'undefined') return null;

  if (favouritesList.length === 0) {
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          <p>Try adding some new artwork to the list.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row className="gy-4">
      {favouritesList.map((currentObjectID) => (
        <Col lg={3} key={currentObjectID}>
          <ArtworkCard objectID={currentObjectID} />
        </Col>
      ))}
    </Row>
  );
}
