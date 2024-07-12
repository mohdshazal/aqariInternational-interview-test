import React from "react";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";

async function getData() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=15"
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function HomePage() {
  const data = await getData();
  return (
    <>
      <TableContainer component={Paper} className="p-5">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold whitespace-nowrap">
                User ID
              </TableCell>
              <TableCell className="font-bold">Title</TableCell>
              <TableCell className="font-bold">Body</TableCell>
              <TableCell className="font-bold">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.userId}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.body}</TableCell>
                <TableCell>
                  <Link href={`/post/${Number(row.id)}`}>
                    <VisibilityIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
