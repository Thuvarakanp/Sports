const supabase = require('../config/supabase');

// Get all age categories
const getAgeCategories = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('age_categories')
            .select('*')
            .order('id');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get sports by age category and gender
const getSports = async (req, res) => {
    try {
        const { ageCategoryId, gender } = req.params;
        const { data, error } = await supabase
            .from('sports')
            .select('*')
            .eq('age_category_id', ageCategoryId)
            .eq('gender', gender);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create age category
const createAgeCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { data, error } = await supabase
            .from('age_categories')
            .insert({ name })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ id: data.id, name: data.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update age category
const updateAgeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { error } = await supabase
            .from('age_categories')
            .update({ name })
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Age category updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete age category
const deleteAgeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('age_categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Age category deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create sport
const createSport = async (req, res) => {
    try {
        const { name, age_category_id, gender } = req.body;
        const { data, error } = await supabase
            .from('sports')
            .insert({ name, age_category_id, gender })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update sport
const updateSport = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age_category_id, gender } = req.body;
        const { error } = await supabase
            .from('sports')
            .update({ name, age_category_id, gender })
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Sport updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete sport
const deleteSport = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('sports')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Sport deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all sports (admin)
const getAllSports = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sports')
            .select('*, age_categories(name)');

        if (error) throw error;

        // Flatten the embedded age category and match the original response shape.
        const sports = (data || []).map((s) => {
            const { age_categories, ...sport } = s;
            return { ...sport, age_category_name: age_categories?.name ?? null };
        });

        // ORDER BY ac.id, s.gender, s.name
        sports.sort(
            (a, b) =>
                a.age_category_id - b.age_category_id ||
                a.gender.localeCompare(b.gender) ||
                a.name.localeCompare(b.name)
        );

        res.json(sports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAgeCategories,
    getSports,
    createAgeCategory,
    updateAgeCategory,
    deleteAgeCategory,
    createSport,
    updateSport,
    deleteSport,
    getAllSports
};
