import { TbFilter } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { jobTable } from "../../db/data";

const Content = () => {
  return (
    <div className=" w-full">
      {/* top section */}
      <div className=" w-full p-7 flex items-center justify-between">
        {/* left side */}
        <h3 className=" text-4xl font-semibold ml-5">Job Posting</h3>
        {/* right side */}
        <div className=" flex items-center gap-5">
          <button className=" flex group items-center py-2 px-5 border-2 border-blue-600 hover:border-blue-700 rounded-lg text-blue-600 hover:text-blue-700 hover:font-semibold">
            Filter
            <TbFilter className=" text-lg ml-3 group-hover:text-blue-700 text-blue-600" />
          </button>
          <button className=" flex items-center py-2 px-5 border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
            Post New Job <AiOutlinePlus className=" text-lg ml-2 text-white" />
          </button>
        </div>
      </div>
      {/* table */}
      <div className=" w-full px-7">
        <Table
          sx={{ minWidth: 650 }}
          className=" shadow-lg rounded-lg overflow-hidden"
          aria-label="simple table"
        >
          <TableHead className=" bg-[#1976b2]">
            <TableRow>
              <TableCell className="tabal-color">Job Post</TableCell>
              <TableCell className="tabal-color" align="right">
                Department
              </TableCell>
              <TableCell className="tabal-color" align="right">
                Location
              </TableCell>
              <TableCell className="tabal-color" align="right">
                Created date
              </TableCell>
              <TableCell className="tabal-color" align="right">
                Active Application
              </TableCell>
              <TableCell className="tabal-color" align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobTable.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.job}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.application}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Content;
