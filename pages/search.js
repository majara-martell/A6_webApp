import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';


export default function AdvancedSearch() {

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = async (data) => {
    let queryString = `searchBy=true`;
    
    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  };

  return (
    <>
      <h1>Advanced Search</h1>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Search Query"
            {...register("q", { required: true })}
            className={errors.q ? "is-invalid" : ""}
          />
          {errors.q && <div className="invalid-feedback">This field is required</div>}
          
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Search By</Form.Label>
          <Form.Select {...register("searchBy")}>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Geo Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Geo Location"
            {...register("geoLocation")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medium</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Medium"
            {...register("medium")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="On View"
            {...register("isOnView")}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Highlight"
            {...register("isHighlight")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}