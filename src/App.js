import React, { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function App() {
  const [files, setFiles] = useState([])
  const [lines, setLines] = useState([])
  const server = 'http://localhost:3000/v1'

  const fetchFileList = () => {
    fetch(`${server}/files/list`)
      .then(res => res.json())
      .then(data => setFiles(data.files))
  }

  const fetchFileData = (fileName) => {
    const queryString = fileName === '' ? '' : `?fileName=${fileName}`;
    fetch(`${server}/files/data${queryString}`)
      .then(res => res.json())
      .then(data => {
        if (data.code !== undefined) {
          alert(data.message)
        } else {
          const listFiles = [];
          for (const file of data) {
            if (file.lines.length > 0) {
              for (const line of file.lines) {
                listFiles.push({
                  file: file.file,
                  text: line.text,
                  number: line.number,
                  hex: line.hex
                });
              }
            } else {
              listFiles.push({
                file: file.file,
                text: '',
                number: '',
                hex: ''
              })
            }
          }
          setLines(listFiles)
        }
      })
  }

  useEffect(() => {
    fetchFileList()
    fetchFileData('')
  }, [])

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>React App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Form.Select className="mt-2" onChange={(event) => {
            const itemSelect = event.target.value;
            (itemSelect === 'All') ? fetchFileData('') : fetchFileData(itemSelect);
          }}>
          <option>All</option>
          {files.map((item, index) => (
            <option value={item}>{item}</option>
          ))}
        </Form.Select>
      </Container>
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
    </>
  );
}

export default App;
