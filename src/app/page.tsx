"use client";
import Image from "next/image";
import { useState } from "react";
import * as CSV from "csv-string";

export default function Home() {
  const [csvData, setCsvData] = useState("");
  const [typstTable, setTypstTable] = useState("");

  const handleInputChange = (e: any) => {
    setCsvData(e.target.value);
  };

  const parseInput = () => {
    console.log(JSON.stringify(csvData));
    const parsed = CSV.parse(csvData, "\t");
    console.log(parsed);
    
    const ncol = parsed[0].length;
    const nrow = parsed.length;
    let cols = ""
    for (let i = 0; i < ncol; i++) {
      cols += `auto,`;
    }
    cols = cols.slice(0, -1);
    let typstTable = `#figure(\ntable(\n\tcolumns: (${cols}),`
    for (let i = 0; i < nrow; i++) {
      typstTable += `\n \t`
      for (let j = 0; j < ncol; j++) {
        typstTable += `[${parsed[i][j]}],`
      }
    }
    typstTable = typstTable.slice(0, -1);
    typstTable += `\n),\ncaption:[]\n)`;
    console.log(typstTable);
    setTypstTable(typstTable);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <textarea
          className="w-[60vw] bg-gray-800 p-4 text-white text-lg h-[40vh] resize-none"
          value={csvData}
          onChange={handleInputChange}
        />
        <button onClick={parseInput} className="border-4 p-2 rounded-lg">Submit</button>
      
        <textarea
          className="w-full bg-gray-800 p-4 text-white text-lg h-[40vh] resize-none"
          value={typstTable}
        />
        </div>
    </div>
  );
}
