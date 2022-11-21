import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '../../common/components/CardContent';
import { getData } from '../../store/scriptsContent';

export default function Home () {
    const scriptsContent = useSelector((state) => state.scriptsContent.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
      }, []);

    return (
        <div className="row py-2 py-lg-4">
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