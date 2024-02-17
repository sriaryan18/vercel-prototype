import {Sequelize, DataType, DataTypes} from 'sequelize';

const databaseURL:string = process.env.DATABASE_URL || '';
let database : any= null;
if(databaseURL){
     database = new Sequelize(databaseURL);
}


export async function updateStatus(hash:string , status:string , port?:number){
     const tableName = 'Status';
     const url = `${process.env.BASE_URL}:${port}`
     const query = status === 'build'?
         'UPDATE ' + `"${tableName}"` + ' SET status = :status where user_hash = :hash' :
         'UPDATE ' + `"${tableName}"`+ ' SET status = :status , url = :url where user_hash = :hash'
     await database.query(query,
         {
              replacements:{
                   hash,
                   status,
                   ...(url && {url})
              },
              type:database.QueryTypes.UPDATE
         }
     ).then(([result,metadata]:any) => {
          console.log('Rows updated:', result.rowCount);
     }).catch((err:any) => {
          console.log('Error in updating the status',err);
     })
}

export default database;