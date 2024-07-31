import useSupabase from "@/config/supabaseClient";
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';

const databaseService = () => {

    const { supabase } = useSupabase();

    const create = async (table, data) => {
        const supabase = createClient();
        const { error, data } = await supabase.from(table).insert(entity);

        if (error) {
            message.error(error.message)
            throw error
        } else {
            message.success('Create successfully')
            return data
        }

    }

    const read = async (table, id) => {
        const supabase = createClient();
        const { data, error } = await supabase.from(table).select().eq('id', id);

        if (error) {
            message.error(error.message)
            throw error
        } else {
            return data
        }

    }

    const readAll = async (table) => {
        const supabase = createClient();
        const { data, error } = await supabase.from(table).select();

        if (error) {
            message.error(error.message)
            throw error
        } else {
            return data
        }

    }

    const update = async (table, id, data) => {
        const supabase = createClient();
        const { error, data } = await supabase.from(table).update(entity).eq('id', id);

        if (error) {
            message.error(error.message)
            throw error
        } else {
            message.success('Update successfully')
            return data
        }

    }

    const remove = async (table, id) => {
        const supabase = createClient();
        const { error, data } = await supabase.from(table).delete().eq('id', id);

        if (error) {
            message.error(error.message)
            throw error
        } else {
            message.success('Delete successfully')
            return data
        }

    }


    const readAllWithJoin = async (table, joinTables) => {
        const supabase = createClient();
        const query = joinTables.reduce((acc, table) => `${acc},${table}(*)`, "*");
        const { data, error } = await supabase.from(table).select(query);

        if (error) {
            message.error(error.message)
            throw error
        } else {
            return data
        }
    }

    const readRowWithJoin = async (table, joinTables, id) => {
        const supabase = createClient();
        const query = joinTables.reduce((acc, table) => `${acc},${table}(*)`, "*");
        const { data, error } = await supabase.from(table).select(query).eq("id", id).single();

        if (error) {
            message.error(error.message)
            throw error
        } else {
            return data
        }
    }

    return {
        create,
        read,
        readAll,
        update,
        remove,
        readAllWithJoin,
        readRowWithJoin
    }
}



