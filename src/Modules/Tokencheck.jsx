import React, { useEffect, useState } from 'react';
import {
  getContractBastardPenguins,
  getContractSardinesGang,
} from '../libs/smart-contract';
import { _purchasePenguins } from '../libs/utils';
const Mint = () => {
  // ........State..........................

  const maxSupply = 9999; //10
  const [mintNum, setMintNum] = useState(0);
  const [mintwidth, setMintwidth] = useState(0);
  const [vall, setVal] = useState();
  const [loading, setLoading] = useState(false);

  const temp = async () => {
    // setMintNum(
    //   Number(
    //     await getContractBastardPenguins().methods.purchasedPenguins().call(),
    //   ),
    // );
  };

  // .........Do at start
  useEffect(() => {
    temp();
  }, []);

  // .........Function...............................

  const val = e => {
    // if (e.target.value <= 10000) {
    // console.log(e.target.value);
    setVal(e.target.value);
    // }
  };

  const mint = async () => {
    //setLoading(true);
    console.log(loading);
    await _purchasePenguins(vall, setLoading);

    // maybe we need to fix it later
    setMintNum(vall + mintNum);
    // maybe we need to fix it later

    setMintwidth(vall);
  };

  return (
    <>
      <div className='row '>
        <div className='col-12 ' id='mint-resp'>
          {/* <div id='Seconddiv' style={{ width: `${mintwidth * 10}px` }}></div> */}
          <div id='Firstrow-mint' style={{}} className=''>
            <div className='d-flex flex-column flex-lg-row justify-content-around align-items-center'>
              <div className=''>
                <div
                  id='firstDiv'
                  className='d-flex justify-content-between flex-column'
                >
                  {/* <p id='Firstpara' className='mb-0'>
                    <b>
                      {mintNum}/{maxSupply}{' '}
                      <span> ( {maxSupply - mintNum} remaining )</span>
                    </b>
                  </p> */}
                  <div className=' d-flex align-items-center' id='inppp'>
                    <p className='mb-0 me-4' id='Thirdpara'>
                      <b>BP&nbsp;Check:</b>
                    </p>
                    <div className='' style={{ zIndex: '1' }}>
                      <input
                        id='mintinput'
                        onChange={val}
                        type='text'
                        name='quantity'
                        min='1'
                        max='10000'
                        value={vall}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='d-flex flex-column justify-content-between  align-items-center align-items-lg-start'
                id='minntmain'
              >
                {/* <div className='d-flex'>
                  <p id='Secondpara'>
                    <b>Mint: 0.02 ETH +gas fee</b>
                  </p>
                </div> */}

                <div className='' style={{ zIndex: '1' }}>
                  <button
                    onClick={async () => {
                      // parse numbers
                      // for each number send call
                      // display result list

                      // val is null
                      if (!vall) {
                        alert('Enter some penguin ids like: 12,40,170');
                        return;
                      }

                      let ans = '';
                      const penguinIds = vall.split(',');

                      const sardines = getContractSardinesGang();

                      for (let i = 0; i < penguinIds.length; i++) {
                        const id = penguinIds[i];

                        if (isNaN(id)) {
                          alert('Enter some penguin ids like: 12,40,170');
                          return;
                        }

                        ans +=
                          'Penguin#' +
                          id +
                          ' ' +
                          ((await sardines.methods.radeem(id).call())
                            ? 'Claimed'
                            : 'Not Claimed') +
                          '\n';
                      }

                      alert(ans);
                      setVal('');
                    }}
                    style={{
                      backgroundColor: loading
                        ? 'rgb(51 120 250)'
                        : 'rgb(0, 188, 255)',
                    }}
                    id='mint-button'
                    disabled={loading ? true : false}
                  >
                    {loading ? 'Checking...' : 'Check'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-4'></div>
        </div>
      </div>
    </>
  );
};

export default Mint;
