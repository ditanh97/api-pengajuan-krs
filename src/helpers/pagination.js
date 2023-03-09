import {Sequelize} from "sequelize";

export const getPagination = (req, order_type) => {
    const limit = Number(req.query.limit) || 10;
    const page =  Number(req.query.page) || 1;
    const offset = limit * (page - 1);
    const order = req.query.order == "asc" ? "ASC" : "DESC";
    let sortby = req.query.sortby || null;
    sortby = sortby === null ? order_type: sortby;
    let orderBy = [ [sortby, order]]
    if (sortby.indexOf(".") !== -1) {
        orderBy = [ [Sequelize.literal(sortby), order] ] 
    }
    return {
        limit,
        offset,
        page,
        order: orderBy
    };
}

export const getPagingData = (data, page, limit, name) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, totalPages, currentPage, [name]: rows };
  };
  