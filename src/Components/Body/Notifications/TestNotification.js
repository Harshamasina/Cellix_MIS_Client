import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestNotification() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/getpatents');
      setData(result.data);
    };
    fetchData();
  }, []);

  const filteredData = data.filter(item => {
    const currentDate = new Date();
    let filter = false;
    const dateFields = ['prv_dof', 'pct_dof', 'npe.npe_dof', 'npe.npe_grant'];
    dateFields.forEach(field => {
      const fields = field.split('/');
      let fieldValue = item;
      fields.forEach(field => {
        fieldValue = fieldValue[field];
      });
      const itemDate = new Date(fieldValue);
      // console.log(itemDate)
      // const diffInMonths = (currentDate.getFullYear() - itemDate.getFullYear()) * 12 + (currentDate.getMonth() - itemDate.getMonth());
      // const diffInMs = currentDate.getTime() - itemDate.getTime();
      // const diffInM = diffInMs / (1000 * 60 * 60 * 24 * 30.44);
      // const diffInMonths = Math.floor(diffInM);
      // console.log(fields, fieldValue, diffInMonths);
      // if (diffInMonths < 2) {
      //   filter = true;
      // }
      const timeDiff = itemDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log(daysDiff);
      if(daysDiff > 0 && daysDiff <= 60){
        filter = true;
      }
    });
    return filter;
  });
  
  console.log(filteredData);
  
  const sortedData = filteredData.sort((a, b) => {
    const aDateFields = ['prv_dof', 'pct_dof', 'npe.npe_dof', 'npe.npe_grant'];
    let aDate = null;
    let bDate = null;
    
    for (const field of aDateFields) {
      const fields = field.split('.');
      let aFieldValue = a;
      let bFieldValue = b;
      
      fields.forEach(field => {
        if (field === '*') {
          aFieldValue = aFieldValue.flatMap(obj => obj[aFieldValue]);
          bFieldValue = bFieldValue.flatMap(obj => obj[bFieldValue]);
        } else {
          aFieldValue = aFieldValue[field];
          bFieldValue = bFieldValue[field];
        }
      });
      
      if (aFieldValue && bFieldValue) {
        aDate = new Date(aFieldValue);
        bDate = new Date(bFieldValue);
        break;
      }
    }
    return aDate.getTime() - bDate.getTime();
  });
  console.log(sortedData);
  return (
    <div>
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date Field 1</th>
            <th>Date Field 2</th>
            <th>Nested Date Field 3</th>
            <th>Array Date Field 4</th>
            <th>Field 1</th>
            <th>Field 2</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dateField1}</td>
              <td>{item.dateField2}</td>
              <td>{item.nestedField?.dateField3}</td>
              <td>{item.arrayField?.[0]?.dateField4}</td>
              <td>{item.field1}</td>
              <td>{item.field2}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default TestNotification;


