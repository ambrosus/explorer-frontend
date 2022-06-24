import Amb from '../../../../../assets/icons/Cryptos/Amb';
import {Number} from 'components/Number';
import moment from 'moment';
import React from 'react';
import {sliceData5} from 'utils/helpers';
import {useNavigate} from "react-router-dom";
import API from "../../../../../API/api";

const BlockBody = ({lastCardRef, item}: any) => {
  const {type, blockHash, from, to, timestamp, value} = item;
  const navigate = useNavigate();

  function redirectHandler(address: string) {
    console.log(address);
    API.searchItem(address).then((data: any) => {
        if (data) {
          let searchTerm = data.data;
          if (searchTerm && searchTerm.term !== undefined) {
            const urlParts = data?.meta.search.split('/');
            urlParts[urlParts.length - 1] = searchTerm.term;
            searchTerm = urlParts.join('/');
          } else {
            searchTerm = data?.meta.search;
          }
          if (
            data.meta.search
          ) {
            navigate(`/${searchTerm}/`);
          }
        }
      }
    )
  }

  const amount = value?.ether || 0;
  return (
    <div className="block_body" ref={lastCardRef}>
      <div className="block_body_cell color-gray">{sliceData5(blockHash)}</div>
      <div className="block_body_cell">{type}</div>
      <div
        className="block_body_cell color-gray "
        onClick={() => redirectHandler(from)}>
          <span
            className='link'>{sliceData5(from)}</span>
      </div>
      <div
        className="block_body_cell color-gray "
        onClick={() => redirectHandler(to)}>
         <span
           className='link'>{sliceData5(to)}</span>
      </div>
      <div className="block_body_cell">
        {moment(timestamp * 1000).fromNow()}
      </div>
      <div className="block_body_cell">
        <span className="block_body_cell_icon">
          <Amb/> <span className="color-gray">AMB</span>
        </span>
        <Number value={amount} fixed={8}/>
      </div>
    </div>
  );
};

export default BlockBody;
