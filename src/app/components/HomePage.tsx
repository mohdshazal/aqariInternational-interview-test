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
import Tooltip from "@mui/material/Tooltip";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
//fetching posts
async function getPosts() {
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
  const posts: Post[] = await getPosts();
  return (
    <>
      <TableContainer component={Paper} className="p-6">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold whitespace-nowrap">
                USER ID
              </TableCell>
              <TableCell className="font-bold">TITLE</TableCell>
              <TableCell className="font-bold">BODY</TableCell>
              <TableCell className="font-bold">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((row: Post, index: number) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: index % 2 === 0 ? "#f0f0f0" : "inherit",
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell component="th" scope="row" className="text-center">
                  {row.userId}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.body}</TableCell>
                <TableCell className="text-center">
                  <Tooltip title="View">
                    <Link href={`/post/${Number(row.id)}`}>
                      <VisibilityIcon />
                    </Link>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
