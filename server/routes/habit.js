let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Habit = require('../models/habit');

// READ – show all habits
router.get('/', async (req, res, next) => {
    try {
        const HabitList = await Habit.find();
        res.render('Habits/list', {
            title: 'Habits',
            HabitList: HabitList
        });
    } catch (err) {
        console.error(err);
        res.render('Habits/list', { error: 'Server Error' });
    }
});

// CREATE – display Add Habit page
router.get('/add', (req, res) => {
    res.render('Habits/add', {
        title: 'Add a Habit'
    });
});

// CREATE – process Add Habit form
router.post('/add', async (req, res) => {
    try {
        let newHabit = new Habit({
            title: req.body.title,
            difficulty: req.body.difficulty,
            frequency: req.body.frequency,
            purpose: req.body.purpose,
            notes: req.body.notes
        });

        await Habit.create(newHabit);
        res.redirect('/habits');
    } catch (err) {
        console.error(err);
        res.render('Habits/add', { error: 'Server Error' });
    }
});

// UPDATE – display Edit Habit page
router.get('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let habitToEdit = await Habit.findById(id);

        res.render('Habits/edit', {
            title: 'Edit Habit',
            Habit: habitToEdit
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// UPDATE – process Edit Habit form
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;

        let updatedHabit = {
            title: req.body.title,
            difficulty: req.body.difficulty,
            frequency: req.body.frequency,
            purpose: req.body.purpose,
            notes: req.body.notes
        };

        await Habit.findByIdAndUpdate(id, updatedHabit);
        res.redirect('/habits');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// DELETE – delete a habit
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Habit.deleteOne({ _id: id });
        res.redirect('/habits');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
