import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  return result.json();
}
export default async function Home() {
  const recipes = await getRecipes();
  return (
    <div className="grid grid-cols-3 gap-8 ">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="flex flex-col justify-between mr-2">
          <CardHeader className="flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src={`/img/${recipe.image}`} alt="recipe-image" />
              <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle>{recipe.title}</CardTitle>
              <CardDescription>{recipe.time} mins. to cook. </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>{recipe.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>View Recipe</Button>
            {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
