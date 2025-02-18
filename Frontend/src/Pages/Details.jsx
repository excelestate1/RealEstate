import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const Details = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indication
  const [error, setError] = useState(""); // State for handling errors

  useEffect(() => {
    // Retrieve the propertyId and token from localStorage
    const propertyId = localStorage.getItem("propertyId");
    const token = localStorage.getItem("token");

    if (!propertyId || !token) {
      setError("Please log in and select a property.");
      setLoading(false);
      return;
    }

    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9090/property/${propertyId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }

        const data = await response.json();
        setProperty(data); // Assuming the response contains property details
      } catch (error) {
        setError("Error fetching property details.");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchPropertyDetails();
  }, []);

  if (loading) {
    return <Typography variant="h6" color="textSecondary">Loading property details...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2, marginTop: "60px" }}> {/* Added marginTop for spacing */}
      {property ? (
        <Card>
          <CardContent>
            {property.image && (
              <img
                src={property.image}
                alt={property.propertyName}
                style={{
                  width: "100%",
                  maxWidth: "400px", // Adjust maxWidth as needed
                  height: "auto",
                  objectFit: "cover",
                  marginBottom: 10,
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            )}
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              {property.propertyName}
            </Typography>
            <Typography variant="body2" color="textPrimary" sx={{ marginBottom: 1 }}>
              Price: ${property.price}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
              {property.location}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
              {property.description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="textSecondary">No property details found.</Typography>
      )}
    </Box>
  );
};

export default Details;
