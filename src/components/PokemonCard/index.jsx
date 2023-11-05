import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';

export default function PokemonCard({ name, image, types }) {
  const typeHandler = () => {
    if (types[1]) {
      // Se houver dois tipos, exibe ambos separados por "|".
      return types[0].type.name + "|" + types[1].type.name;
    }
    // Se houver apenas um tipo, exibe o nome desse tipo.
    return types[0].type.name;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* Exibe a imagem do Pokémon. */}
        <CardMedia component="img" height="200" image={image} alt={name} />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Exibe o nome do Pokémon. */}
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            {/* Exibe os tipos do Pokémon usando a função typeHandler. */}
            <Typography gutterBottom variant="caption" component="div">
              {typeHandler(types)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
