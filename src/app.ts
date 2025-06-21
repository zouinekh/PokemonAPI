import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pokemonRoutes from './routes/pokemon.route';
import teamsRoutes from './routes/team.route';
import typeRoutes from './routes/type.route';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//routes 
app.use('/pokemons', pokemonRoutes);
app.use('/teams',teamsRoutes)
app.use('/types',typeRoutes)
app.get('/', (req, res) => {
  res.send('Pokémon Battle API is running 🐱‍👤');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
