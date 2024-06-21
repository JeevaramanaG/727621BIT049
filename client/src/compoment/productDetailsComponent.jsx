import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";

const ProductDetailsComponent = ({ product }) => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Company: {product.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {product.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discount: {product.discount}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Availability: {product.availability ? "In Stock" : "Out of Stock"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default ProductDetailsComponent;
