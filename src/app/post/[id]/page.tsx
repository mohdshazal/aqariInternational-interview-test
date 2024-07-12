import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Avatar, Box, Divider, Grid } from "@mui/material";
import Image from "next/image";

//fetching a single post
async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

//fetching comments related to that post
async function getComments(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
interface comment {
  email: string;
  body: string;
}
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export default async function DetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const comments: comment[] = await getComments(id);
  const post:Post = await getPost(id);
  const userImages: string[] = ["user1", "user2", "user3", "user4", "user5"];
  return (
    <div className="flex justify-center mt-8">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/post-image.png"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
            <Divider className="mb-4 mt-4" />
            <Typography className="font-bold" variant="body2" gutterBottom>
              <CommentIcon fontSize="small" /> Comments ({comments?.length})
            </Typography>
            <Divider className="mt-4 mb-4" />
            {comments.map((comment: comment, index: number) => (
              <Box key={index} mt={1}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Image
                      src={`/${userImages[index]}.jpg`}
                      width={40}
                      height={50}
                      alt="Picture of the author"
                      className="rounded-xl"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" color="textSecondary">
                      {comment.email}
                    </Typography>
                    <Typography variant="caption">{comment.body}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
