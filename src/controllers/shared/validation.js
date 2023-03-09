import db from "#root/models";
const {
    student
} = db;

const getDataStore = (type) => {
    let DataStore, pkName;
    switch(type) {
        case "student":
            DataStore = student;
            pkName = "student_id";
            break;
    }
    return {DataStore, pkName};
}



export const checkExistingData = async (db, {key, value, compareId, relations}) => {
    const {DataStore, pkName} = getDataStore(db);
    let where = {};
    if (!key) where[pkName] = value
    else where[key] = value
    if (relations){
        for (let relation in relations) {
            where[relation] = relations[relation]
        }
    }
    try {
        const existingData = await DataStore.findOne({ where })
        if(compareId && existingData) {
            if (existingData.dataValues[pkName] == compareId) return null;
        }
        return existingData;
    }catch(err) {
        console.log(err, "err checking");
    }

}

