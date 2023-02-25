import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestNotification() {
  const [patentsData, setPatentsData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/getpatents');
      setPatentsData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const FilteredArray = patentsData
      .filter(item => {
        const fieldValue1 = item.prv_dof;
        const fieldValue2 = item.pct_dof;
        const nestedArray = item.npe;
        
        const nestedFieldValue3Array = nestedArray.map(
          nestedItem => nestedItem.npe_dof
        ).filter(Boolean);
        
        const nestedFieldValue4Array = nestedArray.map(
          nestedItem => nestedItem.npe_grant
        ).filter(Boolean);
        
        const dataFields = [fieldValue1, fieldValue2, ...nestedFieldValue3Array, ...nestedFieldValue4Array];
        // console.log("nestedArray", nestedArray, "nestedFieldValue3Array", nestedFieldValue3Array);
        // console.log("nestedArray", nestedArray, "nestedFieldValue4Array", nestedFieldValue4Array);
        // console.log("dataFields", dataFields);
        return (
            dataFields.map(fieldValue => {
            const itemDate = new Date(fieldValue);
            // console.log(itemDate);
            const timeDiff = itemDate.getTime() - currentDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysDiff > 0 && daysDiff <= 60
          })
        );
      });

      console.log("Filtered Array", FilteredArray);

      // const sortedArray = FilteredArray.sort((item1, item2) => {
      //   const fieldValue1 = item1.prv_dof;
      //   const fieldValue2 = item1.pct_dof;
      //   const nestedArray1 = item1.nestedArray;
      //   const nestedArray2 = item2.nestedArray;
        
      //   const nestedFieldValue3Array1 = nestedArray1.map(
      //     nestedItem => nestedItem.npe_dof
      //   ).filter(Boolean);
        
      //   const nestedFieldValue3Array2 = nestedArray2.map(
      //     nestedItem => nestedItem.npe_dof
      //   ).filter(Boolean);
        
      //   const nestedFieldValue4Array1 = nestedArray1.map(
      //     nestedItem => nestedItem.npe_grant
      //   ).filter(Boolean);
        
      //   const nestedFieldValue4Array2 = nestedArray2.map(
      //     nestedItem => nestedItem.npe_grant
      //   ).filter(Boolean);
        
      //   const dataField1Item1 = fieldValue1 || nestedFieldValue3Array1[0] || nestedFieldValue4Array1[0];
      //   const dataField1Item2 = fieldValue2 || nestedFieldValue3Array2[0] || nestedFieldValue4Array2[0];
      //   const itemDate1 = new Date(dataField1Item1);
      //   const itemDate2 = new Date(dataField1Item2);
      //   const diffInMilliseconds = itemDate1.getTime() - itemDate2.getTime();
      //   return diffInMilliseconds;
      // });
    setSortedData(FilteredArray);
  }, [patentsData]);
  console.log(sortedData);
  return (
    <div>
      
    </div>
  );
}

export default TestNotification;


