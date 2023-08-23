import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';

export const TableComponent = () => {
  const lines = useSelector((state) => state.files.lines);

  return (
    <Container>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
          {lines.length > 0 && (
            <tbody>
              {lines.map((item, index) => (
                <tr key={index}>
                  <td>{item.file}</td>
                  <td>{item.text}</td>
                  <td>{item.number}</td>
                  <td>{item.hex}</td>
                </tr>
              ))}
            </tbody>
          )}
      </Table>
    </Container>
  )
}