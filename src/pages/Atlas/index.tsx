import { AccountsData } from './11addresses.interface';
import AtlasBlocksBody from './components/AtlasBlocksBody';
import AtlasBlocksHeader from './components/AtlasBlocksHeader';
import AtlasBlocksSort from './components/AtlasBlocksSort';
import MainInfoAtlas from './components/MainInfoAtlas';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getAccountsData } from 'services/accounts.service';
import { getAtlasData } from 'services/atlas.service';
import removeArrayDuplicates from 'utils/helpers';

export const Atlas = () => {
  const [Atlass, setAtlass] = React.useState<AccountsData>([]);
  const [sortTerm, setSortTerm] = React.useState<string>('balance');
  const { ref, inView } = useInView();
  // const { loading } = useTypedSelector((state) => state.app);

  useEffect(() => {
    const next = '';
    getAccountsData(sortTerm, next).then((res: AccountsData) => {
      setAtlass(res);
    });
  }, []);

  useEffect(() => {
    const next = '';
    getAccountsData(sortTerm, next).then((res: AccountsData) => {
      setAtlass(res);
    });
  }, [sortTerm]);

  useEffect(() => {
    if (inView) {
      const next: string = Atlass?.pagination.next;
      if (next) {
        getAccountsData(sortTerm, next).then((res: AccountsData) => {
          setAtlass((prev: AccountsData) => {
            return {
              ...prev,
              data: removeArrayDuplicates([...prev.data, ...res?.data]),
              pagination: res.pagination,
            };
          });
        });
      }
    }
  }, [inView]);

  const num = 6;

  return (
    <Content>
      <Content.Header>
        <MainInfoAtlas />
      </Content.Header>
      <Content.Body>
        <div className="Atlas_main">
          <AtlasBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />

          <div
            className="Atlas_main_table"
            style={{ gridTemplateColumns: `repeat(${num}, auto)` }}
          >
            <AtlasBlocksHeader />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
            <AtlasBlocksBody />
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
