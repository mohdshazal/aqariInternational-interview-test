import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getComments(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
import { Avatar, Box, Divider, Grid } from "@mui/material";
export default async function DetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const comments: [] = await getComments(id);
  const post = await getPost(id);
  console.log(comments);
  console.log(post);
  return (
    <div className="flex justify-center align-middle m-auto">
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
              Title : {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
            <Divider className="mb-4 mt-4" />
            <Typography className="font-bold" variant="body2" gutterBottom>
              Comments ({comments?.length})
            </Typography>
            <Divider className="mt-4" />
            {comments.map((comment: any, index: any) => (
              <Box key={index} mt={1}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" color="textSecondary">
                      Posted by {comment.email}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      {comment.body}
                    </Typography>
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
