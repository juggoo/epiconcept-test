import api from "@/lib/api";
import { Note } from "@/models/note.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotes = (tenantId: string) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["notes", tenantId],
    queryFn: () => api.get("/notes").then((res) => res.data),
  });

  const createNote = useMutation({
    mutationFn: (newNote: Omit<Note, "id">) =>
      api.post("/notes", newNote).then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notes", tenantId] }),
  });

  return { data, isLoading, createNote };
};
