module.exports = {    
    getDbConnectionString: function(){
        return 'mongodb://localhost:27017/quickref';
    },
    getSecret: function(){
        return 'yoursecret';
    }
}