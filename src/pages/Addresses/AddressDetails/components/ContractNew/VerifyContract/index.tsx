import FileAdd from 'assets/icons/FileAdd';
import SandWatch from 'assets/icons/SandWatch';
import axios from 'axios';
import InputContract from 'components/InputContract';
import { memo, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifyContract = () => {
  const sourcifyUrl = 'https://sourcify.ambrosus.io';

  const fileInput = useRef<any>(null);

  const [file, setFile] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [contractsToChoose, setContractsToChoose] = useState([]);
  const [contractsToVerify, setContractsToVerify] = useState();
  console.log(contractsToChoose);

  const { address = '' } = useParams();

  const getFileName = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const files = [...file, ...fileInput.current.files];
    setFile((prev: any) => [...prev, ...fileInput.current.files]);

    let formData = new FormData();
    formData.append('address', address);
    formData.append('chain', '22040');
    files.forEach((file) => {
      formData.append('files', file);
    });

    axios
      .post(sourcifyUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('res ', res);
        setLoading(false);
      })
      .catch((err) => {
        // if (!!err.response.data.contractsToChoose) {
        //   setContractsToChoose(err.response.data.contractsToChoose);
        // } else {
        // }

        console.log(err.response);
        console.log(err);
        setLoading(false);
      });
  };

  const clearAddFiles = (e: any) => {
    e.preventDefault();
  };
  return (
    <section className="verify_contract">
      <h2 className="verify_contract-heading">Upload source files</h2>
      <form className="input_contract">
        <label className="input_contract-address">
          <span
            style={{
              height: 48,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 12,
              lineHeight: 15,
            }}
          >
            Contract address
          </span>
          <input
            className="input_contract-address-text"
            type="text"
            id="address"
            value={address}
            disabled
          />
        </label>
        <label className="input_contract-filehead">
          <div className="input_contract-filehead-text">
            <div className="input_contract-filehead-text-left">
              Please add contract{' '}
              <span
                style={{
                  color: '#A6B0C3',
                  paddingLeft: 8,
                  fontWeight: 400,
                  fontSize: 12,
                }}
              >
                {'(metadata.json)'}
              </span>
            </div>
            <button
              onClick={clearAddFiles}
              className="input_contract-filehead-text-right"
            >
              Clear files
            </button>
          </div>
        </label>
        <label className="input_contract_add" htmlFor="files">
          <input
            className="input_contract-files"
            id="files"
            type="file"
            accept=".sol, .json"
            multiple
            ref={fileInput}
            onChange={getFileName}
          />

          <div className="input_contract-placeholder">
            {file?.length === 0 ? (
              <>
                <FileAdd />
                <p style={{ marginTop: 15 }}>Drag and Drop files here</p>
                <p>or Browse files</p>
              </>
            ) : (
              !loading && (
                <div style={{ width: '100%', paddingLeft: 12 }}>
                  <p>Added files</p>
                  {file.map((item: any, index: number) => (
                    <p style={{ color: '#A6B0C3' }} key={index}>
                      {item.name}
                    </p>
                  ))}
                </div>
              )
            )}
            {loading && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p>
                  <SandWatch />
                </p>
                <p>Checking contract ...</p>
              </div>
            )}
          </div>
        </label>
      </form>
      <InputContract />
    </section>
  );
};

export default VerifyContract;
