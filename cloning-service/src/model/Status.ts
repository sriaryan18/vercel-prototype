import {DataTypes, Sequelize} from 'sequelize';

let database :Sequelize | null=null;
const url = process.env.DATABASE_URL;
try{
    if(url) database =  new Sequelize(url);
}catch (e) {
    console.log('Error in connecting with DB',e);
}

export const Status = database?.define('Status',{
    'user_hash':{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        primaryKey:true,
        autoIncrementIdentity:false
    },
    'status':{
        type:DataTypes.STRING
    },
    'url':{
        type:DataTypes.STRING
    }

},{
    freezeTableName: true,
    timestamps:false,
});
export async function updateStatus(status:string,hash:string){
    console.log('FOR DB UPDATE',hash);
    if(status === 'clone'){
        await Status?.create({
            user_hash:hash,
            status:'clone',
            url:null
        })
    }else{
        await Status?.update({status},{
            where:{
                user_hash:hash
            }
        })
    }
}
export async function checkStatus(hash:string){
    const row:any = await Status?.findOne({
        where:{
            user_hash:hash
        }
    });
    console.log('res',row)
    return {
        status:row?.status,
        url:row?.url
    };
}


export default database;