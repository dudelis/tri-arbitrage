var env = process.env.NODE_ENV || 'development';
switch (env) {
    case 'production':
      config = require('../env/production');
      break;
   
    case 'development':
      config = require('../env/development');
      break;
   
    case 'testing':
      config = require('../env/testing');
      break;
   
    case 'staging':
      config = require('../env/staging');
      break;
    default:
        console.error('NODE_ENV environment variable not set');        
        process.exit(1);
}
Object.keys(config).forEach((key)=>{
    process.env[key] = config[key];
});
