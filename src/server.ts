import app from './app';
import main from '../prisma/seed'; 

const PORT = process.env.PORT || 3030;


main()
  .then(() => {
    console.log('Database seeded successfully!');
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1); 
  });
