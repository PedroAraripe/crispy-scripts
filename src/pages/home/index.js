import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '../../common/components/CardContent';
import { setShowBannerValue } from '../../store/banner';
import { getData } from '../../store/scriptsContent';
import { useParams } from "react-router-dom";

export default function Home () {
    const scriptsContent = useSelector((state) => state.scriptsContent.value);
    const dispatch = useDispatch();
    const { project_name } = useParams();

    useEffect(() => {
        dispatch(getData());
        dispatch(setShowBannerValue(''));
        console.log({project_name})
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