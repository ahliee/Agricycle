import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { FaRecycle, FaTrashAlt, FaInfoCircle } from "react-icons/fa";

const WasteListings = () => {
  const [listings, setListings] = useState([]); // Always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("https://mocki.io/v1/84db5eb9-887c-435f-b294-1b87eab2892b");
        console.log("Fetched Waste Data:", response.data); // Debugging

        // Ensure data is in the correct format
        if (Array.isArray(response.data)) {
          setListings(response.data);
        } else if (response.data.listings && Array.isArray(response.data.listings)) {
          setListings(response.data.listings);
        } else {
          setListings([]); // Ensure it's an empty array if no data
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <p style={styles.loading}>Loading waste listings...</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        <FaRecycle style={styles.icon} /> Waste Listings
      </h2>

      <div style={styles.content}>
        {/* Waste Listings (Scrollable) */}
        <ul style={styles.list}>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <li
                key={listing.id || Math.random()} // Handle missing IDs
                style={{
                  ...styles.listItem,
                  background: hoveredItem === listing.id ? "#d5f5e3" : "#fff",
                }}
                onClick={() => setSelectedListing(listing)}
                onMouseEnter={() => setHoveredItem(listing.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaTrashAlt style={styles.listIcon} /> {listing.title || "Unnamed Waste"}
              </li>
            ))
          ) : (
            <p style={styles.placeholder}>No waste listings available.</p>
          )}
        </ul>

        {/* Waste Details (Shows Selected Item) */}
        <div style={styles.details}>
          {selectedListing ? (
            <>
              <h3 style={styles.detailTitle}>
                <FaInfoCircle style={styles.detailIcon} /> {selectedListing.title || "No Title"}
              </h3>
              <p style={styles.detailBody}>{selectedListing.body || "No details available."}</p>
            </>
          ) : (
            <p style={styles.placeholder}>Select a waste item to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styling (Refined for Readability)
const styles = {
  container: {
    maxWidth: "95%",
    margin: "0 auto",
    padding: "20px",
    background: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "28px",
    color: "#2c3e50",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    color: "#27ae60",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "1000px",
    height: "500px",
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  },
  list: {
    width: "40%",
    background: "#ecf0f1",
    padding: "10px",
    overflowY: "auto",
    borderRight: "2px solid #bdc3c7",
    listStyle: "none",
    maxHeight: "500px",
  },
  listItem: {
    padding: "15px",
    margin: "5px 0",
    background: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    transition: "background 0.2s ease-in-out",
  },
  listIcon: {
    color: "#e74c3c",
  },
  details: {
    width: "60%",
    padding: "20px",
    textAlign: "left",
  },
  detailTitle: {
    fontSize: "22px",
    color: "#34495e",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  detailIcon: {
    color: "#2980b9",
  },
  detailBody: {
    fontSize: "16px",
    color: "#555",
  },
  placeholder: {
    fontSize: "18px",
    color: "#95a5a6",
    textAlign: "center",
  },
  loading: {
    fontSize: "18px",
    color: "#007bff",
  },
  error: {
    fontSize: "18px",
    color: "red",
  },
};

export default WasteListings;
