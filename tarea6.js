const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'provinciasRD'; 
const collectionName = 'provincias'; 

const provinciasData = [
    { nombre: 'Santo Domingo' },
    { nombre: 'Santiago' },
    { nombre: 'La Altagracia' },
    { nombre: 'La Romana' },
    { nombre: 'San Pedro de Macorís' },
    
];

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      
        await client.connect();
        console.log('Conectado correctamente a MongoDB');

        
        const db = client.db(dbName);

     
        const result = await db.collection(collectionName).insertMany(provinciasData);
        console.log(`${result.insertedCount} provincias insertadas`);

        
        const provincias = await db.collection(collectionName).find({}).toArray();
        console.log('Provincias:');
        provincias.forEach(provincia => {
            console.log(provincia.nombre);
        });

    } catch (error) {
        console.error('Error al conectar o interactuar con MongoDB', error);
    } finally {
       
        await client.close();
    }
}


main();
