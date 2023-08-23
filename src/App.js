import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateFiles, updateLines } from './redux/fileSlice';
import { useSelector } from 'react-redux';
import './App.css';
import { HeaderComponent } from './components/Header';
import { SelectComponent } from './components/Select';
import { TableComponent } from './components/Table';

function App() {
  const server = 'http://localhost:3000/v1'
  const dispatch = useDispatch();
  const fileSelect = useSelector((state) => state.files.fileSelect);

  const fetchFileList = () => {
    fetch(`${server}/files/list`)
      .then(res => res.json())
      .then(data => dispatch(updateFiles(data)))
      .catch(err => console.log(err));
  }

  const fetchFileData = (fileName) => {
    const queryString = fileName === undefined ? '' : `?fileName=${fileName}`;
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
          dispatch(updateLines({ lines: listFiles }))
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchFileList();
    fetchFileData();
  }, []);

  useEffect(() => fetchFileData(fileSelect), [fileSelect]);

  return (
    <>
      <HeaderComponent />
      <SelectComponent />
      <TableComponent />
    </>
  );
}

export default App;
