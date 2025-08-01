import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { useRouter } from 'next/router';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null; 

  const parsedHistory = searchHistory.map(h => {
    const params = new URLSearchParams(h);
    return Object.fromEntries(params.entries());
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  if (searchHistory.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>No search history available</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <ListGroup>
      {parsedHistory.map((historyItem, index) => (
        <ListGroup.Item
          key={index}
          className={styles.historyListItem}
          onClick={e => historyClicked(e, index)}
        >
          {Object.keys(historyItem).map(key => (
            <span key={key}>
              {key}: <strong>{historyItem[key]}</strong>&nbsp;
            </span>
          ))}
          <Button
            className="float-end"
            variant="danger"
            size="sm"
            onClick={e => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
