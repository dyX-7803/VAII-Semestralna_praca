// import { validateRequired, validateIsNumberAndPositive, 
//     validateIsIntegerAndPositive, validateImage } from '../utils/validators.js';
const validators = require('../utils/validators');

const addItemValidation = (req, res, next) => {

    const {nazov, popis, cena, pocet_ks} = req.body;

    if (!validators.validateRequired(nazov) || !validators.validateRequired(cena) || !validators.validateRequired(pocet_ks)) {
            return res.status(400).json({ error: 'Názov, popis, cena a pocet kusov sú povinné!' });
    }

    if (!validators.validateIsNumberAndPositive(cena)) {
        return res.status(400).json({ error: 'Cena musí byť nezáporné číslo!' });
    }

    if (!validators.validateIsIntegerAndPositive(pocet_ks)) {
        return res.status(400).json({ error: 'Počet kusov musí byť celé nezáporné číslo!' });
    }

    next();
};


const addImageValidation = (req, res, next) => {
    if (req.file && !validators.validateImage(req.file)) {
        return res.status(400).json({ error: 'Nahraný súbor nie je platný obrázok (musí byť JPG alebo PNG).' });
    }

    next();
};


module.exports = {addItemValidation, addImageValidation};