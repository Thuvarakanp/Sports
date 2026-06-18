const supabase = require('../config/supabase');

// Flatten the embedded sport/age-category objects into the flat shape the
// frontend expects: { ...result, sport_name, gender, age_category_name }.
const flattenResult = (row) => {
    const { sports, ...result } = row;
    return {
        ...result,
        sport_name: sports?.name ?? null,
        gender: sports?.gender ?? null,
        age_category_id: sports?.age_category_id ?? null,
        age_category_name: sports?.age_categories?.name ?? null
    };
};

const RESULT_SELECT =
    '*, sports(name, gender, age_category_id, age_categories(name))';

// Get results by sport ID
const getResultsBySport = async (req, res) => {
    try {
        const { sportId } = req.params;
        const { data, error } = await supabase
            .from('results')
            .select(RESULT_SELECT)
            .eq('sport_id', sportId);

        if (error) throw error;
        res.json((data || []).map(flattenResult));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all results (admin)
const getAllResults = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('results')
            .select(RESULT_SELECT);

        if (error) throw error;

        const results = (data || []).map(flattenResult);

        // ORDER BY ac.id, s.gender, s.name
        results.sort(
            (a, b) =>
                (a.age_category_id ?? 0) - (b.age_category_id ?? 0) ||
                (a.gender || '').localeCompare(b.gender || '') ||
                (a.sport_name || '').localeCompare(b.sport_name || '')
        );

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create result
const createResult = async (req, res) => {
    try {
        const { sport_id, gold_winner, silver_winner, bronze_winner } = req.body;
        const { data, error } = await supabase
            .from('results')
            .insert({ sport_id, gold_winner, silver_winner, bronze_winner })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update result
const updateResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { sport_id, gold_winner, silver_winner, bronze_winner } = req.body;
        const { error } = await supabase
            .from('results')
            .update({ sport_id, gold_winner, silver_winner, bronze_winner })
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Result updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete result
const deleteResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('results')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Result deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getResultsBySport,
    getAllResults,
    createResult,
    updateResult,
    deleteResult
};
