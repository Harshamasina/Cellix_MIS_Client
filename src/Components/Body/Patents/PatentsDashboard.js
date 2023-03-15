import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { CgDatabase } from "react-icons/cg";
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Pagination,Select, MenuItem } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const PatentsDashboard = () => {
    const [patents, setPatents] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState("prv.prv_dof:desc");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/patents/${pageIndex}?pagesize=${pageSize}&sort=${sort}`);
                setPatents(res.data.Patents);
                setCount(res.data.count);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            } catch(err) {
                console.error(err);
                setError(err.response.data.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [pageIndex, pageSize, sort]);

    const handleChangePage = (event, newPageIndex) => {
        setPageIndex(newPageIndex);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageIndex(0);
    };
    
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const popover = (
        <Popover className='popover'>
          <Popover.Body as="p" className='popover-msg'>Get More Info</Popover.Body>
        </Popover>
    );

    if(loading){
        return <div>
            <Dna
                visible={true}
                height="20%"
                width="20%"
                ariaLabel="dna-loading"
                wrapperStyle={{marginLeft: '40%'}}
            />
        </div>;
    }

    if(error){
        return <div className='error-container'><MdSignalWifiConnectedNoInternet0 className='error-icon' /><p>{error.message}</p></div>;
    }

    return(
        <div>
            <Select 
                value={sort} 
                onChange={handleSortChange} 
                autoWidth
                color="success"
                className='select-paginate'
            >
                <MenuItem value={"prv.prv_dof:desc"}>PRV Filing Desc</MenuItem>
                <MenuItem value={"prv.prv_dof:asc"}>PRV Filing Asc</MenuItem>  
            </Select>
            
            <div className='pagination-container'>
                <Pagination
                    count={totalPages} 
                    page={pageIndex + 1}
                    onChange={(event, value) => setPageIndex(value - 1)} 
                    size="large" 
                    showFirstButton 
                    showLastButton
                    shape="rounded"
                />
            </div>
            
            <div className='container'>
                <div className='box-container'>
                    {
                        patents && patents.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent.ref_no}>{patent.ref_no}</Link></h3>
                                <h4>PRV Filing: <span>{patent.prv[0].prv_dof}</span></h4>
                                {patent.pct_appno ? (<h4>PCT Number: <span>{patent.pct_appno}</span></h4>) : ""}
                                
                                <ul className='country-ul'>
                                    {
                                        patent.npe && patent.npe.map((npe) => (
                                            <Link to={"/patentinfo/"+patent.ref_no} className='country-link' target="_blank" key={npe}>
                                                <li>
                                                    {npe.npe_country_div ? (npe.npe_country_div) : (npe.npe_country)}
                                                </li>
                                            </Link>
                                        ))
                                    }
                                </ul>

                                <OverlayTrigger 
                                    placement="auto" 
                                    delay={{ show: 250, hide: 400 }}
                                    trigger={['hover', 'focus']}
                                    overlay={popover}
                                >
                                    <Link className='btn' to={"/patentinfo/"+patent.ref_no} target="_blank">
                                        <CgDatabase />
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className='table-pagination-container'>
                <TablePagination
                    rowsPerPageOptions={[6, 9, 15, 30, 60]}
                    count={count}
                    component='div'
                    rowsPerPage={pageSize}
                    page={pageIndex}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                    labelRowsPerPage="Application Families per page"
                    showFirstButton 
                    showLastButton
                />
            </div>
        </div>
    );
}

export default PatentsDashboard;