import axios from 'axios';
import { log } from 'console';
import { memo, useEffect, useRef, useState } from 'react';

const InputContranct = () => {
  const sourcifyUrl = 'https://sourcify.ambrosus.io';

  const fileInput = useRef<any>(null);

  const [file, setFile] = useState<any>([]);
  const [fileName, setFileName] = useState<any>([]);
  const [data, setData] = useState<any>([]);

  const addFileHandler = (e: any) => {
    e.preventDefault();
    setFile(fileInput.current.files[0]);
    // console.log(fileInput.current.files[0]);

    if (fileInput.current.files.length === 0) {
      alert('Вы не ввели файл');
    } else {
      let formData = new FormData();
      formData.append('address', '0x55C402b5F9C2c3DfE3d866B36598f0Fd53e03B89');
      formData.append('chain', '22040');
      formData.append('files', fileInput.current.files[0]);
      axios
        .post(sourcifyUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   console.log(JSON.parse(data));
  // }, [data]);

  //   console.log(fileName);

  //   const addFileHandler = (e: any) => {
  //     e.preventDefault();

  //     // console.log(fileInput.current.files[0]);

  //     if (fileInput.current.files.length === 0) {
  //       alert('Вы не ввели файл');
  //     } else {
  //       let formData = new FormData();
  //       formData.append('address', '0x55C402b5F9C2c3DfE3d866B36598f0Fd53e03B89');
  //       formData.append('chain', '22040');
  //       formData.append('files', fileInput.current.files[0]);
  //       fetch(sourcifyUrl, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         body: formData,
  //       })
  //         .then((res) => {
  //           res.json();
  //         })
  //         .then((res) => console.log(res))
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };

  const getFileName = (e: any) => {
    e.preventDefault();
    console.log(fileInput.current.files);

    setFile(fileInput.current.files[0]);
    setFileName((prev: any) => [...prev, fileInput.current.files[0].name]);
  };

  //   console.log(formData.get('contract'));

  return (
    <>
      <form onSubmit={(e: any) => addFileHandler(e)} className="input_contract">
        <input
          style={{
            display: 'none',
          }}
          id="files"
          type="file"
          // accept=".sol, .json"
          //   multiple
          ref={fileInput}
          onChange={getFileName}
        />
        {file.length === 0 ? (
          <label className="input_contract_add" htmlFor="files">
            Add File
          </label>
        ) : (
          <label className="input_contract_add" htmlFor="files">
            {fileName.map((name: any) => (
              <>
                <p className="input_contract_name">
                  {name}
                  <span className="input_contract_cross"></span>
                </p>
              </>
            ))}
          </label>
        )}
        {/* <label className="input_contract_add" htmlFor="files">
          Add File
        </label> */}

        <button className="input_contract_submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default memo(InputContranct);
