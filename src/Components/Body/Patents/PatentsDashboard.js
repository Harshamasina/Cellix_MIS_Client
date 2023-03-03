import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { VscGoToFile } from "react-icons/vsc";
import { Dna } from  'react-loader-spinner';
import { MdSignalWifiConnectedNoInternet0 } from "react-icons/md";
import { Link } from 'react-router-dom';

const PatentsPaginate = () => {
    const [patents, setPatents] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(9);
    const [count, setCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/getpatents/${pageIndex}`);
                setPatents(response.data.Patents);
                setTotalPages(response.data.totalPages);
                setPageSize(response.data.pageSize);
                setCount(response.data.count);
                setLoading(false);
            } catch(err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [pageIndex]);
    
    const handlePageChange = (pageNumber) => {
        setPageIndex(pageNumber - 1);
    };
    
    const handlePrevPage = () => {
        setPageIndex((prevPageIndex) => prevPageIndex - 1);
    };
    
    const handleNextPage = () => {
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
    };
    
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, count);

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
            <div className='container'>
                <h2>Cellix Bio Patents Data</h2>
                <Pagination className="justify-content-center" size="lg">
                    <Pagination.Prev
                        disabled={pageIndex === 0}
                        onClick={handlePrevPage}
                    />
                    <Pagination.Next
                        disabled={pageIndex === totalPages - 1}
                        onClick={handleNextPage}
                    />
                </Pagination>
                <div className='box-container'>
                    {
                        patents.map((patent, i) => (
                            <div className='box' key={i}>
                                <h3>Ref No: <Link className='refLink' to={"/patentinfo/"+patent.ref_no}>{patent.ref_no}</Link></h3>
                                <h4>PCT Number: <span>{patent.pct_appno}</span></h4>
                                <ul className='country-ul'>
                                    {
                                        patent.npe && patent.npe.map((npe) => (
                                            <Link to={"/patentinfo/"+patent.ref_no} className='country-link' target="_blank"><li key={npe}>{npe.npe_country}</li></Link>
                                        ))
                                    }
                                </ul>
                                <Link className='btn' to={"/patentinfo/"+patent.ref_no} target="_blank"><VscGoToFile /></Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <p className='Pagination-info'>Showing {startIndex}-{endIndex} of {count} Patents.</p>
                <Pagination className="justify-content-center" size="lg">
                    <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={pageIndex === 0}
                    />
                    <Pagination.Prev
                        disabled={pageIndex === 0}
                        onClick={handlePrevPage}
                    />
                    {[...Array(totalPages).keys()].map((page) => (
                        <Pagination.Item
                            key={page}
                            active={pageIndex === page}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={pageIndex === totalPages - 1}
                        onClick={handleNextPage}
                    />
                    <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={pageIndex === totalPages - 1} 
                    />
                </Pagination>
            </div>
        </div>
    );
}
export default PatentsPaginate;