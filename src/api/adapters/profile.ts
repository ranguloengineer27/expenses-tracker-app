import { supabaseClient } from "../clients/supabaseClient"

export const fechProfileById = async (id: string) => {
    try {
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    } catch (e) {
        throw new Error(`Error fetching profile data: ${e}`)
    }
}
