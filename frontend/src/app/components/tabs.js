import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BookList from "./booklist";
import { useState, useEffect } from "react";
import { Badge, Snackbar } from "@mui/material";

const GRAPHQL_ENDPONT = "http://localhost:4000/graphql";
const GET_BOOKS_QUERY = `
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddRecommendation = (i) => {
    const newData = data.books.map((item) => {
      if (item.title === i.title) {
        return { ...item, recommended: true };
      }

      return item;
    });
    setData({ books: newData });
  };
  const handleRemoveRecommendation = (e) => {
    const newData = data.books.map((item) => {
      if (item.title === e.title) {
        return { ...item, recommended: false };
      }

      return item;
    });
    setData({ books: newData });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GRAPHQL_ENDPONT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_BOOKS_QUERY,
          }),
        });
        const result = await response.json();

        const uniqueBooks = result.data.books.reduce((unique, book) => {
          const isDuplicate = unique.some((item) => item.title === book.title);
          if (!isDuplicate) {
            return [...unique, book];
          }
          return unique;
        }, []);

        setData({ books: uniqueBooks });

        //setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All Books" {...a11yProps(0)}></Tab>
          <Tab label="Reading List" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BookList
          data={data.books}
          handleAddRecommendation={handleAddRecommendation}
          handleRemoveRecommendation={handleRemoveRecommendation}
        ></BookList>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BookList
          filter="recommended"
          data={data.books}
          handleAddRecommendation={handleAddRecommendation}
          handleRemoveRecommendation={handleRemoveRecommendation}
        ></BookList>
      </CustomTabPanel>
    </Box>
  );
}
