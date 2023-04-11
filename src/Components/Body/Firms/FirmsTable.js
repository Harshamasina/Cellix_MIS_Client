import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const FirmsTable = () => {
    const Firms = [
        {
            country: "USA(US)",
            Firm: "Trinity Law",
            countryCode: "US"
        },
        {
            country: "Europe(EP)",
            Firm: "ISAR",
            countryCode: "EP"
        },
        {
            country: "Japan(JP)",
            Firm: "Saegusa",
            countryCode: "JP"
        },
        {
            country: "Singapore(SG)",
            Firm: "Mark & Clerk",
            countryCode: "SG"
        },
        {
            country: "South Korea(KR)",
            Firm: "First Law",
            countryCode: "KR"
        },
        {
            country: "New Zealand(NZ)",
            Firm: "Eagar",
            countryCode: "NZ"
        },
        {
            country: "Australia(AU)",
            Firm: "Eagar",
            countryCode: "AU"
        },
        {
            country: "South Africa(ZA)",
            Firm: "De Chalains",
            countryCode: "ZA"
        },
        {
            country: "Mexico(MX)",
            Firm: "CYS",
            countryCode: "MX"
        },
        {
            country: "Brazil(BR)",
            Firm: "DN",
            countryCode: "BR"
        },
        {
            country: "Israel(IL)",
            Firm: "Liad Whatstein",
            countryCode: "IL"
        },
        {
            country: "Canada(CA)",
            Firm: "NELLIGAN O'BRIEN PAYNE LLP",
            countryCode: "CA"
        },
        {
            country: "Russia(RU) ",
            Firm: "IP trend, Patentica ( 103A and 155)",
            countryCode: "RU"
        },
        {
            country: "India(IN)",
            Firm: "Cellix, KK",
            countryCode: "IN"
        },
        {
            country: "China(CN)",
            Firm: "NA",
            countryCode: "CN"
        }
    ];
    
    return(
        <div>
            <Table striped hover className='shadow-lg Firms-Table'>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Country</th>
                        <th>Firm</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Firms.map((firm, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link className='reference-links' to={"/countrynpe/"+firm.countryCode} target="_blank">{firm.country}</Link></td>
                                <td>{firm.Firm}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default FirmsTable;