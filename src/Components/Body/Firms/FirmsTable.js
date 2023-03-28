import { Table } from "react-bootstrap";

const FirmsTable = () => {
    const Firms = [
        {
            country: "USA(US)",
            Firm: "Trinity Law"
        },
        {
            country: "Europe(EP)",
            Firm: "ISAR"
        },
        {
            country: "Japan(JP)",
            Firm: "Saegusa"
        },
        {
            country: "Singapore(SG)",
            Firm: "Mark & Clerk"
        },
        {
            country: "South Korea(SK)",
            Firm: "First Law"
        },
        {
            country: "New Zealand(NZ)",
            Firm: "Eagar"
        },
        {
            country: "Australia(AU)",
            Firm: "Eagar"
        },
        {
            country: "South Africa(ZA)",
            Firm: "De Chalains"
        },
        {
            country: "Mexico(MX)",
            Firm: "CYS"
        },
        {
            country: "Brazil(BR)",
            Firm: "DN"
        },
        {
            country: "Israel(IL)",
            Firm: "Liad Whatstein"
        },
        {
            country: "Canada(CA)",
            Firm: "NELLIGAN O'BRIEN PAYNE LLP"
        },
        {
            country: "Russia(RU) ",
            Firm: "IP trend, Patentica ( 103A and 155)"
        },
        {
            country: "India(IN)",
            Firm: "Cellix, KK"
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
                                <td>{firm.country}</td>
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