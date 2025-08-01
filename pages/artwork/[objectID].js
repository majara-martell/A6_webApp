import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ArtworkById() {
  const router = useRouter();
  let { objectID } = router.query;

  if (!router.isReady || !objectID) {
    return (
      <Row>
        <Col>
          <h1>Loading...</h1>
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}