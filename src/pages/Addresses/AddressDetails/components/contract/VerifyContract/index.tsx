import FileAdd from 'assets/icons/FileAdd';
import SandWatch from 'assets/icons/SandWatch';
import axios from 'axios';
import ContractErrorMessage from 'components/ContractErrorMessage';
import InputContract from 'components/InputContract';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyContract = () => {
  const chainID = process.env.REACT_APP_CHAIN_ID;

  const sourcifyUrl = 'https://sourcify.ambrosus.io';

  const fileInput = useRef<any>(null);

  const [file, setFile] = useState<any>([]);
  const [contractsToChoose, setContractsToChoose] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const { address = '' } = useParams();
  const navigate = useNavigate();

  const setFiles = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrMessage(null);

    const files = [...file, ...fileInput.current.files];
    setFile((prev: any) => [...prev, ...fileInput.current.files]);

    let formData: any = new FormData();
    formData.append('address', address);
    formData.append('chain', chainID);
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
        if (res.status === 200) {
          navigate(`/addresses/${address}/contract/code`, { replace: true });
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.contractsToChoose) {
          setContractsToChoose(err.response.data.contractsToChoose);
          setLoading(false);
        }
        console.log(err.response);
        if (err.response.data.message) {
          setErrMessage(err.response.data.message);
          setLoading(false);
        }
        if (err.response.data.error) {
          setErrMessage(err.response.data.error);
          setLoading(false);
        }
      });
  };

  const clearAddFiles = (e: any) => {
    e.preventDefault();
    setFile([]);
    setContractsToChoose([]);
    setErrMessage(null);
    setLoading(false);
  };

  const verifyContract = (e: any, chosenContract: any) => {
    e.preventDefault();
    let formData: any = new FormData();
    formData.append('address', address);
    formData.append('chain', chainID);
    file.forEach((file: any) => {
      formData.append('files', file);
    });
    formData.append('chosenContract', chosenContract);

    axios
      .post(sourcifyUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/addresses/${address}/contract/code`, { replace: true });
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrMessage(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <section className="verify_contract">
      <h2 className="verify_contract-heading">Upload source files</h2>
      <form className="verify_contract-input">
        <label className="verify_contract-address">
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
            className="verify_contract-address-text"
            type="text"
            id="address"
            value={address}
            disabled
          />
        </label>
        <label className="verify_contract-filehead">
          <div className="verify_contract-filehead-text">
            <div className="verify_contract-filehead-text-left">
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
              className="verify_contract-filehead-text-right"
            >
              Clear files
            </button>
          </div>
        </label>
        <div className="verify_contract-addfiles">
          <label className="verify_contract_add" htmlFor="files">
            <input
              className="verify_contract-files"
              id="files"
              type="file"
              accept=".sol, .json"
              multiple
              ref={fileInput}
              onChange={(e: any) => setFiles(e)}
            />
            {errMessage &&
              contractsToChoose?.length === 0 &&
              file.length > 0 && (
                <ContractErrorMessage errMessage={errMessage} />
              )}

            <div
              className="verify_contract-placeholder"
              style={{
                marginTop: contractsToChoose?.length === 0 ? 0 : 12,
                justifyContent:
                  contractsToChoose?.length === 0 ? 'center' : 'flex-start',
              }}
            >
              {file?.length === 0 ? (
                <>
                  <FileAdd />
                  <p style={{ marginTop: 10 }}>Drag and Drop files here</p>
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
          {contractsToChoose.length > 0 && (
            <div className="verify_contract-fileslist">
              <div className="verify_contract-fileslist-heading">Contract</div>
              {contractsToChoose.map((contract: any, index: number) => (
                <div key={index} className="verify_contract-fileslist-files">
                  <span className="verify_contract-fileslist-name">
                    {contract.name}
                  </span>
                  <button
                    onClick={(e) => verifyContract(e, index)}
                    className="verify_contract-fileslist-btn"
                  >
                    Verify
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
      <InputContract />
    </section>
  );
};

export default VerifyContract;
