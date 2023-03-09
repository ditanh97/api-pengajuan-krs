import db from "#root/models";
import {msgToString, resJson} from "#root/helpers/format";
import {getPagination, getPagingData} from "#root/helpers/pagination";
const {validationResult} = require("express-validator");
const {
    course: dataTable
} = db;

const pkName = 'course_id';
const dataName = 'courses';
const searchColumns = ['name'];
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

export const listData = async (req, res, next) => {
    const {search} = req.query;
    const defaultOrder = pkName
    
    try {
        let where = {};
        let conditions = [];
        const {
            limit,
            offset,
            page,
            order
        } = getPagination(req, defaultOrder);
        
        
        if ( search && searchColumns.length ) {
        	let orWhere = [];
        	for ( var i in searchColumns ) {
                let conSearch = sequelize.where(sequelize.fn('lower', sequelize.col(searchColumns[i])), {[Op.like]: `%${search.toLowerCase()}%`});
        		let columnForSearch = {conSearch};
        		orWhere.push(columnForSearch);
        	}
        	
        	conditions.push({[Op.or]: orWhere});
        }
        if ( conditions.length > 0 ) where = {...where, [Op.and]: conditions};

        const data = await dataTable.findAndCountAll({ 
            where,            
            limit, 
            offset,
            order 
        });
        if (data) {
            const response = getPagingData(data, page, limit, dataName);
            return resJson(res, 200, "Success", response);
        }
         else return next(new Error(msgToString('Something went wrong on server', 500)));
    }catch (err) {
        if (err.message) return next(err);
        return next(new Error(msgToString('Something went wrong on server', 500)));
    }
};

export const findOneData = async (req, res, next) => {
    let idFromParam = req.params.id || null;
    let {id} = req.query;
    id = id == null || typeof id == 'undefined' ? idFromParam: id;
    try {
        let where = {[pkName]: id}
        if (!id) return next (new Error(msgToString(`Please provide id query params request`, 400)))
        const data = await dataTable.findOne({
            where       
        });
        if (data) {
            return resJson(res, 200, "Success", {
                ...data.dataValues
            }); 
        }else {
            return next(new Error(msgToString(`Not Found`, 404)));
        }
    }catch (err) {
        if (err.message) return next(err);
        return next(new Error(msgToString('Something went wrong on server', 500)));
    }
};

export const addData = async (req, res, next) => {
    try {
      	const createData = await dataTable.create(req.body);
      	if ( !createData ) return next (new Error(msgToString(`Bad Request`, 400)));
        return resJson(res, 200, "Success", req.body)
    }catch (err) {
        if (err.message) return next(err);
        return next(new Error(msgToString('Something went wrong on server', 500)));
    } 
};

export const updateData = async (req, res, next) => {
    try {
      	const {id} = req.params;
      	if (!id) return next (new Error(msgToString(`Please provide id query params request`, 400)))
      	const findData = await dataTable.findOne({
            where: {[pkName]: id}
        });
        if ( !findData ) return next (new Error(msgToString(`Not Found`, 404)));

      	const updatedData = await dataTable.update(req.body, {
            where: {[pkName]: id}
        });
      	
      	if ( !updatedData ) return next (new Error(msgToString(`Bad Request`, 400)));
        
        return resJson(res, 200, "Success", req.body);
    }catch (err) {
        if (err.message) return next(err);
        return next(new Error(msgToString('Something went wrong on server', 500)));
    } 
};

export const deleteData = async (req, res, next) => {
    try {
      	const {id} = req.params;
      	if (!id) return next (new Error(msgToString(`Please provide id query params request`, 400)))
      	const findData = await dataTable.findOne({
            where: {[pkName]: id}
        });
        if ( !findData ) return next (new Error(msgToString(`Not Found`, 404)));

      	const deletedData = await dataTable.destroy({
        	where: {[pkName]: id}
        })
      	
      	if ( !deletedData ) return next (new Error(msgToString(`Bad Request`, 400)));
        
        return resJson(res, 200, "Success", req.body);
    }catch (err) {
        if (err.message) return next(err);
        return next(new Error(msgToString('Something went wrong on server', 500)));
    } 
};