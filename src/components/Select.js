import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateFileSelect } from '../redux/fileSlice';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export const SelectComponent = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  const handleChange = (event) => {
    const itemSelect = event.target.value;
    dispatch(updateFileSelect(itemSelect === 'All' ? undefined : itemSelect));
  }

  return (
    <Container>
      <Form.Select className="mt-2" onChange={handleChange}>
        <option key={"All"}>All</option>
        {files.map((item, index) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </Form.Select>
    </Container>
  )
}