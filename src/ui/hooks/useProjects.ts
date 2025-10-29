import { useQuery, useMutation } from '@tanstack/react-query'
import { supabaseClient } from '../../api/clients/supabaseClient'
import type { Project } from '../../api/types/project'
import { fetchProjects } from '../../api/adapters/project'
import { useAuth } from './useAuth'
import { queryClient } from '../../api/clients/queryClient'

export const useProjects = () => {
    const { user } = useAuth()

    const { data: projects, isLoading, error } = useQuery<Project[], Error>({
        queryKey: ['projects'],
        queryFn: () => fetchProjects(user?.id ?? '')
    })

    const createProject = useMutation({
        mutationFn: async (name: string) => {
            const userId = user?.id

            const { data, error } = await supabaseClient.from('projects').insert({
                name,
                owner_id: userId
            });

            if (error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
    })

    const deleteProject = useMutation({
        mutationFn: async (projectId: string) => {
            const { data, error } = await supabaseClient
                .from('projects')
                .delete()
                .eq('id', projectId)

            if (error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
    })

    return { projects, isLoading, error, createProject, deleteProject }
}
