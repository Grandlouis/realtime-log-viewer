import React from 'react';

const Table = ({ columns, data }) => {
    return (<table className="table-striped">
        <thead>
            <tr>
                {columns?.map((column, i) => <th key={`columns${i}`}>{column.title}</th>)}
            </tr>
        </thead>
        <tbody>
            {columns && data?.map((row, i) =>
                <tr key={i}>
                    {columns.map((column, j) => <td key={i + j}>{row[column.selector]}</td>)}
                </tr>
            )}
        </tbody>
    </table>);
};

export default Table;