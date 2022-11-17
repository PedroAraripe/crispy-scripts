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
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    {scriptsContent
                        .map((item, index) => {
                            return ( 
                                <CardContent
                                    key={index}
                                    content={item}
                                    className="col-lg-6"
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="col-lg-4">suggestions</div>
        </div>
    )
  }