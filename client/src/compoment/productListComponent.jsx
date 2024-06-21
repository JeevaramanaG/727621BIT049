import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const categories = ["All Categories", "Category 1", "Category 2", "Category 3"];
const companies = ["All Companies", "Company A", "Company B", "Company C"];

const ProductsListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [sortBy, setSortBy] = useState("price"); // 'price', 'rating', 'discount'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc', 'desc'
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=n&minPrice=p&maxPrice=p"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        console.log(response);
        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error("Fetch error:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, []);

  // Filtered and sorted products based on selected filters
  const filteredProducts = productsData
    .filter((product) => {
      if (
        selectedCategory !== "All Categories" &&
        product.category !== selectedCategory
      ) {
        return false;
      }
      if (
        selectedCompany !== "All Companies" &&
        product.company !== selectedCompany
      ) {
        return false;
      }
      if (showAvailableOnly && !product.availability) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      } else if (sortBy === "discount") {
        return sortOrder === "asc"
          ? a.discount - b.discount
          : b.discount - a.discount;
      }
      return 0;
    });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleAvailableOnlyChange = (event) => {
    setShowAvailableOnly(event.target.checked);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Top Products
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="company-select-label">Company</InputLabel>
              <Select
                labelId="company-select-label"
                id="company-select"
                value={selectedCompany}
                onChange={handleCompanyChange}
              >
                {companies.map((company) => (
                  <MenuItem key={company} value={company}>
                    {company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="sort-by-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-select-label"
                id="sort-by-select"
                value={sortBy}
                onChange={handleSortByChange}
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="sort-order-select-label">Sort Order</InputLabel>
              <Select
                labelId="sort-order-select-label"
                id="sort-order-select"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAvailableOnly}
                  onChange={handleAvailableOnlyChange}
                  name="availableOnly"
                  color="primary"
                />
              }
              label="Show Available Only"
            />
          </FormGroup>
        </Grid>
        {productsData.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
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
                      Availability:{" "}
                      {product.availability ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No products found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ProductsListPage;
