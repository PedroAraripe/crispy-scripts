import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '../../common/components/CardContent';
import { setShowBannerValue } from '../../store/banner';
import { getData } from '../../store/scriptsContent';
import { useSearchParams } from "react-router-dom";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home () {
    const [searchParams] = useSearchParams();
    const projectName = searchParams.get("project_name");
    const scriptsContent = useSelector((state) => state.scriptsContent.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData(projectName));
        dispatch(setShowBannerValue(''));
      }, [projectName]);

    return (
        <div className="row mb-5">
            {
                (!scriptsContent || !scriptsContent.length) ?
                [...Array(4).keys()].map((_,index) => {
                    return (
                        <div key={index} className="col-lg-6">
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <Skeleton width={'100%'} className="card-image-skeleton "/>
                                <Skeleton width={'30%'} className="mt-4" height={"10px"}/>
                                <Skeleton width={'100%'} className="my-2" height={"20px"}/>
                                <Skeleton width={'100%'} count={3} />
                                <div className="py-2"></div>
                            </SkeletonTheme>
                        </div>
                    )
                })
                :
                ''
            }

            {scriptsContent
                .map((item, index) => {
                    return ( 
                        <CardContent
                            key={index}
                            content={item}
                            index={index}
                            className="col-lg-6 mb-lg-4"
                        />
                    )
                })
            }
        </div>
    )
  }