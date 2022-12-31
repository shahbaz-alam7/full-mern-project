import React, { useEffect } from "react";
import useStyles from "./style";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const {numberOfPage}=useSelector((state)=>state.posts)
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      page={(Number(page))}
      count={numberOfPage}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
