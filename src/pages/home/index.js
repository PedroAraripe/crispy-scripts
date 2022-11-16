import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function WrapperContent ({props}) {
    const scriptsNav = [
      {
        name: 'SHELL',
        repositoryName: 'shell-automations'
      },
    ];

    const [data, updateData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const totalData = [];

                for(const script of scriptsNav) {
                    let { data } = await axios.get(`https://api.github.com/repos/PedroAraripe/${script.repositoryName}/contents/`);

                    data
                        .filter(item => item.name.toUpperCase() !== "LICENSE")
                        .map(item => totalData.push(item));
                    
                }
        
                updateData(totalData);
                console.log({data});
        
            } catch (e) {
                console.error(e);
        
            }
        }
        getData();
      }, []);

    return (
        <div className='bg-danger'>
            home
        </div>
    )
  }