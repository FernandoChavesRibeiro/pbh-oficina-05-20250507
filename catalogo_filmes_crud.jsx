import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MovieCatalog() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("movies");
    if (stored) setMovies(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (title.trim() === "") return;

    if (editingId !== null) {
      setMovies(movies.map((m) => (m.id === editingId ? { ...m, title } : m)));
      setEditingId(null);
    } else {
      setMovies([...movies, { id: Date.now(), title }]);
    }
    setTitle("");
  };

  const editMovie = (id) => {
    const movie = movies.find((m) => m.id === id);
    setTitle(movie.title);
    setEditingId(id);
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Filmes</h1>

      <div className="flex gap-2 mb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome do Filme"
        />
        <Button onClick={addMovie}>{editingId ? "Salvar" : "Adicionar"}</Button>
      </div>

      <div className="grid gap-2">
        {movies.map((movie) => (
          <Card key={movie.id} className="flex justify-between items-center p-2">
            <CardContent className="p-0 m-0">{movie.title}</CardContent>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => editMovie(movie.id)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => deleteMovie(movie.id)}>
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
