import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '../../common/components/CardContent';
import { setShowBannerValue } from '../../store/banner';
import { getData } from '../../store/scriptsContent';

export default function Home () {
    const scriptsContent = useSelector((state) => state.scriptsContent.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
        dispatch(setShowBannerValue(''));
      }, []);

    return (
        <div className="row">
            {scriptsContent
                .map((item, index) => {
                    return ( 
                        <CardContent
                            key={index}
                            content={item}
                            index={index}
                            className="col-lg-6"
                        />
                    )
                })
            }
        </div>
    )
  }